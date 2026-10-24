"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, Scissors, ShieldCheck, Sparkles, Star, X } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../../types";
import { displayPhone, waLink } from "../../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../../shared";
import { Up } from "../../Reveal";
import { ImageWithFallback } from "../../forge/variants/shared/ImageWithFallback";

/* Velvet — Hair Salon V4: "Gallery-First".
   Masonry gallery of salon work dominates above the fold; hero is a small
   overlay on the gallery; services are a simple list below.
   Hamburger-only navigation to keep focus on imagery. Overlay CTA on gallery items.
   Structurally different from V1 Hero-First — gallery first, hero as overlay.
   Shapes: arched cards, asymmetrical image treatments.
   Primary CTA: overlay CTA on gallery items.
   No images of people, faces, or hands — uses interior/tools/decor only. */
export default function HairSalonV4GalleryFirst({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const bookLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to make a booking.`);

  return (
    <>
      <WhatsAppFab site={site} accent="#b98a2f" />

      <div className="@container/page min-h-screen bg-[#f6efe6] font-sans text-[#241a12]">
        {/* ——— Top bar — minimal ——— */}
        <div className="bg-[#f6efe6]/40 px-4 py-2 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 fill-[#b98a2f]" /> {site.hours}
            </span>
            <a href={`tel:+${site.whatsapp.replace(/\D/g, "")}`} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav — hamburger only (image focus) ——— */}
        <header className="sticky top-0 z-40 border-b border-[#b98a2f]/20 bg-[#f6efe6]/40 backdrop-blur-md text-[#241a12]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#gallery" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 rounded-full border border-[#b98a2f]/40 bg-[#241a12] font-display text-[#e8ce9a]" />
              <span className="font-serif break-words text-xl leading-none">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-8 text-[12px] font-semibold tracking-[0.18em] uppercase bp-md:flex">
              <a href="#gallery" className="text-[#241a12]/60 transition-colors hover:text-[#b98a2f]">Recent work</a>
              <a href="#services" className="text-[#241a12]/60 transition-colors hover:text-[#b98a2f]">Services</a>
              <a href="#visit" className="text-[#241a12]/60 transition-colors hover:text-[#b98a2f]">Visit</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={bookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#b98a2f] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#241a12] uppercase transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f] bp-sm:block"
              >
                Book now
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center border border-[#f6efe6]/20 bp-md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#241a12]/10 px-5 py-4 bp-md:hidden">
              {["gallery", "services", "visit"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-semibold tracking-[0.18em] uppercase text-[#241a12]/70"
                >
                  {id.replace("gallery", "Recent work")}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— GALLERY FIRST — masonry dominates above fold ——— */}
        <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-8 @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">Recent work</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase break-words bp-md:text-6xl">Fresh from the chair</h2>
          </Up>
          <div className="grid grid-cols-1 gap-3 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.05}>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border-2 border-[#b98a2f]/30 bg-[#241a12] group">
                  <ImageWithFallback
                    src={url}
                    alt={`${site.businessName} work ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#241a12]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href={waLink(site.whatsapp, `Hi ${site.businessName}! I saw work ${i + 1} and want a similar booking.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#b98a2f] px-5 py-2.5 font-display text-xs font-bold tracking-[0.14em] text-[#241a12] uppercase shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                      aria-label={`Book similar to work ${i + 1} via WhatsApp`}
                    >
                      Book this <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Hero as overlay on gallery — small, contextual ——— */}
        <section id="top" className="relative bg-[#f6efe6] text-[#241a12] pt-10 pb-20">
          <div className="relative mx-auto max-w-6xl px-5">
            <div className="bg-[#b98a2f]/10 border border-[#b98a2f]/30 p-8 rounded-3xl">
              <Up>
                <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#b98a2f] pl-3 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[#b98a2f] uppercase">
                  <Clock className="h-4 w-4" /> {site.area} · {site.hours}
                </p>
              </Up>
              <Up delay={0.08}>
                <h1 className="font-display text-[min(2.5rem,calc(100cqw/10))] font-extrabold leading-[0.95] tracking-tight uppercase break-words">
                  Expert.<br />
                  <span className="text-[#b98a2f]">treatments done right.</span>
                </h1>
              </Up>
              <Up delay={0.16}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#334155]">{site.tagline}</p>
              </Up>
              <Up delay={0.24} className="mt-10 flex flex-wrap gap-4">
                <a
                  href={bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#b98a2f] px-8 py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#241a12] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f6efe6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                >
                  Book on WhatsApp
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href={`tel:+${site.whatsapp.replace(/\D/g, "")}`}
                  className="inline-flex items-center gap-3 border-2 border-[#b98a2f]/30 px-8 py-4 rounded-full text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#b98a2f] hover:text-[#b98a2f] bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                  aria-label="Call Naledi's Braids & Beauty"
                >
                  <Phone className="h-4.5 w-4.5" /> Call now
                </a>
              </Up>
            </div>
          </div>
        </section>

        {/* ——— Services — simple list below gallery ——— */}
        <section id="services" className="mx-auto max-w-4xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#b98a2f] pl-3 py-1 mb-3 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">
              <Scissors className="h-4 w-4" /> The menu
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase break-words bp-md:text-6xl">
              Services & <span className="text-[#334155]">pricing</span>
            </h2>
          </Up>
          <div className="mt-14 space-y-2">
            {site.services.map((service, i) => (
              <Up key={service.name} delay={i * 0.06}>
                <a
                  href={waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book: ${service.name} (${service.price})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col border-2 border-[#b98a2f]/30 bg-white p-6 rounded-3xl transition-all duration-300 hover:border-[#b98a2f] hover:bg-[#f6efe6]/50 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                  aria-label={`Book ${service.name} via WhatsApp`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <span className="font-display text-4xl text-[#334155]/10">{String(i + 1).padStart(2, "0")}</span>
                    <span className="bg-[#b98a2f] px-3 py-1.5 font-display text-xs font-extrabold text-[#241a12] uppercase">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-extrabold tracking-tight uppercase break-words">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{service.description}</p>
                  )}
                  <p className="mt-auto flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#64748b] uppercase transition-colors group-hover:text-[#b98a2f]">
                    Book this <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Contact ——— */}
        <section id="visit" className="border-t border-[#b98a2f]/20 bg-[#241a12]">
          <div className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">Visit us</p>
              <h2 className="font-display text-3xl font-extrabold tracking-tight uppercase break-words bp-md:text-4xl">
                Based in {site.area.split(",")[0]}
              </h2>
            </Up>
            <div className="mt-10 grid grid-cols-1 gap-6 bp-md:grid-cols-2">
              <div className="border border-[#b98a2f]/30 bg-[#1e293b] p-8 rounded-3xl">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#b98a2f] uppercase">Phone</p>
                <a
                  href={`tel:+${site.whatsapp.replace(/\D/g, "")}`}
                  className="mt-2 flex items-center gap-3 transition-colors hover:text-[#b98a2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                  aria-label="Call Naledi's Braids & Beauty"
                >
                  <Phone className="h-5 w-5 shrink-0 text-[#b98a2f]" />
                  <span className="font-display text-xl font-extrabold break-words">{displayPhone(site.whatsapp)}</span>
                </a>
              </div>
              <div className="border border-[#b98a2f]/30 bg-[#1e293b] p-8 rounded-3xl">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#b98a2f] uppercase">WhatsApp</p>
                <a
                  href={bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-3 bg-[#b98a2f] px-4 py-3 rounded-full font-display text-sm font-bold text-[#241a12] uppercase transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                  aria-label={`Message ${site.businessName.split(" ")[0]} via WhatsApp`}
                >
                  Message {site.businessName.split(" ")[0]}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#b98a2f]/20 bg-[#241a12] px-5 py-10 text-[#f6efe6]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="border-2 border-[#b98a2f] bg-[#b98a2f] font-display text-[#241a12]" />
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">{site.businessName}</span>
            </div>
            <SocialRow site={site} iconClassName="text-[#94a3b8]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#64748b] uppercase">
              Powered by <span className="text-[#b98a2f]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
