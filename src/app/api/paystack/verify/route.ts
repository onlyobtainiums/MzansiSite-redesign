import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { payments, sites, subscriptions, users } from "@/db/schema";
import { verifyTransaction } from "@/lib/paystack";
import { formatRand, PLAN } from "@/lib/billing";
import { AuthError } from "@/lib/firebase/server";
import { getAuthedUser } from "@/server/auth";
import { validateForPublish } from "@/lib/content-policy";

interface VerifyBody {
  reference?: string;
  siteId?: number;
}

/**
 * After Paystack redirects back to our callback page we verify the payment
 * server-side, persist it, activate the subscription and publish the site.
 */
export async function POST(request: Request) {
  try {
    /*
     * Verify the Firebase ID token properly — not merely that a Bearer-shaped
     * header was sent. The previous check only tested `startsWith("Bearer ")`,
     * so any made-up string passed and could activate someone else's site.
     */
    const user = await getAuthedUser(request);

    const body = (await request.json().catch(() => null)) as VerifyBody | null;
    const reference = body?.reference?.trim();
    if (!reference) {
      return NextResponse.json({ ok: false, error: "Payment reference is required." }, { status: 400 });
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { ok: false, error: "Payments are not configured yet — add PAYSTACK_SECRET_KEY.", configured: false },
        { status: 503 },
      );
    }

    const tx = await verifyTransaction(reference);
    if (tx.data.status !== "success") {
      await db
        .update(payments)
        .set({ status: "failed" })
        .where(eq(payments.paystackReference, reference));
      return NextResponse.json({ ok: false, error: "Payment was not successful — try again." }, { status: 402 });
    }

    // ── Payment integrity checks — authoritative from src/lib/billing.ts ──
    // Paystack returns amount in kobo/cents. Must equal expected plan amount.
    if (tx.data.amount !== PLAN.amountCents) {
      await db
        .update(payments)
        .set({ status: "failed" })
        .where(eq(payments.paystackReference, reference));
      return NextResponse.json(
        {
          ok: false,
          error: `Amount mismatch — expected ${formatRand(PLAN.amountCents)} but got ${formatRand(tx.data.amount)}.`,
        },
        { status: 402 },
      );
    }
    if (tx.data.currency !== PLAN.currency) {
      await db
        .update(payments)
        .set({ status: "failed" })
        .where(eq(payments.paystackReference, reference));
      return NextResponse.json(
        {
          ok: false,
          error: `Currency mismatch — expected ${PLAN.currency} but got ${tx.data.currency}.`,
        },
        { status: 402 },
      );
    }
    // Paystack must echo the reference we sent; prevents truncated/altered reference attacks.
    if (tx.data.reference !== reference) {
      return NextResponse.json(
        { ok: false, error: "Payment reference mismatch — please retry." },
        { status: 402 },
      );
    }

    // Resolve the site from payment metadata — and confirm it belongs to the
    // caller, so a valid token cannot be used to activate another user's site.
    const siteId =
      body?.siteId ??
      (tx.data.metadata && typeof tx.data.metadata.siteId === "number" ? tx.data.metadata.siteId : null);
    if (!siteId) {
      return NextResponse.json({ ok: false, error: "Could not match the payment to a site." }, { status: 400 });
    }

    const [site] = await db
      .select()
      .from(sites)
      .where(and(eq(sites.id, siteId), eq(sites.userId, user.id)))
      .limit(1);
    if (!site) return NextResponse.json({ ok: false, error: "Site not found." }, { status: 404 });

    // Final publishing safeguard — re-validate policy before going live
    const policy = validateForPublish({
      businessName: site.businessName,
      tagline: site.tagline ?? "",
      industry: site.industry,
      area: site.area ?? "",
      hours: site.hours ?? "",
      whatsapp: site.whatsapp ?? undefined,
      phone: site.phone ?? undefined,
      email: site.email ?? undefined,
      services: site.services,
      socials: site.socials as Record<string, string | undefined>,
    });
    if (!policy.allowed) {
      return NextResponse.json({ ok: false, error: `Cannot publish: ${policy.errors.join(" ")}`, blocked: policy.blocked, reasons: policy.errors }, { status: 400 });
    }

    // Ensure this reference was pre-created for this site via /initialize and is still pending,
    // where possible. Prevents using another site's successful reference to publish this one.
    const [pending] = await db
      .select()
      .from(payments)
      .where(eq(payments.paystackReference, reference))
      .limit(1);
    if (pending && pending.siteId !== null && pending.siteId !== siteId) {
      return NextResponse.json(
        { ok: false, error: "Payment reference does not match this site." },
        { status: 403 },
      );
    }
    // If Paystack metadata includes siteId, it must agree with the requested site.
    // Allows legitimate webhook-first flows where no pending row exists yet.
    if (
      tx.data.metadata &&
      typeof (tx.data.metadata as Record<string, unknown>).siteId === "number" &&
      (tx.data.metadata as Record<string, unknown>).siteId !== siteId
    ) {
      return NextResponse.json(
        { ok: false, error: "Payment metadata does not match this site." },
        { status: 403 },
      );
    }

    // Claim the payment record
    await db
      .update(payments)
      .set({ siteId, status: "success", paidAt: new Date(tx.data.paid_at ?? Date.now()) })
      .where(eq(payments.paystackReference, reference));

    // Persist the Paystack customer + activate the monthly subscription
    const customerCode = tx.data.customer.customer_code;
    let subscriptionCode: string | undefined;
    let nextPayment: Date | undefined;

    if (tx.data.subscription) {
      subscriptionCode = tx.data.subscription.subscription_code;
      if (tx.data.subscription.next_payment_date) {
        nextPayment = new Date(tx.data.subscription.next_payment_date);
      }
    }

    if (subscriptionCode) {
      const emailToken = tx.data.subscription!.email_token;

      /*
       * Idempotent on purpose. The Paystack webhook can arrive before this
       * callback completes and create the same subscription row, so check for
       * an existing one instead of inserting blindly — the previous
       * onConflictDoNothing({ target: subscriptions.id }) could never fire,
       * because `id` is a serial that never collides.
       */
      const [already] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.paystackSubscriptionCode, subscriptionCode))
        .limit(1);

      if (already) {
        await db
          .update(subscriptions)
          .set({
            status: "active",
            paystackCustomerCode: customerCode,
            paystackEmailToken: emailToken,
            nextPaymentDate: nextPayment,
            updatedAt: new Date(),
          })
          .where(eq(subscriptions.id, already.id));
      } else {
        await db.insert(subscriptions).values({
          siteId,
          planCode: PLAN.code,
          status: "active",
          paystackCustomerCode: customerCode,
          paystackSubscriptionCode: subscriptionCode,
          paystackEmailToken: emailToken,
          nextPaymentDate: nextPayment,
          createdAt: new Date(),
        });
      }
    }

    // Go live
    await db
      .update(sites)
      .set({ status: "active", publishedAt: new Date(), updatedAt: new Date() })
      .where(eq(sites.id, siteId));

    const [updatedSite] = await db.select().from(sites).where(eq(sites.id, siteId)).limit(1);
    return NextResponse.json({ ok: true, site: updatedSite });
  } catch (error) {
    console.error("Paystack verify failed", error);
    const msg = error instanceof Error ? error.message : "Payment verification failed.";
    const code = error instanceof AuthError ? 401 : 500;
    return NextResponse.json({ ok: false, error: msg }, { status: code });
  }
}
