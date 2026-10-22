"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Star, X, Zap } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../shared";
import { Up } from "../Reveal";

/* Forge — Solar: "Panel".
   Solar panel array aesthetic, sun gradient, energy-savings focus,
   deep blue + sun yellow — technical but warm. */

export default function Solar({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const quoteLink = waLink(
    site.whatsapp,
    `Hi ${site.businessName}! I need a solar installation quote for my home or business.`
  );
  const callHref = `tel:+${site.phone?.replace(/\D/g, "").replace(/^0/, "27") ?? site.whatsapp.replace(/\D/g, "").replace(/^0/, "27")}`;

  return (
    <>
      <WhatsAppFab site={site} accent="#f59e0b" />

      <div className="@container/page min-h-screen bg-[#f0fdf4] font-sans text-[#14532d]">
        {/* ——— Top bar — sun yellow, energy focus ——— */}
        <div className="bg-[#f59e0b] px-4 py-2">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 fill-[#14532d]" /> {site.hours}
            </span>
            <a href={callHref} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav — white-green, sun underline ——— */}
        <header className="sticky top-0 z-40 border-b border-[#f59e0b]/30 bg-[#f0fdf4]/90 backdrop-blur-md text-[#14532d]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 border-2 border-[#f59e0b] bg-[#f59e0b] font-display text-[#14532d]" />
              <span className="truncate font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#services" className="text-[#14532d]/60 transition-colors hover:text-[#f59e0b]">Systems</a>
              <a href="#savings" className="text-[#14532d]/60 transition-colors hover:text-[#f59e0b]">Savings</a>
              <a href="#areas" className="text-[#14532d]/60 transition-colors hover:text-[#f59e0b]">Areas</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#f59e0b] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#14532d] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#f0fdf4] bp-sm:block"
              >
                Site assessment
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center border border-[#f59e0b]/20 bp-md:hidden"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#f59e0b]/10 px-5 py-4 bp-md:hidden">
              {["services", "savings", "areas"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#14532d]/70"
                >
                  {id.replace("services", "solar systems").replace("savings", "energy savings")}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— Hero — panel grid overlay, sun gradient ——— */}
        <section id="top" className="relative bg-[#f0fdf4] text-[#14532d]">
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
            aria-hidden
          />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-24 pt-14 bp-md:grid-cols-2 bp-md:gap-14 bp-md:pt-28">
            {/* Left: energy copy */}
            <div className="@container">
              <Up>
                <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#f59e0b] pl-3 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[#f59e0b] uppercase bg-[#f59e0b]/10">
                  <Zap className="h-4 w-4" /> {site.area} · {site.hours}
                </p>
              </Up>
              <Up delay={0.08}>
                <h1 className="font-display text-[min(3rem,calc(100cqw/10))] font-extrabold leading-[0.95] tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/10))]">
                  Power your.<br />
                  <span className="text-[#f59e0b]">home with the sun.</span>
                </h1>
              </Up>
              <Up delay={0.16}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-[#166534]">{site.tagline}</p>
              </Up>
              <Up delay={0.24}>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a
                    href={quoteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-[#f59e0b] px-7 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#14532d] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f0fdf4]"
                  >
                    Free site assessment
                    <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href={callHref}
                    className="inline-flex items-center gap-3 border-2 border-[#f59e0b]/30 px-7 py-4 text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#f59e0b] hover:text-[#f59e0b]"
                  >
                    <Phone className="h-4.5 w-4.5" /> Call now
                  </a>
                </div>
              </Up>
            </div>

            {/* Right: solar imagery with panel frame */}
            <Up delay={0.15} className="relative">
              <div className="relative">
                <div className="absolute inset-0 border-4 border-[#14532d] shadow-[20px_20px_0_#f59e0b]" aria-hidden />
                <img
                  src={site.heroImageUrl}
                  alt={site.businessName}
                  className="aspect-[4/5] w-full object-cover border-2 border-[#f59e0b]/30"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-[#14532d]/95 px-5 py-4 border border-[#f59e0b]/30">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#f59e0b] uppercase">Site assessment</p>
                    <p className="font-display text-sm font-bold text-[#f0fdf4]">{site.area} · {site.hours}</p>
                    {site.isDemo && site.rating && <DemoBadge className="mt-2" />}
                  </div>
                </div>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Energy savings — sun panel ——— */}
        <section id="savings" className="border-t border-[#f59e0b]/20 bg-[#ecfdf5]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 bp-md:grid-cols-[auto_1fr_auto] bp-md:py-28">
            <Up>
              <ShieldCheck className="h-16 w-16 text-[#f59e0b]" strokeWidth={1.5} />
            </Up>
            <Up delay={0.1} className="@container">
              <h2 className="font-display text-[min(1.875rem,calc(100cqw/13))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/13))]">
                Stop buying Eskom power
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#166534]">
                {site.businessName} installs home and business solar systems in {site.area}.
                Every system quoted in writing — no hidden costs.
                {site.isDemo && site.guarantee && <><br/><DemoBadge className="mt-2" /> <span className="text-[#166534] text-xs">Demo guarantee: {site.guarantee}</span></>}
              </p>
            </Up>
            <Up delay={0.2}>
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#f59e0b] px-7 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#14532d] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f0fdf4]"
              >
                Request solar quote <ArrowRight className="h-4.5 w-4.5" />
              </a>
            </Up>
          </div>
        </section>

        {/* ——— Systems — panel-style cards ——— */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 flex flex-wrap items-end justify-between gap-4 @container">
            <div>
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#166534] uppercase">Solar systems</p>
              <h2 className="font-display text-[min(2.5rem,calc(100cqw/11))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/11))]">
                Systems & <span className="text-[#166534]">pricing</span>
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
                  className="group flex h-full flex-col border-2 border-[#bbf7d0] bg-white p-7 rounded-2xl transition-all duration-300 hover:border-[#f59e0b] hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-5">
                    <span className="font-display text-4xl font-extrabold text-[#dcfce7]/40 transition-colors group-hover:text-[#f59e0b]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="bg-[#fef3c7] px-3 py-1.5 rounded-full font-display text-xs font-bold tracking-[0.14em] text-[#14532d] uppercase">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight uppercase break-words">{service.name}</h3>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#166534]">{service.description}</p>
                  )}
                  <p className="mt-auto flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#166534] uppercase transition-colors group-hover:text-[#f59e0b]">
                    Request system <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Gallery — installation shots ——— */}
        <section className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#166534] uppercase">Installations</p>
            <h2 className="font-display text-[min(2.25rem,calc(100cqw/13))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3.5rem,calc(100cqw/13))]">
              Powered by the sun
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-5 bp-md:grid-cols-2 bp-lg:grid-cols-3">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.05}>
                <div className="group relative overflow-hidden border-2 border-[#bbf7d0] bg-[#ecfdf5] rounded-2xl">
                  <img
                    src={url}
                    alt={`${site.businessName} installation ${i + 1}`}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 bg-white/90 px-3 py-1 rounded-full font-display text-[10px] font-extrabold tracking-[0.14em] text-[#14532d] uppercase">
                    System {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Areas + contact — green contact card ——— */}
        <section id="areas" className="border-t border-[#bbf7d0] bg-[#d1fae5]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 bp-md:grid-cols-2 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#166534] uppercase">Service areas</p>
              <h2 className="font-display text-[min(2.25rem,calc(100cqw/16))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/16))]">
                Based in {site.area.split(",")[0]},
                <br />
                <span className="text-[#166534]">powering everywhere nearby.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {[site.area.split(",")[0], "Home solar systems", "Business solar", "Battery backup"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="flex items-center gap-1.5 border border-[#86efac]/30 bg-white px-3.5 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#f59e0b]" /> {chip}
                    </span>
                  ),
                )}
              </div>
            </Up>
            <Up delay={0.15}>
              <div className="border border-[#f59e0b] bg-white p-8 rounded-2xl text-[#14532d] shadow-xl">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#f59e0b] uppercase">Talk to us</p>
                <div className="mt-6 space-y-4">
                  <a href={callHref} className="flex items-center gap-4 transition-colors hover:text-[#f59e0b]">
                    <Phone className="h-5 w-5 shrink-0 text-[#f59e0b]" />
                    <span className="font-display text-[min(1.5rem,calc(100cqw/18))] font-extrabold break-words">
                      {displayPhone(site.whatsapp)}
                    </span>
                  </a>
                  <div className="flex items-center gap-4 text-[#166534]">
                    <Clock className="h-5 w-5 shrink-0 text-[#f59e0b]" />
                    <span className="text-sm font-medium">{site.hours}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#166534]">
                    <MapPin className="h-5 w-5 shrink-0 text-[#f59e0b]" />
                    <span className="text-sm font-medium">{site.area}</span>
                  </div>
                </div>
                <a
                  href={quoteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-3 bg-[#f59e0b] py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#14532d] uppercase transition-all duration-300 hover:-translate-y-0.5"
                >
                  WhatsApp {site.businessName.split(" ")[0]} now
                </a>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#bbf7d0] bg-[#d1fae5] px-5 py-10 text-[#14532d]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="border-2 border-[#f59e0b] bg-[#f59e0b] font-display text-[#14532d]" />
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">
                {site.businessName}
              </span>
            </div>
            <SocialRow site={site} iconClassName="text-[#166534]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#166534] uppercase">
              Powered by <span className="text-[#f59e0b]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
