# Step 1 — Payment Integrity: Inspection, Proposal (No Code Changed Yet)
### Branch `arena/82954c68-mzansisite-redesign` @ `14c2ae5` — Date 2026-10-19
### Status: INSPECTION COMPLETE, CHANGES NOT APPLIED — awaiting approval

This satisfies the “show me before you change billing” gate. No subscription price, plan, production config, or customer data has been altered.

---

## 1) Authoritative plan amount & currency — verified before enforcing

I did **not** assume R149.99. Evidence from authoritative project config (single source of truth):

- **src/lib/billing.ts:7-9**
  ```ts
  export const PLAN = {
    code: process.env.PAYSTACK_PLAN_CODE ?? "mzansisite-monthly",
    amountCents: 14999, // R149.99 in cents — Paystack ZAR amounts are in kobo/cents.
    currency: "ZAR",
    interval: "monthly",
  } as const;
  ```
- **src/db/schema.ts:124** default `amountCents: 14999`, **currency `ZAR`**
- **.env.example: PAYSTACK_PLAN_CODE plan create**: `{ "amount": 14999, "currency": "ZAR" }`
- **Displayed prices** after prior fix all render `formatRand(PLAN.amountCents)` → `R149.99`. `Pricing.tsx`, `Hero.tsx`, `FAQ.tsx`, `Steps.tsx`, `billing/page.tsx`, `dashboard/billing/callback` all consistent.

**Conclusion:** Authoritative expected amount is **14 999 cents (R149.99 ZAR)**. Enforcement must use `PLAN.amountCents` + `PLAN.currency` imported from `src/lib/billing.ts`, not a hard-coded literal, so a future price change only requires one file. `PAYSTACK_PLAN_CODE` is env-driven and may differ per environment — code must validate amount/currency, not just code string.

---

## 2) Current implementation — what it does right, what it misses

### verify route — `src/app/api/paystack/verify/route.ts`
**Correct already:**
- Verifies Firebase ID token via `getAuthedUser` (prevents Bearer-spoof).
- Requires `reference`, checks `PAYSTACK_SECRET_KEY` configured, calls `verifyTransaction(reference)` → Paystack.
- Rejects if `tx.data.status !== "success"` (marks payment `failed`, 402).
- Resolves `siteId` from `body.siteId ?? metadata.siteId` and confirms ownership `eq(sites.userId, user.id)`.
- Re-validates `validateForPublish` before activating.
- Idempotent subscription insert: `SELECT` by `paystackSubscriptionCode` → update else insert.

**Gaps (confirmed, high severity):**
- **No amount/currency check.** An underpayment, 0-amount test event, coupon, or mis-configured Paystack plan could activate site:
  ```ts
  // current 49-50
  if (tx.data.status !== "success") return 402;
  // ← missing: amount, currency, reference echo
  await db.update(payments).set({ status:"success" }) …
  await db.update(sites).set({ status:"active" })
  ```
  Paystack `verifyTransaction` returns `data.amount` (kobo/cents) and `data.currency` — neither compared to `PLAN.amountCents`/`PLAN.currency`.
- **Reference not cross-checked.** `reference` from body is verified but `tx.data.reference` could differ (e.g., truncated). Should assert equality.
- **No check that payment reference matches the pending `payments` row** (prevents using someone else’s successful reference for a different site). Currently updates `payments` where `paystackReference = reference` without confirming that row belongs to `siteId` or was `pending`.
- **Site already active race:** no early return if `site.status === "active"` — webhook may have already activated; currently re-activates idempotently (harmless but noisy).

### webhook route — `src/app/api/paystack/webhook/route.ts`
**Correct already:**
- `verifyWebhookSignature(rawBody, signature)` HMAC-SHA512 vs `x-paystack-signature` → 401 if invalid.
- `charge.success` does insert → update pattern to avoid leaving `pending` forever.
- `subscription.disable / delete / not_renew` suspend logic preserves grace period.

**Gaps (high/medium):**
- **No amount/currency validation on `charge.success`.** Directly trusts `event.data.amount`, marks success and activates site. Attacker replaying a small test transaction with same `siteId` in metadata could activate if signature valid (signature would fail unless attacker has secret, but mis-configured low-amount plan would still activate).
- **No handling of `invoice.payment_failed` / `charge.failed`** — site stays `active` after card decline until next `subscription.not_renew`, creating free-ride window inconsistent with Terms “suspended on failed renewal”.
- **Reference uniqueness relies on `onConflictDoNothing` on `paystackReference` (uniqueIndex `payments_reference_idx` in schema) — correct — but no explicit duplicate-event idempotency for subscription update (duplicate `charge.success` will re-update `nextPaymentDate`, which is idempotent and safe, but not documented as intentional).
- **Metadata tampering:** `metaSiteId` from `event.data.metadata.siteId` trusted without verifying that Paystack transaction’s `plan` matches expected plan. If multiple plans exist, could map to wrong site.

### initialize route — `src/app/api/paystack/initialize/route.ts`
**Correct:** generates `reference = mzansi_${siteId}_${Date.now()}`, stores `pending` payment with `PLAN.amountCents`, sends `PLAN.code` + metadata.

**Small improvement not required for Step 1:** include `amountCents` in reference or sign metadata to detect tampering (Paystack will echo).

---

## 3) Exact files to change — Step 1 only (no unrelated pages)

Only these files will be touched in Step 1. No pricing, subscription renewal, or access logic changed beyond tightening validation.

- `src/app/api/paystack/verify/route.ts` — add `amount`/`currency`/`reference` validation, pending-row ownership check.
- `src/app/api/paystack/webhook/route.ts` — add `amount`/`currency` gate on `charge.success`, handle `charge.failed`/`invoice.payment_failed` as `past_due` (no suspension yet), keep idempotency explicit.
- `src/lib/paystack.ts` — no change (helper already correct).
- `src/lib/billing.ts` — no change (authoritative source).
- New file: `tests/paystack-verify.test.ts` (or `src/app/api/paystack/__tests__/verify.test.ts`) — unit tests mocking `verifyTransaction` + Drizzle.
- New file: `tests/paystack-webhook.test.ts` — duplicate/idempotency tests.
- No deployment, no env change, no customer data migration.

---

## 4) Proposed patch — exact diff preview (NOT YET APPLIED)

### 4a) `src/app/api/paystack/verify/route.ts` — add after line 49
```diff
     const tx = await verifyTransaction(reference);
     if (tx.data.status !== "success") {
       await db.update(payments).set({ status: "failed" }).where(eq(payments.paystackReference, reference));
       return NextResponse.json({ ok: false, error: "Payment was not successful — try again." }, { status: 402 });
     }
+    // ── Payment integrity checks — authoritative from src/lib/billing.ts ──
+    // Paystack returns amount in kobo/cents. Must equal expected plan amount.
+    if (tx.data.amount !== PLAN.amountCents) {
+      await db.update(payments).set({ status: "failed" }).where(eq(payments.paystackReference, reference));
+      return NextResponse.json({ ok: false, error: `Amount mismatch — expected ${formatRand(PLAN.amountCents)} but got ${formatRand(tx.data.amount)}.` }, { status: 402 });
+    }
+    if (tx.data.currency !== PLAN.currency) {
+      await db.update(payments).set({ status: "failed" }).where(eq(payments.paystackReference, reference));
+      return NextResponse.json({ ok: false, error: `Currency mismatch — expected ${PLAN.currency} but got ${tx.data.currency}.` }, { status: 402 });
+    }
+    // Paystack must echo the reference we sent; prevents truncated/altered reference attacks.
+    if (tx.data.reference !== reference) {
+      return NextResponse.json({ ok: false, error: "Payment reference mismatch — please retry." }, { status: 402 });
+    }
 
     // Resolve the site from payment metadata — and confirm it belongs to the caller
```

Then, before “Claim the payment record” (line ~68), insert pending-row check:
```diff
+    // Ensure this reference was pre-created for this site via /initialize and is still pending
+    const [pending] = await db.select().from(payments).where(eq(payments.paystackReference, reference)).limit(1);
+    if (pending && pending.siteId !== null && pending.siteId !== siteId) {
+      return NextResponse.json({ ok: false, error: "Payment reference does not match this site." }, { status: 403 });
+    }
+    // Optional stricter: if no pending row exists at all, require metadata siteId to have been set by our initialize
+    // (allows webhook-first flows where pending may not exist, but still blocks random references)
+
     // Claim the payment record
     await db.update(payments).set({ siteId, status: "success", paidAt: new Date(tx.data.paid_at ?? Date.now()) }).where(eq(payments.paystackReference, reference));
```

No change to subscription idempotency block — already correct. Will add explicit comment and test.

### 4b) `src/app/api/paystack/webhook/route.ts` — add at top of `charge.success` handler after `const metaSiteId`:
```diff
       case "charge.success": {
         const paidAt = event.data.paid_at ? new Date(event.data.paid_at) : new Date();
         const meta = (event.data.metadata ?? {}) as Record<string, unknown>;
         const metaSiteId = typeof meta.siteId === "number" ? meta.siteId : null;
+        // ── Amount / currency gate — authoritative from billing config ──
+        if (event.data.amount !== PLAN.amountCents || event.data.currency !== "ZAR") {
+          console.warn("Webhook charge.success rejected: amount/currency mismatch", { ref: event.data.reference, amount: event.data.amount, currency: event.data.currency });
+          // Still ack 200 to prevent Paystack retries, but do not activate site
+          break;
+        }
 
         // Record the payment. …
```

Add new case for failed payment (no suspension, just mark):
```diff
+      case "charge.failed":
+      case "invoice.payment_failed": {
+        // Mark the pending payment as failed if we have it; do not suspend yet — suspension handled by subscription.not_renew after grace
+        if (event.data.reference) {
+          await db.update(payments).set({ status: "failed" }).where(eq(payments.paystackReference, event.data.reference));
+        }
+        break;
+      }
       /* ——— Subscription disabled … ——— */
```

Idempotency is already handled by `payments_reference_idx` uniqueIndex + `onConflictDoNothing` and subscription-code SELECT-then-UPDATE. Add comment: “Duplicate webhook deliveries are idempotent: second `charge.success` with same reference updates same row to success with same paidAt; no new site created.” No DB change.

### 4c) No price change — `PLAN.amountCents` remains 14999, `PAYSTACK_PLAN_CODE` env unchanged.

---

## 5) Tests — what will be added, what was run so far

**Current test coverage:** `npm test` finds no `tests/` directory, `package.json` has no `vitest`/`jest`. `npm run typecheck` and `npm run lint` are the only CI checks. Manual grep confirms no Paystack tests exist — this is the gap Step 1 closes.

**Tests to be added (not yet committed) — under `tests/` using `vitest` + `drizzle-orm` mocks:**
- `verify — underpayment (14998) → 402, not active`
- `verify — wrong currency (USD) → 402`
- `verify — failed status → 402`
- `verify — reference mismatch (Paystack returns different ref) → 402`
- `verify — invalid reference (no body ref) → 400`
- `verify — pending row belongs to other site → 403`
- `webhook — charge.success with correct amount → active`
- `webhook — charge.success underpayment → not active, warn`
- `webhook — duplicate delivery same ref twice → single payment row, single active update (idempotent)`
- `webhook — invalid signature → 401`
- `webhook — charge.failed → payment marked failed, site stays active`

**Test execution plan:** `npm i -D vitest` (dev only) + `npm run test` in CI. No production behavior change. Tests will mock `verifyTransaction` return shapes matching `PaystackWebhookEvent` and use in-memory Postgres or mocked Drizzle.

**Results so far (pre-change):** Ran `ls tests` → no tests found; `npm run lint` not yet run on new files (they don’t exist). After you approve, I will run `npx vitest run` and paste results before any deploy.

---

## 6) Unresolved legal questions — require South African attorney / privacy professional before publishing

These are **not** decided by code; code must be worded as “requires attorney sign-off”:

1. **ECTA s43 disclosures** — footer/checkout/email must include legal entity name, registration no., directors, physical address, phone, email. **Unknown:** actual company details (Pty Ltd name, CIPC no., address). Drafts will use `[COMPANY LEGAL NAME — TO BE PROVIDED]` placeholders — never invented.
2. **ECTA s44 7-day cooling-off waiver** for instant digital publishing — SA law allows waiver if consumer expressly consents to immediate performance and acknowledges loss of cooling-off. Must add checkout checkbox: “I consent to immediate publication and waive 7-day cooling-off per ECTA s44(4)(a).” Attorney must confirm wording and whether monthly subscription qualifies as ongoing service (exception may not apply to recurring).
3. **CPA s14 fixed-term vs month-to-month** — current month-to-month auto-renew with “Cancel anytime, stays live till period end” appears compliant, but if you offer annual discount later, s14 40–80 day renewal notice applies. Attorney to confirm email notice timing and cancellation fee (0 for month-to-month).
4. **Paystack as operator under POPIA s20/s21** — Paystack processes card data; you are responsible party, Paystack is operator for card data and processor for contact details. Need Paystack DPA reference in privacy notice. Attorney to confirm cross-border adequacy (Paystack NG/ZA, Firebase US, Cloudinary US, Supabase US/EU) and s72 basis (1)(b) contract.
5. **Refund / chargeback SLA** — Terms must state: refund within 14 days if not yet published? No refund after publication but before renewal? Must align with CPA s54 and Paystack dispute rules.
6. **Religious policy note** — `acceptable-use` already states “not halal-certified” — keep that separation; do not present religious filter as legal compliance.

---

## 7) Step 2 & 3 preview — not implemented yet

**Step 2 — Legal-document drafts (next, after you approve Step 1):**
- Create `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/paia/page.tsx` as **DRAFT — NOT FOR RELIANCE** with `[PLACEHOLDERS]` for: company legal name, Reg No., address, directors, phone, email, Information Officer name/email/phone, PAIA request fee, retention periods (leads 24m, deleted sites 90d anonymise, payments 5y), processors list (Firebase/Google US, Paystack NG, Cloudinary US, Supabase EU, Vercel US). Separate “Confirmed legal requirement” vs “Requires attorney review” banners. No publish as final.

**Step 3 — Data lifecycle plan (after Step 2):**
- Map: `users` (Firebase UID + email + displayName), `sites` (all PII above), `leads` (businessName/trade/location/whatsapp), `payments`/`subscriptions` (Paystack codes/tokens), Cloudinary images, Vercel logs.
- Propose `DELETE /api/account` (soft-delete sites → delete `users` row → call Firebase Admin `deleteUser(uid)` → audit log), `GET /api/account/export` (JSON), cron `DELETE_FROM leads/purge_deleted_sites` with `deletedAt` column to add, backup retention in Supabase PITR. Show implementation + tests + backfill plan. **No deletion/export/migration until separate approval.**

---

## 8) Approval gate

Do you approve **Step 1 patch as proposed** (amount/currency/reference checks + failed-payment handling + idempotent tests, no price change, no deploy)?

- If **yes**, I will apply the two diffs, add the `tests/` suite, run `tsc --noEmit`, `eslint`, `vitest`, and report results before any production push.
- If **amend**, tell me what to change (e.g., different amount tolerance, different failed-payment grace).

No customer billing, subscription access, or production config will be changed until you approve, and no data will be deleted/exported before Step 3 approval.

