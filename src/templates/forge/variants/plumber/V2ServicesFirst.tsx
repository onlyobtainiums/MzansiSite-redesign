"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, Droplet, Wrench, X, Zap } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../../../types";
import { displayPhone, waLink } from "../../../types";
import { LogoBlock, SocialRow, WhatsAppFab } from "../../../shared";
import { Up } from "../../../Reveal";
import { ImageWithFallback } from "../shared/ImageWithFallback";

/* Forge — Plumber V2: "Services-First".
   Service catalogue grid leads above the fold; hero is a secondary banner below.
   Water-inspired palette (deep blue + teal), soft rounded shapes.
   Per-service WhatsApp CTAs on every card. Coverage area section prominent.
   Structurally different from V1 Flow: V1 is hero-first with booking CTA;
   V2 is services-first with hero as supporting banner. */
export default function PlumberV2ServicesFirst({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const quoteLink = waLink(
    site.whatsapp,
    `Hi ${site.businessName}! I need a plumbing quote for my home or business.`
  );
  const callHref = `tel:+${site.phone?.replace(/\D/g, "").replace(/^0/, "27") ?? site.whatsapp.replace(/\D/g, "").replace(/^0/, "27")}`;

  return (
    <>
      <WhatsAppFab site={site} accent="#2dd4bf" />

      <div className="@container/page min-h-screen bg-[#f0fdfa] font-sans text-[#0f4c5c]">
        {/* ——— Top bar — water teal, service focused ——— */}
        <div className="bg-[#2dd4bf] px-4 py-2">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Droplet className="h-4 w-4 fill-[#0f4c5c]" /> {site.hours}
            </span>
            <a href={callHref} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav — soft corners, water palette ——— */}
        <header className="sticky top-0 z-40 border-b border-[#2dd4bf]/30 bg-[#f0fdfa]/90 backdrop-blur-md text-[#0f4c5c]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#services" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 border-2 border-[#2dd4bf] bg-[#2dd4bf] font-display text-[#0f4c5c]" />
              <span className="truncate font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#services" className="text-[#0f4c5c]">Services</a>
              <a href="#coverage" className="text-[#0f4c5c]/60 transition-colors hover:text-[#2dd4bf]">Coverage Area</a>
              <a href="#book" className="text-[#0f4c5c]/60 transition-colors hover:text-[#2dd4bf]">Book a Visit</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#2dd4bf] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#0f4c5c] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#f0fdfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf] bp-sm:block"
              >
                Book a visit
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center border border-[#2dd4bf]/20 bp-md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf]"
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#2dd4bf]/10 px-5 py-4 bp-md:hidden">
              {["services", "coverage", "book"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#0f4c5c]/70"
                >
                  {id.replace("coverage", "coverage area").replace("book", "book a visit")}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— SERVICES FIRST — rounded water-drop cards ——— */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 text-center @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#64748b] uppercase">What we fix</p>
            <h2 className="font-display text-[min(2.5rem,calc(100cqw/11))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/11))]">
              Services & <span className="text-[#2dd4bf]">rates</span>
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-4 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {site.services.map((service, i) => (
              <Up key={service.name} delay={i * 0.06}>
                <a
                  href={waLink(site.whatsapp, `Hi ${site.businessName}! I need help with: ${service.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col border-2 border-[#2dd4bf]/30 bg-white p-6 rounded-3xl transition-all duration-300 hover:border-[#2dd4bf] hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf]"
                  aria-label={`Request ${service.name} via WhatsApp`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <Droplet className="h-6 w-6 text-[#2dd4bf]" />
                    <span className="bg-[#2dd4bf]/10 px-3 py-1.5 rounded-full font-display text-xs font-bold tracking-[0.14em] text-[#0f4c5c] uppercase">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight uppercase break-words">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{service.description}</p>
                  )}
                  <p className="mt-auto flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#94a3b8] uppercase transition-colors group-hover:text-[#2dd4bf]">
                    Book this <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Hero as secondary banner — water-themed framing ——— */}
        <section id="top" className="relative bg-[#f0fdfa] text-[#0f4c5c]">
          <div className="relative mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
            <Up>
              <p className="mb-4 inline-flex items-center justify-center gap-2 border border-[#2dd4bf]/30 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.22em] text-[#2dd4bf] uppercase bg-white">
                <Droplet className="h-4 w-4" /> {site.area} · {site.hours}
              </p>
            </Up>
            <Up delay={0.08}>
              <h1 className="font-display text-[min(3rem,calc(100cqw/10))] font-extrabold leading-[0.95] tracking-tight uppercase break-words">
                Dependable.<br />
                <span className="text-[#2dd4bf]">Plumbing you can trust.</span>
              </h1>
            </Up>
            <Up delay={0.16}>
              <p className="mt-6 max-w-lg mx-auto text-base leading-relaxed text-[#334155]">{site.tagline}</p>
            </Up>
            <Up delay={0.24} className="mt-10">
              <div className="bg-white border border-[#2dd4bf]/20 p-8 rounded-3xl shadow-sm">
                <ImageWithFallback
                  src={site.heroImageUrl}
                  alt={site.businessName}
                  className="w-full h-64 object-cover rounded-2xl bp-md:h-80"
                />
                <div className="mt-4">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#2dd4bf] uppercase">Same-day service</p>
                  <p className="font-display text-sm font-bold text-[#0f4c5c]">{site.area} · {site.hours}</p>
                </div>
              </div>
            </Up>
            <Up delay={0.32} className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#2dd4bf] px-8 py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#0f4c5c] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f0fdfa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf]"
              >
                Book a plumber
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={callHref}
                className="inline-flex items-center gap-3 border-2 border-[#2dd4bf] px-8 py-4 rounded-full text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#0f4c5c] hover:text-[#0f4c5c] bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf]"
                aria-label="Call Dlamini Plumbing"
              >
                <Phone className="h-4.5 w-4.5" /> Call now
              </a>
            </Up>
          </div>
        </section>

        {/* ——— Coverage area — map-style layout ——— */}
        <section id="coverage" className="border-t border-[#2dd4bf]/20 bg-[#0f4c5c]/5">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 bp-md:grid-cols-2 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#64748b] uppercase">Coverage area</p>
              <h2 className="font-display text-[min(2.25rem,calc(100cqw/15))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/15))]">
                Based in {site.area.split(",")[0]},
                <br />
                <span className="text-[#2dd4bf]">serving every suburb nearby.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {[site.area.split(",")[0], "…and surrounds", "Same-day plumbing", "No call-out fee"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="flex items-center gap-1.5 border border-[#2dd4bf]/30 bg-white px-3.5 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#2dd4bf]" /> {chip}
                    </span>
                  ),
                )}
              </div>
            </Up>
            <Up delay={0.15}>
              <div className="border-2 border-[#2dd4bf] bg-white p-8 rounded-3xl text-[#0f4c5c] shadow-xl">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#2dd4bf] uppercase">Talk to us</p>
                <div className="mt-6 space-y-4">
                  <a
                    href={callHref}
                    className="flex items-center gap-4 transition-colors hover:text-[#2dd4bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf]"
                    aria-label="Call Dlamini Plumbing"
                  >
                    <Phone className="h-5 w-5 shrink-0 text-[#2dd4bf]" />
                    <span className="font-display text-[min(1.5rem,calc(100cqw/17))] font-extrabold break-words">
                      {displayPhone(site.whatsapp)}
                    </span>
                  </a>
                  <div className="flex items-center gap-4 text-[#64748b]">
                    <Clock className="h-5 w-5 shrink-0 text-[#2dd4bf]" />
                    <span className="text-sm font-medium">{site.hours}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#64748b]">
                    <MapPin className="h-5 w-5 shrink-0 text-[#2dd4bf]" />
                    <span className="text-sm font-medium">{site.area}</span>
                  </div>
                </div>
                <a
                  href={quoteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-3 bg-[#2dd4bf] py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#0f4c5c] uppercase transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf]"
                >
                  WhatsApp {site.businessName.split(" ")[0]} now
                </a>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#2dd4bf]/20 bg-[#0f4c5c]/5 px-5 py-10 text-[#0f4c5c]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="border-2 border-[#2dd4bf] bg-[#2dd4bf] font-display text-[#0f4c5c]" />
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">{site.businessName}</span>
            </div>
            <SocialRow site={site} iconClassName="text-[#64748b]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#94a3b8] uppercase">
              Powered by <span className="text-[#2dd4bf]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
