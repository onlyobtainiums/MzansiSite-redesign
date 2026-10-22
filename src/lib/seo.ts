/**
 * Canonical URL helpers for SEO.
 * Main domain is www.mzansisite.co.za (as deployed live); customer subdomains are <slug>.mzansisite.co.za.
 * Use SITE_URL for all public page canonicals. ROOT_DOMAIN remains for customer siteHost/siteUrl helpers.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.NEXT_PUBLIC_ROOT_DOMAIN
    ? `https://www.${process.env.NEXT_PUBLIC_ROOT_DOMAIN.trim().replace(/^https?:\/\//, "").replace(/\/$/, "")}`
    : "https://www.mzansisite.co.za")
).replace(/\/$/, "");

export const SITE_NAME = "MzansiSite";
export const SITE_LOCALE = "en_ZA";

export function canonical(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${clean}`;
}

export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;
export const LOGO_URL = `${SITE_URL}/mzansi-logo.svg`;
