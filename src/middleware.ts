import { NextResponse, type NextRequest } from "next/server";
import { RESERVED_SUBDOMAINS, ROOT_DOMAIN } from "@/lib/domain";

/**
 * Routes customer subdomains to their published site.
 *
 *   naledi-braids.mzansisite.co.za  ->  /sites/naledi-braids
 *
 * The customer's page is rendered by src/app/sites/[slug]/page.tsx, which
 * checks the `x-mzansi-live` request header set below to decide between the
 * public view (live hostname) and the owner preview (someone signed in,
 * looking at /sites/<slug> on the main domain).
 *
 * Requests to the main domain, the vercel.app deployment, and any reserved
 * subdomain fall straight through untouched — so this change cannot break the
 * existing app.
 */
export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase().split(":")[0];

  // Only act on a direct child of the root domain.
  const suffix = `.${ROOT_DOMAIN}`;
  if (!host.endsWith(suffix)) return NextResponse.next();

  const sub = host.slice(0, -suffix.length);

  // Ignore the apex itself, reserved hosts, and deeper hosts such as
  // a.b.mzansisite.co.za (the wildcard certificate only covers one level).
  if (!sub || sub.includes(".") || RESERVED_SUBDOMAINS.has(sub)) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;

  // Let the framework and our own APIs through untouched, so client-side
  // fetches from a customer's site still reach the app.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.[a-z0-9]+$/i.test(pathname) // any request for an actual file
  ) {
    return NextResponse.next();
  }

  /*
   * Customer sites are single-page designs (the six templates render one page
   * with in-page anchors), so every path on the customer's subdomain renders
   * the site itself rather than a 404. The request is rewritten, not
   * redirected, so the visitor's address bar keeps showing the bare subdomain.
   */
  const url = request.nextUrl.clone();
  url.pathname = `/sites/${sub}`;
  // Use the public root path for the template's own assets/links.
  url.search = "";

  const headers = new Headers(request.headers);
  headers.set("x-mzansi-live", sub);

  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  /*
   * Run on page requests only — not on Next's own static files or the API.
   * (The middleware also re-checks these, because a hostname-based rewrite is
   * only ever valid for page loads.)
   */
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
