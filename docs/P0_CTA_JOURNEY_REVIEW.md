# P0 CTA Journey Review — No Checkout Logic Changed

**Date:** 2026-10-22
**Scope:** Existing 7 SEO guides → homepage `#demo` / `#pricing` anchors. No pricing/auth/Paystack/dashboard change.

## Current journey (audited 2026-10-22)

1. SEO guide CTA: `Build my site — free` → `/#demo` (homepage demo carousel) + `See pricing — R149.99/m` → `/#pricing`
2. User lands on homepage top, must scroll/find demo, enter business name/WhatsApp, preview, then publish → Paystack.
3. Leaks: 2-step redirect, no in-page demo, no “not ready” capture, no UTM.

## Risks if changed now
- Changing Paystack amount (14999 c) or reference logic breaks payment integrity (see `06e3dba`).
- Changing auth gate (Firebase) breaks customer subdomain preview (`x-mzansi-live`).

## Recommendations (product decision needed, do not implement without approval)

1. **Reduce one step:** Add `CTA Demo →` as anchor `href="/#demo?utm_source=seo_guide&guide=website-for-braiders"` — passes guide name via UTM, no logic change, measurable in GA4 `select_industry` / `cta_demo_click` (already defined in `analytics.ts`).
2. **In-page demo:** Embed a minimal “Enter WhatsApp to preview” form directly on guide (reuses existing `Builder` component) — requires product decision on form validation + POPIA consent text. **Blocked until approved.**
3. **Exit capture:** “Not ready? Get the 60-sec checklist via WhatsApp” — email/WhatsApp opt-in, needs POPIA consent handling. Not added.
4. **Reduce friction copy:** Change `Build my site — free` to `See my prices on a page in 60s — free` (problem-focused) — low risk, A/B test after promotion. Can be done next as copy-only.

**No code changed in this P0 for CTA** except preserving existing `/#demo` / `/#pricing` links. Recommendations logged for approval.

## Measurement (reuse existing)
- Existing `analyticsEvents.builderStarted({ templateId, industry })` already tracks demo entry — add param `guide`.
- New `nonBrandedEvents.ctaDemoClick(guide)` / `ctaPricingClick(guide)` defined in `src/lib/analytics.ts` — no PII, avoid duplicate `page_view` (auto via `@next/third-parties`). Fire manually only on click.

