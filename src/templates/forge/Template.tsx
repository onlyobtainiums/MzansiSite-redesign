"use client";

import {
  ArrowRight,
  BadgeCheck,
  Clock,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { LogoBlock, SocialRow, WhatsAppFab } from "../shared";
import { Up } from "../Reveal";

/* Forge — rugged, high-trust design for trades & construction.
   Palette: coal #16181a · safety yellow #ffc400 · concrete #eceae3 · steel #5b6570 */

/** Diagonal hazard stripe divider. */
function HazardStripes({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="h-3 w-full"
      style={{
        background: `repeating-linear-gradient(${flip ? -45 : 45}deg, #ffc400 0 14px, #16181a 14px 28px)`,
      }}
      aria-hidden
    />
  );
}

export default function ForgeTemplate({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const quoteLink = waLink(site.whatsapp, `Hi ${site.businessName}! I need a quote for a job.`);
  const callHref = `tel:+${site.phone?.replace(/\D/g, "").replace(/^0/, "27") ?? site.whatsapp.replace(/\D/g, "").replace(/^0/, "27")}`;

  return (
    <div className="min-h-screen bg-[#eceae3] font-sans text-[#16181a]">
      <WhatsAppFab site={site} />

      {/* ——— Emergency top bar ——— */}
      <div className="bg-[#ffc400] px-4 py-2.5">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase sm:justify-between">
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4 fill-[#16181a]" /> {site.hours}
          </span>
          <a href={callHref} className="hidden items-center gap-2 underline underline-offset-4 sm:flex">
            <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
          </a>
        </div>
      </div>

      {/* ——— Nav ——— */}
      <header className="sticky top-0 z-40 border-b-2 border-[#16181a] bg-[#16181a] text-[#eceae3]">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-3">
            <LogoBlock site={site} className="border-2 border-[#ffc400] bg-[#ffc400] font-display text-[#16181a]" />
            <span className="font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
          </a>
          <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase md:flex">
            <a href="#services" className="text-[#eceae3]/60 transition-colors hover:text-[#ffc400]">Services</a>
            <a href="#work" className="text-[#eceae3]/60 transition-colors hover:text-[#ffc400]">Recent work</a>
            <a href="#areas" className="text-[#eceae3]/60 transition-colors hover:text-[#ffc400]">Areas</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={quoteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden bg-[#ffc400] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#16181a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#eceae3] sm:block"
            >
              Get a quote
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid h-10 w-10 place-items-center border border-[#eceae3]/20 md:hidden"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t border-[#eceae3]/10 px-5 py-4 md:hidden">
            {["services", "work", "areas"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#eceae3]/70"
              >
                {id.replace("work", "recent work")}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ——— Hero ——— */}
      <section id="top" className="bg-[#16181a] pb-0 text-[#eceae3]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#eceae3 1px, transparent 1px), linear-gradient(90deg, #eceae3 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-16 pt-14 md:grid-cols-[1.15fr_0.85fr] md:pt-20">
          <div>
            <Up>
              <p className="mb-5 inline-flex items-center gap-2 border-2 border-[#ffc400] px-3 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[#ffc400] uppercase">
                <BadgeCheck className="h-4 w-4" /> Registered & insured · {site.area}
              </p>
            </Up>
            <Up delay={0.08}>
              <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight uppercase md:text-7xl">
                {site.services[0]?.name.split(" ")[0] ?? "Fixed"}.
                <br />
                Sorted.{" "}
                <span className="relative inline-block text-[#ffc400]">
                  Same day.
                  <span className="absolute -bottom-1 left-0 h-2 w-full bg-[#ffc400]/30" aria-hidden />
                </span>
              </h1>
            </Up>
            <Up delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#eceae3]/65">{site.tagline}</p>
            </Up>
            <Up delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href={quoteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-[#ffc400] px-7 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#16181a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#eceae3]"
                >
                  WhatsApp for a quote
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href={callHref}
                  className="inline-flex items-center gap-3 border-2 border-[#eceae3]/25 px-7 py-4 text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#ffc400] hover:text-[#ffc400]"
                >
                  <Phone className="h-4.5 w-4.5" /> Call now
                </a>
              </div>
            </Up>
          </div>

          <Up delay={0.15} className="relative">
            <div className="relative">
              <div className="absolute -inset-2 border-2 border-[#ffc400]" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.heroImageUrl} alt={site.businessName} className="aspect-[4/5] w-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-[#16181a]/90 px-5 py-4 backdrop-blur">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#ffc400] uppercase">Rating</p>
                  <p className="flex items-center gap-1.5 font-display text-xl font-extrabold">
                    <Star className="h-4.5 w-4.5 fill-[#ffc400] text-[#ffc400]" /> {site.rating}
                    <span className="text-sm font-medium text-[#eceae3]/50">({site.reviews} jobs)</span>
                  </p>
                </div>
                <Wrench className="h-7 w-7 text-[#ffc400]" />
              </div>
            </div>
          </Up>
        </div>

        {/* Trust stats */}
        <div className="relative border-t-2 border-[#eceae3]/10 bg-[#1d1f22]">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x-2 divide-[#eceae3]/10 md:grid-cols-4">
            {[
              [`${site.yearsInBusiness} yrs`, "in the trade"],
              [`${(site.reviews ?? 100) * 8}+`, "jobs completed"],
              ["6 mo", "workmanship guarantee"],
              ["60 min", "emergency response"],
            ].map(([big, small], i) => (
              <Up key={small} delay={i * 0.08} className="px-5 py-6 text-center md:py-8">
                <p className="font-display text-2xl font-extrabold text-[#ffc400] md:text-3xl">{big}</p>
                <p className="mt-1 text-[10px] font-bold tracking-[0.18em] text-[#eceae3]/50 uppercase">{small}</p>
              </Up>
            ))}
          </div>
        </div>
        <HazardStripes />
      </section>

      {/* ——— Services ——— */}
      <section id="services" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Up className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#5b6570] uppercase">What we do</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase md:text-6xl">
              Services & <span className="text-[#5b6570]">rates</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#16181a]/55">
            Every job quoted in writing before we start. No hidden costs, no surprises.
          </p>
        </Up>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, i) => (
            <Up key={service.name} delay={i * 0.06}>
              <a
                href={waLink(site.whatsapp, `Hi ${site.businessName}! I need help with: ${service.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between border-2 border-[#16181a] bg-[#eceae3] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#16181a] hover:text-[#eceae3] hover:shadow-[8px_8px_0_#ffc400]"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-display text-4xl font-extrabold text-[#16181a]/15 transition-colors group-hover:text-[#ffc400]/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="bg-[#ffc400] px-3 py-1.5 font-display text-sm font-extrabold text-[#16181a]">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-extrabold tracking-tight uppercase">{service.name}</h3>
                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#16181a]/55 transition-colors group-hover:text-[#eceae3]/60">
                      {service.description}
                    </p>
                  )}
                </div>
                <p className="mt-5 flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#16181a]/40 uppercase transition-colors group-hover:text-[#ffc400]">
                  Request this <ArrowRight className="h-3.5 w-3.5" />
                </p>
              </a>
            </Up>
          ))}
        </div>
      </section>

      {/* ——— Guarantee banner ——— */}
      <section className="bg-[#16181a] text-[#eceae3]">
        <HazardStripes flip />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 md:grid-cols-[auto_1fr_auto] md:py-20">
          <Up>
            <ShieldCheck className="h-16 w-16 text-[#ffc400]" strokeWidth={1.5} />
          </Up>
          <Up delay={0.1}>
            <h2 className="font-display text-3xl font-extrabold tracking-tight uppercase md:text-5xl">
              {(site.guarantee ?? 'If it breaks in 6 months, we come back free.').split(',')[0]},
              <br />
              <span className="text-[#ffc400]">{(site.guarantee ?? "we come back free.").split(",").slice(1).join(",").trim() || "we come back free."}</span>
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#eceae3]/55">
              Workmanship guaranteed in writing on every job card. That&apos;s how {site.businessName} has kept a{" "}
              {site.rating} rating across {site.reviews}+ reviews.
            </p>
          </Up>
          <Up delay={0.2}>
            <a
              href={quoteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#ffc400] px-7 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#16181a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#eceae3]"
            >
              Book a call-out <ArrowRight className="h-4.5 w-4.5" />
            </a>
          </Up>
        </div>
        <HazardStripes />
      </section>

      {/* ——— Recent work ——— */}
      <section id="work" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Up className="mb-12">
          <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#5b6570] uppercase">Proof, not promises</p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase md:text-6xl">
            {site.galleryHeading ?? "Recent"} <span className="text-[#5b6570]">{site.galleryHeading ? "" : "jobs"}</span>
          </h2>
        </Up>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {gallery.map((url, i) => (
            <Up key={`${url}-${i}`} delay={i * 0.05}>
              <div className="group relative overflow-hidden border-2 border-[#16181a]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`${site.businessName} job ${i + 1}`}
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 bg-[#ffc400] px-2 py-1 font-display text-[10px] font-extrabold tracking-[0.14em] text-[#16181a] uppercase">
                  Job {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Up>
          ))}
        </div>
      </section>

      {/* ——— Areas + contact ——— */}
      <section id="areas" className="border-t-2 border-[#16181a] bg-[#dfdcd2]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <Up>
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#5b6570] uppercase">Coverage</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase md:text-5xl">
              Based in {site.area.split(",")[0]},
              <br />
              <span className="text-[#5b6570]">working everywhere nearby.</span>
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {[site.area.split(",")[0], "…and surrounds", "Same-day call-outs", "After-hours by arrangement"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="flex items-center gap-1.5 border-2 border-[#16181a] bg-[#eceae3] px-3.5 py-2 text-[11px] font-bold tracking-[0.12em] uppercase"
                  >
                    <MapPin className="h-3.5 w-3.5 text-[#5b6570]" /> {chip}
                  </span>
                ),
              )}
            </div>
          </Up>
          <Up delay={0.15}>
            <div className="border-2 border-[#16181a] bg-[#16181a] p-8 text-[#eceae3] shadow-[10px_10px_0_#ffc400]">
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#ffc400] uppercase">Talk to us</p>
              <div className="mt-6 space-y-4">
                <a href={callHref} className="flex items-center gap-4 transition-colors hover:text-[#ffc400]">
                  <Phone className="h-5 w-5 shrink-0 text-[#ffc400]" />
                  <span className="font-display text-2xl font-extrabold">{displayPhone(site.whatsapp)}</span>
                </a>
                <div className="flex items-center gap-4 text-[#eceae3]/70">
                  <Clock className="h-5 w-5 shrink-0 text-[#ffc400]" />
                  <span className="text-sm font-medium">{site.hours}</span>
                </div>
                <div className="flex items-center gap-4 text-[#eceae3]/70">
                  <MapPin className="h-5 w-5 shrink-0 text-[#ffc400]" />
                  <span className="text-sm font-medium">{site.area}</span>
                </div>
              </div>
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-3 bg-[#ffc400] py-4 font-display text-sm font-bold tracking-[0.14em] text-[#16181a] uppercase transition-all duration-300 hover:-translate-y-0.5"
              >
                WhatsApp {site.businessName.split(" ")[0]} now
              </a>
            </div>
          </Up>
        </div>
      </section>

      {/* ——— Footer ——— */}
      <footer className="border-t-2 border-[#16181a] bg-[#16181a] px-5 py-10 text-[#eceae3]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
          <div className="flex items-center gap-3">
            <LogoBlock site={site} className="border-2 border-[#ffc400] bg-[#ffc400] font-display text-[#16181a]" />
            <span className="font-display text-lg font-extrabold uppercase">{site.businessName}</span>
          </div>
          <SocialRow site={site} iconClassName="text-[#eceae3]/50" />
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#eceae3]/40 uppercase">
            Powered by <span className="text-[#ffc400]">MzansiSite</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
