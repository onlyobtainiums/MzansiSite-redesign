"use client";

import { ArrowRight, Clock, Leaf, Mail, MapPin, PenLine, Phone, Sparkles } from "lucide-react";
import type { SiteData } from "@/templates/types";
import { mailLink, telLink } from "@/templates/types";
import { cn } from "../barber-variants/shared/cn";
import { SmartImage } from "../barber-variants/shared/SmartImage";
import { BrandMark, SamplePill, WhatsAppActionForSite } from "../barber-variants/shared/kit";

const APRICOT = "#e0703f";

const SAMPLE_PHOTOS = [
  { id: "s1", src: "/images/barber-pack/hero-chair.jpg", alt: "Styling chairs and brass-framed mirrors in a sunlit salon interior", sample: true },
  { id: "s2", src: "/images/barber-pack/tools-flatlay.jpg", alt: "Salon scissors, brushes and colour tools arranged on sage linen", sample: true },
  { id: "s3", src: "/images/barber-pack/interior-warm.jpg", alt: "Elegant salon interior with round mirrors and soft lighting", sample: true },
  { id: "s4", src: "/images/barber-pack/products-shelf.jpg", alt: "Salon shelves stocked with hair care products", sample: true },
  { id: "s5", src: "/images/barber-pack/razor-detail.jpg", alt: "Backwash stations and product display in a bright salon", sample: true },
  { id: "s6", src: "/images/barber-pack/pole-street.jpg", alt: "Waiting lounge with leather seating and marble floors", sample: true },
];

function paragraphs(text: string): string[] {
  return text.split(/\n+/).map((p) => p.trim()).filter(Boolean);
}

export default function HairSalonVariant5({ site }: { site: SiteData }) {
  const name = site.businessName || "Your Hair Studio";
  const photos = site.galleryUrls.length
    ? site.galleryUrls.map((url, i) => ({ id: `p${i}`, src: url, alt: `${name} photo ${i + 1}`, sample: false }))
    : SAMPLE_PHOTOS;
  const paras = paragraphs(site.tagline || "");
  const picture = photos[2] ?? photos[0];

  return (
    <div className="@container bg-[#faf1ea] font-sans text-[#3b2417]">
      {/* masthead */ }
      <header className="border-b border-[#3b2417]/12 px-5 py-6 @md:px-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandMark logo={site.logoUrl ?? null} name={name} className="h-11 w-11 text-xs" />
            <div className="leading-tight">
              <p className="font-sans text-xl font-semibold">{name}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3b2417]/60">{site.area || "Your area"}</p>
            </div>
          </div>
          <WhatsAppActionForSite
            site={site}
            className="rounded-full bg-[#3b2417] px-5 py-2.5 text-sm font-semibold text-[#faf1ea] transition-transform hover:-translate-y-0.5"
            label="Say hello"
          />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 @md:px-10">
        {/* the letter */ }
        <section className="border-b border-dashed border-[#3b2417]/25 py-12 @md:py-16">
          <p className="mb-5 inline-flex -rotate-2 items-center gap-2 rounded-sm px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-sm" style={{ background: APRICOT }}>
            <PenLine className="h-3.5 w-3.5" aria-hidden /> A letter from the studio
          </p>
          <h1 className="font-sans text-[clamp(2rem,5.4cqw,4rem)] font-semibold leading-[1.05] break-words">
            {site.tagline || "Every salon has a story. This one starts with yours."}
          </h1>

          {paras.length === 0 ? (
            <button
              type="button"
              className="mt-8 w-full rounded-xl border-2 border-dashed border-[#3b2417]/30 bg-white/60 px-6 py-12 text-left"
            >
              <p className="flex items-center gap-2 font-sans text-xl font-semibold" style={{ color: APRICOT }}>
                <PenLine className="h-5 w-5" /> Write your letter here
              </p>
              <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-[#3b2417]/70">
                How did the studio begin? What do regulars love about it? What should a nervous first-timer know?
                Add it in the editor — this space is reserved for the real thing.
              </p>
            </button>
          ) : (
            <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-[#3b2417]/15 bg-white/70 p-6 shadow-[0_20px_50px_-30px_rgba(59,36,23,0.35)] @md:p-10">
              <p className="font-sans text-xl font-semibold italic">Dear {site.area || "friend"},</p>
              {paras.map((p, i) => (
                <p key={i} className="mt-4 font-sans text-[1.05rem] leading-relaxed text-[#3b2417]/85">{p}</p>
              ))}
              <p className="mt-6 font-sans text-lg font-semibold italic" style={{ color: APRICOT }}>
                — {name}
              </p>
              <SamplePill label="Sample letter — edit in 'Business'" className="mt-4" />
            </div>
          )}
        </section>

        {/* what we believe */ }
        <section className="border-b border-dashed border-[#3b2417]/25 py-12 @md:py-14">
          <div className="mb-10 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: APRICOT }}>
                Our values
              </p>
              <h2 className="mt-3 text-[clamp(1.9rem,4.4cqw,3.3rem)] font-semibold leading-tight">
                What we believe
              </h2>
            </div>
            {photos.some((p) => p.sample) && <SamplePill label="Sample story" className="text-[#3b2417]/70" />}
          </div>
          <div className="grid gap-6 @md:grid-cols-3">
            {[
              { icon: Leaf, t: "Healthy hair first", d: "We protect condition before chasing colour — always." },
              { icon: Phone, t: "Every texture welcome", d: "Coils, curls, waves and straight hair all get specialist care." },
              { icon: Sparkles, t: "Honest pricing", d: "Quoted before we start, explained if anything changes." },
            ].map((v, i) => (
              <div key={i} className="rounded-xl border border-[#3b2417]/15 bg-white p-6">
                <v.icon className="h-5 w-5 shrink-0 mb-3" style={{ color: APRICOT }} aria-hidden />
                <h3 className="text-lg font-semibold">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3b2417]/75">{v.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* interlude photo */ }
        {picture && (
          <figure className="border-b border-dashed border-[#3b2417]/25 py-10">
            <SmartImage src={picture.src} alt={picture.alt} className="aspect-[21/9] w-full rounded-xl border border-[#3b2417]/20" />
            <figcaption className="mt-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3b2417]/55">
              {picture.alt} {picture.sample && <SamplePill label="Sample photo" />}
            </figcaption>
          </figure>
        )}

        {/* menu */ }
        <section className="py-12 @md:py-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: APRICOT }}>
                Services
              </p>
              <h2 className="mt-3 text-[clamp(1.9rem,4.4cqw,3.3rem)] font-semibold leading-tight">
                What we offer
              </h2>
            </div>
            <SamplePill label="Sample prices" />
          </div>
          {site.services.length === 0 ? (
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 border border-dashed border-[#3b2417]/30 px-6 py-12 font-sans text-sm text-[#3b2417]/60 transition-colors hover:border-[#e0703f] hover:text-[#e0703f]"
            >
              <PenLine className="h-4 w-4" aria-hidden /> No services yet — add your menu
            </button>
          ) : (
            <ul className="space-y-4">
              {site.services.map((s) => (
                <li key={s.name} className="flex items-baseline justify-between gap-4 border-b border-[#3b2417]/10 pb-4 last:border-0 last:pb-0">
                  <span className="font-bold">{s.name}</span>
                  <span className="font-mono text-lg tabular-nums">{s.price || "—"}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* visit */ }
        <section className="border-t border-[#3b2417]/12 py-12 @md:py-16">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: APRICOT }}>
                Visit
              </p>
              <h2 className="mt-3 text-[clamp(1.9rem,4.4cqw,3.3rem)] font-semibold leading-tight">
                Come find us
              </h2>
            </div>
          </div>
          <div className="grid gap-5 @md:grid-cols-2">
            <div className="rounded-xl border border-[#3b2417]/25 bg-white p-6">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#3b2417]/60">
                <MapPin className="h-3.5 w-3.5" style={{ color: APRICOT }} /> Where
              </p>
              <p className="text-sm font-bold">{site.area || "Add your address"}</p>
              <p className="text-sm text-[#3b2417]/60">{site.area || "Your area"}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.area} ${site.area}`)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-extrabold underline decoration-[#e0703f] decoration-2 underline-offset-4"
              >
                Get directions <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="rounded-xl border border-[#3b2417]/25 bg-white p-6">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#3b2417]/60">
                <Clock className="h-3.5 w-3.5" style={{ color: APRICOT }} /> Hours
              </p>
              <p className="text-sm font-semibold">{site.hours || "Add opening hours"}</p>
              {site.phone && (
                <a href={telLink(site.phone)} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline">
                  <Phone className="h-3.5 w-3.5" /> {site.phone}
                </a>
              )}
              {site.email && (
                <a href={mailLink(site.email)} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline">
                  <Mail className="h-3.5 w-3.5" /> {site.email}
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#3b2417]/15 px-5 py-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#3b2417]/50 @md:px-10">
        {name} · Design: Market · MzansiSite demo — sample content until edited
      </footer>
    </div>
  );
}
