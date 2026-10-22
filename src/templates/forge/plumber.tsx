"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Wrench, X, Droplet } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../shared";
import { Up } from "../Reveal";

/* Forge — Plumber: "Flow".
   Water-inspired, clean, dependable. Deep blue + teal, rounded soft shapes,
   booking and service-area focused — not a colour swap of the electrician. */

export default function Plumber({ site }: { site: SiteData }) {
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
        {/* ——— Top bar — water teal, booking first ——— */}
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

        {/* ——— Nav — white, teal underline, soft corners ——— */}
        <header className="sticky top-0 z-40 border-b border-[#2dd4bf]/30 bg-[#f0fdfa]/90 backdrop-blur-md text-[#0f4c5c]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 border-2 border-[#2dd4bf] bg-[#2dd4bf] font-display text-[#0f4c5c]" />
              <span className="truncate font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#services" className="text-[#0f4c5c]/60 transition-colors hover:text-[#2dd4bf]">Services</a>
              <a href="#coverage" className="text-[#0f4c5c]/60 transition-colors hover:text-[#2dd4bf]">Coverage Area</a>
              <a href="#book" className="text-[#0f4c5c]/60 transition-colors hover:text-[#2dd4bf]">Book a Visit</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#2dd4bf] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#0f4c5c] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#f0fdfa] bp-sm:block"
              >
                Book a visit
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center border border-[#2dd4bf]/20 bp-md:hidden"
                aria-label="Menu"
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

        {/* ——— Hero — centered, wave divider, booking CTA front and centre ——— */}
        <section id="top" className="relative bg-[#f0fdfa] text-[#0f4c5c]">
          {/* Wave divider at top */}
          <svg
            className="w-full h-12 text-[#2dd4bf] transform -flip-vertical"
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M0 192C144 192 288 160 432 144C576 128 720 128 864 139.2C1008 150.4 1152 176 1296 185.6C1440 195.2 1584 192 1728 192L1728 320L1440 320C1296 320 1152 320 1008 320C864 320 720 320 576 320C432 320 288 320 144 320L0 320Z"
              fill="currentColor"
            />
          </svg>

          <div className="relative mx-auto max-w-6xl px-5 py-20 bp-md:py-28 text-center">
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
            <Up delay={0.24}>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={quoteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-[#2dd4bf] px-8 py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#0f4c5c] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f0fdfa]"
                >
                  Book a plumber
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href={callHref}
                  className="inline-flex items-center gap-3 border-2 border-[#2dd4bf] px-8 py-4 rounded-full text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#0f4c5c] hover:text-[#0f4c5c] bg-white"
                >
                  <Phone className="h-4.5 w-4.5" /> Call now
                </a>
              </div>
            </Up>
            <Up delay={0.32}>
              <div className="mt-12 grid grid-cols-1 gap-4 bp-md:grid-cols-4">
                {[
                  [site.area.split(",")[0], "local plumber"],
                  [site.services.length + " services", "fixed-price"],
                  [site.hours, "available"],
                  ["WhatsApp", "instant booking"],
                ].map(([big, small]) => (
                  <div className="@container p-6 rounded-2xl bg-white border border-[#2dd4bf]/20 shadow-sm">
                    <p className="font-display text-[min(1.5rem,calc(100cqw/8))] font-extrabold text-[#0f4c5c] break-words">{big}</p>
                    <p className="mt-1 text-[10px] font-bold tracking-[0.18em] text-[#64748b] uppercase">{small}</p>
                  </div>
                ))}
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Hero image — right side, water-themed framing ——— */}
        <section className="bg-[#f0fdfa]">
          <div className="relative mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
            <div className="grid grid-cols-1 gap-10 bp-md:grid-cols-2 bp-md:items-center">
              <Up className="order-2 bp-md:order-1">
                <div className="relative group">
                  <div className="absolute -inset-2 border-2 border-[#2dd4bf]/40 rounded-3xl" aria-hidden />
                  <img
                    src={site.heroImageUrl}
                    alt={site.businessName}
                    className="aspect-[4/5] w-full object-cover rounded-3xl overflow-hidden shadow-xl"
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur px-5 py-3 rounded-2xl border border-[#2dd4bf]/30">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-[#2dd4bf] uppercase">
                        Same-day service
                      </p>
                      <p className="font-display text-sm font-bold text-[#0f4c5c]">
                        {site.area} · {site.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </Up>
              <Up delay={0.1} className="order-1 bp-md:order-2">
                <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#64748b] uppercase">Why homeowners trust us</p>
                <h2 className="font-display text-[min(2rem,calc(100cqw/13))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/13))]">
                  No call-out fees.<br />
                  <span className="text-[#2dd4bf]">Upfront pricing.</span>
                </h2>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-[#64748b]">
                  Every job is quoted in writing before we start. {site.businessName} serves {site.area} — message us on WhatsApp for instant booking.
                  {site.isDemo && site.guarantee && <><br/><DemoBadge className="mt-3" /> <span className="text-[#64748b] text-xs">Demo guarantee: {site.guarantee}</span></>}
                </p>
              </Up>
            </div>
          </div>
        </section>

        {/* ——— Services — rounded water-drop cards ——— */}
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
                  className="group flex h-full flex-col border-2 border-[#2dd4bf]/30 bg-white p-6 rounded-3xl transition-all duration-300 hover:border-[#2dd4bf] hover:shadow-xl hover:-translate-y-1"
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
                  <a href={callHref} className="flex items-center gap-4 transition-colors hover:text-[#2dd4bf]">
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
                  className="mt-8 flex items-center justify-center gap-3 bg-[#2dd4bf] py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#0f4c5c] uppercase transition-all duration-300 hover:-translate-y-0.5"
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
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">
                {site.businessName}
              </span>
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
