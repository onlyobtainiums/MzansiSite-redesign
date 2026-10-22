"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Star, X } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../../types";
import { displayPhone, waLink } from "../../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../../shared";
import { Up } from "../../Reveal";

/* Velvet Barber Variant 2 — Minimalist (ivory & ink) — calm, modern, white-space heavy */
export default function BarberVariant2({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const bookLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book a cut.`);

  // Minimal thin palette: ink #0f1113 · ivory #fdfaf6 · line #e8ddd1
  return (
    <>
      <WhatsAppFab site={site} accent="#0f1113" />
      <div className="@container/page min-h-screen bg-[#fdfaf6] font-sans text-[#0f1113]">
        {/* Top line — thin */}
        <div className="border-b border-[#0f1113]/10 bg-white/60 px-4 py-2 text-center text-[11px] tracking-[0.22em] text-[#0f1113]/50 uppercase backdrop-blur">
          <span className="inline-flex items-center gap-2"><Clock className="h-3 w-3" /> {site.hours} <span className="hidden bp-sm:inline">· {site.area}</span></span>
        </div>

        <header className="sticky top-0 z-40 border-b border-[#0f1113]/10 bg-[#fdfaf6]/90 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 rounded-full bg-white border border-[#0f1113] font-display text-[#0f1113]" />
              <span className="truncate font-serif text-lg tracking-wide">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-8 text-[10px] tracking-[0.2em] uppercase bp-md:flex">
              <a href="#services" className="text-[#0f1113]/60 hover:text-[#0f1113]">Menu</a>
              <a href="#gallery" className="text-[#0f1113]/60 hover:text-[#0f1113]">Space</a>
              <a href="#visit" className="text-[#0f1113]/60 hover:text-[#0f1113]">Visit</a>
            </div>
            <div className="flex items-center gap-2">
              <a href={bookLink} target="_blank" rel="noopener noreferrer" className="hidden rounded-full border border-[#0f1113] px-5 py-2 text-[10px] tracking-[0.16em] uppercase hover:bg-[#0f1113] hover:text-white bp-sm:block">Book</a>
              <button onClick={()=>setMenuOpen(!menuOpen)} className="grid h-9 w-9 place-items-center rounded-full border border-[#0f1113]/20 bg-white bp-md:hidden" aria-label="Menu">{menuOpen?<X className="h-4 w-4" />:<Menu className="h-4 w-4" />}</button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#0f1113]/10 bg-white px-5 py-4 bp-md:hidden">
              {["services","gallery","visit"].map(id=> (
                <a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)} className="block py-2 text-xs tracking-[0.16em] uppercase text-[#0f1113]/70">{id}</a>
              ))}
            </div>
          )}
        </header>

        {/* Hero — centered, lots of air */}
        <section id="top" className="mx-auto max-w-3xl px-5 pb-10 pt-12 text-center bp-md:pt-16">
          <Up><p className="text-[11px] tracking-[0.28em] uppercase text-[#0f1113]/40">{site.area}</p></Up>
          <Up delay={0.06}><h1 className="mt-4 font-serif text-[2.6rem] leading-[0.95] tracking-tight break-words bp-md:text-[4rem]">{site.tagline.split("—")[0].split(".")[0]}</h1></Up>
          <Up delay={0.12}><div className="mx-auto mt-6 h-px w-16 bg-[#0f1113]/20" aria-hidden /></Up>
          <Up delay={0.16}><p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#0f1113]/60">{site.tagline}</p></Up>
          <Up delay={0.2}><div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={bookLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#0f1113] px-7 py-3.5 text-xs tracking-[0.16em] uppercase text-white hover:bg-black">Book on WhatsApp <ArrowRight className="h-4 w-4" /></a>
            <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-[#0f1113]/15 bg-white px-6 py-3 text-xs tracking-[0.16em] uppercase hover:border-[#0f1113]">View menu</a>
          </div></Up>
          <Up delay={0.22}><div className="mt-10 overflow-hidden rounded-[1.2rem] border border-[#0f1113]/10 bg-white p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.heroImageUrl} alt={site.businessName} className="aspect-[4/3] w-full rounded-[0.9rem] object-cover" />
            <div className="flex items-center justify-between px-3 py-3 text-left">
              <div className="min-w-0"><p className="text-[10px] tracking-[0.18em] uppercase text-[#0f1113]/40">Today</p><p className="truncate font-serif text-sm">{site.services[0]?.name}</p></div>
              <span className="shrink-0 text-sm font-semibold">{site.services[0]?.price}</span>
            </div>
          </div></Up>
        </section>

        {/* Services — minimal list with thin lines */}
        <section id="services" className="border-y border-[#0f1113]/10 bg-white">
          <div className="mx-auto max-w-3xl px-5 py-14 bp-md:py-20">
            <Up className="text-center"><p className="text-[11px] tracking-[0.28em] uppercase text-[#0f1113]/40">The menu</p><h2 className="mt-3 font-serif text-3xl tracking-tight bp-md:text-4xl">Cuts & care</h2><p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#0f1113]/50">No hidden fees. Just clean prices — WhatsApp to confirm a time.</p></Up>
            <div className="mt-10 divide-y divide-[#0f1113]/10 border-y border-[#0f1113]/10">
              {site.services.map((s,i)=>(
                <Up key={s.name} delay={i*0.04}>
                  <a href={waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book: ${s.name} (${s.price})`)} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-1 py-5 hover:bg-[#fdfaf6]/60 bp-sm:flex-row bp-sm:items-baseline bp-sm:gap-4">
                    <div className="min-w-0 flex-1"><h3 className="font-serif text-lg break-words group-hover:opacity-70">{s.name}</h3>{s.description && <p className="mt-1 text-xs text-[#0f1113]/40">{s.description}</p>}</div>
                    <span className="hidden flex-1 border-b border-dotted border-[#0f1113]/15 bp-sm:block" aria-hidden />
                    <span className="font-medium">{s.price}</span>
                  </a>
                </Up>
              ))}
            </div>
            <Up delay={0.18}><div className="mt-8 flex justify-center"><a href={bookLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-[#0f1113] pb-1 text-xs tracking-[0.16em] uppercase">Book on WhatsApp</a></div></Up>
          </div>
        </section>

        {/* Quote — centered */}
        <section className="mx-auto max-w-3xl px-5 py-14 text-center bp-md:py-20">
          <Up><p className="text-[11px] tracking-[0.28em] uppercase text-[#0f1113]/30">Why return</p></Up>
          <Up delay={0.06}><blockquote className="mt-6 font-serif text-2xl leading-snug break-words bp-md:text-3xl">“{site.aboutQuote ?? "Clean work, clean tools, calm space."}”</blockquote></Up>
          <Up delay={0.12}><p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#0f1113]/60">{site.businessName} · {site.area}. {site.tagline}</p></Up>
          <Up delay={0.18}><div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#0f1113]/10 pt-6">
            {[[site.area.split(",")[0]||site.area,"from"],[site.services.length+" services","menu"],[site.hours.split("·")[0].trim()||site.hours,"hours"]].map(([b,s])=>(
              <div key={s} className="min-w-0"><p className="break-words font-serif text-lg">{b}</p><p className="mt-1 text-[10px] tracking-[0.16em] uppercase text-[#0f1113]/40">{s}</p></div>
            ))}
          </div></Up>
        </section>

        {/* Gallery — strict even grid, no stagger, thin borders */}
        <section id="gallery" className="bg-white border-t border-[#0f1113]/10">
          <div className="mx-auto max-w-5xl px-5 py-14 bp-md:py-20">
            <Up className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div><p className="text-[11px] tracking-[0.28em] uppercase text-[#0f1113]/40">Inside</p><h2 className="mt-2 font-serif text-2xl bp-md:text-3xl">{site.galleryHeading ?? "Quiet craft"}</h2></div>
              <SocialRow site={site} iconClassName="text-[#0f1113]/30" />
            </Up>
            <div className="grid grid-cols-2 gap-3 bp-md:grid-cols-3 bp-md:gap-4">
              {gallery.map((url,i)=>(
                <Up key={`${url}-${i}`} delay={i*0.04}><div className="overflow-hidden rounded-xl border border-[#0f1113]/10 bg-[#fdfaf6]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`${site.businessName} ${i+1}`} className="aspect-square w-full object-cover" loading="lazy" />
                </div></Up>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        {site.isDemo && site.reviewItems ? (
          <section className="border-t border-[#0f1113]/10 bg-[#fdfaf6]">
            <div className="mx-auto max-w-5xl px-5 py-14 bp-md:py-16">
              <Up className="text-center"><p className="text-[11px] tracking-[0.28em] uppercase text-[#0f1113]/30">Notes</p><h2 className="mt-3 font-serif text-2xl">{site.reviewHeading}</h2><DemoBadge className="mt-3" /></Up>
              <div className="mt-8 grid grid-cols-1 gap-4 bp-md:grid-cols-3">
                {site.reviewItems.map((r,i)=>(
                  <Up key={r.name} delay={i*0.06}><figure className="rounded-2xl border border-[#0f1113]/10 bg-white p-6"><div className="mb-3 flex gap-1">{Array.from({length:5}).map((_,s)=><Star key={s} className="h-3 w-3 fill-[#0f1113] text-[#0f1113]" />)}</div><blockquote className="font-serif text-[15px] leading-snug">“{r.quote}”</blockquote><figcaption className="mt-4 text-[10px] tracking-[0.16em] uppercase text-[#0f1113]/40">{r.name} — DEMO</figcaption></figure></Up>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="border-t border-[#0f1113]/10 bg-[#fdfaf6] py-14 text-center"><div className="mx-auto max-w-xl px-5"><Up><p className="text-[11px] tracking-[0.28em] uppercase text-[#0f1113]/30">What to expect</p><h2 className="mt-3 font-serif text-2xl">Straight answers</h2><p className="mt-3 text-sm leading-relaxed text-[#0f1113]/60">Prices are published above. Ask on WhatsApp for availability.</p><a href={waLink(site.whatsapp, `Hi ${site.businessName}!`)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full border border-[#0f1113] px-6 py-3 text-xs tracking-[0.16em] uppercase hover:bg-[#0f1113] hover:text-white">Ask on WhatsApp</a></Up></div></section>
        )}

        <section id="visit" className="border-t border-[#0f1113]/10 bg-white">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-5 py-14 bp-md:grid-cols-2 bp-md:py-16">
            <Up className="@container min-w-0"><p className="text-[11px] tracking-[0.28em] uppercase text-[#0f1113]/30">Visit</p><h2 className="mt-2 break-words font-serif text-2xl">{site.area}</h2>
              <div className="mt-6 space-y-4 text-sm">
                <p className="flex items-center gap-3 break-words"><Clock className="h-4 w-4 shrink-0 text-[#0f1113]/30" /> {site.hours}</p>
                <p className="flex items-center gap-3 break-words"><Phone className="h-4 w-4 shrink-0 text-[#0f1113]/30" /> {displayPhone(site.whatsapp)}</p>
                <p className="flex items-center gap-3 break-words"><MapPin className="h-4 w-4 shrink-0 text-[#0f1113]/30" /> {site.area}</p>
              </div>
            </Up>
            <Up delay={0.08}><div className="rounded-2xl border border-[#0f1113]/10 bg-[#fdfaf6] p-8 text-center"><p className="font-serif text-xl">Walk in or book.</p><p className="mt-2 text-sm text-[#0f1113]/60">One WhatsApp message — we reply in minutes.</p><a href={bookLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0f1113] px-6 py-3 text-xs tracking-[0.16em] uppercase text-white">Book on WhatsApp <ArrowRight className="h-4 w-4" /></a></div></Up>
          </div>
        </section>

        <footer className="border-t border-[#0f1113]/10 bg-white px-5 py-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3"><LogoBlock site={site} className="rounded-full border border-[#0f1113]/15 bg-white text-[#0f1113]" /><span className="break-words font-serif">{site.businessName}</span></div>
            <SocialRow site={site} iconClassName="text-[#0f1113]/30" />
            <p className="text-[11px] tracking-[0.16em] uppercase text-[#0f1113]/30">Powered by MzansiSite</p>
          </div>
        </footer>
      </div>
    </>
  );
}
