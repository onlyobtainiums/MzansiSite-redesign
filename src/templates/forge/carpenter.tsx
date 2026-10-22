"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Star, X, Award } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../shared";
import { Up } from "../Reveal";

/* Forge — Carpenter: "Grain".
   Crafted, warm material palette. Editorial project gallery as hero,
   warm wood + cream + ink — not a colour swap of any other trade. */

export default function Carpenter({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const quoteLink = waLink(
    site.whatsapp,
    `Hi ${site.businessName}! I need a custom woodworking quote.`
  );
  const callHref = `tel:+${site.phone?.replace(/\D/g, "").replace(/^0/, "27") ?? site.whatsapp.replace(/\D/g, "").replace(/^0/, "27")}`;

  return (
    <>
      <WhatsAppFab site={site} accent="#a67c52" />

      <div className="@container/page min-h-screen bg-[#f8f4ec] font-sans text-[#2d241e]">
        {/* ——— Top bar — warm wood tone ——— */}
        <div className="bg-[#a67c52] px-4 py-2">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Award className="h-4 w-4 fill-[#2d241e]" /> {site.hours}
            </span>
            <a href={callHref} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav — cream background, wood underline ——— */}
        <header className="sticky top-0 z-40 border-b border-[#a67c52]/30 bg-[#f8f4ec]/90 backdrop-blur-md text-[#2d241e]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 border-2 border-[#a67c52] bg-[#a67c52] font-display text-[#2d241e]" />
              <span className="truncate font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#services" className="text-[#2d241e]/60 transition-colors hover:text-[#a67c52]">Services</a>
              <a href="#gallery" className="text-[#2d241e]/60 transition-colors hover:text-[#a67c52]">Project Gallery</a>
              <a href="#areas" className="text-[#2d241e]/60 transition-colors hover:text-[#a67c52]">Areas</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#a67c52] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#2d241e] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#f8f4ec] bp-sm:block"
              >
                Get a quote
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center border border-[#a67c52]/20 bp-md:hidden"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#a67c52]/10 px-5 py-4 bp-md:hidden">
              {["services", "gallery", "areas"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#2d241e]/70"
                >
                  {id.replace("gallery", "project gallery")}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— Hero — editorial project gallery, overlapping images ——— */}
        <section id="top" className="relative bg-[#f8f4ec] text-[#2d241e]">
          <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-14 bp-md:pb-32 bp-md:pt-20">
            <Up>
              <p className="mb-4 inline-flex items-center justify-center gap-2 border-2 border-[#a67c52] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.22em] text-[#a67c52] uppercase">
                {site.area} · {site.hours}
              </p>
            </Up>
            <Up delay={0.08}>
              <h1 className="font-display text-[min(2.75rem,calc(100cqw/9))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/9))]">
                Built to last.<br />
                <span className="text-[#c45435]">Custom woodwork from Mzansi.</span>
              </h1>
            </Up>
            <Up delay={0.16}>
              <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-[#5d4a37]">{site.tagline}</p>
            </Up>

            {/* Editorial gallery hero — overlapping project cards */}
            <Up delay={0.24} className="mt-16 relative">
              <div className="grid grid-cols-1 gap-[-40px] bp-md:grid-cols-3 bp-md:gap-8">
                {gallery.slice(0, 3).map((url, i) => (
                  <div
                    key={url}
                    className="relative group"
                    style={{ zIndex: 3 - i }}
                  >
                    <img
                      src={url}
                      alt={`${site.businessName} project ${i + 1}`}
                      className="w-full aspect-[4/5] object-cover rounded-xl border-4 border-[#a67c52]/40 shadow-lg transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute -bottom-8 left-4 right-4 bg-white/90 backdrop-blur px-5 py-4 rounded-xl border border-[#a67c52]/30">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-[#a67c52] uppercase">
                        Project {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-1 font-display text-sm font-bold text-[#2d241e]">
                        Custom {site.services[i]?.name.split(" ")[0] ?? "piece"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Up>

            <Up delay={0.32} className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#a67c52] px-8 py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#2d241e] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f8f4ec]"
              >
                Get a free quote
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={callHref}
                className="inline-flex items-center gap-3 border-2 border-[#a67c52]/30 px-8 py-4 rounded-full text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#a67c52] hover:text-[#a67c5c] bg-white"
              >
                <Phone className="h-4.5 w-4.5" /> Call now
              </a>
            </Up>
          </div>
        </section>

        {/* ——— Services — warm card grid with material feel ——— */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#a67c52] pl-3 py-1 mb-3 text-[11px] font-bold tracking-[0.3em] text-[#8d6e4f] uppercase">
              <Star className="h-4 w-4" /> What we build
            </div>
            <h2 className="font-display text-[min(2.5rem,calc(100cqw/11))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/11))]">
              Services & <span className="text-[#8d6e4f]">rates</span>
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-4 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {site.services.map((service, i) => (
              <Up key={service.name} delay={i * 0.06}>
                <a
                  href={waLink(site.whatsapp, `Hi ${site.businessName}! I need help with: ${service.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col border border-[#d6c3b3] bg-white p-6 rounded-xl transition-all duration-300 hover:border-[#a67c52] hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <span className="font-display text-4xl font-extrabold text-[#d6c3b3]/30 transition-colors group-hover:text-[#a67c52]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="bg-[#f0e6d9] px-3 py-1.5 rounded-full font-display text-xs font-bold tracking-[0.14em] text-[#2d241e] uppercase">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight uppercase break-words">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#5d4a37]">{service.description}</p>
                  )}
                  <p className="mt-auto flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#8d6e4f] uppercase transition-colors group-hover:text-[#a67c52]">
                    Commission this <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Gallery — full editorial project showcase ——— */}
        <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#8d6e4f] uppercase">Recent projects</p>
            <h2 className="font-display text-[min(2.25rem,calc(100cqw/13))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3.5rem,calc(100cqw/13))]">
              The workshop
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-5 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.05}>
                <div className="group relative overflow-hidden border-2 border-[#d6c3b3] bg-[#f0e6d9] rounded-2xl">
                  <img
                    src={url}
                    alt={`${site.businessName} project ${i + 1}`}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#a67c52]/0 group-hover:bg-[#a67c52]/20 transition-colors duration-700" />
                  <span className="absolute left-4 top-4 bg-white/90 px-3 py-1 rounded-full font-display text-[10px] font-extrabold tracking-[0.14em] text-[#2d241e] uppercase">
                    Piece {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Areas + contact — warm contact card ——— */}
        <section id="areas" className="border-t border-[#d6c3b3] bg-[#f0e6d9]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 bp-md:grid-cols-2 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#8d6e4f] uppercase">Service areas</p>
              <h2 className="font-display text-[min(2.25rem,calc(100cqw/16))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/16))]">
                Based in {site.area.split(",")[0]},
                <br />
                <span className="text-[#8d6e4f]">crafting across the region.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {[site.area.split(",")[0], "Custom joinery", "Free site measure", "Handcrafted in Mzansi"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="flex items-center gap-1.5 border border-[#d6c3b3] bg-white px-3.5 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#8d6e4f]" /> {chip}
                    </span>
                  ),
                )}
              </div>
            </Up>
            <Up delay={0.15}>
              <div className="border border-[#d6c3b3] bg-white p-8 rounded-2xl text-[#2d241e] shadow-xl">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#a67c52] uppercase">Talk to us</p>
                <div className="mt-6 space-y-4">
                  <a href={callHref} className="flex items-center gap-4 transition-colors hover:text-[#a67c52]">
                    <Phone className="h-5 w-5 shrink-0 text-[#a67c52]" />
                    <span className="font-display text-[min(1.5rem,calc(100cqw/18))] font-extrabold break-words">
                      {displayPhone(site.whatsapp)}
                    </span>
                  </a>
                  <div className="flex items-center gap-4 text-[#5d4a37]">
                    <Clock className="h-5 w-5 shrink-0 text-[#a67c52]" />
                    <span className="text-sm font-medium">{site.hours}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#5d4a37]">
                    <MapPin className="h-5 w-5 shrink-0 text-[#a67c52]" />
                    <span className="text-sm font-medium">{site.area}</span>
                  </div>
                </div>
                <a
                  href={quoteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-3 bg-[#a67c52] py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#2d241e] uppercase transition-all duration-300 hover:-translate-y-0.5"
                >
                  WhatsApp {site.businessName.split(" ")[0]} now
                </a>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#d6c3b3] bg-[#f0e6d9] px-5 py-10 text-[#2d241e]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="border-2 border-[#a67c52] bg-[#a67c52] font-display text-[#2d241e]" />
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">
                {site.businessName}
              </span>
            </div>
            <SocialRow site={site} iconClassName="text-[#5d4a37]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#8d6e4f] uppercase">
              Powered by <span className="text-[#a67c52]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
