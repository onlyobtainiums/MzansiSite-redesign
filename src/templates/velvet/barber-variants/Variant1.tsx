"use client";

import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import type { SiteData } from "@/templates/types";
import { waLink } from "@/templates/types";
import { cn } from "./shared/cn";
import { SmartImage } from "./shared/SmartImage";
import { BrandMark, SamplePill, WhatsAppActionForSite } from "./shared/kit";

const BRASS = "#c8a05c";

const SAMPLE_PHOTOS = [
  { id: "s1", src: "/images/barber-pack/hero-chair.jpg", alt: "Empty leather barber chair in a moody shop interior", sample: true },
  { id: "s2", src: "/images/barber-pack/tools-flatlay.jpg", alt: "Flat lay of clippers, scissors, comb and straight razor", sample: true },
  { id: "s3", src: "/images/barber-pack/interior-warm.jpg", alt: "Sunlit barbershop interior with chairs and mirrors", sample: true },
  { id: "s4", src: "/images/barber-pack/razor-detail.jpg", alt: "Straight razor and shaving brush on a folded towel", sample: true },
  { id: "s5", src: "/images/barber-pack/products-shelf.jpg", alt: "Shelf of grooming products and folded towels", sample: true },
  { id: "s6", src: "/images/barber-pack/pole-street.jpg", alt: "Barber pole on a shopfront wall at golden hour", sample: true },
];

export default function BarberVariant1({ site }: { site: SiteData }) {
  const name = site.businessName || "Your Barbershop";
  const photos = site.galleryUrls.length
    ? site.galleryUrls.map((url, i) => ({ id: `p${i}`, src: url, alt: `${name} photo ${i + 1}`, sample: false }))
    : SAMPLE_PHOTOS;
  const hero = site.heroImageUrl ? { id: "hero", src: site.heroImageUrl, alt: `${name} hero`, sample: false } : photos[0];
  const menu = site.services.slice(0, 6);
  const frames = site.heroImageUrl ? photos : photos.slice(1, 4);
  const bookLink = waLink(site.whatsapp, `Hi ${name}! I'd like to make a booking.`);

  return (
    <div className="@container/page min-h-screen bg-[#131009] text-[#f2ead9] font-velvet">
      {/* hero */ }
      <header className="relative flex min-h-[620px] flex-col @md:min-h-[760px]">
        {hero ? (
          <SmartImage src={hero.src} alt={hero.alt} eager className="absolute inset-0" imgClassName="opacity-60" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_10%,#2a2113,transparent_60%),linear-gradient(#171208,#0d0a05)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131009] via-[#131009]/35 to-[#131009]/70" />

        <div className="relative flex items-center justify-between px-6 pt-6 @md:px-12 @md:pt-8">
          <div className="flex items-center gap-3">
            <BrandMark logo={site.logoUrl ?? null} name={name} className="h-10 w-10 text-xs" />
            <div className="leading-tight">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#f2ead9]/70">{name}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#f2ead9]/45">{site.area || "Your area"}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.25em] text-[#f2ead9]/70 @md:flex">
            <a className="transition-colors hover:text-[#f2ead9]" href="#velvet-menu">Menu</a>
            <a className="transition-colors hover:text-[#f2ead9]" href="#velvet-frames">Frames</a>
            <a className="transition-colors hover:text-[#f2ead9]" href="#velvet-visit">Visit</a>
          </nav>
        </div>

        <div className="relative mt-auto px-6 pb-12 @md:px-12 @md:pb-16">
          <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em]" style={{ color: BRASS }}>
            <span className="h-px w-10" style={{ background: BRASS }} /> Barbershop · {site.area || "South Africa"}
          </p>
          <h1 className="max-w-[12ch] text-[clamp(3rem,9.5cqw,7.2rem)] font-light leading-[0.98] tracking-[-0.01em] break-words">
            {name}
          </h1>
          <p className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-[#f2ead9]/75">
            {site.tagline || "A short line about your shop goes here."}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <WhatsAppActionForSite
              site={site}
              className="font-sans bg-[#c8a05c] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1a1409] transition-transform hover:-translate-y-0.5"
            />
            <a
              href="#velvet-menu"
              className="group inline-flex items-center gap-2 border border-[#f2ead9]/30 px-7 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-[#f2ead9] transition-colors hover:border-[#c8a05c] hover:text-[#c8a05c]"
            >
              View the menu <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </header>

      {/* meta strip */ }
      <section className="grid divide-y divide-[#f2ead9]/12 border-y border-[#f2ead9]/12 font-sans text-sm @sm:grid-cols-3 @sm:divide-x @sm:divide-y-0">
        {[
          { icon: MapPin, k: "Where", v: `${site.area || "Add your address"} · ${site.area || "your area"}` },
          { icon: Clock, k: site.hours || "Hours", v: site.hours || "Add opening hours" },
          { icon: Phone, k: "Phone", v: site.phone || "Add a phone number" },
        ].map((cell, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-5 @md:px-10">
            <cell.icon className="h-4 w-4 shrink-0" style={{ color: BRASS }} aria-hidden />
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#f2ead9]/50">{cell.k}</p>
              <p className="mt-0.5 text-[#f2ead9]/85">{cell.v}</p>
            </div>
          </div>
        ))}
      </section>

      {/* menu preview */ }
      <section id="velvet-menu" className="px-6 py-16 @md:px-12 @md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: BRASS }}>
              01 · The Menu
            </p>
            <h2 className="mt-3 text-[clamp(1.9rem,4.5cqw,3.4rem)] font-light leading-tight">
              Cuts & shaves, priced plainly.
            </h2>
          </div>
          <SamplePill label="Sample prices" className="text-[#f2ead9]/70" />
        </div>

        {menu.length === 0 ? (
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 border border-dashed border-[#f2ead9]/30 px-6 py-12 font-sans text-sm text-[#f2ead9]/60 transition-colors hover:border-[#c8a05c] hover:text-[#c8a05c]"
          >
            No services yet — add your menu
          </button>
        ) : (
          <ol className="grid gap-x-14 @lg:grid-cols-2">
            {menu.map((s, i) => (
              <li key={s.name || i} className="group border-b border-[#f2ead9]/12 py-5">
                <div className="flex items-baseline gap-4">
                  <span className="text-xs tabular-nums" style={{ color: BRASS }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex-1 text-xl font-normal @md:text-2xl">{s.name || "Untitled service"}</h3>
                  <span className="text-lg tabular-nums" style={{ color: BRASS }}>
                    {s.price || "—"}
                  </span>
                </div>
                {s.description && (
                  <p className="mt-1 pl-8 font-sans text-[13px] leading-relaxed text-[#f2ead9]/55">{s.description}</p>
                )}
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* frames */ }
      <section id="velvet-frames" className="border-t border-[#f2ead9]/12 px-6 py-16 @md:px-12 @md:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: BRASS }}>
              02 · Frames
            </p>
            <h2 className="mt-3 text-[clamp(1.6rem,3.6cqw,2.6rem)] font-light">The shop, in passing light.</h2>
          </div>
          {photos.some((p) => p.sample) && <SamplePill label="Sample photos" className="text-[#f2ead9]/70" />}
        </div>

        {photos.length === 0 ? (
          <button type="button" className="flex w-full items-center justify-center gap-3 border border-dashed border-[#f2ead9]/30 px-6 py-12 font-sans text-sm text-[#f2ead9]/60 transition-colors hover:border-[#c8a05c] hover:text-[#c8a05c]">
            No photos yet — upload shop photos
          </button>
        ) : (
          <div className="grid gap-4 @md:grid-cols-3">
            {frames.map((p, i) => (
              <figure key={p.id} className={cn("group relative", i === 1 && "@md:mt-10", i === 2 && "@md:mt-20")}>
                <SmartImage src={p.src} alt={p.alt} className="aspect-[3/4] w-full" />
                <figcaption className="mt-3 flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-[#f2ead9]/55">
                  <span style={{ color: BRASS }}>{String(i + 1).padStart(2, "0")}</span> {p.alt}
                  {p.sample && <SamplePill label="Sample" />}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* visit */ }
      <section id="velvet-visit" className="grid border-t border-[#f2ead9]/12 @lg:grid-cols-2">
        <div className="px-6 py-14 @md:px-12">
          <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: BRASS }}>
            03 · Visit
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4cqw,3rem)] font-light leading-tight">The chair is waiting.</h2>
          <div className="mt-7 space-y-4 font-sans text-[15px] text-[#f2ead9]/80">
            <p className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0" style={{ color: BRASS }} />
              {site.area || "Add your address"}{site.area ? `, ${site.area}` : ""}
            </p>
            {site.phone && (
              <a href={`tel:${site.phone.replace(/\D/g, "")}`} className="flex gap-3 underline-offset-4 hover:underline">
                <Phone className="mt-1 h-4 w-4 shrink-0" style={{ color: BRASS }} />
                {site.phone}
              </a>
            )}
          </div>
          <WhatsAppActionForSite
            site={site}
            label="Message us on WhatsApp"
            className="mt-8 border border-[#c8a05c] px-7 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-[#c8a05c] transition-colors hover:bg-[#c8a05c] hover:text-[#1a1409]"
          />
        </div>
        <div className="border-t border-[#f2ead9]/12 px-6 py-14 @lg:border-l @lg:border-t-0 @md:px-12">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#f2ead9]/50">Opening hours</p>
          <ul className="mt-5 divide-y divide-[#f2ead9]/12">
            {(site.hours ? [{ label: "Hours", value: site.hours }] : []).map((h) => (
              <li key={h.label} className="flex items-baseline justify-between gap-6 py-3.5">
                <span className="font-sans text-sm text-[#f2ead9]/65">{h.label}</span>
                <span className="text-lg">{h.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[#f2ead9]/12 px-6 py-8 font-sans text-[11px] uppercase tracking-[0.2em] text-[#f2ead9]/45 @md:px-12">
        <span className="flex items-center gap-3">
          <BrandMark logo={site.logoUrl ?? null} name={name} className="h-8 w-8 text-[10px]" />
          {name}
        </span>
        <span>Design: Velvet · MzansiSite demo — sample content until edited</span>
      </footer>
    </div>
  );
}
