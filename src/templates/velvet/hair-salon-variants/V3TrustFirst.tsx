"use client";

import { BadgeCheck, Clock, Droplets, Leaf, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles } from "lucide-react";
import type { SiteData } from "@/templates/types";
import { mailLink, telLink } from "@/templates/types";
import { cn } from "../barber-variants/shared/cn";
import { SmartImage } from "../barber-variants/shared/SmartImage";
import { BrandMark, SamplePill, WhatsAppActionForSite } from "../barber-variants/shared/kit";

const LEAF = "#3d6650";
const PINE = "#234034";

const SAMPLE_PHOTOS = [
  { id: "s1", src: "/images/barber-pack/hero-chair.jpg", alt: "Styling chairs and brass-framed mirrors in a sunlit salon interior", sample: true },
  { id: "s2", src: "/images/barber-pack/tools-flatlay.jpg", alt: "Salon scissors, brushes and colour tools arranged on sage linen", sample: true },
  { id: "s3", src: "/images/barber-pack/interior-warm.jpg", alt: "Elegant salon interior with round mirrors and soft lighting", sample: true },
  { id: "s4", src: "/images/barber-pack/products-shelf.jpg", alt: "Salon shelves stocked with hair care products", sample: true },
  { id: "s5", src: "/images/barber-pack/razor-detail.jpg", alt: "Backwash stations and product display in a bright salon", sample: true },
  { id: "s6", src: "/images/barber-pack/pole-street.jpg", alt: "Waiting lounge with leather seating and marble floors", sample: true },
];

const GUIDE = [
  { n: "01", t: "Consultation first", d: "We talk through your hair history, texture and goals before anything touches your hair." },
  { n: "02", t: "A quoted price, agreed", d: "You hear the full price — including any extra product — before the service begins." },
  { n: "03", t: "Care at the basin", d: "We finish with honest guidance on upkeep, not a shelf of products you don’t need." },
];

const STANDARDS = [
  { icon: ShieldCheck, text: "Sanitised tools and fresh towels for every guest" },
  { icon: Droplets, text: "Colour strand-tests whenever your hair history suggests caution" },
  { icon: Sparkles, text: "No pressure retail — recommendations stay honest" },
  { icon: Clock, text: "Realistic timing: we book unhurried chairs and say so if we run late" },
];

export default function HairSalonVariant3({ site }: { site: SiteData }) {
  const name = site.businessName || "Your Hair Studio";
  const photos = site.galleryUrls.length
    ? site.galleryUrls.map((url, i) => ({ id: `p${i}`, src: url, alt: `${name} photo ${i + 1}`, sample: false }))
    : SAMPLE_PHOTOS;
  const feature = photos[2] ?? photos[0];

  return (
    <div className="@container bg-[#edf3ec] font-sans text-[#234034]">
      {/* header */ }
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 pt-7 @md:px-8">
        <div className="flex items-center gap-3">
          <BrandMark logo={site.logoUrl ?? null} name={name} className="h-11 w-11 text-xs" />
          <div className="leading-tight">
            <p className="font-sans text-lg font-semibold">{name}</p>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: LEAF }}>
              {site.area || "Your area"}
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#234034]/65">
          <a href="#hsv-guide" className="hover:text-[#5d8a70]">First visit</a>
          <a href="#hsv-standards" className="hover:text-[#5d8a70]">Standards</a>
          <a href="#hsv-services" className="hover:text-[#5d8a70]">Services</a>
        </nav>
      </header>

      {/* trust hero */ }
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 @md:px-8 @md:py-16 @lg:grid-cols-[1.15fr_1fr] @lg:items-center">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3d6650]/30 bg-white/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: LEAF }}>
            <Leaf className="h-3 w-3" /> An honest hair studio
          </p>
          <h1 className="font-sans text-[clamp(2.1rem,5.2cqw,3.8rem)] font-semibold leading-[1.06] break-words">
            Good hair days start with knowing what to expect.
          </h1>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-[#234034]/75">
            {site.tagline || "Add a line about how you run your studio."} Here’s our studio information —
            hours, directions and exactly how a first visit works.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <WhatsAppActionForSite
              site={site}
              className="rounded-full bg-[#3d6650] px-6 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5"
            />
            <a href="#hsv-visit" className="inline-flex items-center gap-2 rounded-full border-2 border-[#234034]/60 px-6 py-3 text-sm font-bold transition-colors hover:bg-[#234034] hover:text-[#edf3ec]">
              Plan my visit
            </a>
          </div>
        </div>

        {/* studio information card */ }
        <div className="rounded-2xl border border-[#234034]/10 bg-white p-6 shadow-[0_18px_50px_-24px_rgba(35,64,52,0.4)] @md:p-8">
          <div className="flex items-center gap-4 border-b border-dashed border-[#234034]/20 pb-5">
            <BrandMark logo={site.logoUrl ?? null} name={name} className="h-14 w-14 text-sm" />
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#234034]/40 uppercase">
                About
              </p>
              <p className="text-sm font-semibold">{site.tagline || "A neighbourhood hair studio built on honest care."}</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4 border-b border-[#234034]/10 pb-4">
              <MapPin className="h-4 w-4 shrink-0" style={{ color: LEAF }} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#234034]/40 uppercase">Location</p>
                <p className="text-sm font-semibold">{site.area || "Add your address"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-b border-[#234034]/10 pb-4">
              <Clock className="h-4 w-4 shrink-0" style={{ color: LEAF }} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#234034]/40 uppercase">Hours</p>
                <p className="text-sm font-semibold">{site.hours || "Add opening hours"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="h-4 w-4 shrink-0" style={{ color: LEAF }} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#234034]/40 uppercase">Contact</p>
                <p className="text-sm font-semibold">{site.whatsapp || "Add a WhatsApp number"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* guide */ }
      <section id="hsv-guide" className="border-t border-[#234034]/12 px-5 py-16 @md:px-8 @md:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: LEAF }}>
              01 · First visit
            </p>
            <h2 className="mt-3 text-[clamp(1.9rem,4.4cqw,3.3rem)] font-semibold leading-tight">
              What to expect when you arrive
            </h2>
          </div>
          {photos.some((p) => p.sample) && <SamplePill label="Sample studio" className="text-[#234034]/70" />}
        </div>
        <div className="grid gap-6 @md:grid-cols-3">
          {GUIDE.map((step) => (
            <div key={step.n} className="rounded-2xl border border-[#234034]/10 bg-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-extrabold text-[#234034]">{step.n}</span>
                <h3 className="text-lg font-semibold">{step.t}</h3>
              </div>
              <p className="text-sm leading-relaxed text-[#234034]/75">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* standards */ }
      <section id="hsv-standards" className="border-t border-[#234034]/12 px-5 py-16 @md:px-8 @md:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: LEAF }}>
              02 · Standards
            </p>
            <h2 className="mt-3 text-[clamp(1.9rem,4.4cqw,3.3rem)] font-semibold leading-tight">
              Honest care, no surprises
            </h2>
          </div>
        </div>
        <div className="grid gap-4 @md:grid-cols-4">
          {STANDARDS.map((s, i) => (
            <div key={i} className="rounded-xl border border-[#234034]/10 bg-white p-5">
              <s.icon className="h-5 w-5 shrink-0 mb-3" style={{ color: LEAF }} aria-hidden />
              <p className="text-sm font-semibold leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* services */ }
      <section id="hsv-services" className="border-t border-[#234034]/12 px-5 py-16 @md:px-8 @md:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: LEAF }}>
              03 · Services
            </p>
            <h2 className="mt-3 text-[clamp(1.9rem,4.4cqw,3.3rem)] font-semibold leading-tight">
              Menu &amp; prices
            </h2>
          </div>
          <SamplePill label="Sample prices" className="text-[#234034]/70" />
        </div>
        {site.services.length === 0 ? (
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 border border-dashed border-[#234034]/30 px-6 py-12 font-sans text-sm text-[#234034]/60 transition-colors hover:border-[#3d6650] hover:text-[#3d6650]"
          >
            <Leaf className="h-4 w-4" aria-hidden /> No services yet — add your menu
          </button>
        ) : (
          <ul className="space-y-4">
            {site.services.map((s) => (
              <li key={s.name} className="flex items-baseline justify-between gap-4 border-b border-[#234034]/10 pb-4 last:border-0 last:pb-0">
                <span className="font-bold">{s.name}</span>
                <span className="font-mono text-lg tabular-nums">{s.price || "—"}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[#234034]/12 px-5 py-8 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#234034]/45 @md:px-8">
        <span>{name}</span>
        <span>Design: Savanna · MzansiSite demo — sample content until edited</span>
      </footer>
    </div>
  );
}
