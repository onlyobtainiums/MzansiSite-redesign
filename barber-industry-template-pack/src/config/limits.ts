/**
 * Platform limits.
 *
 * The FREE PREVIEW limit (6 photos, 1 logo) is a product decision of this
 * prototype and is hard-referenced in copy, so it lives here as a constant.
 *
 * The PAID editor limit is intentionally NOT hard-coded: the host platform
 * (MzansiSite billing) tells the editor what the subscribed plan allows via
 * `resolvePaidPhotoLimit`. Until then this returns null = "no editor limit
 * has been configured yet".
 */

export const PREVIEW_PHOTO_LIMIT = 6;
export const PREVIEW_LOGO_LIMIT = 1;

/** Upload validation */
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // 4 MB per file

/**
 * Integration point for the paid editor.
 *
 * The host platform should call the editor with its own limit, e.g.
 *   resolvePaidPhotoLimit(planFromBilling) // -> number
 * This prototype never decides plan limits itself.
 */
export type PlanSlug = string;
export function resolvePaidPhotoLimit(_plan: PlanSlug | null): number | null {
  return null; // injected by MzansiSite's subscription flow, post-verification
}
