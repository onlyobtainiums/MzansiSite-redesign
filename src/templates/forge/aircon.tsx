"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Star, X, Zap } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../shared";
import { Up } from "../Reveal";

/* Forge — Air Conditioning: "Climate".
   HVAC unit imagery, cool blue gradient, service contracts,
   ice blue + white — clean, dependable, cool. */

export default function Aircon({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const quoteLink = waLink(
    site.whatsapp,
    `Hi ${site.businessName}! I need air conditioning installation or service.`
  );
  const callHref = `tel:+${site.phone?.replace(/\D/g, "").replace(/^0/, "27") ?? site.whatsapp.replace(/\D/g, "").replace(/^0/, "27")}`;

  return (
    <>
      <WhatsAppFab site={site} accent="#06b6d4" />

      <div className="@container/page min-h-screen bg-[#f0f9ff] font-sans text-[#0c4a6e]">
        {/* ——— Top bar — cool cyan, climate ——— */}
        <div className="bg-[#06b6d4] px-4 py-2">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 fill-[#0c4a6e]" /> {site.hours}
            </span>
            <a href={callHref} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav — white, cyan underline ——— */}
        <header className="sticky top-0 z-40 border-b border-[#06b6d4]/30 bg-[#f0f9ff]/90 backdrop-blur-md text-[#0c4a6e]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 border-2 border-[#06b6d4] bg-[#06b6d4] font-display text-[#0c4a6e]" />
              <span className="truncate font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#services" className="text-[#0c4a6e]/60 transition-colors hover:text-[#06b6d4]">Systems</a>
              <a href="#contracts" className="text-[#0c4a6e]/60 transition-colors hover:text-[#06b6d4]">Service contracts</a>
              <a href="#areas" className="text-[#0c4a6e]/60 transition-colors hover:text-[#06b6d4]">Areas</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#06b6d4] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#0c4a6e] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#f0f9ff] bp-sm:block"
              >
                Get a quote
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center border border-[#f0f9ff]/20 bp-md:hidden"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#f0f9ff]/10 px-5 py-4 bp-md:hidden">
              {["services", "contracts", "areas"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#0c4a6e]/70"
                >
                  {id.replace("contracts", "service contracts")}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— Hero — cool blue gradient, HVAC imagery ——— */}
        <section id="top" className="relative bg-[#f0f9ff] text-[#0c4a6e]">
          <div className="absolute inset-x-0 top-0 h-12 bg-[#06b6d4] opacity-60" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-14 bp-md:pb-32 bp-md:pt-20">
            <Up>
              <p className="mb-4 inline-flex items-center justify-center gap-2 border-2 border-[#06b6d4] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.22em] text-[#06b6d4] uppercase bg-white">
                {site.area} · {site.hours}
              </p>
            </Up>
            <Up delay={0.08}>
              <h1 className="font-display text-[min(2.75rem,calc(100cqw/9))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/9))]">
                Cool comfort.<br />
                <span className="text-[#0891b2]">Installed & serviced.</span>
              </h1>
            </Up>
            <Up delay={0.16}>
              <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-[#075985]">{site.tagline}</p>
            </Up>

            {/* Service chips */}
            <Up delay={0.24} className="mt-16 flex flex-wrap justify-center gap-4">
              {[
                "9000 BTU install",
                "18000 BTU install",
                "Annual service",
                "Gas top-up",
              ].map((chip, i) => (
                <div
                  key={chip}
                  className="relative group cursor-pointer"
                  style={{ backgroundColor: i % 2 === 0 ? "#bae6fd" : "#f0f9ff" }}
                >
                  <div className="h-24 w-24 rounded-2xl border-2 border-[#06b6d4]/30 overflow-hidden group-hover:border-[#06b6d4] transition-colors">
                    <img
                      src={site.heroImageUrl}
                      alt={`${site.businessName} ${chip}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="mt-2 font-display text-sm font-bold tracking-tight uppercase">{chip}</p>
                </div>
              ))}
            </Up>

            <Up delay={0.32} className="mt-12 flex flex-wrap justify-center gap-4">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#06b6d4] px-8 py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#0c4a6e] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f0f9ff]"
              >
                Get a free quote
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={callHref}
                className="inline-flex items-center gap-3 border-2 border-[#06b6d4]/30 px-8 py-4 rounded-full text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#06b6d4] hover:text-[#06b6d4] bg-white"
              >
                <Phone className="h-4.5 w-4.5" /> Call now
              </a>
            </Up>
          </div>
        </section>

        {/* ——— Service contracts — cool panel ——— */}
        <section id="contracts" className="border-t border-[#06b6d4]/20 bg-[#e0f2fe]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 bp-md:grid-cols-[auto_1fr_auto] bp-md:py-28">
            <Up>
              <ShieldCheck className="h-16 w-16 text-[#06b6d4]" strokeWidth={1.5} />
            </Up>
            <Up delay={0.1} className="@container">
              <h2 className="font-display text-[min(1.875rem,calc(100cqw/13))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/13))]">
                Annual service contracts
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#075985]">
                {site.businessName} supplies, installs and services all air conditioning brands in {site.area}.
                Keep your system running with a service contract.
                {site.isDemo && site.guarantee && <><br/><DemoBadge className="mt-2" /> <span className="text-[#075985] text-xs">Demo guarantee: {site.guarantee}</span></>}
              </p>
            </Up>
            <Up delay={0.2}>
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#06b6d4] px-7 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#0c4a6e] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f0f9ff]"
              >
                Request AC quote <ArrowRight className="h-4.5 w-4.5" />
              </a>
            </Up>
          </div>
        </section>

        {/* ——— Systems — cool cards ——— */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 flex flex-wrap items-end justify-between gap-4 @container">
            <div>
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#075985] uppercase">Air conditioning</p>
              <h2 className="font-display text-[min(2.5rem,calc(100cqw/11))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/11))]">
                Systems & <span className="text-[#075985]">pricing</span>
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
                  className="group flex h-full flex-col border-2 border-[#bae6fd] bg-white p-7 rounded-2xl transition-all duration-300 hover:border-[#06b6d4] hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-5">
                    <span className="font-display text-4xl font-extrabold text-[#e0f2fe]/40 transition-colors group-hover:text-[#06b6d4]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="bg-[#f0f9ff] px-3 py-1.5 rounded-full font-display text-xs font-bold tracking-[0.14em] text-[#0c4a6e] uppercase">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight uppercase break-words">{service.name}</h3>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#075985]">{service.description}</p>
                  )}
                  <p className="mt-auto flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#075985] uppercase transition-colors group-hover:text-[#06b6d4]">
                    Request system <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Gallery — HVAC installation shots ——— */}
        <section className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#075985] uppercase">Installations</p>
            <h2 className="font-display text-[min(2.25rem,calc(100cqw/13))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3.5rem,calc(100cqw/13))]">
              Climate control
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-5 bp-md:grid-cols-2 bp-lg:grid-cols-3">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.05}>
                <div className="group relative overflow-hidden border-2 border-[#bae6fd] bg-[#f0f9ff] rounded-2xl">
                  <img
                    src={url}
                    alt={`${site.businessName} installation ${i + 1}`}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 bg-white/90 px-3 py-1 rounded-full font-display text-[10px] font-extrabold tracking-[0.14em] text-[#0c4a6e] uppercase">
                    Unit {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Areas + contact — cool contact card ——— */}
        <section id="areas" className="border-t border-[#bae6fd] bg-[#bae6fd]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 bp-md:grid-cols-2 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#075985] uppercase">Service areas</p>
              <h2 className="font-display text-[min(2.25rem,calc(100cqw/16))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/16))]">
                Based in {site.area.split(",")[0]},
                <br />
                <span className="text-[#075985]">cooling everywhere nearby.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {[site.area.split(",")[0], "Supply & install", "Annual service", "Emergency repair"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="flex items-center gap-1.5 border border-[#67e8f9]/30 bg-white px-3.5 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#06b6d4]" /> {chip}
                    </span>
                  ),
                )}
              </div>
            </Up>
            <Up delay={0.15}>
              <div className="border border-[#06b6d4] bg-white p-8 rounded-2xl text-[#0c4a6e] shadow-xl">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#06b6d4] uppercase">Talk to us</p>
                <div className="mt-6 space-y-4">
                  <a href={callHref} className="flex items-center gap-4 transition-colors hover:text-[#06b6d4]">
                    <Phone className="h-5 w-5 shrink-0 text-[#06b6d4]" />
                    <span className="font-display text-[min(1.5rem,calc(100cqw/18))] font-extrabold break-words">
                      {displayPhone(site.whatsapp)}
                    </span>
                  </a>
                  <div className="flex items-center gap-4 text-[#075985]">
                    <Clock className="h-5 w-5 shrink-0 text-[#06b6d4]" />
                    <span className="text-sm font-medium">{site.hours}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#075985]">
                    <MapPin className="h-5 w-5 shrink-0 text-[#06b6d4]" />
                    <span className="text-sm font-medium">{site.area}</span>
                  </div>
                </div>
                <a
                  href={quoteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-3 bg-[#06b6d4] py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#0c4a6e] uppercase transition-all duration-300 hover:-translate-y-0.5"
                >
                  WhatsApp {site.businessName.split(" ")[0]} now
                </a>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#bae6fd] bg-[#e0f2fe] px-5 py-10 text-[#0c4a6e]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="border-2 border-[#06b6d4] bg-[#06b6d4] font-display text-[#0c4a6e]" />
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">
                {site.businessName}
              </span>
            </div>
            <SocialRow site={site} iconClassName="text-[#075985]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#075985] uppercase">
              Powered by <span className="text-[#06b6d4]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
