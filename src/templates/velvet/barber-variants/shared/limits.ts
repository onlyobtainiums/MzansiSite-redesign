/**
 * Platform limits for the barber template pack.
 *
 * The FREE PREVIEW limit (6 photos, 1 logo) is a product decision enforced
 * in the site-creation wizard and by the uploaders below. It lives here as
 * a constant so templates and uploaders agree.
 *
 * The PAID editor limit is intentionally NOT hard-coded: MzansiSite's
 * billing/subscription flow tells the editor what the subscribed plan
 * allows. This prototype returns null = "no editor limit configured yet".
 * The platform must inject the real limit post-verification.
 */

export const PREVIEW_PHOTO_LIMIT = 6;
export const PREVIEW_LOGO_LIMIT = 1;

/** Upload validation */
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // 4 MB per file

export type PlanSlug = string;

/**
 * Integration point for the paid editor. The host platform (MzansiSite
 * billing) should call the editor with its own limit, e.g.
 *   resolvePaidPhotoLimit(planFromBilling) // -> number
 * This prototype never decides plan limits itself.
 */
export function resolvePaidPhotoLimit(_plan: PlanSlug | null): number | null {
  return null; // injected by MzansiSite's subscription flow, post-verification
}
