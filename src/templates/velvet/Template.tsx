"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, Star, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { LogoBlock, SocialRow, WhatsAppFab } from "../shared";
import { Up } from "../Reveal";

/* Velvet — editorial luxe for beauty & wellness.
   Palette: cream #f6efe6 · espresso #241a12 · gold #b98a2f · clay #c17857 */

export default function VelvetTemplate({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const bookLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to make a booking.`);

  return (
    <>
      {/*
        The floating WhatsApp button sits outside the query container: a
        container is `contain: layout`, which would make it the containing block
        for `position: fixed` descendants and stop the button following the
        viewport. Everything else is measured against `page` (see globals.css),
        so this design renders its phone layout inside the app's phone frame as
        well as on an actual phone.
      */}
      <WhatsAppFab site={site} />

      <div className="@container/page min-h-screen bg-[#f6efe6] font-sans text-[#241a12]">
        {/* ——— Announcement bar ——— */}
        <div className="bg-[#241a12] px-4 py-2 text-center text-[11px] font-medium tracking-[0.22em] text-[#d8c7ae] uppercase">
          <span className="inline-flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-[#b98a2f]" /> {site.hours}
            <span className="hidden bp-sm:inline">·</span>
            <span className="hidden bp-sm:inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#b98a2f]" /> {site.area}
            </span>
          </span>
        </div>

        {/* ——— Nav ——— */}
        <header className="sticky top-0 z-40 border-b border-[#241a12]/10 bg-[#f6efe6]/90 backdrop-blur-md">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          {/*
            `min-w-0` + `truncate`: a monogram tile plus a 40px menu button leave
            the name about 230px on a phone, and the owner's name is not ours to
            shorten — "ActiveLife Physiotherapy" needs 209px for that one word
            alone, which used to push the nav row wider than the screen. The name
            now ellipsises instead of overflowing.
          */}
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <LogoBlock site={site} className="shrink-0 rounded-full border border-[#b98a2f]/40 bg-[#241a12] font-display text-[#e8ce9a]" />
            <span className="truncate font-serif text-xl leading-none">{site.businessName}</span>
          </a>
            <div className="hidden items-center gap-8 text-[12px] font-semibold tracking-[0.18em] uppercase bp-md:flex">
              <a href="#services" className="text-[#241a12]/60 transition-colors hover:text-[#241a12]">Services</a>
              <a href="#gallery" className="text-[#241a12]/60 transition-colors hover:text-[#241a12]">Gallery</a>
              <a href="#reviews" className="text-[#241a12]/60 transition-colors hover:text-[#241a12]">Reviews</a>
              <a href="#visit" className="text-[#241a12]/60 transition-colors hover:text-[#241a12]">Visit</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={bookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full bg-[#241a12] px-5 py-2.5 text-[12px] font-bold tracking-[0.16em] text-[#f6efe6] uppercase transition-all duration-300 hover:bg-[#b98a2f] hover:text-[#241a12] bp-sm:block"
              >
                Book now
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#241a12]/15 bp-md:hidden"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#241a12]/10 bg-[#f6efe6] px-5 py-4 bp-md:hidden">
              {["services", "gallery", "reviews", "visit"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-semibold tracking-[0.18em] uppercase text-[#241a12]/70"
                >
                  {id}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— Hero ——— */}
        <section id="top" className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, #c1785755, transparent 70%)" }}
          />
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-14 bp-md:grid-cols-2 bp-md:pt-20">
            {/* @container so the headline can be sized from its column. */}
            <div className="@container relative z-10">
              <Up>
                <p className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.28em] text-[#b98a2f] uppercase">
                  <span className="h-px w-8 bg-[#b98a2f]" /> {site.area}
                </p>
              </Up>
              <Up delay={0.08}>
              {/*
                The headline is the first sentence of the owner's tagline, so
                its longest word is not ours to choose. Sized in cqw it stays as
                large as its column allows at every width, and inside the app's
                phone frame too, where vw would describe the visitor's screen
                rather than the box the headline lives in.

                Measured across all 55 industries, the worst first word in the
                catalogue is "Compassionate" at 5.65em in this face — inside the
                5.9em this divisor leaves — so no industry's tagline can clip.
              */}
                <h1 className="font-serif text-[min(3rem,calc(100cqw/5.9))] leading-[1.02] break-words bp-md:text-[min(4.5rem,calc(100cqw/5.9))]">
                  {site.tagline.split("—")[0]}
                </h1>
              </Up>
              <Up delay={0.16}>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#b98a2f] text-[#b98a2f]" />
                    ))}
                  </span>
                  <span className="text-sm font-medium text-[#241a12]/60">
                    {site.rating} · loved by {site.reviews}+ clients
                  </span>
                </div>
              </Up>
              <Up delay={0.24}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href={bookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#241a12] px-7 py-4 text-[13px] font-bold tracking-[0.16em] text-[#f6efe6] uppercase transition-all duration-300 hover:bg-[#b98a2f] hover:text-[#241a12]"
                  >
                    WhatsApp to book
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#services"
                    className="text-[13px] font-bold tracking-[0.16em] text-[#241a12]/70 uppercase underline decoration-[#b98a2f] decoration-2 underline-offset-8 transition-colors hover:text-[#241a12]"
                  >
                    View the menu
                  </a>
                </div>
              </Up>
            </div>

            <Up delay={0.15} className="relative">
              <div className="relative mx-auto w-[78%] max-w-sm">
                <div className="absolute -inset-4 rounded-t-full rounded-b-[2rem] border border-[#b98a2f]/50" aria-hidden />
                <div className="overflow-hidden rounded-t-full rounded-b-[2rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={site.heroImageUrl} alt={site.businessName} className="aspect-[3/4] w-full object-cover" />
                </div>
                <div
                  className="mz-bob absolute -right-8 bottom-10 rounded-2xl border border-[#241a12]/10 bg-[#f6efe6]/95 px-4 py-3 shadow-xl backdrop-blur"
                >
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#b98a2f] uppercase">Walk-ins welcome</p>
                  <p className="font-serif text-lg leading-tight">{site.yearsInBusiness} yrs of craft</p>
                </div>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Service marquee ——— */}
        <div className="overflow-hidden border-y border-[#241a12]/10 bg-[#241a12] py-3.5">
          <div className="marquee-track">
            {[0, 1].map((n) => (
              <div key={n} className="flex shrink-0 items-center">
                {site.services.map((s, i) => (
                  <span key={`${n}-${i}`} className="flex items-center whitespace-nowrap">
                    <span className="px-6 font-serif text-lg italic text-[#e8ce9a]">{s.name}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c17857]" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ——— Services menu ——— */}
        <section id="services" className="mx-auto max-w-4xl px-5 py-20 bp-md:py-28">
          <Up className="text-center">
            <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">The menu</p>
            <h2 className="font-serif text-4xl bp-md:text-6xl">Services & pricing</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#241a12]/55">
              Honest prices, no surprises. WhatsApp us to check availability — most styles can be booked within the week.
            </p>
          </Up>
          <div className="mt-14 space-y-2">
            {site.services.map((service, i) => (
              <Up key={service.name} delay={i * 0.05}>
                <a
                  href={waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book: ${service.name} (${service.price})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 rounded-2xl px-4 py-4 transition-colors duration-300 hover:bg-[#241a12]/[0.04] bp-sm:flex-row bp-sm:items-baseline bp-sm:gap-4"
                >
                  <div className="min-w-0">
                    {/*
                      Was `truncate`. On a 320px phone the price and the dotted
                      leader left the name about 90px, so it rendered as
                      "Extra-mu…" — the owner's own service, cut with an ellipsis.
                      The row stacks below sm so the name gets the full width.
                    */}
                    <h3 className="font-serif text-2xl break-words transition-colors group-hover:text-[#8a5f1e]">
                      {service.name}
                    </h3>
                    {service.description && (
                      <p className="mt-0.5 text-xs font-medium tracking-wide text-[#241a12]/45">{service.description}</p>
                    )}
                  </div>
                  <span className="mx-2 hidden flex-1 border-b border-dotted border-[#241a12]/30 bp-sm:block" aria-hidden />
                  <span className="font-serif text-2xl text-[#b98a2f]">{service.price}</span>
                  <span className="hidden rounded-full border border-[#b98a2f]/40 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#8a5f1e] uppercase opacity-0 transition-all duration-300 group-hover:opacity-100 bp-sm:block">
                    Book
                  </span>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— About pull-quote ——— */}
        <section className="bg-[#241a12] py-20 text-[#f6efe6] bp-md:py-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 bp-md:grid-cols-[0.9fr_1.1fr]">
            <Up>
              <div className="overflow-hidden rounded-t-full rounded-b-[2rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gallery[1] ?? site.heroImageUrl}
                  alt={`${site.businessName} at work`}
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
            </Up>
            <div>
              <Up>
                <p className="mb-5 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">Why clients stay</p>
              </Up>
              <Up delay={0.1}>
                <blockquote className="font-serif text-3xl leading-snug break-words bp-md:text-5xl">
                  {site.aboutQuote ? `“${site.aboutQuote}”` : "“You shouldn’t have to DM five times to find out what a style costs.”"}
                </blockquote>
              </Up>
              <Up delay={0.2}>
                <p className="mt-7 max-w-md text-sm leading-relaxed text-[#f6efe6]/60">
                  {site.businessName} · {site.area}. Every price is published, every booking confirmed on WhatsApp within
                  minutes, and every client leaves with our aftercare notes. {site.tagline}
                </p>
              </Up>
              <Up delay={0.3}>
                <div className="mt-9 grid grid-cols-3 gap-6 border-t border-[#f6efe6]/10 pt-8">
                  {[
                    [`${site.yearsInBusiness}+`, "years of craft"],
                    [`${site.reviews}+`, "five-star reviews"],
                    [`${site.rating}`, "average rating"],
                  ].map(([big, small]) => (
                    <div key={small}>
                      <p className="font-serif text-3xl text-[#e8ce9a] bp-md:text-4xl">{big}</p>
                      <p className="mt-1 text-[10px] font-bold tracking-[0.18em] text-[#f6efe6]/45 uppercase">{small}</p>
                    </div>
                  ))}
                </div>
              </Up>
            </div>
          </div>
        </section>

        {/* ——— Gallery ——— */}
        <section id="gallery" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          {/*
            The heading is the owner's copy and the row shares its width with
            the social icons, so the heading gets its own container and a size
            that follows it: at the 7.5em budget every heading in the catalogue
            still renders at the original 2.25rem/3.75rem cap, and a longer word
            an owner writes shrinks instead of overflowing. `w-full` below md
            gives the container a definite width — a query container cannot be
            sized by its contents, so as a bare flex item it would collapse to
            zero and take the heading with it.
          */}
          <Up className="mb-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
            <div className="@container w-full min-w-0 bp-md:w-auto bp-md:grow">
              <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">Recent work</p>
              <h2 className="font-serif text-[min(2.25rem,calc(100cqw/7.5))] break-words bp-md:text-[min(3.75rem,calc(100cqw/7.5))]">{site.galleryHeading ?? "Fresh from the chair"}</h2>
            </div>
            <SocialRow site={site} iconClassName="text-[#241a12]/50" linkClassName="hover:text-[#b98a2f]" />
          </Up>
          <div className="grid grid-cols-2 gap-4 bp-md:grid-cols-3 bp-md:gap-6">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.06}>
                <div
                  className={`overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 ${i % 3 === 0 ? "rounded-t-full rounded-b-2xl" : "rounded-2xl"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`${site.businessName} work ${i + 1}`}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Reviews ——— */}
        <section id="reviews" className="bg-[#efe4d2] py-20 bp-md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Up className="mb-12 @container text-center">
              <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">Word of mouth</p>
              {/* Owner copy — or, with no heading set, the owner's town, which
                  is 7.25em for the widest place name in the catalogue. */}
              <h2 className="font-serif text-[min(2.25rem,calc(100cqw/7.5))] break-words bp-md:text-[min(3.75rem,calc(100cqw/7.5))]">{site.reviewHeading ?? `What ${site.area.split(",")[0]} says`}</h2>
            </Up>
            <div className="grid grid-cols-1 gap-5 bp-md:grid-cols-3">
              {(site.reviewItems ?? [
                { quote: "Booked on WhatsApp at 8am, in the chair by 10. My braids have never lasted this long.", name: "Tebogo M." },
                { quote: "Prices are right there on the site — no 'DM for price' games. That's why I trust them.", name: "Lerato K." },
                { quote: "Send my whole family here now. Professional, on time, and the results speak for themselves.", name: "Ayesha P." },
              ]).map((review, i) => (
                <Up key={review.name} delay={i * 0.1}>
                  <div className="flex h-full flex-col justify-between rounded-3xl border border-[#241a12]/10 bg-[#f6efe6] p-7">
                    <div>
                      <div className="mb-4 flex gap-1">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className="h-3.5 w-3.5 fill-[#b98a2f] text-[#b98a2f]" />
                        ))}
                      </div>
                      <p className="font-serif text-xl leading-snug">&ldquo;{review.quote}&rdquo;</p>
                    </div>
                    <p className="mt-6 text-xs font-bold tracking-[0.18em] text-[#241a12]/45 uppercase">{review.name}</p>
                  </div>
                </Up>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Visit ——— */}
        <section id="visit" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          <div className="grid grid-cols-1 gap-10 bp-md:grid-cols-2">
            <Up className="@container">
              <p className="mb-4 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">Visit us</p>
              {/* The owner's town, sized from its column: 7.5em of type holds
                  every place name in the catalogue at the original size. */}
              <h2 className="font-serif text-[min(2.25rem,calc(100cqw/7.5))] break-words bp-md:text-[min(3rem,calc(100cqw/7.5))]">{site.area}</h2>
              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-4 border-b border-[#241a12]/10 pb-5">
                  <Clock className="h-5 w-5 text-[#b98a2f]" />
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#241a12]/40 uppercase">Hours</p>
                    <p className="font-medium">{site.hours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 border-b border-[#241a12]/10 pb-5">
                  <Phone className="h-5 w-5 text-[#b98a2f]" />
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#241a12]/40 uppercase">Call / WhatsApp</p>
                    <p className="font-medium">{displayPhone(site.whatsapp)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-[#b98a2f]" />
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#241a12]/40 uppercase">Find us</p>
                    <p className="font-medium">{site.area}</p>
                  </div>
                </div>
              </div>
            </Up>
            <Up delay={0.15}>
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-3xl bg-[#241a12] p-10 text-center text-[#f6efe6]">
                <p className="font-serif text-3xl leading-snug bp-md:text-4xl">Ready when you are.</p>
                <p className="mt-3 max-w-xs text-sm text-[#f6efe6]/55">
                  Send one WhatsApp message — we reply within minutes during trading hours.
                </p>
                <a
                  href={bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#b98a2f] px-8 py-4 text-[13px] font-bold tracking-[0.16em] text-[#241a12] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  Book on WhatsApp <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#241a12]/10 px-5 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            {/* flex-wrap: a long owner word drops under the logo instead of
                being clipped beside it on a 320px phone. */}
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="rounded-full border border-[#b98a2f]/40 bg-[#241a12] font-display text-[#e8ce9a]" />
              <span className="min-w-0 break-words font-serif text-lg">{site.businessName}</span>
            </div>
            <SocialRow site={site} iconClassName="text-[#241a12]/45" />
            <p className="text-[11px] font-medium tracking-[0.18em] text-[#241a12]/40 uppercase">
              Powered by <span className="text-[#b98a2f]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
