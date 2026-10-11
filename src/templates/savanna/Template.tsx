"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  CalendarCheck,
  Clock,
  MapPin,
  Menu,
  Phone,
  Star,
  Sunrise,
  UtensilsCrossed,
  Wifi,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { LogoBlock, SocialRow, WhatsAppFab } from "../shared";

/* Savanna — warm, wanderlust design for hospitality & tourism.
   Palette: forest #1d241a · cream #f5ead8 · burnt orange #d97b2b · sage #8a9a6b */

const EASE = [0.22, 1, 0.36, 1] as const;

function Up({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const ROOM_ICONS = [BedDouble, BedDouble, Sunrise, UtensilsCrossed, MapPin];

export default function SavannaTemplate({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const bookLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to check availability.`);
  const rooms = site.services.slice(0, 2);
  const experiences = site.services.slice(2);

  return (
    <div className="min-h-screen bg-[#f5ead8] font-sans text-[#1d241a]">
      <WhatsAppFab site={site} />

      {/* ——— Nav ——— */}
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="bg-[#1d241a] px-4 py-2 text-center text-[10px] font-semibold tracking-[0.24em] text-[#f5ead8]/80 uppercase">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3 w-3 text-[#d97b2b]" /> {site.area} · {site.hours}
          </span>
        </div>
        <nav className="border-b border-white/10 bg-[#1d241a]/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 text-[#f5ead8]">
            <a href="#top" className="flex items-center gap-3">
              <LogoBlock site={site} className="rounded-full bg-[#d97b2b] font-display text-[#1d241a]" />
              <span className="font-serif text-xl">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase md:flex">
              <a href="#stay" className="text-[#f5ead8]/65 transition-colors hover:text-[#d97b2b]">Stay</a>
              <a href="#experiences" className="text-[#f5ead8]/65 transition-colors hover:text-[#d97b2b]">Experiences</a>
              <a href="#gallery" className="text-[#f5ead8]/65 transition-colors hover:text-[#d97b2b]">Gallery</a>
              <a href="#findus" className="text-[#f5ead8]/65 transition-colors hover:text-[#d97b2b]">Find us</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={bookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full bg-[#d97b2b] px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] text-[#1d241a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:block"
              >
                Check availability
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#f5ead8]/25 md:hidden"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="border-t border-white/10 px-5 py-4 md:hidden">
              {["stay", "experiences", "gallery", "findus"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#f5ead8]/75"
                >
                  {id === "findus" ? "Find us" : id}
                </a>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* ——— Full-bleed hero ——— */}
      <section id="top" className="relative flex min-h-[100svh] items-end">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.heroImageUrl} alt={site.businessName} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d241a] via-[#1d241a]/35 to-[#1d241a]/20" />
        </div>
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-40 text-[#f5ead8]">
          <Up>
            <p className="mb-5 flex items-center gap-2.5 text-[11px] font-bold tracking-[0.3em] text-[#d97b2b] uppercase">
              <Sunrise className="h-4 w-4" /> {site.area}
            </p>
          </Up>
          <Up delay={0.1}>
            <h1 className="max-w-3xl font-serif text-5xl leading-[1.02] md:text-8xl">
              Slow mornings.
              <br />
              <em className="text-[#e8b07c]">Wild</em> horizons.
            </h1>
          </Up>
          <Up delay={0.2}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#f5ead8]/75 md:text-lg">{site.tagline}</p>
          </Up>
          <Up delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href={bookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[#d97b2b] px-8 py-4 text-[13px] font-bold tracking-[0.16em] text-[#1d241a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-10px_rgba(217,123,43,0.7)]"
              >
                <CalendarCheck className="h-4.5 w-4.5" />
                Check availability
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <span className="flex items-center gap-2 text-sm font-medium text-[#f5ead8]/70">
                <Star className="h-4 w-4 fill-[#d97b2b] text-[#d97b2b]" />
                {site.rating} · {site.reviews} guest reviews
              </span>
            </div>
          </Up>
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#f5ead8]/50"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
       </section>

      {/* ——— Welcome split ——— */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
        <Up className="relative">
          <div className="overflow-hidden rounded-[2rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery[0]} alt="The lodge" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-4 w-40 overflow-hidden rounded-2xl border-4 border-[#f5ead8] shadow-xl md:-right-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery[3] ?? gallery[1]} alt="Views" className="aspect-square w-full object-cover" />
          </div>
        </Up>
        <div className="md:pl-6">
          <Up>
            <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#d97b2b] uppercase">Welcome to {site.businessName}</p>
          </Up>
          <Up delay={0.1}>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Eight rooms, one mountain, <em>zero</em> reasons to check your email.
            </h2>
          </Up>
          <Up delay={0.2}>
            <p className="mt-6 text-sm leading-relaxed text-[#1d241a]/65 md:text-base">
              Family-run for {site.yearsInBusiness} years. Every stay includes sunrise coffee on the deck, trails from
              your door, and a WhatsApp line that actually answers.
            </p>
          </Up>
          <Up delay={0.3}>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {(
                [
                  [Wifi, "Fibre Wi-Fi & work nooks"],
                  [UtensilsCrossed, "Farm breakfast included"],
                  [Sunrise, "Game drives at golden hour"],
                  [CalendarCheck, "Free date changes"],
                ] as const
              ).map(([Icon, label]) => (
                <div key={label} className="flex items-center gap-3 text-sm font-medium text-[#1d241a]/75">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#8a9a6b]/20">
                    <Icon className="h-4 w-4 text-[#6b7a4b]" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </Up>
        </div>
      </section>

      {/* ——— Rooms & rates ——— */}
      <section id="stay" className="bg-[#1d241a] py-20 text-[#f5ead8] md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Up className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#d97b2b] uppercase">Stay with us</p>
              <h2 className="font-serif text-4xl md:text-6xl">
                Rooms & <em className="text-[#a8b896]">rates</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#f5ead8]/55">
              Rates include breakfast and parking. Peak-season surcharges shared upfront — never after.
            </p>
          </Up>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {rooms.map((room, i) => {
              const Icon = ROOM_ICONS[i] ?? BedDouble;
              return (
                <Up key={room.name} delay={i * 0.1}>
                  <a
                    href={waLink(site.whatsapp, `Hi ${site.businessName}! Is the ${room.name} available?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-[1.75rem] border border-[#f5ead8]/12 bg-[#262e22] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d97b2b]/50"
                  >
                    <div className="relative h-56 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={gallery[i + 1] ?? gallery[0]}
                        alt={room.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute right-4 top-4 rounded-full bg-[#d97b2b] px-3.5 py-1.5 font-display text-sm font-extrabold text-[#1d241a]">
                        {room.price}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#d97b2b]/15">
                          <Icon className="h-5 w-5 text-[#d97b2b]" />
                        </span>
                        <h3 className="font-serif text-2xl">{room.name}</h3>
                      </div>
                      {room.description && (
                        <p className="mt-3 text-sm leading-relaxed text-[#f5ead8]/55">{room.description}</p>
                      )}
                      <p className="mt-4 flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-[#d97b2b] uppercase">
                        Check dates on WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
                      </p>
                    </div>
                  </a>
                </Up>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— Experiences ——— */}
      <section id="experiences" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Up className="mb-12 text-center">
          <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#d97b2b] uppercase">While you&apos;re here</p>
          <h2 className="font-serif text-4xl md:text-6xl">Days, fully planned</h2>
        </Up>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {experiences.map((exp, i) => {
            const Icon = ROOM_ICONS[i + 2] ?? Sunrise;
            return (
              <Up key={exp.name} delay={i * 0.08}>
                <a
                  href={waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book: ${exp.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-3xl border-2 border-[#1d241a]/10 bg-white/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#1d241a]"
                >
                  <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#d97b2b]/15">
                    <Icon className="h-6 w-6 text-[#d97b2b]" />
                  </span>
                  <h3 className="font-serif text-2xl leading-snug">{exp.name}</h3>
                  {exp.description && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1d241a]/55">{exp.description}</p>
                  )}
                  <div className="mt-5 flex items-center justify-between border-t border-[#1d241a]/10 pt-4">
                    <span className="font-display text-lg font-extrabold">{exp.price}</span>
                    <ArrowUpRight className="h-5 w-5 text-[#1d241a]/30 transition-all duration-300 group-hover:text-[#d97b2b]" />
                  </div>
                </a>
              </Up>
            );
          })}
        </div>
      </section>

      {/* ——— Gallery ——— */}
      <section id="gallery" className="bg-[#e9dcc3] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Up className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#d97b2b] uppercase">The view from here</p>
              <h2 className="font-serif text-4xl md:text-6xl">{site.galleryHeading ?? "Golden hour, daily"}</h2>
            </div>
            <SocialRow site={site} iconClassName="text-[#1d241a]/45" />
          </Up>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.map((url, i) => (
              <Up
                key={`${url}-${i}`}
                delay={i * 0.05}
                className={i === 0 || i === 3 ? "col-span-2 row-span-2" : ""}
              >
                <div className="group h-full overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`${site.businessName} view ${i + 1}`}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      i === 0 || i === 3 ? "aspect-square md:aspect-auto md:h-full" : "aspect-square"
                    }`}
                    loading="lazy"
                  />
                </div>
              </Up>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Reviews ——— */}
      <section className="bg-[#1d241a] py-20 text-[#f5ead8] md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Up className="mb-12 text-center">
            <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#d97b2b] uppercase">Guest book</p>
            <h2 className="font-serif text-4xl md:text-6xl">{site.reviewHeading ?? "They came back. Twice."}</h2>
          </Up>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              ["Booked on a whim via WhatsApp — replied in minutes, sorted in four messages. The deck at sunset is unreal.", "Pieter & Anél v.d. Berg"],
              ["Our third anniversary here. Breakfast on the mountain, game drive at dusk, and the family cottage is perfect with kids.", "The Ngcobo family"],
              ["Two hours from Joburg and it feels like another country. Best-value weekend escape we've found.", "Kavisha R."],
            ].map(([quote, name], i) => (
              <Up key={name} delay={i * 0.1}>
                <figure className="flex h-full flex-col rounded-3xl border border-[#f5ead8]/12 bg-[#262e22] p-7">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-[#d97b2b] text-[#d97b2b]" />
                    ))}
                  </div>
                  <blockquote className="flex-1 font-serif text-lg leading-snug text-[#f5ead8]/85">“{quote}”</blockquote>
                  <figcaption className="mt-6 text-[11px] font-bold tracking-[0.18em] text-[#a8b896] uppercase">
                    {name}
                  </figcaption>
                </figure>
              </Up>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Find us ——— */}
      <section id="findus" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.1fr]">
          <Up>
            <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#d97b2b] uppercase">Getting here</p>
            <h2 className="font-serif text-4xl md:text-5xl">{site.area}</h2>
            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4 border-b border-[#1d241a]/10 pb-5">
                <Clock className="h-5 w-5 text-[#d97b2b]" />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#1d241a]/40 uppercase">Reception</p>
                  <p className="font-medium">{site.hours}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-b border-[#1d241a]/10 pb-5">
                <Phone className="h-5 w-5 text-[#d97b2b]" />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#1d241a]/40 uppercase">Call / WhatsApp</p>
                  <p className="font-medium">{displayPhone(site.whatsapp)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-[#d97b2b]" />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#1d241a]/40 uppercase">Directions</p>
                  <p className="font-medium">GPS pin shared on WhatsApp after booking</p>
                </div>
              </div>
            </div>
          </Up>
          <Up delay={0.15}>
            <div className="flex h-full min-h-[340px] flex-col items-center justify-center rounded-[2rem] bg-[#d97b2b] p-10 text-center text-[#1d241a]">
              <p className="font-serif text-3xl leading-snug md:text-4xl">
                This weekend is still open. <em>For now.</em>
              </p>
              <p className="mt-3 max-w-xs text-sm font-medium text-[#1d241a]/70">
                One message and we hold your dates for 24 hours — no deposit to enquire.
              </p>
              <a
                href={bookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#1d241a] px-8 py-4 text-[13px] font-bold tracking-[0.16em] text-[#f5ead8] uppercase transition-all duration-300 hover:-translate-y-0.5"
              >
                WhatsApp {site.businessName} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Up>
        </div>
      </section>

      {/* ——— Footer ——— */}
      <footer className="border-t border-[#1d241a]/10 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
          <div className="flex items-center gap-3">
            <LogoBlock site={site} className="rounded-full bg-[#d97b2b] font-display text-[#1d241a]" />
            <span className="font-serif text-lg">{site.businessName}</span>
          </div>
          <SocialRow site={site} iconClassName="text-[#1d241a]/45" />
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#1d241a]/40 uppercase">
            Powered by <span className="text-[#d97b2b]">MzansiSite</span>
          </p>
        </div>
      </footer>
   </div>
  );
}
