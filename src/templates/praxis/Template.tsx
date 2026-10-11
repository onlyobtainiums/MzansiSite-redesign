"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Clock,
  FileText,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { LogoBlock, SocialRow, WhatsAppFab } from "../shared";

/* Praxis — crisp, credibility-first design for professional services.
   Palette: paper #f4f2ec · ink #101c2c · royal #1f3a5f · bronze #a8895b */

const EASE = [0.22, 1, 0.36, 1] as const;

function Up({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function PraxisTemplate({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const consultLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book a consultation.`);
  const callHref = `tel:+${site.whatsapp.replace(/\D/g, "").replace(/^0/, "27")}`;

  return (
    <div className="min-h-screen bg-[#f4f2ec] font-sans text-[#101c2c]">
      <WhatsAppFab site={site} accent="#166b52" />

      {/* ——— Credential bar ——— */}
      <div className="bg-[#101c2c] px-4 py-2 text-[#f4f2ec]/75">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-[10px] font-semibold tracking-[0.22em] uppercase">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-[#a8895b]" />
            Registered practitioners · Est. {new Date().getFullYear() - (site.yearsInBusiness ?? 10)}
          </span>
          <span className="hidden items-center gap-2 sm:flex">
            <Clock className="h-3.5 w-3.5 text-[#a8895b]" /> {site.hours}
          </span>
        </div>
      </div>

      {/* ——— Nav ——— */}
      <header className="sticky top-0 z-40 border-b border-[#101c2c]/10 bg-[#f4f2ec]/92 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-3">
            <LogoBlock site={site} className="rounded-sm border border-[#a8895b]/50 bg-[#101c2c] font-display text-[#d6bea0]" />
            <span className="hidden font-serif text-xl sm:block">{site.businessName}</span>
          </a>
          <div className="hidden items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase md:flex">
            <a href="#expertise" className="text-[#101c2c]/55 transition-colors hover:text-[#1f3a5f]">Expertise</a>
            <a href="#process" className="text-[#101c2c]/55 transition-colors hover:text-[#1f3a5f]">Process</a>
            <a href="#about" className="text-[#101c2c]/55 transition-colors hover:text-[#1f3a5f]">The firm</a>
            <a href="#contact" className="text-[#101c2c]/55 transition-colors hover:text-[#1f3a5f]">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={consultLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-sm bg-[#101c2c] px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] text-[#f4f2ec] uppercase transition-colors duration-300 hover:bg-[#1f3a5f] sm:block"
            >
              Book consultation
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid h-10 w-10 place-items-center rounded-sm border border-[#101c2c]/15 md:hidden"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t border-[#101c2c]/10 px-5 py-4 md:hidden">
            {["expertise", "process", "about", "contact"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#101c2c]/65"
              >
                {id === "about" ? "The firm" : id}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ——— Hero ——— */}
      <section id="top" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-24 top-16 select-none font-display text-[22rem] font-extrabold leading-none text-[#101c2c]/[0.035]"
          aria-hidden
        >
          §
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 pb-20 pt-16 md:grid-cols-[1.1fr_0.9fr] md:pt-24">
          <div>
            <Up>
              <p className="mb-5 inline-flex items-center gap-2 border border-[#a8895b]/50 bg-[#a8895b]/10 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.26em] text-[#7d6540] uppercase">
                <Landmark className="h-3.5 w-3.5" /> {site.area}
              </p>
            </Up>
            <Up delay={0.08}>
              <h1 className="font-serif text-5xl leading-[1.04] md:text-7xl">
                Counsel that answers <em className="text-[#1f3a5f]">before</em> you have to chase.
              </h1>
            </Up>
            <Up delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#101c2c]/65">{site.tagline}</p>
            </Up>
            <Up delay={0.24}>
              <ul className="mt-7 space-y-2.5">
                {["Fixed fees agreed in writing, upfront", "WhatsApp updates at every milestone", "First reply within one working hour"].map(
                  (point) => (
                    <li key={point} className="flex items-center gap-3 text-sm font-medium text-[#101c2c]/75">
                      <BadgeCheck className="h-4.5 w-4.5 shrink-0 text-[#1f3a5f]" /> {point}
                    </li>
                  ),
                )}
              </ul>
            </Up>
            <Up delay={0.32}>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href={consultLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-[#101c2c] px-7 py-4 text-[12px] font-bold tracking-[0.16em] text-[#f4f2ec] uppercase transition-all duration-300 hover:bg-[#1f3a5f]"
                >
                  Book a consultation
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href={callHref}
                  className="inline-flex items-center gap-3 border border-[#101c2c]/20 px-7 py-4 text-[12px] font-bold tracking-[0.16em] uppercase transition-colors duration-300 hover:border-[#101c2c]"
                >
                  <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
                </a>
              </div>
            </Up>
          </div>

          <Up delay={0.15} className="relative">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-3 border border-[#a8895b]/60" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.heroImageUrl} alt={site.businessName} className="aspect-[4/5] w-full object-cover" />
              <div className="absolute -bottom-6 -left-6 border border-[#101c2c]/10 bg-[#f4f2ec] p-5 shadow-xl">
                <p className="font-display text-3xl font-extrabold text-[#1f3a5f]">{site.yearsInBusiness}+</p>
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#101c2c]/45 uppercase">years in practice</p>
                <div className="mt-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-[#a8895b] text-[#a8895b]" />
                  ))}
                  <span className="ml-1 text-[10px] font-semibold text-[#101c2c]/50">
                    {site.rating} · {site.reviews}
                  </span>
                </div>
              </div>
            </div>
          </Up>
       </div>

        {/* Trust strip */}
        <div className="border-y border-[#101c2c]/10 bg-[#ece8de]">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-[#101c2c]/10 md:grid-cols-4">
            {[
              [`${(site.reviews ?? 100) * 12}+`, "matters handled"],
              [`${site.rating}/5`, "client rating"],
              ["1 hour", "first response time"],
              ["100%", "fees in writing"],
            ].map(([big, small], i) => (
              <Up key={small} delay={i * 0.06} className="px-5 py-6 text-center">
                <p className="font-display text-2xl font-extrabold text-[#1f3a5f] md:text-3xl">{big}</p>
                <p className="mt-1 text-[10px] font-bold tracking-[0.18em] text-[#101c2c]/45 uppercase">{small}</p>
              </Up>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Expertise ——— */}
      <section id="expertise" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Up className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#a8895b] uppercase">Areas of expertise</p>
            <h2 className="font-serif text-4xl md:text-6xl">
              What we <em className="text-[#1f3a5f]">handle</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#101c2c]/55">
            Every engagement starts with a scoped, fixed quote. If it&apos;s not our field, we&apos;ll say so — and
            refer you well.
          </p>
        </Up>
        <div className="divide-y divide-[#101c2c]/10 border-y border-[#101c2c]/10">
          {site.services.map((service, i) => (
            <Up key={service.name} delay={i * 0.04}>
              <a
                href={waLink(site.whatsapp, `Hi ${site.businessName}! I need help with: ${service.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 transition-all duration-300 hover:bg-[#ece8de] md:grid-cols-[auto_1fr_auto_auto] md:gap-10 md:px-6"
              >
                <span className="font-display text-sm font-bold text-[#101c2c]/30">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-2xl leading-snug transition-colors group-hover:text-[#1f3a5f] md:text-3xl">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="mt-1 text-sm text-[#101c2c]/50">{service.description}</p>
                  )}
                </div>
                <span className="text-right font-display text-lg font-extrabold text-[#101c2c] md:text-xl">
                  {service.price}
                </span>
                <ArrowUpRight className="hidden h-6 w-6 text-[#101c2c]/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#a8895b] md:block" />
              </a>
            </Up>
          ))}
        </div>
      </section>

      {/* ——— Process ——— */}
      <section id="process" className="bg-[#101c2c] py-20 text-[#f4f2ec] md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Up className="mb-14 text-center">
            <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#a8895b] uppercase">How engagements work</p>
            <h2 className="font-serif text-4xl md:text-6xl">
              Four steps. <em className="text-[#d6bea0]">No surprises.</em>
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-[#f4f2ec]/10 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                [Scale, "Consult", "Tell us what happened. We assess honestly — even if the answer is “you don’t need us”."],
                [FileText, "Scope & quote", "A written scope and fixed fee. You approve before any work begins."],
                [ShieldCheck, "We handle it", "Filings, drafting, negotiations — done by the practitioner, not a call centre."],
                [BadgeCheck, "You stay updated", "WhatsApp updates at every milestone. Ask anything, anytime."],
              ] as const
            ).map(([Icon, title, copy], i) => (
              <Up key={title} delay={i * 0.08}>
                <div className="flex h-full flex-col bg-[#101c2c] p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-sm border border-[#a8895b]/40 text-[#d6bea0]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-3xl font-extrabold text-[#f4f2ec]/15">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#f4f2ec]/55">{copy}</p>
                </div>
              </Up>
            ))}
          </div>
        </div>
      </section>

      {/* ——— About ——— */}
      <section id="about" className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:py-28">
        <Up className="relative">
          <div className="overflow-hidden rounded-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery[1] ?? site.heroImageUrl} alt={`Inside ${site.businessName}`} className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -right-5 hidden w-44 overflow-hidden rounded-sm border-4 border-[#f4f2ec] shadow-xl md:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery[2] ?? gallery[0]} alt="Detail" className="aspect-square w-full object-cover" />
          </div>
        </Up>
        <div>
          <Up>
            <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#a8895b] uppercase">The firm</p>
          </Up>
          <Up delay={0.1}>
            <blockquote className="font-serif text-3xl leading-snug md:text-[2.6rem]">
              “Most people don&apos;t fear the process — they fear being left in the dark. So we built a practice that
              answers.”
            </blockquote>
          </Up>
          <Up delay={0.2}>
            <p className="mt-7 max-w-lg text-sm leading-relaxed text-[#101c2c]/60 md:text-base">
              {site.businessName} has served {site.area.split(",")[1]?.trim() ?? "South Africa"} for{" "}
              {site.yearsInBusiness} years. A deliberately small practice: every client deals with a partner, every fee
              is quoted in writing, and every matter gets a WhatsApp channel you can reach seven days a week.
            </p>
          </Up>
          <Up delay={0.3}>
            <p className="mt-8 font-serif text-2xl italic text-[#1f3a5f]">— The partners, {site.businessName}</p>
          </Up>
        </div>
      </section>

      {/* ——— Testimonials ——— */}
      <section className="bg-[#ece8de] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Up className="mb-12 text-center">
            <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#a8895b] uppercase">Client outcomes</p>
            <h2 className="font-serif text-4xl md:text-6xl">{site.reviewHeading ?? "Said better by clients"}</h2>
          </Up>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {(site.reviewItems ?? [
              { quote: "Quoted in writing on Tuesday, transfer lodged by Friday. Professional and responsive.", name: "R. Oosthuizen", label: "Property transfer" },
              { quote: "Told me honestly my case was weak, saved me thousands, then helped me settle.", name: "N. Dube", label: "Labour matter" },
              { quote: "Five years, three businesses, one WhatsApp away. Best decision I made.", name: "S. Pillay", label: "Retainer client" },
            ]).map((review, i) => (
              <Up key={review.name} delay={i * 0.1}>
                <figure className="flex h-full flex-col rounded-sm border border-[#101c2c]/10 bg-[#f4f2ec] p-7">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-[#a8895b] text-[#a8895b]" />
                    ))}
                  </div>
                  <blockquote className="flex-1 text-sm leading-relaxed text-[#101c2c]/75">&ldquo;{review.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6 border-t border-[#101c2c]/10 pt-4">
                    <p className="font-serif text-lg">{review.name}</p>
                    <p className="text-[10px] font-bold tracking-[0.18em] text-[#a8895b] uppercase">{review.label}</p>
                  </figcaption>
                </figure>
              </Up>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Consultation CTA ——— */}
      <section id="contact" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Up>
          <div className="grid grid-cols-1 overflow-hidden rounded-sm border border-[#101c2c]/10 md:grid-cols-2">
            <div className="bg-[#1f3a5f] p-10 text-[#f4f2ec] md:p-14">
              <p className="text-[11px] font-bold tracking-[0.3em] text-[#d6bea0] uppercase">Start here</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
                One conversation usually answers everything.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#f4f2ec]/65">
                {site.services[0]?.name ?? "Consultation"} · {site.services[0]?.price ?? "enquire"}. Written summary
                included, no obligation to proceed.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href={consultLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#d6bea0] px-7 py-4 text-[12px] font-bold tracking-[0.16em] text-[#101c2c] uppercase transition-all duration-300 hover:-translate-y-0.5"
                >
                  WhatsApp the office <ArrowRight className="h-4 w-4" />
                </a>
                {site.email && (
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-3 border border-[#f4f2ec]/25 px-7 py-4 text-[12px] font-bold tracking-[0.16em] uppercase transition-colors hover:border-[#d6bea0]"
                  >
                    <Mail className="h-4 w-4" /> Email
                  </a>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center gap-6 bg-[#f4f2ec] p-10 md:p-14">
              <div className="flex items-center gap-4 border-b border-[#101c2c]/10 pb-5">
                <Phone className="h-5 w-5 text-[#1f3a5f]" />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#101c2c]/40 uppercase">Direct line</p>
                  <p className="font-display text-xl font-extrabold">{displayPhone(site.whatsapp)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-b border-[#101c2c]/10 pb-5">
                <Clock className="h-5 w-5 text-[#1f3a5f]" />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#101c2c]/40 uppercase">Hours</p>
                  <p className="font-medium">{site.hours}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-[#1f3a5f]" />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#101c2c]/40 uppercase">Offices</p>
                  <p className="font-medium">{site.area}</p>
                </div>
              </div>
            </div>
          </div>
        </Up>
      </section>

      {/* ——— Footer ——— */}
      <footer className="bg-[#101c2c] px-5 py-12 text-[#f4f2ec]">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <LogoBlock site={site} className="rounded-sm border border-[#a8895b]/50 bg-[#f4f2ec] text-[#101c2c] font-display" />
              <div>
                <p className="font-serif text-lg leading-none">{site.businessName}</p>
                <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-[#f4f2ec]/40 uppercase">{site.area}</p>
              </div>
            </div>
            <SocialRow site={site} iconClassName="text-[#f4f2ec]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#f4f2ec]/40 uppercase">
              Powered by <span className="text-[#d6bea0]">MzansiSite</span>
            </p>
          </div>
          <p className="mt-8 border-t border-[#f4f2ec]/10 pt-6 text-center text-[10px] tracking-[0.14em] text-[#f4f2ec]/30 uppercase">
            {site.guarantee ?? "Registered practitioners · Fees quoted & agreed in writing · POPIA compliant"}
          </p>
        </div>
      </footer>
    </div>
  );
}
