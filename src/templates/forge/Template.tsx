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
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../shared";
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
    <>
      {/*
        The floating WhatsApp button stays outside the query container: a
        container is `contain: layout`, which would make it the containing block
        for `position: fixed` descendants and stop the button following the
        viewport. Everything else is measured against `page` (see globals.css for
        the `bp-*` variants), so the design renders its phone layout inside the
        app's phone frame as well as on a real phone.
      */}

      <WhatsAppFab site={site} />

      <div className="@container/page min-h-screen bg-[#eceae3] font-sans text-[#16181a]">
        {/* ——— Emergency top bar ——— */}
        <div className="bg-[#ffc400] px-4 py-2.5">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 fill-[#16181a]" /> {site.hours}
            </span>
            <a href={callHref} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav ——— */}
        <header className="sticky top-0 z-40 border-b-2 border-[#16181a] bg-[#16181a] text-[#eceae3]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          {/* `min-w-0` + `truncate`: in caps this face runs ~1.1em per character,
              so a name like "ActiveLife Physiotherapy" needs 255px for that one
              word — more than a phone leaves beside the menu button. The name
              ellipsises rather than widening the nav. */}
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <LogoBlock site={site} className="shrink-0 border-2 border-[#ffc400] bg-[#ffc400] font-display text-[#16181a]" />
            <span className="truncate font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
          </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#services" className="text-[#eceae3]/60 transition-colors hover:text-[#ffc400]">Services</a>
              <a href="#work" className="text-[#eceae3]/60 transition-colors hover:text-[#ffc400]">Recent work</a>
              <a href="#areas" className="text-[#eceae3]/60 transition-colors hover:text-[#ffc400]">Areas</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#ffc400] px-5 py-2.5 font-display text-[12px] font-bold tracking-[0.14em] text-[#16181a] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#eceae3] bp-sm:block"
              >
                Get a quote
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center border border-[#eceae3]/20 bp-md:hidden"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#eceae3]/10 px-5 py-4 bp-md:hidden">
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
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-16 pt-14 bp-md:grid-cols-[1.15fr_0.85fr] bp-md:pt-20">
            {/*
              @container so the headline can be sized from the column it is
              actually in. See the note on the h1 below.
            */}
            <div className="@container">
              <Up>
                <p className="mb-5 inline-flex items-center gap-2 border-2 border-[#ffc400] px-3 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[#ffc400] uppercase">
                  <BadgeCheck className="h-4 w-4" /> {site.area} · {site.hours}
                </p>
              </Up>
              <Up delay={0.08}>
                {/*
                The headline's first line is the first word of the customer's
                first service, so its length is not ours to choose — and it is
                set in caps, where this face runs about 1.1em per character.
                "Emergency." (the plumber demo) is 10.3em; the widest first word
                anyone can reach, "Consultation." from the health industries, is
                13.7em, which at 24px was 330px inside a 280px column on a 320px
                phone.

                Dividing the column by 14.5 (i.e. 6.9cqw, capped at 3.5rem) keeps
                the whole catalogue's worst case inside the column at every
                width, and `break-words` means even a word we have never seen —
                an owner can type anything — wraps instead of escaping the box. A
                viewport unit cannot do this job: the template also renders
                inside fixed-width previews and mockups, where vw describes the
                visitor's screen rather than the box the headline lives in.
              */}
              <h1 className="font-display text-[min(3.5rem,calc(100cqw/14.5))] font-extrabold leading-[0.95] tracking-tight uppercase break-words">
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
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#ffc400] uppercase">Enquire</p>
                    <p className="font-display text-sm font-bold text-[#eceae3]">{site.area} · {site.hours}</p>
                    {site.isDemo && site.rating && <DemoBadge className="mt-1" />}
                  </div>
                  <Wrench className="h-7 w-7 text-[#ffc400]" />
                </div>
              </div>
            </Up>
          </div>

          {/* Trust stats */}
          <div className="relative border-t-2 border-[#eceae3]/10 bg-[#1d1f22]">
            <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x-2 divide-[#eceae3]/10 bp-md:grid-cols-4">
              {[
                [site.area.split(",")[0], "based in"],
                [site.services.length + " services", "listed with prices"],
                [site.hours, "hours"],
                ["WhatsApp", "enquiries welcome"],
              ].map(([big, small], i) => (
                <Up key={small} delay={i * 0.08} className="@container px-5 py-6 text-center bp-md:py-8">
                  <p className="font-display text-[min(1.25rem,calc(100cqw/6.8))] font-extrabold text-[#ffc400] break-words bp-md:text-[min(1.5rem,calc(100cqw/6.8))]">{big}</p>
                  <p className="mt-1 text-[10px] font-bold tracking-[0.18em] text-[#eceae3]/50 uppercase">{small}</p>
                </Up>
              ))}
            </div>
          </div>
          <HazardStripes />
        </section>

        {/* ——— Services ——— */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#5b6570] uppercase">What we do</p>
              <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase bp-md:text-6xl">
                Services & <span className="text-[#5b6570]">rates</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#16181a]/55">
              Every job quoted in writing before we start. No hidden costs, no surprises.
            </p>
          </Up>
          <div className="grid grid-cols-1 gap-4 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
            {site.services.map((service, i) => (
              <Up key={service.name} delay={i * 0.06}>
                <a
                  href={waLink(site.whatsapp, `Hi ${site.businessName}! I need help with: ${service.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="@container group flex h-full flex-col justify-between border-2 border-[#16181a] bg-[#eceae3] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#16181a] hover:text-[#eceae3] hover:shadow-[8px_8px_0_#ffc400]"
                >
                  <div>
                    {/* flex-wrap: a long price ("from R4,500/group" is 11.5em
                        at 14px) drops below the row number instead of pushing
                        the card wider than its column. */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <span className="font-display text-4xl font-extrabold text-[#16181a]/15 transition-colors group-hover:text-[#ffc400]/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="bg-[#ffc400] px-3 py-1.5 font-display text-sm font-extrabold text-[#16181a]">
                        {service.price}
                      </span>
                    </div>
                    {/*
                      The service name is the owner's, and some are long: at
                      text-xl "WATERPROOFING" measures 15.45em = 309px inside a
                      298px card, and the catalogue's worst — "REPRESENTATION"
                      from the legal industries — is 15.48em, so it clipped by a
                      couple of pixels. Sizing from the card at a 16.5em budget
                      keeps every name (and the whole catalogue) inside, and
                      `break-words` covers a word we have never seen.
                    */}
                    <h3 className="mt-4 font-display text-[min(1.25rem,calc(100cqw/16.5))] font-extrabold tracking-tight uppercase break-words">{service.name}</h3>
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
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 bp-md:grid-cols-[auto_1fr_auto] bp-md:py-20">
            <Up>
              <ShieldCheck className="h-16 w-16 text-[#ffc400]" strokeWidth={1.5} />
            </Up>
            {/* @container so the banner headline is sized from its column —
                in the md: grid that is the middle 1fr column, on a phone the
                full width. See the note on the h2. */}
            <Up delay={0.1} className="@container">
              {/*
                A guarantee the owner (or the industry default) supplies, set in
                caps: the catalogue's longest word is "APPOINTMENTS" at 13.84em
                ("WORKMANSHIP" is 13.36em), which at text-3xl was 415px inside a
                280px column on a 320px phone — most of the word clipped away.
                Sized from the column at a 15em budget it fits at every width
                (259 of 280px at the worst point), and `break-words` covers
                whatever an owner types next.
              */}
              <h2 className="font-display text-[min(1.875rem,calc(100cqw/15))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/15))]">
                Clear quotes, honest work
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#eceae3]/55">
                Every job is quoted in writing before we start. {site.businessName} serves {site.area} — enquire on WhatsApp for availability and pricing.
                {site.isDemo && site.guarantee && <><br/><DemoBadge className="mt-2" /> <span className="text-[#eceae3]/50 text-xs">Demo guarantee: {site.guarantee}</span></>}
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
        <section id="work" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#5b6570] uppercase">Proof, not promises</p>
            {/*
              The heading is the owner's copy. "Installations" — a solar or
              security heading in the catalogue — is 12.96em in these caps, so at
              text-4xl it needed 477px in a 280px column on a 320px phone and was
              cut off mid-word. Sized from the section at a 14em budget it fits
              at every width — 259 of the 280px column at the worst point — the
              2.25rem cap holds the phone size from 544px up, and 3.75rem takes
              over once the section passes 840px.
            */}
            <h2 className="font-display text-[min(2.25rem,calc(100cqw/14))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3.75rem,calc(100cqw/14))]">
              {site.galleryHeading ?? "Recent"} <span className="text-[#5b6570]">{site.galleryHeading ? "" : "jobs"}</span>
            </h2>
          </Up>
          <div className="grid grid-cols-2 gap-3 bp-md:grid-cols-3 bp-md:gap-4">
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
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 bp-md:grid-cols-2 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#5b6570] uppercase">Coverage</p>
              {/*
                The owner's town, in caps: the widest in the catalogue is
                "Johannesburg" at 18.51em — 666px at text-4xl against a 280px
                column, and still 222px too wide in the half-column desktop
                grid. Dividing the column by 19.5 is the same treatment the
                market template gives its town headline, and it keeps every
                name in the catalogue inside the box; shorter names simply sit
                at the cap on wide screens.
              */}
              <h2 className="font-display text-[min(2.25rem,calc(100cqw/19.5))] font-extrabold tracking-tight uppercase break-words bp-md:text-[min(3rem,calc(100cqw/19.5))]">
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
              <div className="@container border-2 border-[#16181a] bg-[#16181a] p-8 text-[#eceae3] shadow-[10px_10px_0_#ffc400]">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#ffc400] uppercase">Talk to us</p>
                <div className="mt-6 space-y-4">
                  <a href={callHref} className="flex items-center gap-4 transition-colors hover:text-[#ffc400]">
                    <Phone className="h-5 w-5 shrink-0 text-[#ffc400]" />
                    {/*
                      A number the owner types. "082 777 8899" is 11.7em in this
                      face — 281px at text-2xl. The row has the handset icon
                      (20px + 16px gap) and the card has p-8 to itself, so only
                      180px of a 320px screen is left for the digits: that is
                      15px of type. Dividing the card by 19 keeps the number on
                      one line at every width and still gives it the full 24px
                      on a desktop, where the card is wide enough.
                    */}
                    <span className="font-display text-[min(1.5rem,calc(100cqw/19))] font-extrabold break-words">{displayPhone(site.whatsapp)}</span>
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
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            {/*
              flex-wrap: the brand name is owner copy set in caps, and the
              catalogue's longest single word — "PHYSIOTHERAPY" — is 14.17em,
              255px at this size. That does not fit in the 220px left beside the
              logo on a 320px phone, so the row wraps and the name takes the full
              column; a logo image (up to 140px wide) is handled the same way.
            */}
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="border-2 border-[#ffc400] bg-[#ffc400] font-display text-[#16181a]" />
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">{site.businessName}</span>
            </div>
            <SocialRow site={site} iconClassName="text-[#eceae3]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#eceae3]/40 uppercase">
              Powered by <span className="text-[#ffc400]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
