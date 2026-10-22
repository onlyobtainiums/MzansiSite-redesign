"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Star, X, Wrench } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../shared";
import { Up } from "../Reveal";

/* Forge — Appliance Repair: "Workbench".
   Workshop bench aesthetic, tool imagery, diagnosis-first,
   charcoal + industrial amber — distinct from plumber/electrician. */

export default function ApplianceRepair({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const quoteLink = waLink(
    site.whatsapp,
    `Hi ${site.businessName}! I need an appliance repair quote.`
  );
  const callHref = `tel:+${site.phone?.replace(/\D/g, "").replace(/^0/, "27") ?? site.whatsapp.replace(/\D/g, "").replace(/^0/, "27")}`;

  return (
    <>
      <WhatsAppFab site={site} accent="#b45309" />

      <div className="@container/page min-h-screen bg-[#f8fafc] font-sans text-[#0f172a]">
        {/* ——— Top bar — industrial amber, diagnosis first ——— */}
        <div className="bg-[#b45309] px-4 py-2">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Wrench className="h-4 w-4 fill-[#0f172a]" /> {site.hours}
            </span>
            <a href={callHref} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav — white, amber underline ——— */}
        <header className="sticky top-0 z-40 border-b border-[#b45309]/30 bg-[#f8fafc]/90 backdrop-blur-md text-[#0f172a]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 border-2 border-[#b45309] bg-[#b45309] font-display text-[#0f172a]" />
              <span className="truncate font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#services" className="text-[#0f172a]/60 transition-colors hover:text-[#b45309]">Appliances</a>
              <a href="#diagnosis" className="text-[#0f172a]/60 transition-colors hover:text-[#b45309]">Diagnosis</a>
              <a href="#areas" className="text-[#0f172a]/60 transition-colors hover:text-[#b45309]">Areas</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#b45309] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#0f172a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#f8fafc] bp-sm:block"
              >
                Book diagnosis
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
              {["services", "diagnosis", "areas"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#0f172a]/70"
                >
                  {id.replace("diagnosis", "diagnosis call-out")}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— Hero — workshop bench imagery, diagnosis call-out ——— */}
        <section id="top" className="relative bg-[#f8fafc] text-[#0f172a]">
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-24 pt-14 bp-md:grid-cols-2 bp-md:gap-14 bp-md:pt-28">
            {/* Left: diagnosis copy */}
            <div className="@container order-2 bp-md:order-1">
              <Up>
                <p className="mb-4 inline-flex items-center justify-center gap-2 border-2 border-[#b45309] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.22em] text-[#b45309] uppercase bg-white">
                  <Wrench className="h-4 w-4" /> {site.area} · {site.hours}
                </p>
              </Up>
              <Up delay={0.08}>
                <h1 className="font-display text-[min(2.75rem,calc(100cqw/9))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/9))]">
                  Broken appliance.<br />
                  <span className="text-[#b45309]">Diagnosed & fixed.</span>
                </h1>
              </Up>
              <Up delay={0.16}>
                <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-[#475569]">{site.tagline}</p>
              </Up>
              <Up delay={0.24}>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={quoteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-[#b45309] px-8 py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#0f172a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f8fafc]"
                  >
                    Book diagnosis
                    <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href={callHref}
                    className="inline-flex items-center gap-3 border-2 border-[#b45309]/30 px-8 py-4 rounded-full text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#b45309] hover:text-[#b45309] bg-white"
                  >
                    <Phone className="h-4.5 w-4.5" /> Call now
                  </a>
                </div>
              </Up>
              <Up delay={0.32}>
                <div className="mt-10 grid grid-cols-1 gap-4 bp-md:grid-cols-3">
                  {[
                    ["Diagnosis", "R350"],
                    ["Warranty", "90 days"],
                    ["Parts", "Quoted separately"],
                  ].map(([label, value]) => (
                    <div key={label} className="@container p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm">
                      <p className="font-display text-[min(1.5rem,calc(100cqw/8))] font-extrabold text-[#b45309] break-words">{value}</p>
                      <p className="mt-1 text-[10px] font-bold tracking-[0.18em] text-[#64748b] uppercase">{label}</p>
                    </div>
                  ))}
                </div>
              </Up>
            </div>

            {/* Right: workshop imagery */}
            <Up delay={0.15} className="order-1 bp-md:order-2 relative">
              <div className="relative group">
                <div className="absolute -inset-2 border-2 border-[#b45309]/40 rounded-3xl" aria-hidden />
                <img
                  src={site.heroImageUrl}
                  alt={site.businessName}
                  className="aspect-[4/5] w-full object-cover rounded-3xl overflow-hidden shadow-xl"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur px-5 py-3 rounded-2xl border border-[#b45309]/30">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#b45309] uppercase">Workbench ready</p>
                    <p className="font-display text-sm font-bold text-[#0f172a]">{site.area} · {site.hours}</p>
                  </div>
                </div>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Diagnosis — workbench panel ——— */}
        <section id="diagnosis" className="border-t border-[#e2e8f0] bg-[#f1f5f9]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-20 bp-md:grid-cols-[auto_1fr_auto] bp-md:py-28">
            <Up>
              <ShieldCheck className="h-16 w-16 text-[#b45309]" strokeWidth={1.5} />
            </Up>
            <Up delay={0.1} className="@container">
              <h2 className="font-display text-[min(1.875rem,calc(100cqw/14))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/14))]">
                Diagnosis credited on repair
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#475569]">
                {site.businessName} serves {site.area} with washing machine, fridge, stove and dishwasher repair.
                Parts quoted separately — no surprise bills.
                {site.isDemo && site.guarantee && <><br/><DemoBadge className="mt-2" /> <span className="text-[#475569] text-xs">Demo guarantee: {site.guarantee}</span></>}
              </p>
            </Up>
            <Up delay={0.2}>
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#b45309] px-7 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#0f172a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f8fafc]"
              >
                Book diagnosis <ArrowRight className="h-4.5 w-4.5" />
              </a>
            </Up>
          </div>
        </section>

        {/* ——— Appliances — workbench cards ——— */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 flex flex-wrap items-end justify-between gap-4 @container">
            <div>
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#64748b] uppercase">Appliance repair</p>
              <h2 className="font-display text-[min(2.5rem,calc(100cqw/11))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(4rem,calc(100cqw/11))]">
                Appliances & <span className="text-[#64748b]">rates</span>
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
                  className="group flex h-full flex-col border-2 border-[#e2e8f0] bg-white p-6 rounded-xl transition-all duration-300 hover:border-[#b45309] hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <span className="font-display text-4xl font-extrabold text-[#f1f5f9]/40 transition-colors group-hover:text-[#b45309]/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="bg-[#fef3c7] px-3 py-1.5 rounded-full font-display text-xs font-bold tracking-[0.14em] text-[#0f172a] uppercase">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight uppercase break-words">{service.name}</h3>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#475569]">{service.description}</p>
                  )}
                  <p className="mt-auto flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#64748b] uppercase transition-colors group-hover:text-[#b45309]">
                    Book repair <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Gallery — workshop/bench shots ——— */}
        <section className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#b45309] uppercase">Repairs</p>
            <h2 className="font-display text-[min(2.25rem,calc(100cqw/13))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3.5rem,calc(100cqw/13))]">
              The workbench
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-5 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.05}>
                <div className="group relative overflow-hidden border-2 border-[#e2e8f0] bg-white rounded-2xl">
                  <img
                    src={url}
                    alt={`${site.businessName} repair ${i + 1}`}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 bg-white/90 px-3 py-1 rounded-full font-display text-[10px] font-extrabold tracking-[0.14em] text-[#0f172a] uppercase">
                    Job {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Areas + contact — amber contact card ——— */}
        <section id="areas" className="border-t border-[#e2e8f0] bg-[#fef3c7]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 bp-md:grid-cols-2 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#92400e] uppercase">Service areas</p>
              <h2 className="font-display text-[min(2.25rem,calc(100cqw/16))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/16))]">
                Based in {site.area.split(",")[0]},
                <br />
                <span className="text-[#92400e]">repairing everywhere nearby.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {[site.area.split(",")[0], "Washing machines", "Fridges & freezers", "Stoves & ovens"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="flex items-center gap-1.5 border border-[#d97706]/30 bg-white px-3.5 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#b45309]" /> {chip}
                    </span>
                  ),
                )}
              </div>
            </Up>
            <Up delay={0.15}>
              <div className="border border-[#b45309] bg-white p-8 rounded-2xl text-[#0f172a] shadow-xl">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#b45309] uppercase">Talk to us</p>
                <div className="mt-6 space-y-4">
                  <a href={callHref} className="flex items-center gap-4 transition-colors hover:text-[#b45309]">
                    <Phone className="h-5 w-5 shrink-0 text-[#b45309]" />
                    <span className="font-display text-[min(1.5rem,calc(100cqw/18))] font-extrabold break-words">
                      {displayPhone(site.whatsapp)}
                    </span>
                  </a>
                  <div className="flex items-center gap-4 text-[#475569]">
                    <Clock className="h-5 w-5 shrink-0 text-[#b45309]" />
                    <span className="text-sm font-medium">{site.hours}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#475569]">
                    <MapPin className="h-5 w-5 shrink-0 text-[#b45309]" />
                    <span className="text-sm font-medium">{site.area}</span>
                  </div>
                </div>
                <a
                  href={quoteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-3 bg-[#b45309] py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#0f172a] uppercase transition-all duration-300 hover:-translate-y-0.5"
                >
                  WhatsApp {site.businessName.split(" ")[0]} now
                </a>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#e2e8f0] bg-[#f1f5f9] px-5 py-10 text-[#0f172a]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="border-2 border-[#b45309] bg-[#b45309] font-display text-[#0f172a]" />
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">
                {site.businessName}
              </span>
            </div>
            <SocialRow site={site} iconClassName="text-[#475569]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#92400e] uppercase">
              Powered by <span className="text-[#b45309]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
