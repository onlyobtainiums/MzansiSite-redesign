"use client";

import { BadgeCheck, Clock, ImagePlus, Mail, MapPin, MessageCircle, Navigation, Phone, Scissors, Sparkles, ShieldCheck } from "lucide-react";
import type { SiteData } from "@/templates/types";
import type { ServiceItem } from "@/db/schema";

type ServiceWithCategory = ServiceItem & { category?: string };
import { mailLink, waLink } from "@/templates/types";
import { cn } from "./shared/cn";
import { SmartImage } from "./shared/SmartImage";
import { BrandMark, SamplePill, WhatsAppActionForSite } from "./shared/kit";

const CLAY = "#b65b2e";
const OLIVE = "#55602f";

const STANDARDS = [
  { icon: ShieldCheck, text: "Fresh blades and sanitised tools for every client" },
  { icon: Scissors, text: "One client in the chair at a time — never rushed" },
  { icon: Sparkles, text: "Price agreed before the cape goes on" },
  { icon: Clock, text: "Walk-ins welcome whenever the “open” board is up" },
];

const SAMPLE_PHOTOS = [
  { id: "s1", src: "/images/barber-pack/hero-chair.jpg", alt: "Empty leather barber chair in a moody shop interior", sample: true },
  { id: "s2", src: "/images/barber-pack/tools-flatlay.jpg", alt: "Flat lay of clippers, scissors, comb and straight razor", sample: true },
  { id: "s3", src: "/images/barber-pack/interior-warm.jpg", alt: "Sunlit barbershop interior with chairs and mirrors", sample: true },
  { id: "s4", src: "/images/barber-pack/razor-detail.jpg", alt: "Straight razor and shaving brush on a folded towel", sample: true },
  { id: "s5", src: "/images/barber-pack/products-shelf.jpg", alt: "Shelf of grooming products and folded towels", sample: true },
  { id: "s6", src: "/images/barber-pack/pole-street.jpg", alt: "Barber pole on a shopfront wall at golden hour", sample: true },
];

export default function BarberVariant3({ site }: { site: SiteData }) {
  const name = site.businessName || "Your Barbershop";
  const photos = site.galleryUrls.length
    ? site.galleryUrls.map((url, i) => ({ id: `p${i}`, src: url, alt: `${name} photo ${i + 1}`, sample: false }))
    : SAMPLE_PHOTOS;
  const feature = photos[2] ?? photos[0];
  const hoursRows = site.hours ? [{ id: "h1", label: "Hours", value: site.hours }] : [];

  return (
    <div className="@container/page min-h-screen bg-[#f4ecdc] font-savanna-sans text-[#2c2118]">
      {/* header */ }
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 pt-7 @md:px-8">
        <div className="flex items-center gap-3">
          <BrandMark logo={site.logoUrl ?? null} name={name} className="h-11 w-11 text-xs" />
          <div className="leading-tight">
            <p className="font-savanna text-lg font-semibold">{name}</p>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: OLIVE }}>
              {site.area || "Your area"}
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#2c2118]/70">
          <a href="#savanna-visit" className="hover:text-[#b65b2e]">Visit us</a>
          <a href="#savanna-standards" className="hover:text-[#b65b2e]">Standards</a>
          <a href="#savanna-services" className="hover:text-[#b65b2e]">Services</a>
        </nav>
      </header>

      {/* trust hero */ }
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 @md:px-8 @md:py-16 @lg:grid-cols-[1.15fr_1fr] @lg:items-center">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#55602f]/30 bg-white/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: OLIVE }}>
            A neighbourhood barbershop
          </p>
          <h1 className="font-savanna text-[clamp(2.1rem,5.4cqw,3.9rem)] font-semibold leading-[1.06]">
            Dependable cuts, the same warm welcome, every visit.
          </h1>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-[#2c2118]/75">
            {site.tagline || "Add a line about how you run your shop."} Here’s everything you need to plan a visit — hours, directions and how to reach us.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <WhatsAppActionForSite
              site={site}
              className="rounded-full bg-[#b65b2e] px-6 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5"
            />
            <a
              href="#savanna-visit"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#2c2118]/60 px-6 py-3 text-sm font-bold transition-colors hover:bg-[#2c2118] hover:text-[#f4ecdc]"
            >
              See opening hours
            </a>
          </div>
        </div>

        {/* identity card — business information first */ }
        <div className="rounded-2xl border border-[#2c2118]/10 bg-white p-6 shadow-[0_18px_50px_-24px_rgba(44,33,24,0.35)] @md:p-8">
          <div className="flex items-center gap-4 border-b border-dashed border-[#2c2118]/20 pb-5">
            <BrandMark logo={site.logoUrl ?? null} name={name} className="h-14 w-14 text-sm" />
            <div>
              <p className="font-savanna text-xl font-semibold">{name}</p>
              <p className="text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: OLIVE }}>
                {site.area}
              </p>
            </div>
          </div>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#b65b2e]" aria-hidden />
              <div>
                <dt className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#2c2118]/50">Address</dt>
                <dd className="text-[15px] font-semibold">
                  {site.area || "Add your address"}{site.area ? `, ${site.area}` : ""}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#b65b2e]" aria-hidden />
              <div>
                <dt className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#2c2118]/50">Phone</dt>
                <dd className="text-[15px] font-semibold">
                  {site.phone ? (
                    <a href={`tel:${site.phone.replace(/\D/g, "")}`} className="underline-offset-2 hover:underline">
                      {site.phone}
                    </a>
                  ) : (
                    "Not added yet"
                  )}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#b65b2e]" aria-hidden />
              <div>
                <dt className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#2c2118]/50">Email</dt>
                <dd className="text-[15px] font-semibold">
                  {site.email ? (
                    <a href={`mailto:${site.email.trim()}`} className="underline-offset-2 hover:underline">
                      {site.email}
                    </a>
                  ) : (
                    "Not added yet"
                  )}
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#b65b2e]" aria-hidden />
              <div>
                <dt className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#2c2118]/50">WhatsApp</dt>
                <dd className="text-[15px] font-semibold">
                  {site.whatsapp || "Not added yet"}
                </dd>
              </div>
            </div>
          </dl>
          <p className="mt-6 rounded-xl bg-[#f4ecdc] px-4 py-3 text-[12px] leading-relaxed text-[#2c2118]/70">
            Save our number — most clients just send a WhatsApp message to check the queue.
          </p>
        </div>
      </section>

      {/* plan your visit */ }
      <section id="savanna-visit" className="bg-[#ece1c9]">
        <div className="mx-auto max-w-6xl px-5 py-14 @md:px-8">
          <h2 className="font-savanna text-[clamp(1.6rem,3.6cqw,2.4rem)] font-semibold">Plan your visit</h2>
          <div className="mt-8 grid gap-5 @md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="mb-4 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: CLAY }}>
                <Clock className="h-4 w-4" /> Opening hours
              </p>
              <ul className="space-y-3">
                {hoursRows.map((h) => (
                  <li key={h.id} className="flex justify-between gap-4 border-b border-[#2c2118]/8 pb-3 text-sm last:border-0 last:pb-0">
                    <span className="font-semibold">{h.label}</span>
                    <span className="text-[#2c2118]/70">{h.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="mb-4 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: CLAY }}>
                <MapPin className="h-4 w-4" /> Where to find us
              </p>
              <p className="font-savanna text-lg font-semibold">{site.area || "Add your address"}</p>
              <p className="text-sm text-[#2c2118]/70">{site.area || "Your area"}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.area} ${site.area}`)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold underline decoration-[#b65b2e] decoration-2 underline-offset-4"
              >
                <Navigation className="h-3.5 w-3.5" /> Get directions
              </a>
              <p className="mt-4 text-[12px] leading-relaxed text-[#2c2118]/60">Parking nearby · look for the barber pole.</p>
            </div>
            <div className="rounded-2xl p-6 text-white shadow-sm" style={{ background: OLIVE }}>
              <p className="mb-4 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/75">
                <MessageCircle className="h-4 w-4" /> Talk to us
              </p>
              <p className="text-sm leading-relaxed text-white/85">
                Questions about styles, queues or kids’ cuts? A message is the fastest way to reach the chair.
              </p>
              <WhatsAppActionForSite
                site={site}
                className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-extrabold"
                iconClassName="h-4 w-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* standards + credentials */ }
      <section id="savanna-standards" className="mx-auto grid max-w-6xl gap-10 px-5 py-14 @md:px-8 @md:py-20 @lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <h2 className="font-savanna text-[clamp(1.5rem,3.2cqw,2.2rem)] font-semibold">Standards at the chair</h2>
            <SamplePill label="Sample list" />
          </div>
          <ul className="space-y-4">
            {STANDARDS.map((s, i) => (
              <li key={i} className="flex items-start gap-4 rounded-2xl border border-[#2c2118]/10 bg-white px-5 py-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full" style={{ background: "#f4ecdc", color: CLAY }}>
                  <s.icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <p className="pt-2 text-[15px] font-semibold">{s.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[12px] text-[#2c2118]/55">Replace this sample list with your own house rules in the editor.</p>
        </div>

        <div>
          <h2 className="mb-6 font-savanna text-[clamp(1.5rem,3.2cqw,2.2rem)] font-semibold">Credentials & memberships</h2>
          <div className="rounded-2xl border-2 border-dashed border-[#55602f]/40 bg-white/60 p-8">
            <BadgeCheck className="h-8 w-8" style={{ color: CLAY }} aria-hidden />
            <p className="mt-3 font-savanna text-lg font-semibold">Nothing added yet — and that’s honest.</p>
            <p className="mt-2 text-sm leading-relaxed text-[#2c2118]/70">
              This design only shows real qualifications, certificates or memberships that you add yourself. It will never invent years of experience, awards or five-star reviews.
            </p>
          </div>
          {feature && (
            <figure className="mt-8">
              <SmartImage src={feature.src} alt={feature.alt} className="aspect-[16/10] w-full rounded-2xl" />
              <figcaption className="mt-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2c2118]/55">
                {feature.alt} {feature.sample && <SamplePill label="Sample photo" />}
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      {/* services summary */ }
      <section id="savanna-services" className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 @md:px-8">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <h2 className="font-savanna text-[clamp(1.5rem,3.2cqw,2.2rem)] font-semibold">What we do</h2>
            <SamplePill label="Sample prices" />
          </div>
          <div className="grid gap-x-12 @md:grid-cols-2">
            {(site.services as ServiceWithCategory[]).map((s) => (
              <div key={s.name} className="flex items-baseline justify-between gap-4 border-b border-[#2c2118]/10 py-3.5">
                <p className="text-[15px] font-semibold">
                  {s.name}<span className="ml-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2c2118]/45">{s.category}</span>
                </p>
                <p className="font-savanna text-lg font-semibold" style={{ color: CLAY }}>
                  {s.price}
                </p>
              </div>
            ))}
            {site.services.length === 0 && (
              <button type="button" className="col-span-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#2c2118]/25 py-10 text-sm font-bold text-[#2c2118]/60">
                <ImagePlus className="h-4 w-4" /> Add your services in the editor
              </button>
            )}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2c2118]/55 @md:px-8">
        <span>{name} · {site.area}</span>
        <span>Design: Savanna · MzansiSite demo</span>
      </footer>
    </div>
  );
}
