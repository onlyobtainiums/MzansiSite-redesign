# P0 Non-Branded GA4 Measurement — Reuses Existing Analytics

**Date:** 2026-10-22
**Principle:** Reuse `src/lib/analytics.ts` `trackEvent` (already scrubs PII, 100-char limit, blocks email/phone/whatsapp/paystackReference). No duplicate `page_view` — `@next/third-parties/google` handles auto page_view. Never send personal data.

## Existing (preserved, not duplicated)

- `analyticsEvents.builderStarted({ templateId, industry })` — demo opened
- `analyticsEvents.siteCreated({ templateId })` — draft saved
- `analyticsEvents.beginCheckout({ planCode })` — Paystack initialize
- `analyticsEvents.purchaseCompleted({ planCode })` — verify success
- `analyticsEvents.viewBilling()` — billing page
- `GA4` single install `G-W3123L8FLP` via `NEXT_PUBLIC_GA_MEASUREMENT_ID`, consent `analytics_storage: granted`, `ad_storage: denied`

## New non-branded definitions (added to `src/lib/analytics.ts` as `nonBrandedEvents`, not auto-fired)

- `view_seo_guide` → `trackEvent("view_seo_guide", { content_group, guide })` — fires on guide page view (client `useEffect` once, after mount, no PII). content_group = slug e.g., `website-for-braiders`. How measured: GA4 Explore → Filter Event `view_seo_guide` → Count per guide; GSC complements with impressions/clicks per page (non-branded query filter `salon|barber|braid|nail|whatsapp|builder` excluding `mzansi`).
- `select_industry` → `trackEvent("select_industry", { from_guide, to_guide })` — click between guides (e.g., builder-SA → braiders). Params are guide slugs, max 30 chars, no user data.
- `cta_demo_click` → `trackEvent("cta_demo_click", { guide })` — CTA to `/#demo`
- `cta_pricing_click` → `trackEvent("cta_pricing_click", { guide })`
- `whatsapp_booking_click` → `trackEvent("whatsapp_booking_click", { guide, link_type: "per_service"|"main_cta" })` — wa.me link clicks (never phone/email)

**How not to duplicate:** Do not call `gtag("config", ...)` or manual `page_view` on guides. Call above events only on explicit user action (click) or once per view (useEffect with empty deps + sessionStorage guard).

**GSC (separate, non-GA4):** After `sitemap.xml` submitted, check `Performance → Search Results → + Query containing salon|barber|braid|nail|whatsapp|builder excluding mzansi` → Impressions/Clicks per page. This is the true non-branded acquisition KPI; GA4 events are secondary.

**POPIA:** All params are guide slugs/link types — no personal data. Blocked set in `trackEvent` drops `email/phone/whatsapp/card` etc. if accidentally passed.

## Implementation status
- Definitions added, **no auto-firing deployed** (requires product decision on where to bind `onClick` on guides). Next step after approval: add `onClick={() => nonBrandedEvents.ctaDemoClick(canonicalPath)}` to guide CTAs and `useEffect` for `viewSeoGuide`.

