"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  Clock,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Truck,
  Wifi,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { LogoBlock, SocialRow, WhatsAppFab } from "../shared";

/* Vital — clean, versatile design for services, IT, transport & agri.
   Palette: mist #f2f6f3 · pine #0c1d18 · teal #0e7a5f · gold #d9a62e */

const EASE = [0.22, 1, 0.36, 1] as const;

function Up({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const SERVICE_ICONS = [Wrench, Wifi, Truck, Leaf, ShieldCheck, Zap];

export default function VitalTemplate({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const bookLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to make an enquiry.`);
  const callHref = `tel:+${site.whatsapp.replace(/\D/g, "").replace(/^0/, "27")}`;

  return (
    <div className="min-h-screen bg-[#f2f6f3] font-sans text-[#0c1d18]">
      <WhatsAppFab site={site} />

      {/* ——— Trust bar ——— */}
      <div className="bg-[#0c1d18] px-4 py-2.5 text-[#f2f6f3]/85">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-x-6 gap-y-1 text-[10px] font-semibold tracking-[0.18em] uppercase sm:justify-between">
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-[#d9a62e] text-[#d9a62e]" /> {site.rating} rated
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <Clock className="h-3.5 w-3.5 text-[#d9a62e]" /> {site.hours}
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#d9a62e]" /> Work guaranteed
          </span>
        </div>
      </div>

      {/* ——— Nav ——— */}
      <header className="sticky top-0 z-40 border-b border-[#0c1d18]/10 bg-[#f2f6f3]/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-3">
            <LogoBlock site={site} className="rounded-xl bg-[#0e7a5f] font-display text-[#f2f6f3]" />
            <span className="font-display text-lg font-extrabold tracking-tight">{site.businessName}</span>
          </a>
          <div className="hidden items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase md:flex">
            <a href="#services" className="text-[#0c1d18]/55 transition-colors hover:text-[#0e7a5f]">Services</a>
            <a href="#how" className="text-[#0c1d18]/55 transition-colors hover:text-[#0e7a5f]">How it works</a>
            <a href="#reviews" className="text-[#0c1d18]/55 transition-colors hover:text-[#0e7a5f]">Reviews</a>
            <a href="#contact" className="text-[#0c1d18]/55 transition-colors hover:text-[#0e7a5f]">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={bookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-[#0e7a5f] px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] text-white uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0c1d18] sm:block"
            >
              Get help today
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#0c1d18]/15 md:hidden"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t border-[#0c1d18]/10 px-5 py-4 md:hidden">
            {[
              ["services", "Services"],
              ["how", "How it works"],
              ["reviews", "Reviews"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#0c1d18]/65"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ——— Hero ——— */}
      <section id="top" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, #0e7a5f33, transparent 70%)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-16 md:grid-cols-[1.05fr_0.95fr] md:pt-24">
          <div>
            <Up>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0e7a5f]/30 bg-[#0e7a5f]/10 px-4 py-1.5 text-[10px] font-bold tracking-[0.24em] text-[#0e7a5f] uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-[#0e7a5f] opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-[#0e7a5f]" />
                </span>
                Taking bookings in {site.area.split(",")[0]}
              </p>
            </Up>
            <Up delay={0.1}>
              <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
                {site.tagline.split("—")[0].split(".")[0]}.
                <br />
                <span className="text-[#0e7a5f]">Handled properly.</span>
              </h1>
            </Up>
            <Up delay={0.2}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#0c1d18]/60">{site.tagline}</p>
            </Up>
            <Up delay={0.3}>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href={bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#0e7a5f] px-7 py-4 text-sm font-bold tracking-[0.14em] text-white uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0c1d18] hover:shadow-[0_16px_32px_-12px_rgba(12,29,24,0.5)]"
                >
                  WhatsApp us now
                  <MessageCircle className="h-4.5 w-4.5 transition-transform duration-300 group-hover:rotate-12" />
                </a>
                <a
                  href={callHref}
                  className="inline-flex items-center gap-3 rounded-full border-2 border-[#0c1d18]/15 px-7 py-4 text-sm font-bold tracking-[0.14em] uppercase transition-colors duration-300 hover:border-[#0c1d18]"
                >
                  <Phone className="h-4.5 w-4.5 text-[#0e7a5f]" /> {displayPhone(site.whatsapp)}
                </a>
              </div>
            </Up>
          </div>

          <Up delay={0.2} className="relative">
            <div className="relative mx-auto max-w-md">
              <div className="overflow-hidden rounded-[2rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={site.heroImageUrl} alt={site.businessName} className="aspect-[4/5] w-full object-cover" />
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl bg-[#0c1d18] px-6 py-4 text-[#f2f6f3] shadow-2xl"
              >
                <div>
                  <p className="text-[9px] font-bold tracking-[0.22em] text-[#d9a62e] uppercase">Client rating</p>
                  <p className="flex items-center gap-1.5 font-display text-xl font-extrabold">
                    <Star className="h-4.5 w-4.5 fill-[#d9a62e] text-[#d9a62e]" /> {site.rating}
                    <span className="text-sm font-medium text-[#f2f6f3]/50">· {site.reviews}+ reviews</span>
                  </p>
                </div>
                <BadgeCheck className="h-8 w-8 text-[#0e7a5f]" />
              </motion.div>
            </div>
          </Up>
        </div>
      </section>

      {/* ——— Number strip ——— */}
      <section className="border-y border-[#0c1d18]/10 bg-white/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-[#0c1d18]/10 md:grid-cols-4">
          {[
            [`${site.yearsInBusiness} yrs`, "in business"],
            [`${(site.reviews ?? 100) * 6}+`, "jobs delivered"],
            ["< 2 hrs", "avg. response"],
            ["100%", "satisfaction focus"],
          ].map(([big, small], i) => (
            <Up key={small} delay={i * 0.06} className="px-5 py-7 text-center">
              <p className="font-display text-2xl font-extrabold text-[#0e7a5f] md:text-3xl">{big}</p>
              <p className="mt-1 text-[10px] font-bold tracking-[0.18em] text-[#0c1d18]/45 uppercase">{small}</p>
            </Up>
          ))}
        </div>
      </section>

      {/* ——— Services ——— */}
      <section id="services" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Up className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#0e7a5f] uppercase">What we do</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              Services & <span className="text-[#0c1d18]/35">pricing</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#0c1d18]/55">
            Straight pricing in Rand. Tap a service to start a WhatsApp chat about it.
          </p>
        </Up>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
            return (
              <Up key={service.name} delay={i * 0.05}>
                <a
                  href={waLink(site.whatsapp, `Hi ${site.businessName}! I'm interested in: ${service.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between rounded-3xl border border-[#0c1d18]/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0e7a5f]/40 hover:shadow-[0_24px_40px_-20px_rgba(12,29,24,0.25)]"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0e7a5f]/10 transition-colors duration-300 group-hover:bg-[#0e7a5f] group-hover:text-white">
                        <Icon className="h-5.5 w-5.5 text-[#0e7a5f] transition-colors group-hover:text-white" />
                      </span>
                      <span className="rounded-full bg-[#d9a62e]/15 px-3 py-1.5 font-display text-sm font-extrabold text-[#8a6a15]">
                        {service.price}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight">{service.name}</h3>
                    {service.description && (
                      <p className="mt-2 text-sm leading-relaxed text-[#0c1d18]/55">{service.description}</p>
                    )}
                  </div>
                  <p className="mt-6 flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#0c1d18]/35 uppercase transition-colors group-hover:text-[#0e7a5f]">
                    Enquire <ArrowUpRight className="h-3.5 w-3.5" />
                  </p>
                </a>
              </Up>
            );
          })}
        </div>
      </section>

      {/* ——— How it works ——— */}
      <section id="how" className="bg-[#0c1d18] py-20 text-[#f2f6f3] md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Up className="mb-14 text-center">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#d9a62e] uppercase">Zero admin for you</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              Three steps. <span className="text-[#0e7a5f]">Done.</span>
            </h2>
          </Up>
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-[#f2f6f3]/15 md:block" aria-hidden />
            {(
              [
                [MessageCircle, "Message us", "One WhatsApp with what you need. We reply inside two hours, seven days a week."],
                [CalendarCheck, "Get a slot & quote", "Clear price, clear time. You approve before we move — no surprises later."],
                [BadgeCheck, "We deliver", "On time, guaranteed. Pay when the job's done and you're happy."],
              ] as const
            ).map(([Icon, title, copy], i) => (
              <Up key={title} delay={i * 0.12} className="relative">
                <div className="flex flex-col items-center text-center">
                  <span className="relative z-10 grid h-20 w-20 place-items-center rounded-full border-2 border-[#0e7a5f] bg-[#0c1d18]">
                    <Icon className="h-8 w-8 text-[#d9a62e]" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-extrabold">{title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#f2f6f3]/55">{copy}</p>
                </div>
              </Up>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Recent work ——— */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Up className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#0e7a5f] uppercase">Recent work</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">{site.galleryHeading ?? "See for yourself"}</h2>
          </div>
          <SocialRow site={site} iconClassName="text-[#0c1d18]/40" />
        </Up>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((url, i) => (
            <Up key={`${url}-${i}`} delay={i * 0.05}>
              <div className="group overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`${site.businessName} work ${i + 1}`}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </Up>
          ))}
        </div>
      </section>

      {/* ——— Reviews + CTA ——— */}
      <section id="reviews" className="bg-[#e6efe9] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Up className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#0e7a5f] uppercase">In their words</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              {site.reviews}+ people rate us {site.rating}
            </h2>
          </Up>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              ["Sent one WhatsApp, job was booked for the next morning. This is how every business should run.", "Thandi N."],
              ["Quoted before starting, arrived on time, cleaned up after. Ten out of ten.", "Mr. van Wyk"],
              ["We've used them for two years straight. Reliable is an understatement.", "Busisiwe K."],
            ].map(([quote, name], i) => (
              <Up key={name} delay={i * 0.1}>
                <figure className="flex h-full flex-col rounded-3xl bg-white p-7">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-[#d9a62e] text-[#d9a62e]" />
                    ))}
                  </div>
                  <blockquote className="flex-1 text-sm leading-relaxed text-[#0c1d18]/70">“{quote}”</blockquote>
                  <figcaption className="mt-5 text-[11px] font-bold tracking-[0.18em] text-[#0c1d18]/40 uppercase">
                    {name}
                  </figcaption>
                </figure>
              </Up>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Big CTA ——— */}
      <section id="contact" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Up>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0e7a5f] px-8 py-16 text-center text-white md:py-24">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, white 2px, transparent 2px), radial-gradient(circle at 80% 70%, white 2px, transparent 2px)",
                backgroundSize: "64px 64px",
              }}
              aria-hidden
            />
            <div className="relative">
              <p className="text-[11px] font-bold tracking-[0.3em] text-[#d9a62e] uppercase">Ready when you are</p>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-extrabold tracking-tight md:text-6xl">
                One message. Sorted today.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/75">
                {site.businessName} · {site.area} · {site.hours}
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#0c1d18] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-10px_rgba(0,0,0,0.4)]"
                >
                  WhatsApp {site.businessName.split(" ")[0]}
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href={callHref}
                  className="inline-flex items-center gap-3 rounded-full border-2 border-white/30 px-8 py-4 text-sm font-bold tracking-[0.14em] uppercase transition-colors duration-300 hover:border-white"
                >
                  <Phone className="h-4.5 w-4.5" /> {displayPhone(site.whatsapp)}
                </a>
              </div>
            </div>
          </div>
        </Up>
      </section>

      {/* ——— Footer ——— */}
      <footer className="bg-[#0c1d18] px-5 py-10 text-[#f2f6f3]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
          <div className="flex items-center gap-3">
            <LogoBlock site={site} className="rounded-xl bg-[#0e7a5f] font-display text-[#f2f6f3]" />
            <span className="font-display text-lg font-extrabold">{site.businessName}</span>
          </div>
          <SocialRow site={site} iconClassName="text-[#f2f6f3]/50" />
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#f2f6f3]/40 uppercase">
            Powered by <span className="text-[#d9a62e]">MzansiSite</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
