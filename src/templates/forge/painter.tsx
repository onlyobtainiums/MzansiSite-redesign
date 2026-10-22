"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Star, X, Palette } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../shared";
import { Up } from "../Reveal";

/* Forge — Painter: "Swatch".
   Crafted, warm material palette. Editorial paint-swatch aesthetic,
   cream + terracotta + deep ink — before/after room transformations. */

export default function Painter({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const quoteLink = waLink(
    site.whatsapp,
    `Hi ${site.businessName}! I need a painting quote for my home or business.`
  );
  const callHref = `tel:+${site.phone?.replace(/\D/g, "").replace(/^0/, "27") ?? site.whatsapp.replace(/\D/g, "").replace(/^0/, "27")}`;

  return (
    <>
      <WhatsAppFab site={site} accent="#c2410c" />

      <div className="@container/page min-h-screen bg-[#fff7ed] font-sans text-[#451a03]">
        {/* ——— Top bar — terracotta ——— */}
        <div className="bg-[#c2410c] px-4 py-2">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Palette className="h-4 w-4 fill-[#451a03]" /> {site.hours}
            </span>
            <a href={callHref} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav — cream, terracotta underline ——— */}
        <header className="sticky top-0 z-40 border-b border-[#c2410c]/30 bg-[#fff7ed]/90 backdrop-blur-md text-[#451a03]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 border-2 border-[#c2410c] bg-[#c2410c] font-display text-[#451a03]" />
              <span className="truncate font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#services" className="text-[#451a03]/60 transition-colors hover:text-[#c2410c]">Services</a>
              <a href="#gallery" className="text-[#451a03]/60 transition-colors hover:text-[#c2410c]">Before & after</a>
              <a href="#areas" className="text-[#451a03]/60 transition-colors hover:text-[#c2410c]">Areas</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#c2410c] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#451a03] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#fff7ed] bp-sm:block"
              >
                Get a quote
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center border border-[#c2410c]/20 bp-md:hidden"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#c2410c]/10 px-5 py-4 bp-md:hidden">
              {["services", "gallery", "areas"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#451a03]/70"
                >
                  {id.replace("gallery", "before & after")}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— Hero — editorial swatch stripes, paint imagery ——— */}
        <section id="top" className="relative bg-[#fff7ed] text-[#451a03]">
          <div className="absolute inset-x-0 top-0 h-12 bg-[#c2410c] opacity-60" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-14 bp-md:pb-32 bp-md:pt-20">
            <Up>
              <p className="mb-4 inline-flex items-center justify-center gap-2 border-2 border-[#c2410c] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.22em] text-[#c2410c] uppercase">
                {site.area} · {site.hours}
              </p>
            </Up>
            <Up delay={0.08}>
              <h1 className="font-display text-[min(2.75rem,calc(100cqw/9))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/9))]">
                Fresh coat.<br />
                <span className="text-[#ea580c]">Clean edges, zero mess.</span>
              </h1>
            </Up>
            <Up delay={0.16}>
              <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-[#7c2d12]">{site.tagline}</p>
            </Up>

            {/* Paint swatch chips */}
            <Up delay={0.24} className="mt-16 flex flex-wrap justify-center gap-4">
              {[
                "Interior walls",
                "Exterior facades",
                "Roof painting",
                "Waterproofing",
              ].map((swatch, i) => (
                <div
                  key={swatch}
                  className="relative group cursor-pointer"
                  style={{ backgroundColor: i % 2 === 0 ? "#fecaca" : "#fef3c7" }}
                >
                  <div className="h-24 w-24 rounded-2xl border-2 border-[#c2410c]/30 overflow-hidden group-hover:border-[#c2410c] transition-colors">
                    <img
                      src={site.heroImageUrl}
                      alt={`${site.businessName} ${swatch}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="mt-2 font-display text-sm font-bold tracking-tight uppercase">{swatch}</p>
                </div>
              ))}
            </Up>

            <Up delay={0.32} className="mt-12 flex flex-wrap justify-center gap-4">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#c2410c] px-8 py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#451a03] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#fff7ed]"
              >
                Get a free quote
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={callHref}
                className="inline-flex items-center gap-3 border-2 border-[#c2410c]/30 px-8 py-4 rounded-full text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#c2410c] hover:text-[#c2410c] bg-white"
              >
                <Phone className="h-4.5 w-4.5" /> Call now
              </a>
            </Up>
          </div>
        </section>

        {/* ——— Before & After gallery — prominent ——— */}
        <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#9a3412] uppercase">Transformations</p>
            <h2 className="font-display text-[min(2.25rem,calc(100cqw/13))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3.5rem,calc(100cqw/13))]">
              Before & after
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-6 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.05}>
                <div className="group relative overflow-hidden border-2 border-[#fca5a5] bg-[#ffe4e6] rounded-2xl">
                  <div className="aspect-[4/5] w-full relative overflow-hidden">
                    <img
                      src={url}
                      alt={`${site.businessName} project ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#451a03]/0 group-hover:bg-[#c2410c]/20 transition-colors duration-700" />
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#c2410c] uppercase">
                      Project {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 font-display text-sm font-bold text-[#451a03]">
                      {site.services[i]?.name.split(" ")[0] ?? "Space"}
                    </p>
                  </div>
                </div>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Services — swatch cards ——— */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#c2410c] pl-3 py-1 mb-3 text-[11px] font-bold tracking-[0.3em] text-[#9a3412] uppercase">
              <Palette className="h-4 w-4" /> What we paint
            </div>
            <h2 className="font-display text-[min(2.5rem,calc(100cqw/11))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/11))]">
              Services & <span className="text-[#9a3412]">rates</span>
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-4 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {site.services.map((service, i) => (
              <Up key={service.name} delay={i * 0.06}>
                <a
                  href={waLink(site.whatsapp, `Hi ${site.businessName}! I need help with: ${service.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col border-2 border-[#fed7aa] bg-white p-6 rounded-2xl transition-all duration-300 hover:border-[#c2410c] hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <span className="font-display text-4xl font-extrabold text-[#fef3c7]/40 transition-colors group-hover:text-[#c2410c]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="bg-[#ffedd5] px-3 py-1.5 rounded-full font-display text-xs font-bold tracking-[0.14em] text-[#451a03] uppercase">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight uppercase break-words">{service.name}</h3>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#7c2d12]">{service.description}</p>
                  )}
                  <p className="mt-auto flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#9a3412] uppercase transition-colors group-hover:text-[#c2410c]">
                    Book this <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Areas + contact — warm contact card ——— */}
        <section id="areas" className="border-t border-[#fed7aa] bg-[#ffedd5]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 bp-md:grid-cols-2 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#9a3412] uppercase">Service areas</p>
              <h2 className="font-display text-[min(2.25rem,calc(100cqw/16))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/16))]">
                Based in {site.area.split(",")[0]},
                <br />
                <span className="text-[#9a3412]">painting across the region.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {[site.area.split(",")[0], "Interior & exterior", "Free colour consult", "Zero-mess guarantee"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="flex items-center gap-1.5 border border-[#fca5a5]/30 bg-white px-3.5 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#c2410c]" /> {chip}
                    </span>
                  ),
                )}
              </div>
            </Up>
            <Up delay={0.15}>
              <div className="border border-[#c2410c] bg-white p-8 rounded-2xl text-[#451a03] shadow-xl">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#c2410c] uppercase">Talk to us</p>
                <div className="mt-6 space-y-4">
                  <a href={callHref} className="flex items-center gap-4 transition-colors hover:text-[#c2410c]">
                    <Phone className="h-5 w-5 shrink-0 text-[#c2410c]" />
                    <span className="font-display text-[min(1.5rem,calc(100cqw/18))] font-extrabold break-words">
                      {displayPhone(site.whatsapp)}
                    </span>
                  </a>
                  <div className="flex items-center gap-4 text-[#7c2d12]">
                    <Clock className="h-5 w-5 shrink-0 text-[#c2410c]" />
                    <span className="text-sm font-medium">{site.hours}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#7c2d12]">
                    <MapPin className="h-5 w-5 shrink-0 text-[#c2410c]" />
                    <span className="text-sm font-medium">{site.area}</span>
                  </div>
                </div>
                <a
                  href={quoteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-3 bg-[#c2410c] py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#451a03] uppercase transition-all duration-300 hover:-translate-y-0.5"
                >
                  WhatsApp {site.businessName.split(" ")[0]} now
                </a>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#fed7aa] bg-[#ffedd5] px-5 py-10 text-[#451a03]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="border-2 border-[#c2410c] bg-[#c2410c] font-display text-[#451a03]" />
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">
                {site.businessName}
              </span>
            </div>
            <SocialRow site={site} iconClassName="text-[#7c2d12]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#9a3412] uppercase">
              Powered by <span className="text-[#c2410c]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
