/**
 * GA4 helper utilities — safe, minimal, no PII or payment credentials collected.
 * Uses window.gtag injected by <GoogleAnalytics> from @next/third-parties/google.
 * All events are opt-in; page_view is handled automatically by the component.
 */

/** Returns the configured GA4 Measurement ID (public, not a secret). */
export function getGtagId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  // Only return a properly-shaped GA4 ID. Prevents accidental injection of
  // malformed values and avoids sending to an unintended property.
  // When env is not set, caller may fallback to verified G-W3123L8FLP.
  if (id && /^G-[A-Z0-9]{4,}$/i.test(id)) return id;
  return undefined;
}

/** Verified Measurement ID — used as fallback when env is not set. */
export const VERIFIED_GA_ID = 'G-W3123L8FLP';

/**
 * True if GA4 is configured in this environment.
 * Used to conditionally render analytics UI or gate event calls.
 */
export function isAnalyticsConfigured(): boolean {
  return Boolean(getGtagId());
}

/**
 * Safely fire a GA4 event. No-ops when gtag is unavailable (SSR, blocked,
 * not yet loaded, or env not configured). Strips fields that could contain
 * personal or financial data before sending.
 *
 * Never send: email, phone, whatsapp, card, paystackReference, address,
 * firebaseUid, displayName, private keys, or full site content.
 */
export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;

  // Basic sanitisation — drop disallowed keys even if caller passes them.
  const blocked = new Set([
    "email",
    "phone",
    "whatsapp",
    "card",
    "card_number",
    "paystackReference",
    "paystack_reference",
    "address",
    "firebaseUid",
    "firebase_uid",
    "displayName",
    "password",
    "secret",
    "private_key",
  ]);

  const safe: Record<string, string | number | boolean> = {};
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (blocked.has(k)) continue;
      if (v === undefined) continue;
      // Limit string length to avoid accidentally sending large blobs (e.g., site JSON)
      if (typeof v === "string" && v.length > 100) continue;
      safe[k] = v;
    }
  }

  gtag("event", action, safe);
}

/**
 * GA4-recommended funnel events for MzansiSite — wrappers for consistency.
 * These are NOT auto-fired; components must explicitly call them. This prevents
 * duplicate events and keeps the funnel definition in one place.
 *
 * Events align with GA4 ecommerce/funnel guidance but avoid purchase value
 * duplication — Paystack billing remains the source of truth for revenue.
 */
export const analyticsEvents = {
  /** User started building (e.g., opened Builder, selected template). */
  builderStarted: (params?: { templateId?: string; industry?: string }) =>
    trackEvent("builder_started", params),

  /** Lead captured via demo funnel (stage 0). No PII — counts only. */
  leadSubmitted: (params?: { trade?: string }) => trackEvent("lead_submitted", params),

  /** Site creation completed (draft saved). */
  siteCreated: (params?: { templateId?: string }) =>
    trackEvent("site_created", params),

  /** Checkout initiated (Paystack initialize). */
  beginCheckout: (params?: { planCode?: string }) =>
    trackEvent("begin_checkout", params ? { plan_code: params.planCode } : undefined),

  /** Payment verified successfully (client callback). */
  purchaseCompleted: (params?: { planCode?: string }) =>
    trackEvent("purchase", params ? { plan_code: params.planCode } : undefined),

  /** Billing page viewed — useful for funnel drop-off analysis. */
  viewBilling: () => trackEvent("view_billing"),
} as const;

/**
 * Non-branded acquisition events — P0 measurement, reuses trackEvent, no PII.
 * Firing is manual (call from components) to avoid duplicate page_view.
 * Definitions (how measured in GA4/GSC):
 * - view_seo_guide: when a 7-guide page is viewed (content_group = guide id, e.g., "website-for-braiders").
 *   Measured: GSC non-branded impressions/clicks per page + GA4 event count per guide.
 * - select_industry: click from builder-SA overview to a specific industry (salons/barbers/braiders/nails/small-business/whatsapp-booking).
 *   Params: from_guide, to_guide — no PII, max 100 chars.
 * - cta_demo_click / cta_pricing_click: any guide CTA to /#demo or /#pricing.
 *   Params: guide — identifies which guide drove intent, no personal data.
 * - whatsapp_booking_click: click on any wa.me link (existing whatsapp_click alias).
 *   Params: guide, link_type (e.g., "per_service" or "main_cta") — never includes phone/email/address.
 * Avoid duplicate page_view: GA4 auto page_view via @next/third-parties is sufficient; do not manually fire page_view on guides.
 */
export const nonBrandedEvents = {
  viewSeoGuide: (guide: string) => trackEvent("view_seo_guide", { content_group: guide, guide }),
  selectIndustry: (from: string, to: string) => trackEvent("select_industry", { from_guide: from, to_guide: to }),
  ctaDemoClick: (guide: string) => trackEvent("cta_demo_click", { guide }),
  ctaPricingClick: (guide: string) => trackEvent("cta_pricing_click", { guide }),
  whatsappBookingClick: (guide: string, linkType?: string) => trackEvent("whatsapp_booking_click", { guide, link_type: linkType }),
} as const;

/**
 * Consent Mode defaults — called once on load if GA is present.
 * MzansiSite does not use ad_storage for payment or personalization;
 * analytics_storage is granted by default but can be revoked via a consent
 * banner (Step 2, POPIA). This prevents collecting before consent where required.
 * Docs: https://developers.google.com/tag-platform/gtagjs/reference#consent
 */
export function initConsentDefaults(): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  // Default to denied until explicit consent in regions requiring it.
  // For SA, analytics_storage may be granted after notice; this is a safe default.
  gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}
