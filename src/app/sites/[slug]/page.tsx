import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { eq, ne, and } from "drizzle-orm";
import { ArrowLeft, CircleDot, PauseCircle } from "lucide-react";
import { db } from "@/db";
import { sites } from "@/db/schema";
import { getDemoSiteData } from "@/templates/demo-data";
import { TemplateRenderer } from "@/templates";
import { getTemplate } from "@/templates/registry";
import { siteHost } from "@/lib/domain";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Renders a customer's site in one of two modes:
 *
 *   LIVE     — reached through <slug>.mzansisite.co.za. The middleware sets the
 *              `x-mzansi-live` header. This is the public view: no owner chrome,
 *              and it only serves a site that has actually been published.
 *
 *   PREVIEW  — reached at /sites/<slug> on the main domain, which is what the
 *              dashboard links to. Shows the status bar and a draft/web address
 *              so the owner can review work in progress.
 */
export default async function SitePreviewPage({ params }: PageProps) {
  const { slug } = await params;

  const headerList = await headers();
  const isLive = headerList.get("x-mzansi-live") === slug;

  const [site] = await db
    .select()
    .from(sites)
    .where(and(eq(sites.slug, slug), ne(sites.status, "deleted")))
    .limit(1);

  if (!site) notFound();

  /* ——— Publish gating ——— */
  if (site.status === "suspended") {
    return (
      <div className="relative grid min-h-screen place-items-center bg-ink px-8 text-bone">
        <div className="max-w-md text-center">
          <PauseCircle className="mx-auto h-16 w-16 text-gold" />
          <h1 className="mt-6 font-display text-4xl font-extrabold uppercase tracking-tight">Temporarily offline</h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-bone/60">
            {site.businessName} is taking a short break. If this is your business, update your subscription from the
            dashboard to bring it back instantly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="rounded-full border border-bone/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-bone/70 transition-colors hover:border-bone hover:text-bone"
            >
              MzansiSite home
            </Link>
            <Link
              href="/auth"
              className="rounded-full bg-flame px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-bone transition-all duration-300 hover:-translate-y-0.5"
            >
              Owner sign in
            </Link>
          </div>
          <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-bone/25">
            Powered by MzansiSite · R149.99/month per site
          </p>
        </div>
      </div>
    );
  }

  /*
   * A visitor on the customer's subdomain must never see an unfinished site.
   * Drafts are only visible through the owner's preview route.
   */
  if (isLive && site.status !== "active") {
    return (
      <div className="relative grid min-h-screen place-items-center bg-bone px-8 text-ink">
        <div className="max-w-md text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-flame/10">
            <CircleDot className="h-7 w-7 text-flame" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-extrabold uppercase tracking-tight">Not live yet</h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink/60">
            This website hasn&apos;t been published yet. Once its owner activates it, it will appear here.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-bone transition-all duration-300 hover:-translate-y-0.5"
          >
            Build your own free
          </Link>
          <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/30">
            Powered by MzansiSite
          </p>
        </div>
      </div>
    );
  }

  const meta = getTemplate(site.templateId);
  const data = getDemoSiteData({
    industry: site.industry,
    businessName: site.businessName,
    tagline: site.tagline ?? undefined,
    area: site.area ?? undefined,
    hours: site.hours ?? undefined,
    whatsapp: site.whatsapp ?? undefined,
    phone: site.phone ?? undefined,
    email: site.email ?? undefined,
    logoUrl: site.logoUrl ?? undefined,
    heroImageUrl: site.heroImageUrl ?? undefined,
    galleryUrls: site.galleryUrls.length ? site.galleryUrls : undefined,
    services: site.services.length ? site.services : undefined,
    socials: site.socials,
  });

  /* ——— Live subdomain: the real, public website ——— */
  if (isLive) {
    return <TemplateRenderer templateId={site.templateId} site={data} />;
  }

  /* ——— Owner preview (main domain) ——— */
  return (
    <div className="relative">
      {/* Preview bar */}
      <div className="sticky top-0 z-[60] border-b-2 border-ink bg-ink/95 px-4 py-2.5 text-bone backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/dashboard"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-bone/20 transition-colors hover:border-bone"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-extrabold uppercase tracking-tight">
                {site.businessName}
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-bone/45">
                {meta?.name ?? site.templateId} · live preview
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
                site.status === "active" ? "bg-wa/20 text-wa" : "bg-gold/20 text-gold"
              }`}
            >
              <CircleDot className="h-3 w-3" />
              {site.status === "active" ? "Published" : "Draft"}
            </span>
            <span className="hidden font-mono text-xs text-bone/40 md:block">{siteHost(site.slug)}</span>
          </div>
        </div>
      </div>

      <TemplateRenderer templateId={site.templateId} site={data} />
    </div>
  );
}
