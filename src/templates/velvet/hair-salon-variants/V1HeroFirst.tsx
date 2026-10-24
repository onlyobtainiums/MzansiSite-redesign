"use client";

import { ArrowRight, Clock, ImagePlus, MapPin, Phone } from "lucide-react";
import type { SiteData } from "@/templates/types";
import { waLink, telLink } from "@/templates/types";
import { cn } from "../barber-variants/shared/cn";
import { SmartImage } from "../barber-variants/shared/SmartImage";
import { BrandMark, SamplePill, WhatsAppActionForSite } from "../barber-variants/shared/kit";

const ROSE = "#d8a18c";

const SAMPLE_PHOTOS = [
  { id: "s1", src: "/images/barber-pack/hero-chair.jpg", alt: "Styling chairs and brass-framed mirrors in a sunlit salon interior", sample: true },
  { id: "s2", src: "/images/barber-pack/interior-warm.jpg", alt: "Elegant salon interior with round mirrors and soft lighting", sample: true },
  { id: "s3", src: "/images/barber-pack/tools-flatlay.jpg", alt: "Salon scissors, brushes and colour tools arranged on sage linen", sample: true },
  { id: "s4", src: "/images/barber-pack/products-shelf.jpg", alt: "Salon shelves stocked with hair care products", sample: true },
  { id: "s5", src: "/images/barber-pack/razor-detail.jpg", alt: "Backwash stations and product display in a bright salon", sample: true },
  { id: "s6", src: "/images/barber-pack/pole-street.jpg", alt: "Waiting lounge with leather seating and marble floors", sample: true },
];

export default function HairSalonVariant1({ site }: { site: SiteData }) {
  const name = site.businessName || "Your Hair Studio";
  const photos = site.galleryUrls.length
    ? site.galleryUrls.map((url, i) => ({ id: `p${i}`, src: url, alt: `${name} photo ${i + 1}`, sample: false }))
    : SAMPLE_PHOTOS;
  const hero = photos[0];
  const frames = photos.slice(1, 4);
  const edit = site.services.slice(0, 6);

  return (
    <div className="@container bg-[#251322] font-sans text-[#f6ede3]">
      {/* header */ }
      <header className="flex items-center justify-between px-6 pt-6 @md:px-12 @md:pt-9">
        <div className="flex items-center gap-3">
          <BrandMark logo={site.logoUrl ?? null} name={name} className="h-10 w-10 text-xs" />
          <div className="leading-tight">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#f6ede3]/70">{name}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#f6ede3]/45">{site.area || "Your area"}</p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.25em] text-[#f6ede3]/65 @md:flex">
          <a className="hover:text-[#d8a18c]" href="#hvs-services">Services</a>
          <a className="hover:text-[#d8a18c]" href="#hvs-frames">Frames</a>
          <a className="hover:text-[#d8a18c]" href="#hvs-visit">Visit</a>
        </nav>
      </header>

      {/* hero */ }
      <section className="relative grid items-center gap-10 px-6 pb-16 pt-10 @md:px-12 @lg:grid-cols-[1.05fr_0.95fr] @lg:pt-14">
        <div className="relative z-10">
          <p className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em]" style={{ color: ROSE }}>
            <span className="h-px w-10" style={{ background: ROSE }} /> Hair studio · {site.area || "South Africa"}
          </p>
          <h1 className="max-w-[13ch] text-[clamp(2.9rem,8.6cqw,6.6rem)] font-light leading-[0.98] break-words">
            {name.split(" ").map((w, i) => (
              <span key={i} className={cn(i === 1 && "italic", i === 1 && `text-${ROSE}`)}>{w} </span>
            ))}
          </h1>
          <p className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-[#f6ede3]/75">
            {site.tagline || "A short line about your studio goes here."}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <WhatsAppActionForSite
              site={site}
              className="bg-[#d8a18c] px-7 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-[#251322] transition-transform hover:-translate-y-0.5"
            />
            <a
              href="#hvs-services"
              className="group inline-flex items-center gap-2 border border-[#f6ede3]/30 px-7 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] transition-colors hover:border-[#d8a18c] hover:text-[#d8a18c]"
            >
              See the services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#f6ede3]/15 pt-6 font-sans text-[13px] text-[#f6ede3]/65">
            <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" style={{ color: ROSE }} />{site.area || "Add your address"}, {site.area}</span>
            <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" style={{ color: ROSE }} />{site.hours || "Add opening hours"}</span>
            {site.phone && (
              <a href={telLink(site.phone)} className="flex items-center gap-2 hover:text-[#d8a18c]">
                <Phone className="h-3.5 w-3.5" style={{ color: ROSE }} />{site.phone}
              </a>
            )}
          </div>
        </div>

        <figure className="relative">
          {hero ? (
            <SmartImage src={hero.src} alt={hero.alt} eager className="aspect-[3/4] w-full rounded-t-[10rem] object-cover ring-1 ring-[#d8a18c]/40 @md:aspect-[4/5]" />
          ) : (
            <div className="grid aspect-[3/4] w-full place-items-center rounded-t-[10rem] bg-[#31182c] ring-1 ring-[#d8a18c]/40">
              <BrandMark logo={site.logoUrl ?? null} name={name} className="h-24 w-24 text-2xl text-[#d8a18c]" />
            </div>
          )}
          <figcaption className="mt-3 flex items-center justify-between font-sans text-[11px] uppercase tracking-[0.2em] text-[#f6ede3]/50">
            <span>{hero?.alt || "Add your signature interior shot"}</span>
            {hero?.sample && <SamplePill label="Sample" className="text-[#f6ede3]/60" />}
          </figcaption>
        </figure>
      </section>

      {/* service edit */ }
      <section id="hvs-services" className="border-t border-[#f6ede3]/12 bg-[#2c1728] px-6 py-16 @md:px-12 @md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: ROSE }}>
              01 · The Service Edit
            </p>
            <h2 className="mt-3 text-[clamp(1.9rem,4.4cqw,3.3rem)] font-light leading-tight">
              Colour, cuts &amp; care — <em className={`text-${ROSE}`}>priced plainly.</em>
            </h2>
          </div>
          <SamplePill label="Sample prices" className="text-[#f6ede3]/70" />
        </div>

        {edit.length === 0 ? (
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 border border-dashed border-[#f6ede3]/30 px-6 py-12 font-sans text-sm text-[#f6ede3]/60 transition-colors hover:border-[#d8a18c] hover:text-[#d8a18c]"
          >
            <ImagePlus className="h-4 w-4" aria-hidden /> No services yet — add your menu
          </button>
        ) : (
          <ol className="grid gap-x-14 @lg:grid-cols-2">
            {edit.map((s, i) => (
              <li key={s.name || i} className="group border-b border-[#f6ede3]/12 py-5">
                <div className="flex items-baseline gap-4">
                  <span className="text-xs tabular-nums" style={{ color: ROSE }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex-1 text-xl font-normal @md:text-2xl">{s.name || "Untitled service"}</h3>
                  <span className="text-lg tabular-nums" style={{ color: ROSE }}>
                    {s.price || "—"}
                  </span>
                </div>
                {s.description && (
                  <p className="mt-1 pl-8 font-sans text-[13px] leading-relaxed text-[#f6ede3]/55">{s.description}</p>
                )}
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* frames */ }
      <section id="hvs-frames" className="border-t border-[#f6ede3]/12 px-6 py-16 @md:px-12 @md:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: ROSE }}>
              02 · Frames
            </p>
            <h2 className="mt-3 text-[clamp(1.6rem,3.6cqw,2.6rem)] font-light">The shop, in passing light.</h2>
          </div>
          {photos.some((p) => p.sample) && <SamplePill label="Sample photos" className="text-[#f6ede3]/70" />}
        </div>

        {photos.length === 0 ? (
          <button type="button" className="flex w-full items-center justify-center gap-3 border border-dashed border-[#f6ede3]/30 px-6 py-12 font-sans text-sm text-[#f6ede3]/60 transition-colors hover:border-[#d8a18c] hover:text-[#d8a18c]">
            <ImagePlus className="h-4 w-4" aria-hidden /> No photos yet — upload shop photos
          </button>
        ) : (
          <div className="grid gap-4 @md:grid-cols-3">
            {frames.map((p, i) => (
              <figure key={p.id} className={cn("group relative", i === 1 && "@md:mt-10", i === 2 && "@md:mt-20")}>
                <SmartImage src={p.src} alt={p.alt} className="aspect-[3/4] w-full" />
                <figcaption className="mt-3 flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-[#f6ede3]/55">
                  <span style={{ color: ROSE }}>{String(i + 1).padStart(2, "0")}</span> {p.alt}
                  {p.sample && <SamplePill label="Sample" />}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* visit */ }
      <section id="hvs-visit" className="grid border-t border-[#f6ede3]/12 @lg:grid-cols-2">
        <div className="px-6 py-14 @md:px-12">
          <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: ROSE }}>
            03 · Visit
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4cqw,3rem)] font-light leading-tight">The chair is waiting.</h2>
          <div className="mt-7 space-y-4 font-sans text-[15px] text-[#f6ede3]/80">
            <p className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0" style={{ color: ROSE }} />
              {site.area || "Add your address"}{site.area ? `, ${site.area}` : ""}
            </p>
            {site.phone && (
              <a href={telLink(site.phone)} className="flex gap-3 underline-offset-4 hover:underline">
                <Phone className="mt-1 h-4 w-4 shrink-0" style={{ color: ROSE }} />
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
        <div className="border-t border-[#f6ede3]/12 px-6 py-14 @lg:border-l @lg:border-t-0 @md:px-12">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#f6ede3]/50">Opening hours</p>
          <ul className="mt-5 divide-y divide-[#f6ede3]/12">
            <li className="flex items-baseline justify-between gap-6 py-3.5">
              <span className="font-sans text-sm text-[#f6ede3]/65">{site.hours ? site.hours.split(" · ")[0] : "Hours"}</span>
              <span className="text-lg">{site.hours || "—"}</span>
            </li>
          </ul>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[#f6ede3]/12 px-6 py-8 font-sans text-[11px] uppercase tracking-[0.2em] text-[#f6ede3]/45 @md:px-12">
        <span className="flex items-center gap-3">
          <BrandMark logo={site.logoUrl ?? null} name={name} className="h-8 w-8 text-[10px]" />
          {name}
        </span>
        <span>Design: Velvet · MzansiSite demo — sample content until edited</span>
      </footer>
    </div>
  );
}
