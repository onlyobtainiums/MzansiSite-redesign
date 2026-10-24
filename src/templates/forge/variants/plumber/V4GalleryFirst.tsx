"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, Droplet, ShieldCheck, Wrench, X, Zap } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../../../types";
import { displayPhone, waLink } from "../../../types";
import { LogoBlock, SocialRow, WhatsAppFab } from "../../../shared";
import { Up } from "../../../Reveal";
import { ImageWithFallback } from "../shared/ImageWithFallback";

/* Forge — Plumber V4: "Gallery-First".
   Masonry gallery of recent plumbing jobs dominates above the fold;
   hero is a small overlay on the gallery; services are a simple list below.
   Hamburger-only navigation to keep focus on imagery. Overlay CTA on gallery items.
   Structurally different from V1 Flow: V1 is hero-first with booking CTA;
   V4 is gallery-first with hero as overlay. Shapes: rounded-3xl cards,
   asymmetrical image treatments. Primary CTA: overlay CTA on gallery items. */
export default function PlumberV4GalleryFirst({ site }: { site: SiteData }) {
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
        {/* ——— Top bar — minimal ——— */}
        <div className="bg-[#f0fdfa]/40 px-4 py-2 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Droplet className="h-4 w-4 fill-[#2dd4bf]" /> {site.hours}
            </span>
            <a href={callHref} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav — hamburger only (image focus) ——— */}
        <header className="sticky top-0 z-40 border-b border-[#2dd4bf]/20 bg-[#f0fdfa]/40 backdrop-blur-md text-[#0f4c5c]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#gallery" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 border-2 border-[#2dd4bf] bg-[#2dd4bf] font-display text-[#0f4c5c]" />
              <span className="font-display break-words text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#gallery" className="text-[#0f4c5c]/60 transition-colors hover:text-[#2dd4bf]">Recent Jobs</a>
              <a href="#services" className="text-[#0f4c5c]/60 transition-colors hover:text-[#2dd4bf]">Services</a>
              <a href="#coverage" className="text-[#0f4c5c]/60 transition-colors hover:text-[#2dd4bf]">Coverage Area</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#2dd4bf] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#0f4c5c] uppercase transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf] bp-sm:block"
              >
                Book a visit
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center border border-[#f0fdfa]/20 bp-md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf]"
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#0f4c5c]/10 px-5 py-4 bp-md:hidden">
              {["gallery", "services", "coverage"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#0f4c5c]/70"
                >
                  {
                    id.replace("gallery", "Recent jobs").replace("coverage", "coverage area")
                  }
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— GALLERY FIRST — masonry dominates above fold ——— */}
        <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-8 @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#2dd4bf] uppercase">Recent jobs</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase bp-md:text-6xl">Plumbing work</h2>
          </Up>
          <div className="grid grid-cols-1 gap-3 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.05}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border-2 border-[#2dd4bf]/30 bg-[#0f4c5c] group">
                  <ImageWithFallback
                    src={url}
                    alt={`${site.businessName} project ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0f4c5c]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href={waLink(site.whatsapp, `Hi ${site.businessName}! I saw project ${i + 1} and want a similar quote.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#2dd4bf] px-5 py-2.5 font-display text-xs font-bold tracking-[0.14em] text-[#0f4c5c] uppercase shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf]"
                      aria-label={`Request quote for project ${i + 1} via WhatsApp`}
                    >
                      Quote this <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Hero as overlay on gallery — small, contextual ——— */}
        <section id="top" className="relative bg-[#f0fdfa] text-[#0f4c5c] pt-10 pb-20">
          <div className="relative mx-auto max-w-6xl px-5">
            <div className="bg-[#2dd4bf]/10 border border-[#2dd4bf]/30 p-8 rounded-3xl">
              <Up>
                <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#2dd4bf] pl-3 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[#2dd4bf] uppercase">
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
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#334155]">{site.tagline}</p>
              </Up>
              <Up delay={0.24} className="mt-10 flex flex-wrap gap-4">
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
                  className="inline-flex items-center gap-3 border-2 border-[#2dd4bf]/30 px-8 py-4 rounded-full text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#2dd4bf] hover:text-[#2dd4bf] bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf]"
                  aria-label="Call Dlamini Plumbing"
                >
                  <Phone className="h-4.5 w-4.5" /> Call now
                </a>
              </Up>
            </div>
          </div>
        </section>

        {/* ——— Services — simple list below gallery ——— */}
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
                  className="group flex h-full flex-col border-2 border-[#2dd4bf]/30 bg-white p-6 rounded-3xl transition-all duration-300 hover:border-[#2dd4bf] hover:bg-[#f0fdfa]/50 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2dd4bf]"
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
              <div className="border border-[#2dd4bf]/30 bg-[#1e293b] p-8 rounded-3xl">
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
              <div className="border border-[#2dd4bf]/30 bg-[#1e293b] p-8 rounded-3xl">
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
