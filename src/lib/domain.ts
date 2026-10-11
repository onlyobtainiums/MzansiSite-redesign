/**
 * Shared hostname helpers.
 *
 * Customers' published sites are served from a subdomain of the root domain,
 * e.g. naledi-braids.mzansisite.co.za. Both the middleware (which routes those
 * requests) and the UI (which displays the address) need to agree on that
 * shape, so it lives here.
 *
 * `NEXT_PUBLIC_` so the same value is available in client components — it is
 * not a secret. Set it in Vercel if the domain ever changes; the fallback keeps
 * existing deployments working.
 */
export const ROOT_DOMAIN = (process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "mzansisite.co.za")
  .trim()
  .toLowerCase()
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");

/** The public host for a customer's site: `naledi-braids.mzansisite.co.za`. */
export function siteHost(slug: string): string {
  return `${slug}.${ROOT_DOMAIN}`;
}

/** Full public URL for a customer's site. */
export function siteUrl(slug: string): string {
  return `https://${siteHost(slug)}`;
}

/**
 * Subdomains we reserve for ourselves. A customer whose slug collides with one
 * of these must keep using the path-based preview instead of hijacking the
 * hostname.
 */
export const RESERVED_SUBDOMAINS = new Set([
  "www",
  "app",
  "api",
  "admin",
  "dashboard",
  "mail",
  "smtp",
  "imap",
  "pop",
  "webmail",
  "ftp",
  "cdn",
  "static",
  "assets",
  "img",
  "media",
  "docs",
  "help",
  "support",
  "status",
  "blog",
  "ns",
  "ns1",
  "ns2",
  "dev",
  "staging",
  "test",
  "preview",
]);
