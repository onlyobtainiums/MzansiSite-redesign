"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BadgePercent,
  Clock,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  ShoppingBag,
  Star,
  Store as StoreIcon,
  Truck,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import type { SiteData } from "../types";
import { displayPhone, waLink } from "../types";
import { LogoBlock, SocialRow, WhatsAppFab } from "../shared";
import { Up } from "../Reveal";

/* Market — product-led storefront for retail, wholesale & manufacturing.
   Palette: paper #fbf7ef · ink #191406 · red #e0402a · green #2f7d4f */

const PRODUCT_BADGES = ["New drop", "Best seller", "Low stock", "Back in", "", ""];

export default function MarketTemplate({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const orderLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to place an order.`);

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

      <div className="@container/page min-h-screen bg-[#fbf7ef] font-sans text-[#191406]">
        {/* ——— Ticker ——— */}
        <div className="overflow-hidden border-b-2 border-[#191406] bg-[#e0402a] py-2 text-[#fbf7ef]">
          <div className="marquee-track">
            {[0, 1].map((n) => (
              <div key={n} className="flex shrink-0 items-center">
                {[
                  "Fresh stock weekly", "Order on WhatsApp", "Nationwide delivery",
                  `Rated ${site.rating} by ${site.reviews}+ customers`, site.area,
                ].map((text, i) => (
                  <span key={`${n}-${i}`} className="flex items-center whitespace-nowrap">
                    <span className="px-5 text-[11px] font-bold tracking-[0.18em] uppercase">{text}</span>
                    <ShoppingBag className="h-3.5 w-3.5" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ——— Nav ——— */}
        <header className="sticky top-0 z-40 border-b-2 border-[#191406] bg-[#fbf7ef]/95 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
            {/* `min-w-0` + `truncate`: caps in this face run ~1.1em per
                character, so "ActiveLife Physiotherapy" needs 255px for one word
                — more than a phone leaves beside the menu button. */}
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 rounded-lg border-2 border-[#191406] bg-[#2f7d4f] font-display text-[#fbf7ef]" />
              <span className="truncate font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase bp-md:flex">
              <a href="#shop" className="text-[#191406]/60 transition-colors hover:text-[#e0402a]">Shop</a>
              <a href="#specials" className="text-[#191406]/60 transition-colors hover:text-[#e0402a]">Specials</a>
              <a href="#lookbook" className="text-[#191406]/60 transition-colors hover:text-[#e0402a]">Lookbook</a>
              <a href="#visit" className="text-[#191406]/60 transition-colors hover:text-[#e0402a]">Visit</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={orderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full border-2 border-[#191406] bg-[#191406] px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] text-[#fbf7ef] uppercase transition-all duration-300 hover:bg-[#e0402a] hover:border-[#e0402a] bp-sm:flex"
              >
                <MessageCircle className="h-4 w-4" /> Order now
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center rounded-lg border-2 border-[#191406] bp-md:hidden"
                aria-label="Menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t-2 border-[#191406] bg-[#fbf7ef] px-5 py-4 bp-md:hidden">
              {["shop", "specials", "lookbook", "visit"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm font-bold tracking-[0.18em] uppercase text-[#191406]/70"
                >
                  {id}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ——— Hero ——— */}
        <section id="top" className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-14 bp-md:grid-cols-[1.05fr_0.95fr] bp-md:pt-20">
            <div className="relative z-10">
              <Up>
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-[#191406] bg-[#2f7d4f] px-4 py-1.5 text-[10px] font-bold tracking-[0.22em] text-[#fbf7ef] uppercase shadow-[3px_3px_0_#191406]">
                  <Package className="h-3.5 w-3.5" /> {site.area}
                </p>
              </Up>
              <Up delay={0.1}>
                {/*
                  This was `text-[13vw] sm:text-6xl md:text-7xl`. A viewport unit
                  describes the visitor's screen, not the box the headline lives
                  in — so inside the app's phone frame (a 390px box on a desktop
                  page) it rendered at the desktop size, 60px of type in a 158px
                  column. Sizing from the column fixes that, and the caps keep
                  the original sizes on real screens.

                  Caps run ~1.1em per character in this face, so the widest word
                  here is "PRICES." at 6.5em; 14.5cqw leaves a 6.9em budget.
                */}
                <div className="@container">
                  <h1 className="font-display text-[min(3.25rem,calc(100cqw/7.2))] font-extrabold uppercase leading-[0.9] tracking-tight break-words bp-md:text-[min(4.5rem,calc(100cqw/7.2))]">
                    The good stuff.
                    <br />
                    <span className="text-[#e0402a]">Fair prices.</span>
                    <br />
                    Zero fuss.
                  </h1>
                </div>
              </Up>
              <Up delay={0.2}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-[#191406]/65">{site.tagline}</p>
              </Up>
              <Up delay={0.3}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href={orderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full border-2 border-[#191406] bg-[#e0402a] px-7 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#fbf7ef] uppercase shadow-[5px_5px_0_#191406] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#191406]"
                  >
                    Browse & order
                    <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <span className="flex items-center gap-2 text-sm font-semibold text-[#191406]/60">
                    <Star className="h-4 w-4 fill-[#2f7d4f] text-[#2f7d4f]" /> {site.rating} · {site.reviews} reviews
                  </span>
                </div>
              </Up>
            </div>

            <Up delay={0.2} className="relative">
              <div className="relative mx-auto max-w-sm">
                <div className="overflow-hidden rounded-[2rem] border-2 border-[#191406] shadow-[8px_8px_0_#191406]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={site.heroImageUrl} alt={site.businessName} className="aspect-[4/5] w-full object-cover" />
                </div>
                {/*
                  Both stickers are absolutely positioned with an automatic
                  width, so a long price or product name used to run past the
                  screen edge. `max-w-[calc(100%+1rem)]` is exactly the overhang
                  they are placed with (-right-4 / -left-4), so they can wrap
                  their text but never leave the page.
                */}
                <div
                  className="mz-tilt absolute -right-4 top-8 max-w-[calc(100%+1rem)] break-words rounded-xl border-2 border-[#191406] bg-[#e0402a] px-4 py-2.5 font-display text-lg font-extrabold text-[#fbf7ef] shadow-[4px_4px_0_#191406]"
                >
                  {site.services[2]?.price ?? site.services[0]?.price}
                </div>
                <div className="absolute -bottom-5 -left-4 max-w-[calc(100%+1rem)] rounded-xl border-2 border-[#191406] bg-[#fbf7ef] px-4 py-3 shadow-[4px_4px_0_#191406]">
                  <p className="text-[9px] font-bold tracking-[0.2em] text-[#2f7d4f] uppercase">This week</p>
                  <p className="break-words font-display text-sm font-extrabold">{site.services[0]?.name}</p>
                </div>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Product grid ——— */}
        <section id="shop" className="border-t-2 border-[#191406] bg-[#fbf7ef]">
          <div className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
            <Up className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#e0402a] uppercase">The catalogue</p>
                <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight bp-md:text-6xl">
                  Shop the line-up
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-[#191406]/55">
                Tap any product to order on WhatsApp — we confirm stock and delivery in minutes.
              </p>
            </Up>
            {/*
              One card per row below sm, two until lg. Two per row left each
              card 132px on a 320px phone and the name only ~124px — less than
              the catalogue's longest service word ("maintenance", 12.8em =
              179px at this size), so it broke mid-word; three across at 768px
              left 218px, still 4px short of "representation". Full width gives
              the name 272px, two-up gives it 284px at sm and 344px at md, and
              the three-column grid only arrives at 1024px where each cell is
              312px.
            */}
            <div className="grid grid-cols-1 gap-4 bp-sm:grid-cols-2 bp-md:gap-6 bp-lg:grid-cols-3">
              {site.services.map((product, i) => (
                <Up key={product.name} delay={i * 0.05}>
                  <a
                    href={waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to order: ${product.name} (${product.price})`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-2xl border-2 border-[#191406] bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0_#191406]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={gallery[i % gallery.length]}
                        alt={product.name}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      {PRODUCT_BADGES[i % PRODUCT_BADGES.length] && (
                        <span className={`absolute left-3 top-3 rounded-full border-2 border-[#191406] px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] uppercase ${
                          PRODUCT_BADGES[i % PRODUCT_BADGES.length] === "Low stock" ? "bg-[#e0402a] text-[#fbf7ef]" : "bg-[#fbf7ef]"
                        }`}>
                          {PRODUCT_BADGES[i % PRODUCT_BADGES.length]}
                        </span>
                      )}
                      <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full border-2 border-[#191406] bg-[#2f7d4f] text-[#fbf7ef] opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    {/*
                      The catalogue's longest single words are "maintenance"
                      (12.8em) and "PRESCRIPTION" (12.6em), with prices up to
                      "R4,500/group" (10.8em). The name is sized from the card at
                      a 13em budget and the price badge at 13.5em, and
                      `flex-wrap` lets the price drop under the name rather than
                      squeezing it — the badge is shrink-0, so a long price used
                      to push the row wider than the cell.
                    */}
                    <div className="@container mt-3 flex flex-wrap items-start justify-between gap-x-2 gap-y-1.5 px-1">
                      <div className="min-w-0">
                        <h3 className="font-display text-[min(0.875rem,calc(100cqw/13))] font-extrabold tracking-tight break-words bp-md:text-base">{product.name}</h3>
                        {product.description && (
                          <p className="mt-0.5 text-[11px] font-medium text-[#191406]/45">{product.description}</p>
                        )}
                      </div>
                      <span className="max-w-full shrink-0 break-words rounded-lg border-2 border-[#191406] bg-[#fbf7ef] px-2.5 py-1 font-display text-[min(0.875rem,calc(100cqw/13.5))] font-extrabold shadow-[2px_2px_0_#191406]">
                        {product.price}
                      </span>
                    </div>
                  </a>
                </Up>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Specials banner ——— */}
        <section id="specials" className="border-y-2 border-[#191406] bg-[#2f7d4f] text-[#fbf7ef]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-5 py-14 bp-md:flex-row bp-md:py-16">
            <Up className="flex items-center gap-5">
              <BadgePercent className="h-14 w-14 shrink-0 text-[#fbf7ef]/80" strokeWidth={1.5} />
              <div>
                <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#fbf7ef]/60">Month-end special</p>
                {/* min-w-0 + break-words: this row shares its width with a
                    56px icon, and "SPECIAL" in caps is 7.4em — 221px at
                    text-3xl, more than the 204px left beside the icon on a
                    320px phone. */}
                <h2 className="min-w-0 break-words font-display text-3xl font-extrabold uppercase tracking-tight bp-md:text-4xl">
                  Ask what&apos;s on special this week
                </h2>
              </div>
            </Up>
            <Up delay={0.1}>
              <a
                href={waLink(site.whatsapp, `Hi ${site.businessName}! What's on special this week?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border-2 border-[#191406] bg-[#fbf7ef] px-7 py-4 font-display text-sm font-bold tracking-[0.14em] text-[#191406] uppercase shadow-[5px_5px_0_#191406] transition-all duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4.5 w-4.5" /> Get the deals list
              </a>
            </Up>
          </div>
        </section>

        {/* ——— Delivery & collection ——— */}
        <section className="mx-auto max-w-6xl px-5 py-20 bp-md:py-24">
          <div className="grid grid-cols-1 gap-5 bp-md:grid-cols-3">
            {(
              [
                [Truck, "Nationwide delivery", "Pudo or Paxi from R90 · 2–4 working days, tracked all the way."],
                [StoreIcon, "Free collection", `Order ahead, collect at ${site.area.split(",")[0]} — ready within 2 hours.`],
                [Package, "Bulk & wholesale", "Resellers and stokvels get tiered pricing. Ask for the bulk list."],
              ] as const
            ).map(([Icon, title, copy], i) => (
              <Up key={title} delay={i * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-2xl border-2 border-[#191406] bg-white/50 p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-[#191406] bg-[#e0402a] text-[#fbf7ef] shadow-[3px_3px_0_#191406]">
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  {/*
                    The copy carries the owner's town inside a sentence
                    ("collect at Pietermaritzburg" — 115px, the longest place
                    name in the catalogue), and the icon tile plus gap-4 leave it
                    117px in the md grid. `min-w-0` is what lets the flex item
                    shrink to that and `break-words` is the backstop for a word
                    we have never seen.
                  */}
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-extrabold tracking-tight break-words">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed break-words text-[#191406]/55">{copy}</p>
                  </div>
                </div>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Lookbook ——— */}
        <section id="lookbook" className="border-t-2 border-[#191406] bg-[#f1e9d8]">
          <div className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
            {/*
              flex-wrap, and the heading sits in its own container. The heading
              is the owner's copy ("The lookbook" by default, but an owner can
              write anything, and the catalogue's longest is "Installations" at
              12.96em in these caps). In a row that could not wrap, that word was
              477px against the 172px left beside the social icons on a 320px
              phone — clipped mid-word. Wrapping gives the heading the full
              width on a phone (icons below it), and at md `grow` keeps them
              side by side as before.

              `w-full` below md is also what gives the container a width at all:
              a query container cannot size itself from its contents, so as a
              flex item it would otherwise be 0px wide and the cqw heading would
              compute to 0px.
            */}
            <Up className="mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
              <div className="@container w-full min-w-0 bp-md:w-auto bp-md:grow">
                <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#e0402a] uppercase">On the floor</p>
                <h2 className="font-display text-[min(2.25rem,calc(100cqw/14))] font-extrabold uppercase tracking-tight break-words bp-md:text-[min(3.75rem,calc(100cqw/14))]">{site.galleryHeading ?? "The lookbook"}</h2>
              </div>
              <SocialRow site={site} iconClassName="text-[#191406]/45" />
            </Up>
            <div className="grid grid-cols-3 gap-3 bp-md:gap-5">
              {gallery.map((url, i) => (
                <Up key={`${url}-${i}`} delay={i * 0.05} className={i === 1 || i === 4 ? "mt-6 bp-md:mt-10" : ""}>
                  <div className="overflow-hidden rounded-2xl border-2 border-[#191406]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`${site.businessName} stock ${i + 1}`}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </Up>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Reviews ——— */}
        <section className="border-t-2 border-[#191406] bg-[#191406] text-[#fbf7ef]">
          <div className="mx-auto max-w-6xl px-5 py-20 bp-md:py-24">
            <Up className="mb-10 flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight bp-md:text-5xl">
                Receipts from <span className="text-[#e0402a]">customers</span>
              </h2>
              <span className="flex items-center gap-2 rounded-full border border-[#fbf7ef]/20 px-4 py-2 text-xs font-bold tracking-[0.16em] uppercase">
                <Star className="h-4 w-4 fill-[#2f7d4f] text-[#2f7d4f]" /> {site.rating} average · {site.reviews}+ reviews
              </span>
            </Up>
            <div className="grid grid-cols-1 gap-5 bp-md:grid-cols-3">
              {[
                ["Ordered Tuesday on WhatsApp, wearing it Friday. The quality punches way above the price.", "Karabo M., Bloemfontein"],
                ["I've bought from every drop for two years. Never a miss, and delivery is always on time.", "Ané S., Cape Town"],
                ["We buy bulk for our stokvel monthly. Proper prices, proper service, zero stories.", "Gogo Elsie, Soweto"],
              ].map(([quote, name], i) => (
                <Up key={name} delay={i * 0.1}>
                  <figure className="flex h-full flex-col rounded-2xl border border-[#fbf7ef]/15 bg-[#fbf7ef]/[0.04] p-7">
                    <blockquote className="flex-1 font-serif text-lg leading-snug text-[#fbf7ef]/85">“{quote}”</blockquote>
                    <figcaption className="mt-6 text-[11px] font-bold tracking-[0.18em] text-[#fbf7ef]/45 uppercase">
                      {name}
                    </figcaption>
                  </figure>
                </Up>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Visit ——— */}
        <section id="visit" className="border-t-2 border-[#191406]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 bp-md:grid-cols-2 bp-md:py-28">
            {/* @container so the location headline can be sized from its own
                column — see the note on the h2. */}
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#e0402a] uppercase">Visit the shop</p>
              {/*
                This headline is the owner's town, and South African place names
                are long. In this face an uppercase character measures about 1.1em,
                so "PIETERMARITZBURG," is 17.8em wide — 640px at a fixed
                text-4xl against a 350px column, which clipped most of the word on
                a phone, and 310px of it on a laptop where the type was text-5xl.
                A fixed size cannot know how long the name will be.

                Dividing the column by 19 keeps the worst name in the demo data
                (Pietermaritzburg) inside it at every width, and every shorter town
                is simply centred in the space it has. The 2.25rem cap keeps short
                names from ballooning on very wide screens.
              */}
              <h2 className="break-words font-display text-[min(2.25rem,calc(100cqw/19))] font-extrabold uppercase tracking-tight">{site.area}</h2>
              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-4 border-b-2 border-[#191406]/10 pb-5">
                  <Clock className="h-5 w-5 text-[#e0402a]" />
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#191406]/40 uppercase">Trading hours</p>
                    <p className="font-medium">{site.hours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 border-b-2 border-[#191406]/10 pb-5">
                  <MessageCircle className="h-5 w-5 text-[#e0402a]" />
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#191406]/40 uppercase">Orders & stock checks</p>
                    <p className="font-medium">{displayPhone(site.whatsapp)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-[#e0402a]" />
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#191406]/40 uppercase">Find us</p>
                    <p className="font-medium">{site.area}</p>
                  </div>
                </div>
              </div>
            </Up>
            <Up delay={0.15}>
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-[2rem] border-2 border-[#191406] bg-[#e0402a] p-10 text-center text-[#fbf7ef] shadow-[10px_10px_0_#191406]">
                <p className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight bp-md:text-4xl">
                  Seen something you like?
                </p>
                <p className="mt-4 max-w-xs text-sm font-medium text-[#fbf7ef]/80">
                  Screenshot it, WhatsApp us, and we&apos;ll confirm size + delivery before you pay a cent.
                </p>
                <a
                  href={orderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-[#191406] bg-[#fbf7ef] px-8 py-4 text-[13px] font-bold tracking-[0.16em] text-[#191406] uppercase transition-all duration-300 hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4.5 w-4.5" /> WhatsApp the shop
                </a>
              </div>
            </Up>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t-2 border-[#191406] bg-[#fbf7ef] px-5 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            {/*
              flex-wrap: the brand name is owner copy set in caps, and the
              catalogue's longest single word — "PHYSIOTHERAPY" — is 14.17em,
              255px at this size. That does not fit beside the 40px logo on a
              320px phone, so the row wraps and the name takes the full column.
            */}
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="rounded-lg border-2 border-[#191406] bg-[#2f7d4f] font-display text-[#fbf7ef]" />
              <span className="min-w-0 break-words font-display text-lg font-extrabold uppercase">{site.businessName}</span>
            </div>
            <SocialRow site={site} iconClassName="text-[#191406]/45" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#191406]/40 uppercase">
              Powered by <span className="text-[#e0402a]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
