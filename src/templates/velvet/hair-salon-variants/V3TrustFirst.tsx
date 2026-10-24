"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, Scissors, ShieldCheck, Sparkles, Star, X } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../../types";
import { displayPhone, waLink } from "../../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../../shared";
import { Up } from "../../Reveal";
import { ImageWithFallback } from "../../forge/variants/shared/ImageWithFallback";

/* Velvet — Hair Salon V3: "Trust-First".
   Client reviews and trust credentials lead at the top; hero is secondary below.
   Guarantee badge prominent before any selling. Soft oval testimonial cards.
   Honest empty state when no review data exists.
   Structurally different from V1 Hero-First — reviews first, hero third.
   No images of people, faces, or hands — uses interior/tools/decor only. */
export default function HairSalonV3TrustFirst({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const bookLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to make a booking.`);

  return (
    <>
      <WhatsAppFab site={site} accent="#b98a2f" />

      <div className="@container/page min-h-screen bg-[#ffffff] font-sans text-[#241a12]">
        {/* ——— Top bar — light, credentials-first ——— */}
        <div className="bg-[#ffffff] px-4 py-2 border-b border-[#cbd5e1]">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center text-[11px] font-bold tracking-[0.14em] uppercase bp-sm:justify-between">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 fill-[#b98a2f]" /> Honest pricing
            </span>
            <a href={`tel:+${site.whatsapp.replace(/\D/g, "")}`} className="hidden items-center gap-2 underline underline-offset-4 bp-sm:flex">
              <Phone className="h-4 w-4" /> {displayPhone(site.whatsapp)}
            </a>
          </div>
        </div>

        {/* ——— Nav — minimal, right-aligned CTA ——— */}
        <header className="sticky top-0 z-40 border-b border-[#cbd5e1] bg-[#ffffff]/90 backdrop-blur-md text-[#241a12]">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#reviews" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 rounded-full border border-[#b98a2f]/40 bg-[#241a12] font-display text-[#e8ce9a]" />
              <span className="truncate font-serif text-xl leading-none">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-8 text-[12px] font-semibold tracking-[0.18em] uppercase bp-md:flex">
              <a href="#reviews" className="text-[#241a12]/60 transition-colors hover:text-[#b98a2f]">Reviews</a>
              <a href="#services" className="text-[#241a12]/60 transition-colors hover:text-[#b98a2f]">Services</a>
              <a href="#visit" className="text-[#241a12]/60 transition-colors hover:text-[#b98a2f]">Visit</a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={bookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden bg-[#241a12] px-5 py-2.5 text-[12px] font-bold tracking-[0.16em] text-[#f6efe6] uppercase transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f] bp-sm:block"
              >
                Book now
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#241a12]/15 bp-md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#cbd5e1] px-5 py-4 bp-md:hidden">
              {["reviews", "services", "visit"].map((id) => (
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

        {/* ——— REVIEWS FIRST — soft oval testimonial cards ——— */}
        <section id="reviews" className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
          {site.reviewItems && site.reviewItems.length > 0 ? (
            <>
              <Up className="mb-12 @container">
                <div className="inline-flex items-center gap-2 border-l-4 border-[#b98a2f] pl-3 py-1 mb-3 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">
                  <Star className="h-4 w-4 fill-[#b98a2f]" /> Word of mouth
                </div>
                <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase bp-md:text-6xl">
                  Real feedback from <span className="text-[#b98a2f]">{site.area.split(",")[0]}</span>
                </h2>
              </Up>
              <div className="grid grid-cols-1 gap-5 bp-sm:grid-cols-2 bp-lg:grid-cols-3">
                {site.reviewItems.map((review, i) => (
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
                      <p className="mt-6 text-xs font-bold tracking-[0.18em] text-[#241a12]/45 uppercase">{review.name} — DEMO</p>
                    </div>
                  </Up>
                ))}
              </div>
            </>
          ) : (
            <>
              <Up className="mb-12 @container">
                <div className="inline-flex items-center gap-2 border-l-4 border-[#b98a2f] pl-3 py-1 mb-3 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">
                  <Star className="h-4 w-4 fill-[#b98a2f]" /> Client feedback
                </div>
                <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase bp-md:text-6xl">
                  Client feedback
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#334155]">
                  No reviews yet. Be the first to share your experience with {site.businessName}.
                </p>
              </Up>
            </>
          )}
        </section>

        {/* ——— Trust badges ——— */}
        <section id="trust" className="border-y border-[#cbd5e1] bg-[#ffffff] py-16">
          <div className="mx-auto max-w-6xl px-5">
            <Up className="mb-12 @container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">Accreditation</p>
              <h2 className="font-display text-3xl font-extrabold tracking-tight uppercase bp-md:text-4xl">
                Why {site.businessName.split(" ")[0]} is trusted
              </h2>
            </Up>
            <div className="grid grid-cols-1 gap-4 bp-md:grid-cols-3">
              {[
                {
                  icon: <ShieldCheck className="h-8 w-8 text-[#b98a2f]" strokeWidth={1.5} />,
                  label: "Honest pricing",
                  body: "Published prices, no surprises",
                },
                {
                  icon: <Scissors className="h-8 w-8 text-[#b98a2f]" strokeWidth={1.5} />,
                  label: site.area.split(",")[0],
                  body: site.hours,
                },
                {
                  icon: <Clock className="h-8 w-8 text-[#b98a2f]" strokeWidth={1.5} />,
                  label: "Same-day booking",
                  body: site.guarantee ?? "Book on WhatsApp, confirmed within minutes",
                },
              ].map((badge, i) => (
                <Up key={i} delay={i * 0.05} className="border border-[#cbd5e1] bg-[#f6efe6] p-8 rounded-3xl">
                  {badge.icon}
                  <h3 className="mt-4 font-display text-sm font-extrabold tracking-tight uppercase text-[#241a12]">{badge.label}</h3>
                  <p className="mt-2 text-sm text-[#64748b]">{badge.body}</p>
                </Up>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Hero as secondary banner ——— */}
        <section id="top" className="relative bg-[#241a12] text-[#f6efe6] py-20">
          <div className="relative mx-auto max-w-6xl px-5">
            <Up>
              <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#b98a2f] pl-3 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[#b98a2f] uppercase bg-[#b98a2f]/10">
                <Clock className="h-4 w-4" /> {site.area} · {site.hours}
              </p>
            </Up>
            <Up delay={0.08}>
              <h1 className="font-display text-[min(2.5rem,calc(100cqw/10))] font-extrabold leading-[0.95] tracking-tight uppercase break-words">
                Expert.<br />
                <span className="text-[#b98a2f]">treatments done right.</span>
              </h1>
            </Up>
            <Up delay={0.16}>
              <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-[#cbd5e1]">{site.tagline}</p>
            </Up>
            <Up delay={0.24} className="mt-10">
              <ImageWithFallback
                src={site.heroImageUrl}
                alt={`${site.businessName} treatment room`}
                className="w-full h-64 object-cover rounded-none border-4 border-[#b98a2f]/30"
              />
            </Up>
            <Up delay={0.32} className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={bookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#b98a2f] px-8 py-4 rounded-full font-display text-sm font-bold tracking-[0.14em] text-[#241a12] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f6efe6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
              >
                Book on WhatsApp
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={`tel:+${site.whatsapp.replace(/\D/g, "")}`}
                className="inline-flex items-center gap-3 border-2 border-[#b98a2f]/30 px-8 py-4 rounded-full text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 hover:border-[#b98a2f] hover:text-[#b98a2f] bg-[#1e293b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                aria-label="Call Naledi's Braids & Beauty"
              >
                <Phone className="h-4.5 w-4.5" /> Call now
              </a>
            </Up>
          </div>
        </section>

        {/* ——— Services — simple list below trust ——— */}
        <section id="services" className="mx-auto max-w-4xl px-5 py-20 bp-md:py-28">
          <Up className="mb-12 @container">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#334155] pl-3 py-1 mb-3 text-[11px] font-bold tracking-[0.3em] text-[#334155] uppercase">
              <Scissors className="h-4 w-4" /> The menu
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase bp-md:text-6xl">Services & pricing</h2>
          </Up>
          <div className="mt-14 space-y-2">
            {site.services.map((service, i) => (
              <Up key={service.name} delay={i * 0.05}>
                <a
                  href={waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book: ${service.name} (${service.price})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 rounded-2xl px-4 py-4 transition-colors duration-300 hover:bg-[#f6efe6]/[0.04] bp-sm:flex-row bp-sm:items-baseline bp-sm:gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                  aria-label={`Book ${service.name} via WhatsApp`}
                >
                  <div className="min-w-0">
                    <h3 className="font-serif text-2xl break-words transition-colors group-hover:text-[#8a5f1e]">{service.name}</h3>
                    {service.description && (
                      <p className="mt-0.5 text-xs font-medium tracking-wide text-[#241a12]/45">{service.description}</p>
                    )}
                  </div>
                  <span className="mx-2 hidden flex-1 border-b border-dotted border-[#241a12]/30 bp-sm:block" aria-hidden />
                  <span className="font-serif text-2xl text-[#b98a2f]">{service.price}</span>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* ——— Contact ——— */}
        <section id="visit" className="border-t border-[#cbd5e1] bg-[#f6efe6]">
          <div className="mx-auto max-w-6xl px-5 py-20 bp-md:py-28">
            <Up className="@container">
              <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-[#b98a2f] uppercase">Visit us</p>
              <h2 className="font-display text-3xl font-extrabold tracking-tight uppercase break-words bp-md:text-4xl">
                Based in {site.area.split(",")[0]}
              </h2>
            </Up>
            <div className="mt-10 grid grid-cols-1 gap-6 bp-md:grid-cols-2">
              <div className="border border-[#cbd5e1] bg-white p-8 rounded-3xl">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#b98a2f] uppercase">Phone</p>
                <a
                  href={`tel:+${site.whatsapp.replace(/\D/g, "")}`}
                  className="mt-2 flex items-center gap-3 transition-colors hover:text-[#b98a2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                  aria-label="Call Naledi's Braids & Beauty"
                >
                  <Phone className="h-5 w-5 shrink-0 text-[#b98a2f]" />
                  <span className="font-display text-xl font-extrabold break-words">{displayPhone(site.whatsapp)}</span>
                </a>
              </div>
              <div className="border border-[#cbd5e1] bg-white p-8 rounded-3xl">
                <p className="text-[11px] font-bold tracking-[0.24em] text-[#b98a2f] uppercase">WhatsApp</p>
                <a
                  href={bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-3 bg-[#b98a2f] px-4 py-3 rounded-full font-display text-sm font-bold text-[#241a12] uppercase transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#b98a2f]"
                  aria-label={`Message ${site.businessName.split(" ")[0]} via WhatsApp`}
                >
                  Message {site.businessName.split(" ")[0]}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer className="border-t border-[#cbd5e1] bg-[#ffffff] px-5 py-10 text-[#241a12]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <LogoBlock site={site} className="rounded-full border border-[#b98a2f]/40 bg-[#241a12] font-display text-[#e8ce9a]" />
              <span className="min-w-0 break-words font-serif text-lg">{site.businessName}</span>
            </div>
            <SocialRow site={site} iconClassName="text-[#64748b]/50" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#64748b] uppercase">
              Powered by <span className="text-[#b98a2f]">MzansiSite</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
