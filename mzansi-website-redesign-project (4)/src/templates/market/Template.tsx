"use client";

import { motion } from "framer-motion";
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

/* Market — product-led storefront for retail, wholesale & manufacturing.
   Palette: paper #fbf7ef · ink #191406 · red #e0402a · green #2f7d4f */

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

const PRODUCT_BADGES = ["New drop", "Best seller", "Low stock", "Back in", "", ""];

export default function MarketTemplate({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const orderLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to place an order.`);

  return (
    <div className="min-h-screen bg-[#fbf7ef] font-sans text-[#191406]">
      <WhatsAppFab site={site} />

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
          <a href="#top" className="flex items-center gap-3">
            <LogoBlock site={site} className="rounded-lg border-2 border-[#191406] bg-[#2f7d4f] font-display text-[#fbf7ef]" />
            <span className="font-display text-lg font-extrabold tracking-tight uppercase">{site.businessName}</span>
          </a>
          <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.2em] uppercase md:flex">
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
              className="hidden items-center gap-2 rounded-full border-2 border-[#191406] bg-[#191406] px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] text-[#fbf7ef] uppercase transition-all duration-300 hover:bg-[#e0402a] hover:border-[#e0402a] sm:flex"
            >
              <MessageCircle className="h-4 w-4" /> Order now
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="grid h-10 w-10 place-items-center rounded-lg border-2 border-[#191406] md:hidden"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t-2 border-[#191406] bg-[#fbf7ef] px-5 py-4 md:hidden">
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
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.05fr_0.95fr] md:pt-20">
          <div className="relative z-10">
            <Up>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-[#191406] bg-[#2f7d4f] px-4 py-1.5 text-[10px] font-bold tracking-[0.22em] text-[#fbf7ef] uppercase shadow-[3px_3px_0_#191406]">
                <Package className="h-3.5 w-3.5" /> {site.area}
              </p>
            </Up>
            <Up delay={0.1}>
              <h1 className="font-display text-[13vw] font-extrabold uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl">
                The good stuff.
                <br />
                <span className="text-[#e0402a]">Fair prices.</span>
                <br />
                Zero fuss.
              </h1>
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
              <motion.div
                animate={{ rotate: [6, 10, 6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-8 rounded-xl border-2 border-[#191406] bg-[#e0402a] px-4 py-2.5 font-display text-lg font-extrabold text-[#fbf7ef] shadow-[4px_4px_0_#191406]"
              >
                {site.services[2]?.price ?? site.services[0]?.price}
              </motion.div>
              <div className="absolute -bottom-5 -left-4 rounded-xl border-2 border-[#191406] bg-[#fbf7ef] px-4 py-3 shadow-[4px_4px_0_#191406]">
                <p className="text-[9px] font-bold tracking-[0.2em] text-[#2f7d4f] uppercase">This week</p>
                <p className="font-display text-sm font-extrabold">{site.services[0]?.name}</p>
              </div>
            </div>
          </Up>
        </div>
      </section>

      {/* ——— Product grid ——— */}
      <section id="shop" className="border-t-2 border-[#191406] bg-[#fbf7ef]">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <Up className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#e0402a] uppercase">The catalogue</p>
              <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
                Shop the line-up
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#191406]/55">
              Tap any product to order on WhatsApp — we confirm stock and delivery in minutes.
            </p>
          </Up>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
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
                  <div className="mt-3 flex items-start justify-between gap-2 px-1">
                    <div>
                      <h3 className="font-display text-sm font-extrabold tracking-tight md:text-base">{product.name}</h3>
                      {product.description && (
                        <p className="mt-0.5 text-[11px] font-medium text-[#191406]/45">{product.description}</p>
                      )}
                    </div>
                    <span className="shrink-0 rounded-lg border-2 border-[#191406] bg-[#fbf7ef] px-2.5 py-1 font-display text-sm font-extrabold shadow-[2px_2px_0_#191406]">
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
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-5 py-14 md:flex-row md:py-16">
          <Up className="flex items-center gap-5">
            <BadgePercent className="h-14 w-14 shrink-0 text-[#fbf7ef]/80" strokeWidth={1.5} />
            <div>
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#fbf7ef]/60">Month-end special</p>
              <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
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
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {(
            [
              [Truck, "Nationwide delivery", "Pudo or Paxi from R90 · 2–4 working days, tracked all the way."],
              [StoreIcon, "Free collection", `Order ahead, collect at ${site.area.split(",")[0]} — ready within 2 hours.`],
              [Package, "Bulk & wholesale", "Resellers and stokvels get tiered pricing. Ask for the bulk list."],
            ] as const
          ).map(([Icon, title, copy], i) => (
            <Up key={title} delay={i * 0.08}>
              <div className="flex h-full items-start gap-5 rounded-2xl border-2 border-[#191406] bg-white/50 p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-[#191406] bg-[#e0402a] text-[#fbf7ef] shadow-[3px_3px_0_#191406]">
                  <Icon className="h-5.5 w-5.5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#191406]/55">{copy}</p>
                </div>
              </div>
            </Up>
          ))}
        </div>
      </section>

      {/* ——— Lookbook ——— */}
      <section id="lookbook" className="border-t-2 border-[#191406] bg-[#f1e9d8]">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <Up className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#e0402a] uppercase">On the floor</p>
              <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-6xl">{site.galleryHeading ?? "The lookbook"}</h2>
            </div>
            <SocialRow site={site} iconClassName="text-[#191406]/45" />
          </Up>
          <div className="grid grid-cols-3 gap-3 md:gap-5">
            {gallery.map((url, i) => (
              <Up key={`${url}-${i}`} delay={i * 0.05} className={i === 1 || i === 4 ? "mt-6 md:mt-10" : ""}>
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
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <Up className="mb-10 flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
              Receipts from <span className="text-[#e0402a]">customers</span>
            </h2>
            <span className="flex items-center gap-2 rounded-full border border-[#fbf7ef]/20 px-4 py-2 text-xs font-bold tracking-[0.16em] uppercase">
              <Star className="h-4 w-4 fill-[#2f7d4f] text-[#2f7d4f]" /> {site.rating} average · {site.reviews}+ reviews
            </span>
          </Up>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
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
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
          <Up>
            <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#e0402a] uppercase">Visit the shop</p>
            <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-5xl">{site.area}</h2>
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
              <p className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-4xl">
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
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
          <div className="flex items-center gap-3">
            <LogoBlock site={site} className="rounded-lg border-2 border-[#191406] bg-[#2f7d4f] font-display text-[#fbf7ef]" />
            <span className="font-display text-lg font-extrabold uppercase">{site.businessName}</span>
          </div>
          <SocialRow site={site} iconClassName="text-[#191406]/45" />
          <p className="text-[11px] font-bold tracking-[0.18em] text-[#191406]/40 uppercase">
            Powered by <span className="text-[#e0402a]">MzansiSite</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
