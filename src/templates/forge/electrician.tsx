"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Wrench, X, Zap } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../shared";
import { Up } from "../Reveal";

/* Forge — Electrician: "Circuit".
   Angular, high-contrast, technical. Sharp corners, safety orange on deep slate.
   Emergency call-out and COC certification front and centre — not a colour swap. */

export default function Electrician({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const quoteLink = waLink(
    site.whatsapp,
    `Hi ${site.businessName}! I need an electrical quote / COC certificate.`
  );
  const callHref = `tel:+${site.phone?.replace(/\D/g, "").replace(/^0/, "27") ?? site.whatsapp.replace(/\D/g, "").replace(/^0/, "27")}`;

  return (
    <>
      <WhatsAppFab site={site} accent="#ea580c" />

      <div className="@container/page min-h-screen bg-[#0f172a] font-sans text-[#f8fafc]">
        {/* ——— Emergency top bar — orange, unmissable ——— */}
        <div className="bg-[#ea580c] px-4 py-2">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 fill-[#0f172a]" /> {site.hours}
            </span>
            <a href={callHref} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav — slate, sharp, orange underline ——— */}
        <header className="sticky top-0 z-40 border-b border-[#ea580c]/30 bg-[#0f172a]/90 backdrop-blur-md text-[#f8fafc]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 border-2 border-[#ea580c] bg-[#ea580c] font-display text-[#0f172a]" />
              <span className="truncate font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#services" className="text-[#f8fafc]/60 transition-colors hover:text-[#ea580c]">Services</a>
              <a href="#certifications" className="text-[#f8fafc]/60 transition-colors hover:text-[#ea580c]">COC Certificates</a>
              <a href="#areas" className="text-[#f8fafc]/60 transition-colors hover:text-[#ea580c]">Service Areas</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#ea580c] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#0f172a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#f8fafc] bp-sm:block"
              >
                Get a quote
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center border border-[#f8fafc]/20 bp-md:hidden"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#f8fafc]/10 px-5 py-4 bp-md:hidden">
              {["services", "certifications", "areas"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#f8fafc]/70"
                >
                  {id.replace("certifications", "COC certificates").replace("areas", "service areas")}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— Hero — angular split, image masked with diagonal clip ——— */}
        <section id="top" className="relative bg-[#0f172a] text-[#f8fafc]">
          <div className="absolute inset-0 bg-[#ea580c]/4" aria-hidden />

          <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 pb-20 pt-14 bp-md:grid-cols-2 bp-md:gap-12 bp-md:pt-24">
            {/* Left: technical copy */}
            <div className="@container">
              <Up>
                <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#ea580c] pl-3 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[#ea580c] uppercase bg-[#ea580c]/10">
                  <Zap className="h-4 w-4" /> {site.area} · {site.hours}
                </p>
              </Up>
              <Up delay={0.08}>
                <h1 className="font-display text-[min(3rem,calc(100cqw/12))] font-extrabold leading-[0.95] tracking-tight uppercase break-words">
                  Certified.
                  <br />
                  <span className="text-[#ea580c]">Electrical work done right.</span>
                </h1>
              </Up>
              <Up delay={0.16}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-[#cbd5e1]">{site.tagline}</p>
              </Up>
              <Up delay={0.24}>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a
                    href={quoteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-[#ea580c] px-7 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#0f172a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f8fafc]"
                  >
                    Get a free quote
                    <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href={callHref}
                    className="inline-flex items-center gap-3 border-2 border-[#ea580c]/30 px-7 py-4 text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#ea580c] hover:text-[#ea580c]"
                  >
                    <Phone className="h-4.5 w-4.5" /> Call now
                  </a>
                </div>
              </Up>

              {/* Trust indicators — sharp cards, orange accent */}
              <Up delay={0.32} className="mt-10">
                <div className="grid grid-cols-1 gap-4 bp-md:grid-cols-3">
                  {[
                    site.area.split(",")[0],
                    "COC certified",
                    site.hours,
                  ].map((label, i) => (
                    <div
                      key={label}
                      className="border border-[#334155] bg-[#1e293b] p-5 rounded-none"
                    >
                      <p className="text-[10px] font-bold tracking-[0.2em] text-[#ea580c] uppercase">
                        {i === 1 ? "COC certificate" : label}
                      </p>
                      <p className="mt-1 font-display text-sm font-bold text-[#f8fafc]">
                        {i === 0
                          ? site.area.split(",")[0]
                          : i === 1
                          ? "Electrical certificates issued same day"
                          : site.hours}
                      </p>
                    </div>
                  ))}
                </div>
              </Up>
            </div>

            {/* Right: hero image with angled mask */}
            <Up delay={0.15} className="relative">
              <div className="relative">
                <div className="absolute -inset-2 border-2 border-[#ea580c]" aria-hidden />
                <img
                  src={site.heroImageUrl}
                  alt={site.businessName}
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="bg-[#0f172a]/90 px-4 py-3 backdrop-blur border border-[#ea580c]/30">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#ea580c] uppercase">
                      Emergency call-out
                    </p>
                    <p className="font-display text-sm font-bold text-[#f8fafc]">
                      {site.area} · {site.hours}
                    </p>
                  </div>
                </div>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Services — sharp-cornered grid with left orange borders ——— */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#ea580c] pl-3 py-1 mb-3 text-[11px] font-bold tracking-[0.3em] text-[#334155] uppercase">
              <Wrench className="h-4 w-4" /> What we fix
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
                  className="group flex h-full flex-col border-2 border-[#334155] bg-[#1e293b] p-6 rounded-none transition-all duration-300 hover:border-[#ea580c] hover:bg-[#0f172a]/50 hover:-translate-y-1"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <span className="font-display text-4xl font-extrabold text-[#334155]/20 transition-colors group-hover:text-[#ea580c]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="bg-[#ea580c] px-3 py-1.5 font-display text-xs font-extrabold text-[#0f172a] uppercase">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-extrabold tracking-tight uppercase break-words">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#94a3b8]">{service.description}</p>
                  )}
                  <p className="mt-auto flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#64748b] uppercase transition-colors group-hover:text-[#ea580c]">
                    Request this <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Certifications — dark panel, shield focus ——— */}
        <section id="certifications" className="border-y border-[#334155] bg-[#1e293b]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 bp-md:grid-cols-[auto_1fr_auto] bp-md:py-20">
            <Up>
              <ShieldCheck className="h-16 w-16 text-[#ea580c]" strokeWidth={1.5} />
            </Up>
            <Up delay={0.1} className="@container">
              <h2 className="font-display text-[min(1.875rem,calc(100cqw/14))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/14))]">
                COC certified electrical work
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#94a3b8]">
                Every installation comes with a Certificate of Compliance. {site.businessName} serves {site.area} — enquire on WhatsApp for availability and pricing.
              </p>
            </Up>
            <Up delay={0.2}>
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#ea580c] px-7 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#0f172a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f8fafc]"
              >
                Request COC quote <ArrowRight className="h-4.5 w-4.5" />
              </a>
            </Up>
          </div>
        </section>

        {/* ——— Areas + contact — slate contact card ——— */}
        <section id="areas" className="border-t border-[#334155] bg-[#0f172a]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 bp-md:grid-cols-2 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#334155] uppercase">Service areas</p>
              <h2 className="font-display text-[min(2.25rem,calc(100cqw/16))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/16))]">
                Based in {site.area.split(",")[0]},
                <br />
                <span className="text-[#334155]">wired across the region.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {[site.area.split(",")[0], "Same-day call-outs", "Emergency 24/7", "COC certificates"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="flex items-center gap-1.5 border border-[#334155] bg-[#1e293b] px-3.5 py-2 text-[11px] font-bold tracking-[0.12em] uppercase"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#334155]" /> {chip}
                    </span>
                  ),
                )}
              </div>
            </Up>
            <Up delay={0.15}>
              <div className="border border-[#334155] bg-[#1e293b] p-8 text-[#f8fafc] shadow-[10px_10px_0_#ea580c]">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#ea580c] uppercase">Talk to us</p>
                <div className="mt-6 space-y-4">
                  <a href={callHref} className="flex items-center gap-4 transition-colors hover:text-[#ea580c]">
                    <Phone className="h-5 w-5 shrink-0 text-[#ea580c]" />
                    <span className="font-display text-[min(1.5rem,calc(100cqw/18))] font-extrabold break-words">
                      {displayPhone(site.whatsapp)}
                    </span>
                  </a>
                  <div className="flex items-center gap-4 text-[#94a3b8]">
                    <Clock className="h-5 w-5 shrink-0 text-[#ea580c]" />
                    <span className="text-sm font-medium">{site.hours}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#94a3b8]">
                    <MapPin className="h-5 w-5 shrink-0 text-[#ea580c]" />
                    <span className="text-sm font-medium">{site.area}</span>
                  </div>
                </div>
                <a
                  href={quoteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-3 bg-[#ea580c] py-4 font-display text-sm font-bold tracking-[0.14em] text-[#0f172a] uppercase transition-all duration-300 hover:-translate-y-0.5"
                >
                  WhatsApp {site.businessName.split(" ")[0]} now
                </a>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#334155] bg-[#0f172a] px-5 py-10 text-[#f8fafc]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="border-2 border-[#ea580c] bg-[#ea580c] font-display text-[#0f172a]" />
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">
                {site.businessName}
              </span>
            </div>
            <SocialRow site={site} iconClassName="text-[#94a3b8]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#64748b] uppercase">
              Powered by <span className="text-[#ea580c]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
