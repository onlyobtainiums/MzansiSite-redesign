"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, Droplet, ShieldCheck, Wrench, Zap } from "lucide-react";
import type { SiteData } from "../../../types";
import { displayPhone, waLink } from "../../../types";
import { LogoBlock, SocialRow, WhatsAppFab } from "../../../shared";
import { Up } from "../../../Reveal";
import { ImageWithFallback } from "../shared/ImageWithFallback";

/* Forge — Plumber V6: "Booking-First".
   Sticky WhatsApp booking bar at top (always visible), minimal hero below.
   Conversion-optimised CTA hierarchy — primary CTA is always on screen.
   Structurally different from V1 Flow: V1 has hero first with CTA below;
   V6 has the booking/WA bar pinned at top, hero is secondary banner.
   Shapes: high-contrast pill shapes, rounded-full buttons.
   Industry function: emergency intake — issue type, address, urgency via WhatsApp.
   This is an enquiry flow, not a functioning booking system — no payment,
   no calendar, no reservation confirmation. */
export default function PlumberV6BookingFirst({ site }: { site: SiteData }) {
  const gallery = site.galleryUrls.slice(0, 6);
  const quoteLink = waLink(
    site.whatsapp,
    `Hi ${site.businessName}! I need a plumbing quote for my home or business. Emergency: ${site.hours.includes("24/7") ? "yes" : "no"}.`
  );
  const callHref = `tel:+${site.phone?.replace(/\D/g, "").replace(/^0/, "27") ?? site.whatsapp.replace(/\D/g, "").replace(/^0/, "27")}`;

  return (
    <>
      {/* ——— STICKY BOOKING BAR — always visible at top ——— */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#2dd4bf] text-[#0f4c5c] shadow-[0_10px_30px_-10px_rgba(45,212,191,0.6)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-4 bp-md:flex-row bp-md:items-center bp-md:py-3">
          <Up className="flex items-center gap-3">
            <Phone className="h-5 w-5 fill-[#0f4c5c]" />
            <div>
              <p className="text-[10px] font-bold tracking-[0.14em] uppercase">Emergency call-out</p>
              <a href={callHref} className="font-display text-sm font-bold tracking-tight hover:underline">
                {displayPhone(site.whatsapp)}
              </a>
            </div>
          </Up>
          <a
            href={quoteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#0f4c5c] px-6 py-3 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#f0fdfa] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#f0fdfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf]"
          >
            <ArrowRight className="h-4 w-4" /> Book now on WhatsApp
          </a>
        </div>
      </div>

      <WhatsAppFab site={site} accent="#2dd4bf" />

      <div className="@container/page min-h-screen bg-[#f0fdfa] font-sans text-[#0f4c5c] pt-24 bp-md:pt-16">
        {/* ——— Top bar — minimal, below sticky bar ——— */}
        <div className="bg-[#f0fdfa] px-4 py-2">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Droplet className="h-4 w-4 fill-[#2dd4bf]" /> {site.hours}
            </span>
          </div>
        </div>

        {/* ——— Nav — minimal, below sticky bar ——— */}
        <header className="sticky top-24 z-40 border-b border-[#2dd4bf]/30 bg-[#f0fdfa]/90 backdrop-blur-md text-[#0f4c5c]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#services" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 border-2 border-[#2dd4bf] bg-[#2dd4bf] font-display text-[#0f4c5c]" />
              <span className="font-display break-words text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#services" className="text-[#2dd4bf]">Services</a>
              <a href="#coverage" className="text-[#0f4c5c]/60 transition-colors hover:text-[#2dd4bf]">Coverage Area</a>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {}}
                className="hidden grid h-10 w-10 place-items-center border border-[#0f4c5c]/20 bp-md:hidden"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </header>

        {/* ——— Hero as secondary banner — minimal ——— */}
        <section id="top" className="relative bg-[#f0fdfa] text-[#0f4c5c] py-16">
          <div className="relative mx-auto max-w-6xl px-5">
            <Up>
              <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#2dd4bf] pl-3 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[#2dd4bf] uppercase bg-[#2dd4bf]/20">
                <Droplet className="h-4 w-4" /> {site.area} · {site.hours}
              </p>
            </Up>
            <Up delay={0.08}>
              <h1 className="font-display text-[min(2.5rem,calc(100cqw/10))] font-extrabold leading-[0.95] tracking-tight uppercase break-words">
                Dependable.<br />
                <span className="text-[#2dd4bf]">Plumbing you can trust.</span>
              </h1>
            </Up>
            <Up delay={0.16}>
              <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-[#334155]">{site.tagline}</p>
            </Up>
            <Up delay={0.24} className="mt-10">
              <div className="bg-white border border-[#2dd4bf]/20 p-8 rounded-3xl shadow-sm">
                <ImageWithFallback
                  src={site.heroImageUrl}
                  alt={site.businessName}
                  className="w-full h-64 object-cover bp-md:h-80"
                />
                <div className="mt-4">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#2dd4bf] uppercase">Same-day service</p>
                  <p className="font-display text-sm font-bold text-[#0f4c5c]">{site.area} · {site.hours}</p>
                </div>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Services — below hero ——— */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#2dd4bf] pl-3 py-1 mb-3 text-[11px] font-bold tracking-[0.3em] text-[#2dd4bf] uppercase">
              <Droplet className="h-4 w-4" /> What we fix
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase bp-md:text-6xl">
              Services & <span className="text-[#334155]">rates</span>
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-4 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {site.services.map((service, i) => (
              <Up key={service.name} delay={i * 0.06}>
                <a
                  href={waLink(site.whatsapp, `Hi ${site.businessName}! I need help with: ${service.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col border-2 border-[#2dd4bf]/30 bg-white p-6 rounded-full transition-all duration-300 hover:border-[#2dd4bf] hover:bg-[#f0fdfa]/50 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf]"
                  aria-label={`Request ${service.name} via WhatsApp`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <span className="font-display text-4xl text-[#334155]/10">{String(i + 1).padStart(2, "0")}</span>
                    <span className="bg-[#2dd4bf] px-3 py-1.5 font-display text-xs font-extrabold text-[#0f4c5c] uppercase">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-extrabold tracking-tight uppercase break-words">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{service.description}</p>
                  )}
                  <p className="mt-auto flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#64748b] uppercase transition-colors group-hover:text-[#2dd4bf]">
                    Book this <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Contact ——— */}
        <section id="coverage" className="border-t border-[#2dd4bf]/20 bg-[#0f4c5c]">
          <div className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#2dd4bf] uppercase">Talk to us</p>
              <h2 className="font-display text-3xl font-extrabold tracking-tight uppercase break-words bp-md:text-4xl">
                Based in {site.area.split(",")[0]}
              </h2>
            </Up>
            <div className="mt-10 grid grid-cols-1 gap-6 bp-md:grid-cols-2">
              <div className="border border-[#2dd4bf]/30 bg-[#1e293b] p-8 rounded-full">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#2dd4bf] uppercase">Phone</p>
                <a
                  href={callHref}
                  className="mt-2 flex items-center gap-3 transition-colors hover:text-[#2dd4bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf]"
                  aria-label="Call Dlamini Plumbing"
                >
                  <Phone className="h-5 w-5 shrink-0 text-[#2dd4bf]" />
                  <span className="font-display text-xl font-extrabold break-words">{displayPhone(site.whatsapp)}</span>
                </a>
              </div>
              <div className="border border-[#2dd4bf]/30 bg-[#1e293b] p-8 rounded-full">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#2dd4bf] uppercase">WhatsApp</p>
                <a
                  href={quoteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-3 bg-[#2dd4bf] px-4 py-3 rounded-full font-display text-sm font-bold text-[#0f4c5c] uppercase transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf]"
                  aria-label={`Message ${site.businessName.split(" ")[0]} via WhatsApp`}
                >
                  Message {site.businessName.split(" ")[0]}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ——— Gallery — small grid at bottom ——— */}
        <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#2dd4bf] uppercase">Recent jobs</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase bp-md:text-6xl">Gallery</h2>
          </Up>
          <div className="grid grid-cols-1 gap-4 bp-sm:grid-cols-2 bp-lg:grid-cols-4">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.05}>
                <div className="relative aspect-square w-full overflow-hidden rounded-full border-2 border-[#2dd4bf]/30 bg-[#0f4c5c]">
                  <ImageWithFallback
                    src={url}
                    alt={`${site.businessName} project ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#2dd4bf]/20 bg-[#0f4c5c] px-5 py-10 text-[#f0fdfa]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="border-2 border-[#2dd4bf] bg-[#2dd4bf] font-display text-[#0f4c5c]" />
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">{site.businessName}</span>
            </div>
            <SocialRow site={site} iconClassName="text-[#94a3b8]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#64748b] uppercase">
              Powered by <span className="text-[#2dd4bf]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
