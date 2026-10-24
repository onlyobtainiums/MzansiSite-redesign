"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Star, X, Award } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../../types";
import { displayPhone, waLink } from "../../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../../shared";
import { Up } from "../../Reveal";
import { ImageWithFallback } from "../../forge/variants/shared/ImageWithFallback";

/* Velvet Barber Variant 3 — Classic (wood & cream) — warm, heritage, striped detail */
export default function BarberVariant3({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const bookLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book.`);

  return (
    <>
      <WhatsAppFab site={site} accent="#8b5a2b" />
      <div className="@container/page min-h-screen bg-[#fdf3e6] font-sans text-[#2b1a0e]">
        {/* Striped bar — classic barber pole simplified */}
        <div className="h-2 bg-[repeating-linear-gradient(90deg,#b42318_0_14px,white_14px_28px,#0f2a5a_28px_42px)]" aria-hidden />
        <div className="bg-[#2b1a0e] px-4 py-2 text-center text-[11px] tracking-[0.18em] text-[#fdf3e6]/80 uppercase">
          <span className="inline-flex flex-wrap items-center justify-center gap-2">Est. chair · {site.hours} · {site.area}</span>
        </div>

        <header className="sticky top-0 z-40 border-b-2 border-[#2b1a0e] bg-[#fdf3e6]/95 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#2b1a0e] bg-[#fdf3e6] font-display text-sm font-extrabold text-[#2b1a0e]">{site.businessName.slice(0,1)}</span>
              <span className="hidden bp-sm:block"><LogoBlock site={site} className="shrink-0 rounded-full border border-[#8b5a2b]/40 bg-[#2b1a0e] text-[#e8c99a]" /></span>
              <span className="truncate font-display text-[15px] font-extrabold tracking-[0.06em] uppercase">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-6 text-[11px] font-bold tracking-[0.16em] uppercase bp-md:flex">
              <a href="#services" className="text-[#2b1a0e]/60 hover:text-[#2b1a0e]">Cuts</a>
              <a href="#story" className="text-[#2b1a0e]/60 hover:text-[#2b1a0e]">Heritage</a>
              <a href="#gallery" className="text-[#2b1a0e]/60 hover:text-[#2b1a0e]">Shop</a>
              <a href="#visit" className="text-[#2b1a0e]/60 hover:text-[#2b1a0e]">Visit</a>
            </div>
            <div className="flex items-center gap-2">
              <a href={bookLink} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-[#8b5a2b] px-5 py-2.5 text-[11px] font-bold tracking-[0.14em] text-white uppercase hover:bg-[#2b1a0e] bp-sm:block">Book</a>
              <button onClick={()=>setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#2b1a0e] bg-[#fdf3e6] bp-md:hidden" aria-label="Menu">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t-2 border-[#2b1a0e] bg-[#fdf3e6] px-5 py-4 bp-md:hidden">
              {["services","story","gallery","visit"].map(id=> (
                <a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)} className="block py-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#2b1a0e]/70">{id}</a>
              ))}
            </div>
          )}
        </header>

        {/* Hero — wood panel split */}
        <section id="top" className="relative overflow-hidden border-b-2 border-[#2b1a0e] bg-[#efe1c8]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 bp-md:grid-cols-[1.1fr_0.9fr] bp-md:items-center bp-md:py-14">
            <Up className="min-w-0 @container">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#2b1a0e]/15 bg-white px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase text-[#8b5a2b]"><Award className="h-3.5 w-3.5" /> {site.area}</p>
              <h1 className="mt-4 font-display text-[2.4rem] font-extrabold uppercase leading-[0.9] tracking-tight break-words bp-md:text-[3.6rem]">Heritage<br/>cuts.<br/><span className="text-[#8b5a2b]">Honest prices.</span></h1>
              <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-[#2b1a0e]/70">{site.tagline}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={bookLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#2b1a0e] px-6 py-3 text-xs font-bold tracking-[0.14em] uppercase text-[#fdf3e6] hover:bg-[#8b5a2b]">Book on WhatsApp <ArrowRight className="h-4 w-4" /></a>
                <a href="#services" className="inline-flex items-center rounded-full border-2 border-[#2b1a0e] bg-white px-6 py-3 text-xs font-bold tracking-[0.14em] uppercase text-[#2b1a0e]">See board</a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-[#2b1a0e]/60">
                <span className="rounded-full border border-[#2b1a0e]/15 bg-white px-3 py-1"><Clock className="mr-1 inline h-3 w-3" /> {site.hours.split("·")[0].trim()}</span>
                <span className="rounded-full bg-[#2b1a0e] px-3 py-1 text-[#fdf3e6]">Walk-ins welcome</span>
              </div>
            </Up>
            <Up delay={0.1} className="relative">
              <div className="overflow-hidden rounded-2xl border-2 border-[#2b1a0e] bg-white p-2 shadow-[6px_6px_0_#2b1a0e]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <ImageWithFallback src={site.heroImageUrl} alt={site.businessName} className="aspect-[4/3] w-full rounded-xl object-cover" />
                <div className="flex items-center justify-between px-2 pt-3">
                  <p className="text-xs font-bold tracking-[0.16em] uppercase text-[#8b5a2b]">Chair open</p>
                  <p className="font-display text-sm font-extrabold">{site.services[0]?.name} · {site.services[0]?.price}</p>
                </div>
              </div>
            </Up>
          </div>
        </section>

        {/* Services — warm cards with wood border */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-12 bp-md:py-16">
          <Up className="text-center"><p className="text-[11px] tracking-[0.28em] uppercase text-[#8b5a2b]">On the board</p><h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight bp-md:text-4xl">Cuts & grooming</h2></Up>
          <div className="mt-8 grid grid-cols-1 gap-4 bp-md:grid-cols-2">
            {site.services.map((s,i)=>(
              <Up key={s.name} delay={i*0.04}>
                <a href={waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book: ${s.name} (${s.price})`)} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-[#2b1a0e]/10 bg-white p-5 hover:border-[#8b5a2b] hover:bg-[#fff8ec]">
                  <div className="min-w-0"><h3 className="font-display text-[16px] font-extrabold uppercase break-words group-hover:text-[#8b5a2b]">{s.name}</h3>{s.description && <p className="mt-1 text-xs leading-relaxed text-[#2b1a0e]/50">{s.description}</p>}<p className="mt-2 text-[10px] tracking-[0.16em] uppercase text-[#8b5a2b]">Tap to book on WhatsApp</p></div>
                  <span className="shrink-0 rounded-full bg-[#2b1a0e] px-4 py-2 font-display text-sm font-extrabold text-[#fdf3e6] group-hover:bg-[#8b5a2b]">{s.price}</span>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* Story — cream with border */}
        <section id="story" className="border-y-2 border-[#2b1a0e] bg-[#2b1a0e] text-[#fdf3e6]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-12 bp-md:grid-cols-2 bp-md:items-center bp-md:py-16">
            <Up className="overflow-hidden rounded-2xl border-2 border-[#fdf3e6]/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <ImageWithFallback src={gallery[1] ?? site.heroImageUrl} alt={`${site.businessName} work`} className="aspect-[4/3] w-full object-cover" />
            </Up>
            <div>
              <Up><p className="text-[11px] tracking-[0.28em] uppercase text-[#e8c99a]">Heritage</p><h2 className="mt-2 font-display text-2xl font-extrabold uppercase leading-tight bp-md:text-3xl">Made for regulars,<br/><span className="text-[#e8c99a]">not one-timers.</span></h2></Up>
              <Up delay={0.08}><blockquote className="mt-4 border-l-4 border-[#e8c99a] pl-4 font-serif text-[17px] leading-relaxed break-words">“{site.aboutQuote ?? "Keep it affordable, keep it sharp, respect people's time."}”</blockquote><p className="mt-4 text-sm leading-relaxed text-[#fdf3e6]/60">{site.businessName} · {site.area}. {site.tagline}</p></Up>
              <Up delay={0.14}><div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#fdf3e6]/15 pt-5">
                {[[site.services.length+" cuts","board"],[site.area.split(",")[0]||site.area,"based"],[site.hours.split("·")[0].trim()||site.hours,"hours"]].map(([b,s])=>(
                  <div key={s} className="min-w-0"><p className="break-words font-display font-extrabold text-[#e8c99a]">{b}</p><p className="text-[10px] tracking-[0.16em] uppercase text-[#fdf3e6]/40">{s}</p></div>
                ))}
              </div></Up>
            </div>
          </div>
        </section>

        {/* Gallery — warm framed */}
        <section id="gallery" className="mx-auto max-w-6xl px-5 py-12 bp-md:py-16">
          <Up className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-[11px] tracking-[0.28em] uppercase text-[#8b5a2b]">Inside</p><h2 className="mt-2 font-display text-2xl font-extrabold uppercase">{site.galleryHeading ?? "The shop"}</h2></div>
            <SocialRow site={site} iconClassName="text-[#2b1a0e]/40" />
          </Up>
          <div className="grid grid-cols-2 gap-3 bp-md:grid-cols-3 bp-md:gap-4">
            {gallery.map((url,i)=>(
              <Up key={`${url}-${i}`} delay={i*0.05}><div className="overflow-hidden rounded-2xl border-2 border-[#2b1a0e] bg-white p-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <ImageWithFallback src={url} alt={`${site.businessName} ${i + 1}`} className="aspect-[4/3] w-full rounded-xl object-cover" />
              </div></Up>
            ))}
          </div>
        </section>

        {site.isDemo && site.reviewItems ? (
          <section className="border-y-2 border-[#2b1a0e] bg-[#efe1c8]">
            <div className="mx-auto max-w-6xl px-5 py-12 bp-md:py-14">
              <Up className="text-center"><p className="text-[11px] tracking-[0.28em] uppercase text-[#8b5a2b]">From the chair</p><h2 className="mt-2 font-display text-2xl font-extrabold uppercase">{site.reviewHeading}</h2><DemoBadge className="mt-3" /></Up>
              <div className="mt-6 grid grid-cols-1 gap-4 bp-md:grid-cols-3">
                {site.reviewItems.map((r,i)=>(
                  <Up key={r.name} delay={i*0.08}><figure className="rounded-2xl border-2 border-[#2b1a0e] bg-white p-6"><div className="mb-2 flex gap-1">{Array.from({length:5}).map((_,s)=><Star key={s} className="h-3 w-3 fill-[#8b5a2b] text-[#8b5a2b]" />)}</div><blockquote className="font-serif text-[15px] leading-snug break-words">“{r.quote}”</blockquote><figcaption className="mt-3 text-[11px] tracking-[0.16em] uppercase text-[#2b1a0e]/40">{r.name} — DEMO</figcaption></figure></Up>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="border-y-2 border-[#2b1a0e] bg-[#fff8ec] py-12 text-center"><div className="mx-auto max-w-xl px-5"><Up><p className="text-[11px] tracking-[0.28em] uppercase text-[#8b5a2b]">What to expect</p><h2 className="mt-2 font-display text-xl font-extrabold uppercase">Fair prices, clean work</h2><p className="mt-3 text-sm leading-relaxed text-[#2b1a0e]/60">Board prices above. WhatsApp for availability.</p><a href={waLink(site.whatsapp, `Hi ${site.businessName}!`)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-[#2b1a0e] px-6 py-3 text-xs tracking-[0.16em] uppercase text-white">Ask on WhatsApp</a></Up></div></section>
        )}

        <section id="visit" className="bg-[#fdf3e6]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-12 bp-md:grid-cols-2 bp-md:py-16">
            <Up className="@container min-w-0"><p className="text-[11px] tracking-[0.28em] uppercase text-[#8b5a2b]">Find us</p><h2 className="mt-2 break-words font-display text-2xl font-extrabold uppercase">{site.area}</h2>
              <div className="mt-6 space-y-4">
                <p className="flex gap-3 break-words"><Clock className="h-5 w-5 shrink-0 text-[#8b5a2b]" /> {site.hours}</p>
                <p className="flex gap-3 break-words"><Phone className="h-5 w-5 shrink-0 text-[#8b5a2b]" /> {displayPhone(site.whatsapp)}</p>
                <p className="flex gap-3 break-words"><MapPin className="h-5 w-5 shrink-0 text-[#8b5a2b]" /> {site.area}</p>
              </div>
            </Up>
            <Up delay={0.08}><div className="rounded-2xl border-2 border-[#2b1a0e] bg-[#2b1a0e] p-8 text-center text-[#fdf3e6]"><p className="font-display text-2xl font-extrabold uppercase">Book your chair</p><p className="mt-2 text-sm text-[#fdf3e6]/60">One message — we reply in minutes.</p><a href={bookLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e8c99a] px-7 py-3 text-xs font-bold tracking-[0.14em] uppercase text-[#2b1a0e]">Book on WhatsApp <ArrowRight className="h-4 w-4" /></a></div></Up>
          </div>
        </section>

        <footer className="border-t-2 border-[#2b1a0e] bg-[#fdf3e6] px-5 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#2b1a0e] bg-[#2b1a0e] font-display text-sm font-extrabold text-[#e8c99a]">{site.businessName.slice(0,1)}</span><span className="break-words font-display font-extrabold uppercase">{site.businessName}</span></div>
            <SocialRow site={site} iconClassName="text-[#2b1a0e]/40" />
            <p className="text-[11px] tracking-[0.16em] uppercase text-[#2b1a0e]/30">Powered by MzansiSite</p>
          </div>
        </footer>
      </div>
    </>
  );
}
