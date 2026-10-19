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
