"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Star, X, TreePine } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../shared";
import { Up } from "../Reveal";

/* Forge — Landscaper: "Garden".
   Garden/plant imagery, organic curves, leaf accents,
   sage green + earth tones — natural, outdoors-focused. */

export default function Landscaper({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const quoteLink = waLink(
    site.whatsapp,
    `Hi ${site.businessName}! I need a landscaping or garden maintenance quote.`
  );
  const callHref = `tel:+${site.phone?.replace(/\D/g, "").replace(/^0/, "27") ?? site.whatsapp.replace(/\D/g, "").replace(/^0/, "27")}`;

  return (
    <>
      <WhatsAppFab site={site} accent="#15803d" />

      <div className="@container/page min-h-screen bg-[#f0fdf4] font-sans text-[#14532d]">
        {/* ——— Top bar — sage green ——— */}
        <div className="bg-[#15803d] px-4 py-2">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <TreePine className="h-4 w-4 fill-[#f0fdf4]" /> {site.hours}
            </span>
            <a href={callHref} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav — white-green, sage underline ——— */}
        <header className="sticky top-0 z-40 border-b border-[#15803d]/30 bg-[#f0fdf4]/90 backdrop-blur-md text-[#14532d]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 border-2 border-[#15803d] bg-[#15803d] font-display text-[#14532d]" />
              <span className="truncate font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#services" className="text-[#14532d]/60 transition-colors hover:text-[#15803d]">Services</a>
              <a href="#gallery" className="text-[#14532d]/60 transition-colors hover:text-[#15803d]">Garden gallery</a>
              <a href="#areas" className="text-[#14532d]/60 transition-colors hover:text-[#15803d]">Areas</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#15803d] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#14532d] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#f0fdf4] bp-sm:block"
              >
                Get a quote
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center border border-[#f0fdf4]/20 bp-md:hidden"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#f0fdf4]/10 px-5 py-4 bp-md:hidden">
              {["services", "gallery", "areas"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#14532d]/70"
                >
                  {id.replace("gallery", "garden gallery")}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— Hero — organic curves, garden imagery ——— */}
        <section id="top" className="relative bg-[#f0fdf4] text-[#14532d]">
          <div className="absolute inset-x-0 bottom-0 h-12 bg-[#15803d] opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-14 bp-md:pb-32 bp-md:pt-20">
            <Up>
              <p className="mb-4 inline-flex items-center justify-center gap-2 border-2 border-[#15803d] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.22em] text-[#15803d] uppercase">
                {site.area} · {site.hours}
              </p>
            </Up>
            <Up delay={0.08}>
              <h1 className="font-display text-[min(2.75rem,calc(100cqw/9))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/9))]">
                Neat gardens.<br />
                <span className="text-[#15803d]">Never late.</span>
              </h1>
            </Up>
            <Up delay={0.16}>
              <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-[#166534]">{site.tagline}</p>
            </Up>

            {/* Garden chips */}
            <Up delay={0.24} className="mt-16 flex flex-wrap justify-center gap-4">
              {[
                "Monthly maintenance",
                "Lawn mowing",
                "Tree felling",
                "Irrigation",
              ].map((chip, i) => (
                <div
                  key={chip}
                  className="relative group cursor-pointer"
                  style={{ backgroundColor: i % 2 === 0 ? "#dcfce7" : "#f0fdf4" }}
                >
                  <div className="h-24 w-24 rounded-2xl border-2 border-[#15803d]/30 overflow-hidden group-hover:border-[#15803d] transition-colors">
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
                className="inline-flex items-center gap-3 bg-[#15803d] px-8 py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#14532d] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f0fdf4]"
              >
                Get a free quote
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={callHref}
                className="inline-flex items-center gap-3 border-2 border-[#15803d]/30 px-8 py-4 rounded-full text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#15803d] hover:text-[#15803d] bg-white"
              >
                <Phone className="h-4.5 w-4.5" /> Call now
              </a>
            </Up>
          </div>
        </section>

        {/* ——— Gallery — garden shots ——— */}
        <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#166534] uppercase">Gardens</p>
            <h2 className="font-display text-[min(2.25rem,calc(100cqw/13))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3.5rem,calc(100cqw/13))]">
              The garden
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-6 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.05}>
                <div className="group relative overflow-hidden border-2 border-[#86efac] bg-[#ecfdf5] rounded-[2rem]">
                  <div className="aspect-[4/5] w-full relative overflow-hidden">
                    <img
                      src={url}
                      alt={`${site.businessName} garden ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#14532d]/0 group-hover:bg-[#15803d]/20 transition-colors duration-700" />
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#15803d] uppercase">
                      Project {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 font-display text-sm font-bold text-[#14532d]">
                      {site.services[i]?.name.split(" ")[0] ?? "Garden"}
                    </p>
                  </div>
                </div>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Services — organic cards ——— */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#15803d] pl-3 py-1 mb-3 text-[11px] font-bold tracking-[0.3em] text-[#166534] uppercase">
              <TreePine className="h-4 w-4" /> What we grow
            </div>
            <h2 className="font-display text-[min(2.5rem,calc(100cqw/11))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/11))]">
              Services & <span className="text-[#166534]">rates</span>
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-4 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {site.services.map((service, i) => (
              <Up key={service.name} delay={i * 0.06}>
                <a
                  href={waLink(site.whatsapp, `Hi ${site.businessName}! I need help with: ${service.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col border-2 border-[#86efac] bg-white p-7 rounded-[2rem] transition-all duration-300 hover:border-[#15803d] hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-5">
                    <span className="font-display text-4xl font-extrabold text-[#dcfce7]/40 transition-colors group-hover:text-[#15803d]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="bb-[#dcfce7] px-3 py-1.5 rounded-full font-display text-xs font-bold tracking-[0.14em] text-[#14532d] uppercase">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight uppercase break-words">{service.name}</h3>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#166534]">{service.description}</p>
                  )}
                  <p className="mt-auto flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#166534] uppercase transition-colors group-hover:text-[#15803d]">
                    Book this <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Areas + contact — green contact card ——— */}
        <section id="areas" className="border-t border-[#86efac] bg-[#d1fae5]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 bp-md:grid-cols-2 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#166534] uppercase">Service areas</p>
              <h2 className="font-display text-[min(2.25rem,calc(100cqw/16))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/16))]">
                Based in {site.area.split(",")[0]},
                <br />
                <span className="text-[#166534]">gardening everywhere nearby.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {[site.area.split(",")[0], "Monthly maintenance", "Tree felling", "Irrigation install"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="flex items-center gap-1.5 border border-[#4ade80]/30 bg-white px-3.5 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#15803d]" /> {chip}
                    </span>
                  ),
                )}
              </div>
            </Up>
            <Up delay={0.15}>
              <div className="border border-[#15803d] bg-white p-8 rounded-[2rem] text-[#14532d] shadow-xl">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#15803d] uppercase">Talk to us</p>
                <div className="mt-6 space-y-4">
                  <a href={callHref} className="flex items-center gap-4 transition-colors hover:text-[#15803d]">
                    <Phone className="h-5 w-5 shrink-0 text-[#15803d]" />
                    <span className="font-display text-[min(1.5rem,calc(100cqw/18))] font-extrabold break-words">
                      {displayPhone(site.whatsapp)}
                    </span>
                  </a>
                  <div className="flex items-center gap-4 text-[#166534]">
                    <Clock className="h-5 w-5 shrink-0 text-[#15803d]" />
                    <span className="text-sm font-medium">{site.hours}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#166534]">
                    <MapPin className="h-5 w-5 shrink-0 text-[#15803d]" />
                    <span className="text-sm font-medium">{site.area}</span>
                  </div>
                </div>
                <a
                  href={quoteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-3 bg-[#15803d] py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#14532d] uppercase transition-all duration-300 hover:-translate-y-0.5"
                >
                  WhatsApp {site.businessName.split(" ")[0]} now
                </a>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#86efac] bg-[#d1fae5] px-5 py-10 text-[#14532d]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="border-2 border-[#15803d] bg-[#15803d] font-display text-[#14532d]" />
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">
                {site.businessName}
              </span>
            </div>
            <SocialRow site={site} iconClassName="text-[#166534]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#166534] uppercase">
              Powered by <span className="text-[#15803d]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
