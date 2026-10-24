"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Clock3, Leaf, Mail, MapPin, Phone } from "lucide-react";
import type { SiteData } from "@/templates/types";
import { waLink, telLink, mailLink } from "@/templates/types";
import { cn } from "../barber-variants/shared/cn";
import { SmartImage } from "../barber-variants/shared/SmartImage";
import { BrandMark, SamplePill, WhatsAppActionForSite } from "../barber-variants/shared/kit";

const LIME = "#d9f73a";
const INK = "#11151a";

const SAMPLE_PHOTOS = [
  { id: "s1", src: "/images/barber-pack/hero-chair.jpg", alt: "Styling chairs and brass-framed mirrors in a sunlit salon interior", sample: true },
  { id: "s2", src: "/images/barber-pack/tools-flatlay.jpg", alt: "Salon scissors, brushes and colour tools arranged on sage linen", sample: true },
  { id: "s3", src: "/images/barber-pack/interior-warm.jpg", alt: "Elegant salon interior with round mirrors and soft lighting", sample: true },
  { id: "s4", src: "/images/barber-pack/products-shelf.jpg", alt: "Salon shelves stocked with hair care products", sample: true },
  { id: "s5", src: "/images/barber-pack/razor-detail.jpg", alt: "Backwash stations and product display in a bright salon", sample: true },
  { id: "s6", src: "/images/barber-pack/pole-street.jpg", alt: "Waiting lounge with leather seating and marble floors", sample: true },
];

export default function HairSalonVariant2({ site }: { site: SiteData }) {
  const name = site.businessName || "Your Hair Studio";
  const photos = site.galleryUrls.length
    ? site.galleryUrls.map((url, i) => ({ id: `p${i}`, src: url, alt: `${name} photo ${i + 1}`, sample: false }))
    : SAMPLE_PHOTOS;
  const groups = useMemo(() => {
    const map = new Map<string, typeof site.services>();
    for (const s of site.services) {
      const key = "Services";
      map.set(key, [...(map.get(key) ?? []), s]);
    }
    return [...map.entries()];
  }, [site.services]);
  const [active, setActive] = useState<string>(groups[0]?.[0] ?? "");

  return (
    <div className="@container bg-[#f3f3ef] font-sans text-[#11151a]">
      {/* utility bar */ }
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 bg-[#11151a] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#f3f3ef]/85 @md:px-10">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: LIME }} />
          Colour consults &amp; enquiries
        </span>
        <span className="hidden @sm:inline">{site.hours || "Add opening hours"}</span>
        <a href="#hf-menu" className="underline decoration-[#d9f73a] decoration-2 underline-offset-4 hover:text-white">
          Service menu
        </a>
      </div>

      {/* masthead */ }
      <header className="border-b-2 border-[#11151a] px-5 pb-8 pt-10 @md:px-10 @md:pt-14">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#11151a]/55">
              <Leaf className="h-3.5 w-3.5" aria-hidden /> Hair studio — {site.area || "South Africa"}
            </p>
            <h1 className="text-[clamp(2.3rem,7.2cqw,5.2rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em]">
              {name}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="max-w-[26ch] text-right text-sm font-medium leading-snug text-[#11151a]/65 @max-md:text-left">
              {site.tagline || "Add your studio's one-liner in the editor."}
            </p>
            <BrandMark logo={site.logoUrl ?? null} name={name} className="h-14 w-14 rounded-2xl border-2 text-sm" />
          </div>
        </div>
      </header>

      {/* the menu */ }
      <main id="hf-menu" className="px-5 py-12 @md:px-10 @md:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-[#11151a]/50">
              The full menu
            </p>
            <h2 className="mt-2 text-[clamp(1.7rem,4cqw,2.8rem)] font-extrabold uppercase leading-none">
              Services &amp; Prices
            </h2>
          </div>
          <SamplePill label="Sample menu &amp; prices" />
        </div>

        {groups.length === 0 ? (
          <button
            type="button"
            className="w-full border-2 border-dashed border-[#11151a]/40 px-6 py-14 text-center text-sm font-semibold uppercase tracking-[0.14em] text-[#11151a]/60 hover:border-[#11151a]"
          >
            No services yet — add your menu in the editor
          </button>
        ) : (
          <div className="grid items-start gap-8 @lg:grid-cols-[220px_1fr]">
            <nav className="flex flex-wrap gap-2 @lg:sticky @lg:top-4 @lg:flex-col" aria-label="Menu categories">
              {groups.map(([category, services]) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={active === category}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] transition-colors",
                    active === category
                      ? `border-transparent bg-${LIME} text-[#11151a]`
                      : "border-[#11151a]/25 text-[#11151a]/75 hover:border-[#11151a]",
                  )}
                >
                  {category}
                </button>
              ))}
            </nav>
            <div>
              {groups.map(([category, services]) => (
                <section key={category} className="hidden @lg:block border-b border-[#11151a]/12 pb-8 last:border-0" aria-label={category}>
                  {services.map((s) => (
                    <div key={s.name} className="flex items-baseline justify-between gap-4 mb-5">
                      <span className="font-extrabold text-lg">{s.name}</span>
                      <span className="font-mono text-lg tabular-nums">{s.price || "—"}</span>
                    </div>
                  ))}
                </section>
              ))}
              <div className="@lg:hidden space-y-2 pt-4">
                {site.services.map((s) => (
                  <div key={s.name} className="flex items-baseline justify-between gap-4 mb-4">
                    <span className="font-bold">{s.name}</span>
                    <span className="font-mono tabular-nums">{s.price || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* photo strip */ }
      {photos.length > 0 && (
        <section className="border-t border-[#11151a]/10 px-5 py-12 @md:px-10 @md:py-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#11151a]/60">Inside the studio</h2>
            {photos.some((p) => p.sample) && <SamplePill label="Sample photos" />}
          </div>
          <div className="grid grid-cols-2 gap-4 @md:grid-cols-4">
            {photos.slice(0, 6).map((p) => (
              <figure key={p.id} className="mb-4 break-inside-avoid">
                <SmartImage src={p.src} alt={p.alt} className="aspect-[3/4] w-full rounded-xl" />
                <figcaption className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#11151a]/50">
                  <span style={{ color: LIME }}>{String(photos.indexOf(p) + 1).padStart(2, "0")}</span>
                  <span>{p.alt}</span>
                  {p.sample && <SamplePill label="Sample" />}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <footer className="border-t border-[#11151a]/12 px-5 py-8 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#11151a]/45 @md:px-10">
        <span className="flex items-center gap-3">
          <BrandMark logo={site.logoUrl ?? null} name={name} className="h-8 w-8 text-[10px]" />
          {name}
        </span>
        <span>Design: Forge · MzansiSite demo — sample content until edited</span>
      </footer>
    </div>
  );
}
