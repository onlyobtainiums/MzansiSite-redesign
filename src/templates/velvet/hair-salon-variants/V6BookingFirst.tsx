"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, Scissors, ShieldCheck, Sparkles, Star } from "lucide-react";
import type { SiteData } from "../../types";
import { displayPhone, waLink } from "../../types";
import { LogoBlock, SocialRow, WhatsAppFab } from "../../shared";
import { Up } from "../../Reveal";
import { ImageWithFallback } from "../../forge/variants/shared/ImageWithFallback";

/* Velvet — Hair Salon V6: "Booking-First".
   Sticky WhatsApp booking bar at top (always visible), minimal hero below.
   Conversion-optimised CTA hierarchy — primary CTA is always on screen.
   Structurally different from V1 Hero-First — booking bar first, hero secondary.
   Shapes: high-contrast pill shapes, rounded-full buttons.
   Industry function: appointment enquiry via WhatsApp — service type, preferred time.
   This is an enquiry flow, not a functioning booking system — no payment,
   no calendar, no reservation confirmation. */
export default function HairSalonV6BookingFirst({ site }: { site: SiteData }) {
  const gallery = site.galleryUrls.slice(0, 6);
  const bookLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book an appointment.`);

  return (
    <>
      {/* ——— STICKY BOOKING BAR — always visible at top ——— */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#b98a2f] text-[#241a12] shadow-[0_10px_30px_-10px_rgba(185,138,47,0.6)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-4 bp-md:flex-row bp-md:items-center bp-md:py-3">
          <Up className="flex items-center gap-3">
            <Phone className="h-5 w-5 fill-[#241a12]" />
            <div>
              <p className="text-[10px] font-bold tracking-[0.14em] uppercase">Enquire on WhatsApp</p>
              <a href={`tel:+${site.whatsapp.replace(/\D/g, "")}`} className="font-display text-sm font-bold tracking-tight hover:underline">
                {displayPhone(site.whatsapp)}
              </a>
            </div>
          </Up>
          <a
            href={bookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#241a12] px-6 py-3 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#f6efe6] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#f6efe6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
          >
            <ArrowRight className="h-4 w-4" /> Book on WhatsApp
          </a>
        </div>
      </div>

      <WhatsAppFab site={site} accent="#b98a2f" />

      <div className="@container/page min-h-screen bg-[#f6efe6] font-sans text-[#241a12] pt-24 bp-md:pt-16">
        {/* ——— Top bar — minimal, below sticky bar ——— */}
        <div className="bg-[#f6efe6] px-4 py-2">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 fill-[#b98a2f]" /> {site.hours}
            </span>
          </div>
        </div>

        {/* ——— Nav — minimal, below sticky bar ——— */}
        <header className="sticky top-24 z-40 border-b border-[#b98a2f]/30 bg-[#f6efe6]/90 backdrop-blur-md text-[#241a12]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#services" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 rounded-full border border-[#b98a2f]/40 bg-[#241a12] font-display text-[#e8ce9a]" />
              <span className="font-serif break-words text-xl leading-none">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-8 text-[12px] font-semibold tracking-[0.18em] uppercase bp-md:flex">
              <a href="#services" className="text-[#b98a2f]">Services</a>
              <a href="#visit" className="text-[#241a12]/60 transition-colors hover:text-[#b98a2f]">Visit</a>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {}}
                className="hidden grid h-10 w-10 place-items-center border border-[#241a12]/20 bp-md:hidden"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </header>

        {/* ——— Hero as secondary banner — minimal ——— */}
        <section id="top" className="relative bg-[#f6efe6] text-[#241a12] py-16">
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
              <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-[#334155]">{site.tagline}</p>
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
                  <p className="font-display text-sm font-bold text-[#241a12]">{site.area} · {site.hours}</p>
                </div>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Services — below hero ——— */}
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
              <div className="border border-[#b98a2f]/30 bg-[#1e293b] p-8 rounded-none">
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
              <div className="border border-[#b98a2f]/30 bg-[#1e293b] p-8 rounded-none">
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

        {/* ——— Gallery — small grid at bottom ——— */}
        <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">Recent work</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase bp-md:text-6xl">Gallery</h2>
          </Up>
          <div className="grid grid-cols-2 gap-4 bp-sm:grid-cols-3 bp-md:gap-6">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.05}>
                <div className="relative aspect-square w-full overflow-hidden rounded-none border-2 border-[#b98a2f]/30 bg-[#241a12]">
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
