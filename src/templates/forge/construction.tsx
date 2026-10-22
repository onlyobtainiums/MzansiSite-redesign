"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Star, X, Zap } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../shared";
import { Up } from "../Reveal";

/* Forge — Construction: "Blueprint".
   Architectural, strong grid, large project imagery, quotation CTA.
   Concrete + charcoal + orange — blueprint linework throughout. */

export default function Construction({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const quoteLink = waLink(
    site.whatsapp,
    `Hi ${site.businessName}! I need a construction quote for a build or renovation.`
  );
  const callHref = `tel:+${site.phone?.replace(/\D/g, "").replace(/^0/, "27") ?? site.whatsapp.replace(/\D/g, "").replace(/^0/, "27")}`;

  return (
    <>
      <WhatsAppFab site={site} accent="#f59e0b" />

      <div className="@container/page min-h-screen bg-[#f5f5f4] font-sans text-[#1a1a1a]">
        {/* ——— Top bar — charcoal with orange accent ——— */}
        <div className="bg-[#1a1a1a] px-4 py-2 text-[#f5f5f4]">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 fill-[#f59e0b]" /> {site.hours}
            </span>
            <a href={callHref} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav — white with charcoal border ——— */}
        <header className="sticky top-0 z-40 border-b border-[#1a1a1a] bg-[#f5f5f4] text-[#1a1a1a]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 border-2 border-[#1a1a1a] bg-[#1a1a1a] font-display text-[#f5f5f4]" />
              <span className="truncate font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#services" className="text-[#1a1a1a]/60 transition-colors hover:text-[#f59e0b]">Services</a>
              <a href="#projects" className="text-[#1a1a1a]/60 transition-colors hover:text-[#f59e0b]">Projects</a>
              <a href="#quote" className="text-[#1a1a1a]/60 transition-colors hover:text-[#f59e0b]">Get a Quote</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#1a1a1a] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#f5f5f4] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#f59e0b] bp-sm:block"
              >
                Get a quote
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center border border-[#1a1a1a]/30 bp-md:hidden"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#1a1a1a]/10 px-5 py-4 bp-md:hidden">
              {["services", "projects", "quote"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#1a1a1a]/70"
                >
                  {id.replace("projects", "recent projects")}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— Hero — full-bleed with blueprint grid overlay ——— */}
        <section id="top" className="relative bg-[#1a1a1a] text-[#f5f5f4]">
          <div className="absolute inset-0" aria-hidden>
            <div
              className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-24 pt-14 bp-md:grid-cols-2 bp-md:gap-14 bp-md:pt-28">
            {/* Left: strong architectural copy */}
            <div className="@container">
              <Up>
                <p className="mb-4 inline-flex items-center gap-2 border-l-3 border-[#f59e0b] pl-4 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[#f59e0c] uppercase bg-[#f59e0b]/10">
                  {site.area} · {site.hours}
                </p>
              </Up>
              <Up delay={0.08}>
                <h1 className="font-display text-[min(3.25rem,calc(100cqw/10))] font-extrabold leading-[0.95] tracking-tight uppercase break-words bp-md:text-[min(4.5rem,calc(100cqw/10))]">
                  Built strong.<br />
                  <span className="text-[#f59e0b]">Construction done right.</span>
                </h1>
              </Up>
              <Up delay={0.16}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-[#717171]">{site.tagline}</p>
              </Up>
              <Up delay={0.24}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href={quoteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-[#f59e0b] px-8 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#1a1a1a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f5f5f4]"
                  >
                    Request a quote
                    <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href={callHref}
                    className="inline-flex items-center gap-3 border-2 border-[#1a1a1a] px-8 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#1a1a1a] uppercase transition-all duration-300 hover:border-[#f59e0b] hover:text-[#f59e0b] bg-white"
                  >
                    <Phone className="h-4.5 w-4.5" /> Call now
                  </a>
                </div>
              </Up>
            </div>

            {/* Right: large project image with grid frame */}
            <Up delay={0.15} className="relative">
              <div className="relative">
                <div className="absolute inset-0 border-4 border-[#1a1a1a] shadow-[20px_20px_0_#f59e0b]" aria-hidden />
                <img
                  src={site.heroImageUrl}
                  alt={site.businessName}
                  className="aspect-[4/5] w-full object-cover border-2 border-[#f59e0b]/30"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-[#1a1a1a]/95 px-5 py-4 border border-[#f59e0b]/30">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#f59e0b] uppercase">Project enquiry</p>
                    <p className="font-display text-sm font-bold text-[#f5f5f4]">{site.area} · {site.hours}</p>
                    {site.isDemo && site.rating && <DemoBadge className="mt-2" />}
                  </div>
                </div>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Trust stats — blueprint grid ——— */}
        <div className="relative border-t border-[#1a1a1a] bg-[#e7e5e4]">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-[#1a1a1a]/20 bp-md:grid-cols-4">
            {[
              [site.area.split(",")[0], "based in"],
              [site.services.length + " services", "quoted & priced"],
              [site.hours, "hours"],
              ["WhatsApp", "instant quote"],
            ].map(([big, small], i) => (
              <div
                key={small}
                className="@container px-5 py-8 text-center bp-md:py-12 border-b border-[#1a1a1a]/20 bp-md:border-b-0 bp-md:border-r"
              >
                <p className="font-display text-[min(1.5rem,calc(100cqw/7))] font-extrabold text-[#1a1a1a] break-words bp-md:text-[min(2rem,calc(100cqw/7))]">{big}</p>
                <p className="mt-1 text-[10px] font-bold tracking-[0.18em] text-[#717171] uppercase">{small}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ——— Services — strong grid cards ——— */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 flex flex-wrap items-end justify-between gap-4 @container">
            <div>
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#717171] uppercase">What we build</p>
              <h2 className="font-display text-[min(2.5rem,calc(100cqw/11))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/11))]">
                Services & <span className="text-[#717171]">rates</span>
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
                  className="group flex h-full flex-col border-2 border-[#1a1a1a] bg-white p-7 rounded-sm transition-all duration-300 hover:border-[#f59e0b] hover:shadow-[8px_8px_0_#f59e0b] hover:-translate-y-1"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-5">
                    <span className="font-display text-4xl font-extrabold text-[#e7e5e4]/30 transition-colors group-hover:text-[#f59e0b]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="bg-[#1a1a1a] px-3 py-1.5 font-display text-xs font-bold tracking-[0.14em] text-[#f5f5f4] uppercase">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight uppercase break-words">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#717171]">{service.description}</p>
                  )}
                  <p className="mt-auto flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#717171] uppercase transition-colors group-hover:text-[#f59e0b]">
                    Request quote <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Quote CTA — strong architectural panel ——— */}
        <section id="quote" className="bg-[#1a1a1a] text-[#f5f5f4] border-t border-[#f59e0b]/30">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-20 bp-md:grid-cols-[1fr_auto] bp-md:py-28">
            <Up className="@container">
              <h2 className="font-display text-[min(2rem,calc(100cqw/13))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/13))]">
                Ready to build?<br />
                <span className="text-[#f59e0b]">Get a written quote today.</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#717171]">
                {site.businessName} serves {site.area} with residential builds, extensions and civil works.
                Every project quoted in writing before we start — no hidden costs.
              </p>
            </Up>
            <Up delay={0.1}>
              <div className="flex flex-col gap-4">
                <a
                  href={quoteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#f59e0b] px-8 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#1a1a1a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f5f5f4]"
                >
                  Request a quote
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href={callHref}
                  className="inline-flex items-center justify-center gap-3 border-2 border-[#f5f5f4] px-8 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#f5f5f4] uppercase transition-all duration-300 hover:border-[#f59e0b] hover:text-[#f59e0b]"
                >
                  <Phone className="h-4.5 w-4.5" /> Call now
                </a>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Projects — masonry-style grid ——— */}
        <section id="projects" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#717171] uppercase">Recent projects</p>
            <h2 className="font-display text-[min(2.25rem,calc(100cqw/13))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3.5rem,calc(100cqw/13))]">
              {site.galleryHeading ?? "Recent"} <span className="text-[#717171]">{site.galleryHeading ? "" : "builds"}</span>
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-4 bp-md:grid-cols-2 bp-lg:grid-cols-3">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.05}>
                <div className="group relative overflow-hidden border-2 border-[#1a1a1a] bg-[#1a1a1a]">
                  <img
                    src={url}
                    alt={`${site.businessName} project ${i + 1}`}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#f59e0b]/0 group-hover:bg-[#f59e0b]/15 transition-colors duration-700" />
                  <span className="absolute left-4 top-4 bg-[#1a1a1a]/90 px-3 py-1 font-display text-[10px] font-extrabold tracking-[0.14em] text-[#f5f5f4] uppercase">
                    Build {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Areas + contact — strong contact card ——— */}
        <section className="border-t border-[#1a1a1a] bg-[#e7e5e4]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 bp-md:grid-cols-2 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#717171] uppercase">Service areas</p>
              <h2 className="font-display text-[min(2.25rem,calc(100cqw/16))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/16))]">
                Based in {site.area.split(",")[0]},
                <br />
                <span className="text-[#717171]">building everywhere nearby.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {[site.area.split(",")[0], "Residential builds", "Extensions & renovations", "Civil works"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="flex items-center gap-1.5 border-2 border-[#1a1a1a] bg-white px-3.5 py-2 text-[11px] font-bold tracking-[0.12em] uppercase"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#1a1a1a]" /> {chip}
                    </span>
                  ),
                )}
              </div>
            </Up>
            <Up delay={0.15}>
              <div className="border-2 border-[#1a1a1a] bg-[#1a1a1a] p-8 text-[#f5f5f4] shadow-[10px_10px_0_#f59e0b]">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#f59e0b] uppercase">Talk to us</p>
                <div className="mt-6 space-y-4">
                  <a href={callHref} className="flex items-center gap-4 transition-colors hover:text-[#f59e0b]">
                    <Phone className="h-5 w-5 shrink-0 text-[#f59e0b]" />
                    <span className="font-display text-[min(1.5rem,calc(100cqw/18))] font-extrabold break-words">
                      {displayPhone(site.whatsapp)}
                    </span>
                  </a>
                  <div className="flex items-center gap-4 text-[#717171]">
                    <Clock className="h-5 w-5 shrink-0 text-[#f59e0b]" />
                    <span className="text-sm font-medium">{site.hours}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#717171]">
                    <MapPin className="h-5 w-5 shrink-0 text-[#f59e0b]" />
                    <span className="text-sm font-medium">{site.area}</span>
                  </div>
                </div>
                <a
                  href={quoteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-3 bg-[#f59e0b] py-4 font-display text-sm font-bold tracking-[0.14em] text-[#1a1a1a] uppercase transition-all duration-300 hover:-translate-y-0.5"
                >
                  WhatsApp {site.businessName.split(" ")[0]} now
                </a>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#1a1a1a] bg-[#1a1a1a] px-5 py-10 text-[#f5f5f4]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="border-2 border-[#1a1a1a] bg-[#1a1a1a] font-display text-[#f5f5f4]" />
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">
                {site.businessName}
              </span>
            </div>
            <SocialRow site={site} iconClassName="text-[#717171]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#717171]/40 uppercase">
              Powered by <span className="text-[#f59e0b]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
