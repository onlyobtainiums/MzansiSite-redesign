import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/SEOJsonLd";

export interface SeoLink { href: string; label: string; desc: string }

const RELATED: SeoLink[] = [
  { href: "/website-builder-south-africa", label: "Website builder South Africa", desc: "R149.99/m, WhatsApp-first" },
  { href: "/website-for-small-businesses", label: "Trades & home services", desc: "Plumbers, electricians, cleaners, garden" },
  { href: "/whatsapp-booking-website", label: "WhatsApp booking website", desc: "Tap-to-chat, pre-filled messages" },
  { href: "/website-for-salons", label: "For salons", desc: "Braids, washes, treatments" },
  { href: "/website-for-barbers", label: "For barbers", desc: "Fades, shaves, beard sculpt" },
  { href: "/website-for-braiders", label: "For braiders", desc: "Knotless, cornrows, installs" },
  { href: "/website-for-nail-technicians", label: "For nail technicians", desc: "Manicures, acrylics, art" },
];

export function SeoPageShell({
  title,
  description,
  h1,
  intro,
  canonicalPath,
  breadcrumb,
  children,
  relatedFilter,
}: {
  title: string;
  description: string;
  h1: string;
  intro: string;
  canonicalPath: string;
  breadcrumb: { name: string; item: string }[];
  children: ReactNode;
  relatedFilter?: string;
}) {
  // canonical path is used for json-ld; Next metadata sets <link rel=canonical> per page
  void description; void title;
  const filtered = RELATED.filter((r) => r.href !== canonicalPath);
  return (
    <div className="bg-bone text-ink">
      <BreadcrumbJsonLd items={breadcrumb} />
      {/* Breadcrumb nav — semantic */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1440px] px-5 pt-8 md:px-10">
        <ol className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink/50">
          {breadcrumb.map((b, i) => (
            <li key={b.item} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="text-ink/20">/</span>}
              {i === breadcrumb.length - 1 ? (
                <span aria-current="page" className="text-ink">{b.name}</span>
              ) : (
                <Link href={b.item.replace(SITE_URL, "") || "/"} className="hover:text-ink hover:underline">{b.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <header className="mx-auto max-w-[1440px] px-5 pb-8 pt-6 md:px-10 md:pb-10">
        <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-5xl">{h1}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/70 md:text-lg">{intro}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/#demo" className="rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-bone hover:bg-ink-soft">Build my site — free</Link>
          <Link href="/#pricing" className="rounded-full border-2 border-ink px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] hover:bg-ink hover:text-bone">See pricing — R149.99/m</Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 pb-16 md:px-10">{children}</main>

      <aside className="mx-auto max-w-[1440px] px-5 pb-16 md:px-10" aria-label="Related pages">
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-ink/50">Explore MzansiSite</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 6).map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="block rounded-2xl border-2 border-ink/10 bg-white p-4 hover:border-ink">
                <p className="text-sm font-bold">{r.label}</p>
                <p className="mt-1 text-xs text-ink/60">{r.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export function FeatureGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {items.map((it) => (
        <li key={it.title} className="rounded-2xl border-2 border-ink bg-white p-6">
          <h3 className="font-display text-lg font-bold uppercase tracking-tight">{it.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">{it.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  // FAQPage for AI understanding — Google FAQ rich results are currently limited to
  // authoritative sites (not guaranteed). We include valid FAQPage markup without promising rich results.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-display text-2xl font-extrabold uppercase tracking-tight">FAQ</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <dl className="mt-6 divide-y divide-ink/10 rounded-2xl border-2 border-ink/10 bg-white">
        {items.map((it) => (
          <div key={it.q} className="px-6 py-5">
            <dt className="text-sm font-bold">{it.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-ink/70">{it.a}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-xs text-ink/40">Structured FAQ markup is included for AI/search understanding; visible rich results are not guaranteed and depend on the search provider.</p>
    </section>
  );
}
