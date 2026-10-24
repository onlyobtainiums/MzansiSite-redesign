"use client";

import { ArrowDownRight, ImagePlus, Images, MessageCircle, Phone } from "lucide-react";
import type { SiteData } from "@/templates/types";
import { telLink } from "@/templates/types";
import { cn } from "../barber-variants/shared/cn";
import { SmartImage } from "../barber-variants/shared/SmartImage";
import { SamplePill, WhatsAppActionForSite } from "../barber-variants/shared/kit";

const CHAMPAGNE = "#e5cf9f";
const ASPECTS = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]", "aspect-[3/4]", "aspect-square"];

const SAMPLE_PHOTOS = [
  { id: "s1", src: "/images/barber-pack/hero-chair.jpg", alt: "Styling chairs and brass-framed mirrors in a sunlit salon interior", sample: true },
  { id: "s2", src: "/images/barber-pack/tools-flatlay.jpg", alt: "Salon scissors, brushes and colour tools arranged on sage linen", sample: true },
  { id: "s3", src: "/images/barber-pack/interior-warm.jpg", alt: "Elegant salon interior with round mirrors and soft lighting", sample: true },
  { id: "s4", src: "/images/barber-pack/products-shelf.jpg", alt: "Salon shelves stocked with hair care products", sample: true },
  { id: "s5", src: "/images/barber-pack/razor-detail.jpg", alt: "Backwash stations and product display in a bright salon", sample: true },
  { id: "s6", src: "/images/barber-pack/pole-street.jpg", alt: "Waiting lounge with leather seating and marble floors", sample: true },
];

export default function HairSalonVariant4({ site }: { site: SiteData }) {
  const name = site.businessName || "Your Hair Studio";
  const photos = site.galleryUrls.length
    ? site.galleryUrls.map((url, i) => ({ id: `p${i}`, src: url, alt: `${name} photo ${i + 1}`, sample: false }))
    : SAMPLE_PHOTOS;
  const [featured, ...rest] = photos;
  const hasOnlySamples = photos.length > 0 && photos.every((p) => p.sample);

  return (
    <div className="@container bg-[#141414] font-sans text-[#efece6]">
      {/* slim header */ }
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#efece6]/10 bg-[#141414]/90 px-5 py-4 backdrop-blur @md:px-10">
        <p className="flex items-center gap-3 text-sm font-semibold tracking-tight">
          {site.logoUrl ? (
            <img src={site.logoUrl} alt="" className="h-7 w-7 rounded-full object-cover" />
          ) : (
            <span className="grid h-7 w-7 place-items-center rounded-full border text-[10px] font-bold" style={{ borderColor: CHAMPAGNE, color: CHAMPAGNE }}>
              {name.trim()[0]?.toUpperCase() ?? "M"}
            </span>
          )}
          {name}
        </p>
        <div className="flex items-center gap-4 text-[12px] font-medium text-[#efece6]/75">
          <a href="#hpx-work" className="hidden hover:text-[#e5cf9f] @sm:inline">Work</a>
          <a href="#hpx-menu" className="hidden hover:text-[#e5cf9f] @sm:inline">Services</a>
          {site.phone && (
            <a href={telLink(site.phone)} className="grid h-9 w-9 place-items-center rounded-full border border-[#efece6]/25" aria-label="Call the studio">
              <Phone className="h-4 w-4" />
            </a>
          )}
        </div>
      </header>

      {/* intro */ }
      <section className="px-5 pb-8 pt-12 @md:px-10 @md:pt-16">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: CHAMPAGNE }}>
          Contact sheet · {name}
        </p>
        <h1 className="max-w-[18ch] text-[clamp(1.9rem,5cqw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.02em] break-words">
          Brows like a look-book, book like a local.
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#efece6]/60">
          {site.tagline || "Add your one-liner in the editor."} Every frame below is the studio as it is —
          stations, tools, shine — no stock-client shoots.
        </p>
        {hasOnlySamples && (
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-dashed border-[#efece6]/30 px-4 py-2 text-[12px] font-semibold text-[#efece6]/65 transition-colors hover:border-[#e5cf9f] hover:text-[#e5cf9f]"
          >
            <Images className="h-3.5 w-3.5" /> These are sample photos — upload your own to replace them
          </button>
        )}
      </section>

      {/* featured plate */ }
      {featured && (
        <section className="px-5 @md:px-10">
          <figure>
            <div className="relative">
            <SmartImage src={featured.src} alt={featured.alt} eager className="aspect-[16/10] w-full rounded-xl @md:aspect-[21/10]" />
            <span className="absolute left-4 top-4 rounded-full bg-[#141414]/85 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: CHAMPAGNE }}>
              Frame 01
            </span>
          </div>
          <figcaption className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#efece6]/50">
            <span style={{ color: CHAMPAGNE }}>Featured</span>
            <span>{featured.alt}</span>
            {featured.sample && <SamplePill label="Sample photo" className="text-[#efece6]/60" />}
          </figcaption>
        </figure>
      </section>
      )}

      {/* the grid */ }
      <section id="hpx-work" className="px-5 py-12 @md:px-10 @md:py-16">
        {photos.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-[#efece6]/25 bg-[#1a1a1a] px-6 py-16 text-center @md:py-24">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full" style={{ background: `${CHAMPAGNE}14`, color: CHAMPAGNE }}>
              <ImagePlus className="h-6 w-6" aria-hidden />
            </span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">Your work goes here.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#efece6]/60">
              This design is built around your photographs: stations, tools, mirrors, products.
              Add up to six photos in the free preview — more once you publish.
            </p>
            <button
              type="button"
              className="mt-6 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: CHAMPAGNE }}
            >
              Open photo uploads
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-lg font-semibold tracking-tight">Selected frames</h2>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#efece6]/50">
                {photos.length} / 6 preview slots
              </p>
            </div>
            <div className="columns-2 gap-4 @md:columns-3">
              {rest.map((p, i) => (
                <figure key={p.id} className="mb-4 break-inside-avoid">
                  <SmartImage src={p.src} alt={p.alt} className={cn("w-full rounded-lg", ASPECTS[i % ASPECTS.length])} />
                  <figcaption className="mt-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#efece6]/50">
                    <ArrowDownRight className="h-3 w-3 shrink-0" style={{ color: CHAMPAGNE }} />
                    <span className="truncate">{p.alt}</span>
                    {p.sample && <span className="ml-auto shrink-0 rounded-full border border-[#efece6]/15 px-1.5 py-0.5 text-[9px]">Sample</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        )}
      </section>

      {/* services as captions */ }
      <section id="hpx-menu" className="border-t border-[#efece6]/10 px-5 py-12 @md:px-10">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <h2 className="text-[clamp(1.4rem,3cqw,2rem)] font-semibold tracking-tight">Behind those frames</h2>
          <SamplePill label="Sample prices" />
        </div>
        <ul className="grid gap-x-12 @md:grid-cols-2 @lg:grid-cols-3">
          {site.services.map((s) => (
            <li key={s.name} className="border-b border-[#efece6]/10 py-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[14px] font-semibold">{s.name}</p>
                <p className="text-[14px] font-semibold" style={{ color: CHAMPAGNE }}>
                  {s.price || "—"}
                </p>
              </div>
              {s.description && <p className="mt-1 text-[12.5px] leading-relaxed text-[#efece6]/55">{s.description}</p>}
            </li>
          ))}
        </ul>
      </section>

      {/* contact strip */ }
      <section className="border-t border-[#efece6]/10 bg-[#1a1a1a] px-5 py-10 @md:px-10">
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#efece6]/10 pt-8">
          <p className="text-lg font-semibold tracking-tight">Like what you see? Enquire first — we confirm by reply.</p>
          <WhatsAppActionForSite
            site={site}
            className="rounded-full bg-[#e5cf9f] px-6 py-3 text-sm font-semibold text-[#141414] transition-transform hover:-translate-y-0.5"
            label="Enquire on WhatsApp"
          />
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 px-5 py-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#efece6]/45 @md:px-10">
        <span className="flex items-center gap-2"><MessageCircle className="h-3.5 w-3.5" style={{ color: CHAMPAGNE }} />{name}</span>
        <span>Design: Praxis · MzansiSite demo — sample content until edited</span>
      </footer>
    </div>
  );
}
