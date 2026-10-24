"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone, Scissors } from "lucide-react";
import type { SiteData } from "@/templates/types";
import { waLink, telLink, mailLink } from "@/templates/types";
import { cn } from "./shared/cn";
import { SmartImage } from "./shared/SmartImage";
import { BrandMark, SamplePill, WhatsAppActionForSite } from "./shared/kit";

type ServiceWithCategory = { name: string; price: string; description?: string; category?: string };

const ORANGE = "#ff4d00";

const SAMPLE_PHOTOS = [
  { id: "s1", src: "/images/barber-pack/hero-chair.jpg", alt: "Empty leather barber chair in a moody shop interior", sample: true },
  { id: "s2", src: "/images/barber-pack/tools-flatlay.jpg", alt: "Flat lay of clippers, scissors, comb and straight razor", sample: true },
  { id: "s3", src: "/images/barber-pack/interior-warm.jpg", alt: "Sunlit barbershop interior with chairs and mirrors", sample: true },
  { id: "s4", src: "/images/barber-pack/razor-detail.jpg", alt: "Straight razor and shaving brush on a folded towel", sample: true },
  { id: "s5", src: "/images/barber-pack/products-shelf.jpg", alt: "Shelf of grooming products and folded towels", sample: true },
  { id: "s6", src: "/images/barber-pack/pole-street.jpg", alt: "Barber pole on a shopfront wall at golden hour", sample: true },
];

export default function BarberVariant2({ site }: { site: SiteData }) {
  const name = site.businessName || "Your Barbershop";
  const photos = site.galleryUrls.length
    ? site.galleryUrls.map((url, i) => ({ id: `p${i}`, src: url, alt: `${name} photo ${i + 1}`, sample: false }))
    : SAMPLE_PHOTOS;
  const services = (site.services as ServiceWithCategory[]).slice(0, 10);
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(services.map((s) => s.category || "Other")))],
    [services],
  );
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? services : services.filter((s) => (s.category || "Other") === cat);
  const half = Math.ceil(shown.length / 2);
  const cols = [shown.slice(0, half), shown.slice(half)].filter((c) => c.length);

  return (
    <div className="@container bg-[#ece9e2] font-forge text-[#17191d]">
      {/* utility bar */ }
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 bg-[#17191d] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#ece9e2]/85 @md:px-10">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: ORANGE }} />
          Walk-ins &amp; enquiries
        </span>
        <span className="hidden @sm:inline">{site.hours || "Add opening hours"}</span>
        <a href="#forge-menu" className="underline decoration-[#ff4d00] decoration-2 underline-offset-4 hover:text-white">
          Price list
        </a>
      </div>

      {/* masthead */ }
      <header className="border-b-2 border-[#17191d] px-5 pb-8 pt-10 @md:px-10 @md:pt-14">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#17191d]/60">
              <Scissors className="h-3.5 w-3.5" aria-hidden /> Barbershop — {site.area || "South Africa"}
            </p>
            <h1 className="text-[clamp(2.4rem,7.5cqw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em]">
              {name}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="max-w-[26ch] text-right text-sm font-medium leading-snug text-[#17191d]/70 @max-md:text-left">
              {site.tagline || "Add your shop's one-liner in the editor."}
            </p>
            <BrandMark logo={site.logoUrl ?? null} name={name} className="h-14 w-14 rounded-none border-2 text-sm" />
          </div>
        </div>
      </header>

      {/* the menu (services first) */ }
      <main id="forge-menu" className="px-5 py-12 @md:px-10 @md:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-prices text-[12px] font-semibold uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
              Services &amp; prices
            </p>
            <h2 className="mt-2 text-[clamp(1.7rem,4cqw,2.8rem)] font-extrabold uppercase leading-none">The Menu</h2>
          </div>
          <SamplePill label="Sample menu &amp; prices" />
        </div>

        {/* category tabs */ }
        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Service categories">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "border-2 border-[#17191d] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors",
                cat === c ? "bg-[#17191d] text-[#ece9e2]" : "bg-transparent hover:bg-[#17191d]/10",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <button
            type="button"
            className="w-full border-2 border-dashed border-[#17191d]/40 px-6 py-14 text-center text-sm font-semibold uppercase tracking-[0.14em] text-[#17191d]/60 hover:border-[#ff4d00] hover:text-[#ff4d00]"
          >
            No services in this category yet — add some in the editor
          </button>
        ) : (
          <div className="grid gap-x-16 @lg:grid-cols-2">
            {cols.map((col, ci) => (
              <ol key={ci}>
                {col.map((s) => (
                  <li key={s.name} className="border-b border-[#17191d]/15 py-5 first:border-t-2 first:border-[#17191d]">
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-[15px] font-bold uppercase tracking-[0.06em]">{s.name || "Untitled service"}</h3>
                      <span className="mz-leader mx-1 flex-1" aria-hidden />
                      <span className="font-prices text-lg font-semibold" style={{ color: ORANGE }}>
                        {s.price || "—"}
                      </span>
                    </div>
                    {s.description && <p className="mt-1.5 max-w-[52ch] text-[13px] leading-relaxed text-[#17191d]/65">{s.description}</p>}
                  </li>
                ))}
              </ol>
            ))}
          </div>
        )}

        {/* enquiry band */ }
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 bg-[#17191d] px-6 py-8 text-[#ece9e2] @md:px-10">
          <div>
            <p className="font-prices text-[11px] uppercase tracking-[0.3em] text-[#ece9e2]/60">Found your cut?</p>
            <p className="mt-1 text-xl font-extrabold uppercase">Send an enquiry — we reply to confirm.</p>
            <p className="mt-1 text-[12px] text-[#ece9e2]/55">An enquiry isn't a booking until the shop confirms it with you.</p>
          </div>
          <WhatsAppActionForSite
            site={site}
            label="Enquire on WhatsApp"
            className="bg-[#ff4d00] px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5"
          />
        </div>
      </main>

      {/* the shop */ }
      <section className="grid gap-px border-y-2 border-[#17191d] bg-[#17191d] @md:grid-cols-3">
        <div className="bg-[#ece9e2] p-6 @md:p-8">
          <p className="mb-4 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.25em]">
            <Clock3 className="h-4 w-4" aria-hidden /> Hours
          </p>
          <ul className="space-y-2">
            {site.hours ? (
              site.hours.split(/ · |\n/).map((row, i) => {
                const parts = row.trim().split(/\s{2,}|(?<=[a-zA-Z])\s+(?=\d)/);
                const label = parts.length >= 2 ? parts[0].trim() : row.trim();
                const value = parts.length >= 2 ? parts.slice(1).join(" ").trim() : "";
                return (
                  <li key={i} className="flex justify-between gap-4 font-prices text-[13px]">
                    <span className="text-[#17191d]/60">{label}</span>
                    <span className="font-semibold">{value || "—"}</span>
                  </li>
                );
              })
            ) : (
              <li className="flex justify-between gap-4 font-prices text-[13px]">
                <span className="text-[#17191d]/60">Hours</span>
                <span className="font-semibold">—</span>
              </li>
            )}
          </ul>
        </div>
        <div className="bg-[#ece9e2] p-6 @md:p-8">
          <p className="mb-4 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.25em]">
            <MapPin className="h-4 w-4" aria-hidden /> Find us
          </p>
          <p className="text-sm font-semibold">{site.area || "Add your address"}</p>
          <p className="text-sm text-[#17191d]/60">{site.area || "Your area"}</p>
          {site.phone && (
            <a href={telLink(site.phone)} className="mt-3 inline-flex items-center gap-2 text-sm font-bold underline decoration-[#ff4d00] decoration-2 underline-offset-4">
              <Phone className="h-3.5 w-3.5" /> {site.phone}
            </a>
          )}
        </div>
        <div className="bg-[#ece9e2] p-6 @md:p-8">
          <p className="mb-4 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.25em]">
            <Mail className="h-4 w-4" aria-hidden /> Enquiries
          </p>
          <p className="text-sm leading-relaxed text-[#17191d]/70">
            Message the shop on WhatsApp or email us about cuts, beard work and group bookings.
          </p>
          {site.email && (
            <a href={mailLink(site.email)} className="mt-3 inline-flex items-center gap-2 text-sm font-bold underline decoration-[#ff4d00] decoration-2 underline-offset-4">
              {site.email} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </section>

      {/* photo strip */ }
      {photos.length > 0 && (
        <section className="px-5 py-12 @md:px-10">
          <div className="mb-5 flex items-center justify-between">
            <p className="font-prices text-[11px] font-semibold uppercase tracking-[0.3em] text-[#17191d]/60">From the floor</p>
            {photos.some((p) => p.sample) && <SamplePill label="Sample photos" />}
          </div>
          <div className="mz-frame-scroll flex snap-x gap-4 overflow-x-auto pb-3">
            {photos.map((p, i) => (
              <figure key={p.id} className="w-[240px] shrink-0 snap-start @md:w-[300px]">
                <SmartImage src={p.src} alt={p.alt} className="aspect-[4/3] w-full border-2 border-[#17191d]" />
                <figcaption className="mt-2 flex items-center justify-between font-prices text-[11px] uppercase tracking-[0.14em] text-[#17191d]/60">
                  <span>{String(i + 1).padStart(2, "0")} / {p.alt}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#17191d] px-5 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#17191d]/60 @md:px-10">
        <span>{name}</span>
        <span>Design: Forge · MzansiSite demo — prices shown are samples</span>
      </footer>
    </div>
  );
}
