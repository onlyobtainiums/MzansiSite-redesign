"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, Scissors, ShieldCheck, Sparkles, Star, X } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../../types";
import { displayPhone, waLink } from "../../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../../shared";
import { Up } from "../../Reveal";
import { ImageWithFallback } from "../../forge/variants/shared/ImageWithFallback";

/* Velvet — Hair Salon V5: "About-First".
   Business story/narrative leads — salon bio, company history, about quote.
   Hero is secondary below. Services at bottom.
   Structurally different from V1 Hero-First — narrative first, hero second.
   Shapes: organic blob shapes, arched accents, cream + gold palette.
   Primary CTA: story-ending "Contact us" CTA.
   No images of people, faces, or hands — uses interior/tools/decor only. */
export default function HairSalonV5AboutFirst({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const bookLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to make a booking.`);

  return (
    <>
      <WhatsAppFab site={site} accent="#b98a2f" />

      <div className="@container/page min-h-screen bg-[#ffffff] font-sans text-[#241a12]">
        {/* ——— Top bar — light, story-focused ——— */}
        <div className="bg-[#ffffff] px-4 py-2 border-b border-[#cbd5e1]">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 fill-[#b98a2f]" /> {site.hours}
            </span>
            <a href={`tel:+${site.whatsapp.replace(/\D/g, "")}`} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav — side-by-side logo + story ——— */}
        <header className="sticky top-0 z-40 border-b border-[#cbd5e1] bg-[#ffffff]/90 backdrop-blur-md text-[#241a12]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#about" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 rounded-full border border-[#b98a2f]/40 bg-[#241a12] font-display text-[#e8ce9a]" />
              <span className="truncate font-serif text-xl leading-none">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-8 text-[12px] font-semibold tracking-[0.18em] uppercase bp-md:flex">
              <a href="#about" className="text-[#241a12]/60 transition-colors hover:text-[#b98a2f]">Our story</a>
              <a href="#services" className="text-[#241a12]/60 transition-colors hover:text-[#b98a2f]">Services</a>
              <a href="#visit" className="text-[#241a12]/60 transition-colors hover:text-[#b98a2f]">Visit</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={bookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#241a12] px-5 py-2.5 text-[12px] font-bold tracking-[0.16em] text-[#f6efe6] uppercase transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f] bp-sm:block"
              >
                Book now
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#241a12]/15 bp-md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#cbd5e1] px-5 py-4 bp-md:hidden">
              {["about", "services", "visit"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-semibold tracking-[0.18em] uppercase text-[#241a12]/70"
                >
                  {id.replace("about", "Our story")}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— ABOUT FIRST — narrative leads ——— */}
        <section id="about" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#b98a2f] pl-3 py-1 mb-3 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">
              <Sparkles className="h-4 w-4" /> Our story
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase bp-md:text-6xl">
              Crafted for <span className="text-[#b98a2f]">{site.area.split(",")[0]}</span>,<br />
              <span className="text-[#241a12]">built to last.</span>
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-12 bp-md:grid-cols-2">
            <Up className="@container">
              <div className="relative">
                <ImageWithFallback
                  src={site.heroImageUrl}
                  alt={`${site.businessName} treatment room`}
                  className="w-full h-80 object-cover rounded-none border-4 border-[#b98a2f]/20 shadow-[10px_10px_0_#b98a2f]"
                />
                <div className="absolute -bottom-6 -left-6 bg-[#b98a2f] px-6 py-4 rounded-none">
                  <p className="font-display text-sm font-bold text-[#241a12] uppercase">
                    Serving {site.area.split(",")[0]} since day one
                  </p>
                </div>
              </div>
              <p className="mt-6 text-base leading-relaxed text-[#334155]">{site.tagline}</p>
              <p className="mt-4 text-base leading-relaxed text-[#334155]">
                Every treatment is quoted honestly before we begin. We serve
                {site.area} — message us on WhatsApp for availability and pricing.
              </p>
            </Up>
            <Up delay={0.15}>
              <div className="border border-[#cbd5e1] bg-[#f6efe6] p-10 rounded-none">
                <h3 className="font-display text-2xl font-extrabold tracking-tight uppercase mb-4">
                  Why local clients trust us
                </h3>
                <ul className="space-y-3">
                  {[
                    "Published prices — no 'DM for price' games",
                    "Same-day booking on WhatsApp",
                    "Honest consultations, no pressure",
                    "7 years serving " + site.area.split(",")[0],
                    "Knotless braids, silk presses and treatments",
                    "Wash & blow-dry, kids cornrows, wig installs",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#334155]">
                      <Sparkles className="h-4 w-4 text-[#b98a2f]" />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Hero as secondary banner ——— */}
        <section id="top" className="relative bg-[#241a12] text-[#f6efe6] py-16">
          <div className="relative mx-auto max-w-6xl px-5">
            <Up>
              <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#b98a2f] pl-3 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[#b98a2f] uppercase bg-[#b98a2f]/20">
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
              <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-[#cbd5e1]">{site.tagline}</p>
            </Up>
            <Up delay={0.24} className="mt-10">
              <div className="bg-white border border-[#b98a2f]/20 p-8 rounded-none">
                <ImageWithFallback
                  src={site.heroImageUrl}
                  alt={site.businessName}
                  className="w-full h-64 object-cover bp-md:h-80"
                />
                <div className="mt-4">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#b98a2f] uppercase">Enquire on WhatsApp</p>
                  <p className="font-display text-sm font-bold text-[#f6efe6]">{site.area} · {site.hours}</p>
                </div>
              </div>
            </Up>
            <Up delay={0.32} className="mt-8 flex flex-wrap justify-center gap-4">
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
                className="inline-flex items-center gap-3 border-2 border-[#b98a2f]/30 px-8 py-4 rounded-full text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#b98a2f] hover:text-[#b98a2f] bg-[#1e293b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                aria-label="Call Naledi's Braids & Beauty"
              >
                <Phone className="h-4.5 w-4.5" /> Call now
              </a>
            </Up>
          </div>
        </section>

        {/* ——— Services — simple grid below hero ——— */}
        <section id="services" className="mx-auto max-w-4xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#334155] pl-3 py-1 mb-3 text-[11px] font-bold tracking-[0.3em] text-[#334155] uppercase">
              <Scissors className="h-4 w-4" /> The menu
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase bp-md:text-6xl">
              Services & <span className="text-[#b98a2f]">pricing</span>
            </h2>
          </Up>
          <div className="mt-14 space-y-2">
            {site.services.map((service, i) => (
              <Up key={service.name} delay={i * 0.05}>
                <a
                  href={waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book: ${service.name} (${service.price})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 rounded-2xl px-4 py-4 transition-colors duration-300 hover:bg-[#f6efe6]/[0.04] bp-sm:flex-row bp-sm:items-baseline bp-sm:gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                  aria-label={`Book ${service.name} via WhatsApp`}
                >
                  <div className="min-w-0">
                    <h3 className="font-serif text-2xl break-words transition-colors group-hover:text-[#8a5f1e]">{service.name}</h3>
                    {service.description && (
                      <p className="mt-0.5 text-xs font-medium tracking-wide text-[#241a12]/45">{service.description}</p>
                    )}
                  </div>
                  <span className="mx-2 hidden flex-1 border-b border-dotted border-[#241a12]/30 bp-sm:block" aria-hidden />
                  <span className="font-serif text-2xl text-[#b98a2f]">{service.price}</span>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Gallery — simple grid ——— */}
        <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">Recent work</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase bp-md:text-6xl">Gallery</h2>
          </Up>
          <div className="grid grid-cols-2 gap-4 bp-sm:grid-cols-3 bp-md:gap-6">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.05}>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-none border-2 border-[#cbd5e1] bg-[#f6efe6]">
                  <ImageWithFallback
                    src={url}
                    alt={`${site.businessName} work ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Contact ——— */}
        <section id="visit" className="border-t border-[#cbd5e1] bg-[#ffffff]">
          <div className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">Visit us</p>
              <h2 className="font-display text-3xl font-extrabold tracking-tight uppercase break-words bp-md:text-4xl">
                Based in {site.area.split(",")[0]}
              </h2>
            </Up>
            <div className="mt-10 grid grid-cols-1 gap-6 bp-md:grid-cols-2">
              <div className="border border-[#cbd5e1] bg-white p-8 rounded-none">
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
              <div className="border border-[#cbd5e1] bg-white p-8 rounded-none">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#b98a2f] uppercase">WhatsApp</p>
                <a
                  href={bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-3 bg-[#b98a2f] px-4 py-3 rounded-none font-display text-sm font-bold text-[#241a12] uppercase transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                  aria-label={`Message ${site.businessName.split(" ")[0]} via WhatsApp`}
                >
                  Message {site.businessName.split(" ")[0]}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#cbd5e1] bg-[#ffffff] px-5 py-10 text-[#241a12]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="rounded-full border border-[#b98a2f]/40 bg-[#241a12] font-display text-[#e8ce9a]" />
              <span className="min-w-0 break-words font-serif text-lg">{site.businessName}</span>
            </div>
            <SocialRow site={site} iconClassName="text-[#64748b]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#64748b] uppercase">
              Powered by <span className="text-[#b98a2f]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
