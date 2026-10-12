"use client";

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
import { Up } from "../Reveal";

/* Savanna — warm, wanderlust design for hospitality & tourism.
   Palette: forest #1d241a · cream #f5ead8 · burnt orange #d97b2b · sage #8a9a6b */

const ROOM_ICONS = [BedDouble, BedDouble, Sunrise, UtensilsCrossed, MapPin];

export default function SavannaTemplate({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const bookLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to check availability.`);
  const rooms = site.services.slice(0, 2);
  const experiences = site.services.slice(2);

  return (
    <>
      {/*
        The button and the fixed header sit outside the query container: a
        container is `contain: layout`, which would make it the containing block
        for `position: fixed` descendants — the header would scroll away with the
        page and the button would stop following the viewport. The header runs
        its own `page` container so its nav still switches on the *box* it is in,
        which is what keeps the design's phone layout intact inside the app's
        phone frame. See globals.css for the `bp-*` variants.
      */}
      <WhatsAppFab site={site} />

      {/* ——— Nav ——— */}
      <header className="@container/page fixed inset-x-0 top-0 z-40">
        <div className="bg-[#1d241a] px-4 py-2 text-center text-[10px] font-semibold tracking-[0.24em] text-[#f5ead8]/80 uppercase">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3 w-3 text-[#d97b2b]" /> {site.area} · {site.hours}
          </span>
        </div>
        <nav className="border-b border-white/10 bg-[#1d241a]/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 text-[#f5ead8]">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 rounded-full bg-[#d97b2b] font-display text-[#1d241a]" />
              <span className="truncate font-serif text-xl">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
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
                className="hidden rounded-full bg-[#d97b2b] px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] text-[#1d241a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 bp-sm:block"
              >
                Check availability
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#f5ead8]/25 bp-md:hidden"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="border-t border-white/10 px-5 py-4 bp-md:hidden">
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

      <div className="@container/page min-h-screen bg-[#f5ead8] font-sans text-[#1d241a]">
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
              <h1 className="max-w-3xl font-serif text-5xl leading-[1.02] bp-md:text-8xl">
                Slow mornings.
                <br />
                <em className="text-[#e8b07c]">Wild</em> horizons.
              </h1>
            </Up>
            <Up delay={0.2}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#f5ead8]/75 bp-md:text-lg">{site.tagline}</p>
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
          <div
            className="mz-bob-sm absolute bottom-6 left-1/2 -translate-x-1/2 text-[#f5ead8]/50"
          >
            <ArrowDown className="h-5 w-5" />
          </div>
         </section>

        {/* ——— Welcome split ——— */}
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 bp-md:grid-cols-2 bp-md:py-28">
          <Up className="relative">
            <div className="overflow-hidden rounded-[2rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={gallery[0]} alt="The lodge" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-4 w-40 overflow-hidden rounded-2xl border-4 border-[#f5ead8] shadow-xl bp-md:-right-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={gallery[3] ?? gallery[1]} alt="Views" className="aspect-square w-full object-cover" />
            </div>
          </Up>
          <div className="bp-md:pl-6">
            <Up>
              <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#d97b2b] uppercase">Welcome to {site.businessName}</p>
            </Up>
            <Up delay={0.1}>
              <h2 className="font-serif text-4xl leading-tight bp-md:text-5xl">
                Eight rooms, one mountain, <em>zero</em> reasons to check your email.
              </h2>
            </Up>
            <Up delay={0.2}>
              <p className="mt-6 text-sm leading-relaxed text-[#1d241a]/65 bp-md:text-base">
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
        <section id="stay" className="bg-[#1d241a] py-20 text-[#f5ead8] bp-md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Up className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#d97b2b] uppercase">Stay with us</p>
                <h2 className="font-serif text-4xl bp-md:text-6xl">
                  Rooms & <em className="text-[#a8b896]">rates</em>
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-[#f5ead8]/55">
                Rates include breakfast and parking. Peak-season surcharges shared upfront — never after.
              </p>
            </Up>
            <div className="grid grid-cols-1 gap-6 bp-md:grid-cols-2">
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
                        <span className="absolute right-4 top-4 max-w-[calc(100%-2rem)] break-words rounded-full bg-[#d97b2b] px-3.5 py-1.5 font-display text-sm font-extrabold text-[#1d241a]">
                          {room.price}
                        </span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3">
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#d97b2b]/15">
                            <Icon className="h-5 w-5 text-[#d97b2b]" />
                          </span>
                          <h3 className="font-serif text-2xl break-words">{room.name}</h3>
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
        <section id="experiences" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 text-center">
            <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#d97b2b] uppercase">While you&apos;re here</p>
            <h2 className="font-serif text-[min(2.25rem,calc(100cqw/7.5))] bp-md:text-[min(3.75rem,calc(100cqw/7.5))]">Days, fully planned</h2>
          </Up>
          {/*
            Two cards per row from sm (three from lg). At three across on a
            640px screen each card was 186px wide, which leaves 130px of content
            after p-7 — too little for the price, whose catalogue worst case
            ("from R4,500/group") is 11em. Two up gives every card 290px until
            the 1024px grid takes over with 314px.
          */}
          <div className="grid grid-cols-1 gap-5 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {experiences.map((exp, i) => {
              const Icon = ROOM_ICONS[i + 2] ?? Sunrise;
              return (
                <Up key={exp.name} delay={i * 0.08}>
                  {/* @container so the price is sized from this card. */}
                  <a
                    href={waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book: ${exp.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="@container group flex h-full flex-col rounded-3xl border-2 border-[#1d241a]/10 bg-white/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#1d241a]"
                  >
                    <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#d97b2b]/15">
                      <Icon className="h-6 w-6 text-[#d97b2b]" />
                    </span>
                    <h3 className="font-serif text-2xl leading-snug break-words">{exp.name}</h3>
                    {exp.description && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1d241a]/55">{exp.description}</p>
                    )}
                    {/* Sized from the card at a 14em budget, so the owner's
                        price keeps its 18px wherever the card is 252px or wider
                        and stays whole in the narrower md grid. */}
                    <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#1d241a]/10 pt-4">
                      <span className="min-w-0 break-words font-display text-[min(1.125rem,calc(100cqw/14))] font-extrabold">
                        {exp.price}
                      </span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-[#1d241a]/30 transition-all duration-300 group-hover:text-[#d97b2b]" />
                    </div>
                  </a>
                </Up>
              );
            })}
          </div>
        </section>

        {/* ——— Gallery ——— */}
        <section id="gallery" className="bg-[#e9dcc3] py-20 bp-md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            {/*
              flex-wrap, and the heading gets its own container: an owner's
              heading can be a long word, and in a row that could not wrap it
              had only the space left beside the social icons. `w-full` below md
              also gives the container a definite width — a query container
              cannot take its size from its contents, so as a bare flex item it
              would be 0px and the cqw heading would vanish.
            */}
            <Up className="mb-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
              <div className="@container w-full min-w-0 bp-md:w-auto bp-md:grow">
                <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#d97b2b] uppercase">The view from here</p>
                <h2 className="font-serif text-[min(2.25rem,calc(100cqw/7.5))] break-words bp-md:text-[min(3.75rem,calc(100cqw/7.5))]">{site.galleryHeading ?? "Golden hour, daily"}</h2>
              </div>
              <SocialRow site={site} iconClassName="text-[#1d241a]/45" />
            </Up>
            <div className="grid grid-cols-2 gap-4 bp-md:grid-cols-4">
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
                        i === 0 || i === 3 ? "aspect-square bp-md:aspect-auto bp-md:h-full" : "aspect-square"
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
        <section className="bg-[#1d241a] py-20 text-[#f5ead8] bp-md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Up className="mb-12 text-center">
              <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#d97b2b] uppercase">Guest book</p>
              <h2 className="font-serif text-[min(2.25rem,calc(100cqw/7.5))] break-words bp-md:text-[min(3.75rem,calc(100cqw/7.5))]">{site.reviewHeading ?? "They came back. Twice."}</h2>
            </Up>
            <div className="grid grid-cols-1 gap-6 bp-md:grid-cols-3">
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
        <section id="findus" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <div className="grid grid-cols-1 gap-10 bp-md:grid-cols-[1fr_1.1fr]">
            <Up>
              <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#d97b2b] uppercase">Getting here</p>
              {/* The owner's town. The widest in the catalogue is
                  "Johannesburg" at 7.25em in this face — 261px at text-4xl in a
                  280px column, and text-5xl in the half-column desktop grid —
                  so it is sized from its column at a 7.5em budget, which keeps
                  the original 2.25rem/3rem cap for every shorter name. */}
              <h2 className="font-serif text-[min(2.25rem,calc(100cqw/7.5))] break-words bp-md:text-[min(3rem,calc(100cqw/7.5))]">{site.area}</h2>
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
                <p className="font-serif text-3xl leading-snug bp-md:text-4xl">
                  This weekend is still open. <em>For now.</em>
                </p>
                <p className="mt-3 max-w-xs text-sm font-medium text-[#1d241a]/70">
                  One message and we hold your dates for 24 hours — no deposit to enquire.
                </p>
                <a
                  href={bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex max-w-full min-w-0 items-center justify-center gap-3 rounded-full bg-[#1d241a] px-8 py-4 text-[13px] font-bold tracking-[0.16em] text-[#f5ead8] uppercase transition-all duration-300 hover:-translate-y-0.5"
                >
                  {/*
                    The button names the business, and in caps at 13px that is
                    ~12px per character: "PHYSIOTHERAPY" alone needs 159px,
                    against the 108px left inside the pill on a 320px phone once
                    the p-10 card, the px-8 pill and the arrow are paid for.
                    It ellipsises like the nav bars rather than breaking the
                    owner's name in half, and shows in full wherever it fits.
                  */}
                  <span className="truncate">WhatsApp {site.businessName}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </a>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#1d241a]/10 px-5 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            {/* flex-wrap: a long owner word drops under the logo instead of
                being clipped beside it on a 320px phone. */}
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="rounded-full bg-[#d97b2b] font-display text-[#1d241a]" />
              <span className="min-w-0 break-words font-serif text-lg">{site.businessName}</span>
            </div>
            <SocialRow site={site} iconClassName="text-[#1d241a]/45" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#1d241a]/40 uppercase">
              Powered by <span className="text-[#d97b2b]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
