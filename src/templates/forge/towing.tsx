"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Star, X, Truck } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../shared";
import { Up } from "../Reveal";

/* Forge — Towing: "Flatbed".
   Flatbed truck imagery, emergency red + white,
   sharp corners, 24/7 breakdown focus. */

export default function Towing({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const quoteLink = waLink(
    site.whatsapp,
    `Hi ${site.businessName}! I need a breakdown tow or roadside assistance.`
  );
  const callHref = `tel:+${site.phone?.replace(/\D/g, "").replace(/^0/, "27") ?? site.whatsapp.replace(/\D/g, "").replace(/^0/, "27")}`;

  return (
    <>
      <WhatsAppFab site={site} accent="#ef4444" />

      <div className="@container/page min-h-screen bg-[#fafafa] font-sans text-[#111827]">
        {/* ——— Top bar — emergency red ——— */}
        <div className="bg-[#ef4444] px-4 py-2">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4 fill-[#fafafa]" /> {site.hours}
            </span>
            <a href={callHref} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav — white, red underline ——— */}
        <header className="sticky top-0 z-40 border-b border-[#ef4444]/30 bg-[#fafafa]/90 backdrop-blur-md text-[#111827]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 border-2 border-[#ef4444] bg-[#ef4444] font-display text-[#111827]" />
              <span className="truncate font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#services" className="text-[#111827]/60 transition-colors hover:text-[#ef4444]">Services</a>
              <a href="#emergency" className="text-[#111827]/60 transition-colors hover:text-[#ef4444]">24/7 emergency</a>
              <a href="#areas" className="text-[#111827]/60 transition-colors hover:text-[#ef4444]">Areas</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#ef4444] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#111827] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#fafafa] bp-sm:block"
              >
                Request tow
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center border border-[#fafafa]/20 bp-md:hidden"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#fafafa]/10 px-5 py-4 bp-md:hidden">
              {["services", "emergency", "areas"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#111827]/70"
                >
                  {id.replace("emergency", "24/7 emergency")}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— Hero — emergency flatbed imagery ——— */}
        <section id="top" className="relative bg-[#fafafa] text-[#111827]">
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-24 pt-14 bp-md:grid-cols-2 bp-md:gap-14 bp-md:pt-28">
            {/* Left: emergency copy */}
            <div className="@container order-2 bp-md:order-1">
              <Up>
                <p className="mb-4 inline-flex items-center justify-center gap-2 border-2 border-[#ef4444] px-4 py-1.5 rounded-lg text-[11px] font-bold tracking-[0.22em] text-[#ef4444] uppercase bg-white">
                  <Truck className="h-4 w-4" /> {site.area} · {site.hours}
                </p>
              </Up>
              <Up delay={0.08}>
                <h1 className="font-display text-[min(2.75rem,calc(100cqw/9))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/9))]">
                  Breakdown.<br />
                  <span className="text-[#ef4444]">We’re on the way.</span>
                </h1>
              </Up>
              <Up delay={0.16}>
                <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-[#4b5563]">{site.tagline}</p>
              </Up>
              <Up delay={0.24}>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={quoteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-[#ef4444] px-8 py-4 rounded-lg font-display text-sm font-bold tracking-[0.14em] text-[#fafafa] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#fafafa]"
                  >
                    Request tow
                    <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href={callHref}
                    className="inline-flex items-center gap-3 border-2 border-[#ef4444]/30 px-8 py-4 rounded-lg text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#ef4444] hover:text-[#ef4444] bg-white"
                  >
                    <Phone className="h-4.5 w-4.5" /> Call now
                  </a>
                </div>
              </Up>
              <Up delay={0.32}>
                <div className="mt-10 grid grid-cols-1 gap-4 bp-md:grid-cols-3">
                  {[
                    ["Local tow", "R550"],
                    ["Flatbed", "from R850"],
                    ["Jump start", "R250"],
                  ].map(([label, price]) => (
                    <div key={label} className="@container p-6 rounded-xl bg-white border border-[#e5e7eb] shadow-sm">
                      <p className="font-display text-[min(1.5rem,calc(100cqw/8))] font-extrabold text-[#ef4444] break-words">{price}</p>
                      <p className="mt-1 text-[10px] font-bold tracking-[0.18em] text-[#6b7280] uppercase">{label}</p>
                    </div>
                  ))}
                </div>
              </Up>
            </div>

            {/* Right: flatbed imagery */}
            <Up delay={0.15} className="order-1 bp-md:order-2 relative">
              <div className="relative group">
                <div className="absolute -inset-2 border-2 border-[#ef4444]/40 rounded-xl" aria-hidden />
                <img
                  src={site.heroImageUrl}
                  alt={site.businessName}
                  className="aspect-[4/5] w-full object-cover rounded-xl overflow-hidden shadow-xl"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur px-5 py-3 rounded-lg border border-[#ef4444]/30">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#ef4444] uppercase">24/7 breakdown</p>
                    <p className="font-display text-sm font-bold text-[#111827]">{site.area} · {site.hours}</p>
                  </div>
                </div>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Emergency — dark red panel ——— */}
        <section id="emergency" className="border-t border-[#e5e7eb] bg-[#fef2f2]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-20 bp-md:grid-cols-[auto_1fr_auto] bp-md:py-28">
            <Up>
              <ShieldCheck className="h-16 w-16 text-[#ef4444]" strokeWidth={1.5} />
            </Up>
            <Up delay={0.1} className="@container">
              <h2 className="font-display text-[min(1.875rem,calc(100cqw/14))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/14))]">
                24/7 breakdown recovery
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#4b5563]">
                {site.businessName} serves {site.area} with flatbed transport, jump starts, flat tyre changes and accident recovery.
                Day or night, we’re on the way.
                {site.isDemo && site.guarantee && <><br/><DemoBadge className="mt-2" /> <span className="text-[#4b5563] text-xs">Demo guarantee: {site.guarantee}</span></>}
              </p>
            </Up>
            <Up delay={0.2}>
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#ef4444] px-7 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#111827] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#fafafa]"
              >
                Request emergency tow <ArrowRight className="h-4.5 w-4.5" />
              </a>
            </Up>
          </div>
        </section>

        {/* ——— Services — sharp cards ——— */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 flex flex-wrap items-end justify-between gap-4 @container">
            <div>
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#6b7280] uppercase">Towing services</p>
              <h2 className="font-display text-[min(2.5rem,calc(100cqw/11))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/11))]">
                Services & <span className="text-[#6b7280]">rates</span>
              </h2>
            </div>
          </Up>
          <div className="grid grid-cols-1 gap-4 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {site.services.map((service, i) => (
              <Up key={service.name} delay={i * 0.06}>
                <a
                  href={waLink(site.whatsapp, `Hi ${site.businessName}! I need help with: ${service.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col border-2 border-[#e5e7eb] bg-white p-7 rounded-lg transition-all duration-300 hover:border-[#ef4444] hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-5">
                    <span className="font-display text-4xl font-extrabold text-[#f3f4f6]/40 transition-colors group-hover:text-[#ef4444]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="bg-[#fee2e2] px-3 py-1.5 rounded-full font-display text-xs font-bold tracking-[0.14em] text-[#111827] uppercase">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight uppercase break-words">{service.name}</h3>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">{service.description}</p>
                  )}
                  <p className="mt-auto flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#6b7280] uppercase transition-colors group-hover:text-[#ef4444]">
                    Book this <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Gallery — flatbed shots ——— */}
        <section className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#ef4444] uppercase">Recoveries</p>
            <h2 className="font-display text-[min(2.25rem,calc(100cqw/13))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3.5rem,calc(100cqw/13))]">
              On the road
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-5 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.05}>
                <div className="group relative overflow-hidden border-2 border-[#e5e7eb] bg-[#fef2f2] rounded-xl">
                  <img
                    src={url}
                    alt={`${site.businessName} recovery ${i + 1}`}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 bg-white/90 px-3 py-1 rounded-full font-display text-[10px] font-extrabold tracking-[0.14em] text-[#111827] uppercase">
                    Job {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Areas + contact — red contact card ——— */}
        <section id="areas" className="border-t border-[#e5e7eb] bg-[#fee2e2]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 bp-md:grid-cols-2 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#dc2626] uppercase">Service areas</p>
              <h2 className="font-display text-[min(2.25rem,calc(100cqw/16))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/16))]">
                Based in {site.area.split(",")[0]},
                <br />
                <span className="text-[#dc2626]">towing everywhere nearby.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {[site.area.split(",")[0], "Breakdown tow", "Flatbed transport", "Accident recovery"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="flex items-center gap-1.5 border border-[#fca5a5]/30 bg-white px-3.5 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#ef4444]" /> {chip}
                    </span>
                  ),
                )}
              </div>
            </Up>
            <Up delay={0.15}>
              <div className="border border-[#ef4444] bg-white p-8 rounded-xl text-[#111827] shadow-xl">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#ef4444] uppercase">Talk to us</p>
                <div className="mt-6 space-y-4">
                  <a href={callHref} className="flex items-center gap-4 transition-colors hover:text-[#ef4444]">
                    <Phone className="h-5 w-5 shrink-0 text-[#ef4444]" />
                    <span className="font-display text-[min(1.5rem,calc(100cqw/18))] font-extrabold break-words">
                      {displayPhone(site.whatsapp)}
                    </span>
                  </a>
                  <div className="flex items-center gap-4 text-[#4b5563]">
                    <Clock className="h-5 w-5 shrink-0 text-[#ef4444]" />
                    <span className="text-sm font-medium">{site.hours}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#4b5563]">
                    <MapPin className="h-5 w-5 shrink-0 text-[#ef4444]" />
                    <span className="text-sm font-medium">{site.area}</span>
                  </div>
                </div>
                <a
                  href={quoteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-3 bg-[#ef4444] py-4 rounded-lg font-display text-sm font-bold tracking-[0.14em] text-[#fafafa] uppercase transition-all duration-300 hover:-translate-y-0.5"
                >
                  WhatsApp {site.businessName.split(" ")[0]} now
                </a>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#e5e7eb] bg-[#fef2f2] px-5 py-10 text-[#111827]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="border-2 border-[#ef4444] bg-[#ef4444] font-display text-[#111827]" />
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">
                {site.businessName}
              </span>
            </div>
            <SocialRow site={site} iconClassName="text-[#4b5563]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#dc2626] uppercase">
              Powered by <span className="text-[#ef4444]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
