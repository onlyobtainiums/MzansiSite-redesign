"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Star, X, Zap } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../../types";
import { displayPhone, waLink } from "../../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../../shared";
import { Up } from "../../Reveal";
import { ImageWithFallback } from "../../forge/variants/shared/ImageWithFallback";

/* Velvet Barber Variant 4 — Urban (concrete + neon) — street energy */
export default function BarberVariant4({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const bookLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book.`);

  return (
    <>
      <WhatsAppFab site={site} accent="#ff3b30" />
      <div className="@container/page min-h-screen bg-[#f4f4f5] font-sans text-[#0a0a0a]">
        {/* Neon top */}
        <div className="bg-[#0a0a0a] px-4 py-2 text-center text-[11px] font-bold tracking-[0.22em] uppercase text-[#ff3b30]">● Walk-ins welcome · {site.hours} · {site.area}</div>

        <header className="sticky top-0 z-40 border-b-2 border-[#0a0a0a] bg-white/90 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#ff3b30] font-display text-sm font-black uppercase text-white">{site.businessName.slice(0,2)}</span>
              <span className="truncate font-display text-[15px] font-black uppercase tracking-tight">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-6 text-xs font-black tracking-[0.14em] uppercase bp-md:flex">
              <a href="#services" className="hover:text-[#ff3b30]">Cuts</a>
              <a href="#gallery" className="hover:text-[#ff3b30]">Gallery</a>
              <a href="#visit" className="hover:text-[#ff3b30]">Visit</a>
            </div>
            <div className="flex items-center gap-2">
              <a href={bookLink} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-[#ff3b30] px-5 py-2.5 text-xs font-black uppercase text-white hover:bg-[#0a0a0a] bp-sm:block">Book</a>
              <button onClick={()=>setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#0a0a0a] bg-white bp-md:hidden" aria-label="Menu">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t-2 border-[#0a0a0a] bg-white px-5 py-4 bp-md:hidden">
              {["services","gallery","visit"].map(id=> (
                <a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)} className="block py-2 text-xs font-black uppercase">{id}</a>
              ))}
            </div>
          )}
        </header>

        {/* Hero — concrete with hard shadow */}
        <section id="top" className="relative overflow-hidden border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,59,48,0.22),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.06),transparent_35%)]" />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 bp-md:grid-cols-2 bp-md:items-center bp-md:py-14">
            <Up className="min-w-0 @container">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#ff3b30] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em]"><Zap className="h-3.5 w-3.5" /> {site.area} · open now</p>
              <h1 className="mt-4 font-display text-[2.6rem] font-black uppercase leading-[0.85] tracking-[-0.02em] break-words bp-md:text-[3.8rem]">Cut<br/><span className="text-[#ff3b30]">clean.</span><br/>Live sharp.</h1>
              <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-white/60">{site.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={bookLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#ff3b30] px-6 py-3 text-xs font-black uppercase text-white hover:bg-white hover:text-[#0a0a0a]">Book on WhatsApp <ArrowRight className="h-4 w-4" /></a>
                <a href="#services" className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-xs font-black uppercase">Prices</a>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs"><Star className="h-3.5 w-3.5 text-[#ff3b30]" /> {site.rating ?? "Trusted"} · {site.reviews ?? "—"} reviews {site.isDemo && <DemoBadge />}</div>
            </Up>
            <Up delay={0.1}>
              <div className="overflow-hidden rounded-2xl border-2 border-white bg-white p-2 shadow-[8px_8px_0_#ff3b30]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <ImageWithFallback src={site.heroImageUrl} alt={site.businessName} className="aspect-[4/3] w-full rounded-xl object-cover" />
                <div className="flex items-center justify-between px-2 pt-3">
                  <span className="rounded-full bg-[#0a0a0a] px-3 py-1 text-xs font-black uppercase text-white">{site.services[0]?.name}</span>
                  <span className="font-black text-[#ff3b30]">{site.services[0]?.price}</span>
                </div>
              </div>
            </Up>
          </div>
        </section>

        {/* Marquee neon */}
        <div className="overflow-hidden border-b-2 border-[#0a0a0a] bg-[#ff3b30] py-2">
          <div className="marquee-track">
            {[0,1].map(n=>(
              <div key={n} className="flex shrink-0 items-center">
                {["Fades","Beards","Line-ups","Kids","Hot towel",site.area].map((t,i)=>(
                  <span key={`${n}-${i}`} className="px-6 font-display text-sm font-black uppercase tracking-[0.12em] text-white">{t} <span className="mx-2">•</span></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Services — hard cards */}
        <section id="services" className="mx-auto max-w-6xl px-5 py-10 bp-md:py-14">
          <Up className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ff3b30]">Menu</p><h2 className="mt-1 font-display text-3xl font-black uppercase tracking-tight">Cuts & shapes</h2></div>
            <a href={bookLink} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#0a0a0a] px-5 py-2 text-xs font-black uppercase text-white">Book</a>
          </Up>
          <div className="mt-6 grid grid-cols-1 gap-3 bp-md:grid-cols-2">
            {site.services.map((s,i)=>(
              <Up key={s.name} delay={i*0.03}>
                <a href={waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book: ${s.name} (${s.price})`)} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-[#0a0a0a] bg-white p-4 shadow-[4px_4px_0_#0a0a0a] hover:translate-y-[-1px]">
                  <div className="min-w-0"><h3 className="font-display text-[15px] font-black uppercase break-words group-hover:text-[#ff3b30]">{s.name}</h3>{s.description && <p className="mt-1 text-xs text-[#0a0a0a]/50">{s.description}</p>}</div>
                  <span className="shrink-0 rounded-full bg-[#ff3b30] px-3 py-1.5 font-black text-white">{s.price}</span>
                </a>
              </Up>
            ))}
          </div>
        </section>

        {/* Gallery — horizontal snap on mobile, grid on desktop */}
        <section id="gallery" className="border-y-2 border-[#0a0a0a] bg-white">
          <div className="mx-auto max-w-6xl px-5 py-10 bp-md:py-14">
            <Up className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ff3b30]">Shop</p><h2 className="font-display text-2xl font-black uppercase">{site.galleryHeading ?? "Concrete & clippers"}</h2></div><SocialRow site={site} iconClassName="text-[#0a0a0a]/40" /></Up>
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory bp-md:grid bp-md:grid-cols-3 bp-md:gap-4 bp-md:overflow-visible">
              {gallery.map((url,i)=>(
                <Up key={`${url}-${i}`} delay={i*0.04} className="shrink-0 snap-center">
                  <div className="w-[76vw] max-w-[320px] overflow-hidden rounded-2xl border-2 border-[#0a0a0a] bg-[#f4f4f5] bp-md:w-auto bp-md:max-w-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <ImageWithFallback src={url} alt={`${site.businessName} ${i + 1}`} className="aspect-[4/3] w-full object-cover" />
                  </div>
                </Up>
              ))}
            </div>
            <p className="mt-3 text-center text-xs font-bold uppercase tracking-wide text-[#0a0a0a]/40 bp-md:hidden">Swipe →</p>
          </div>
        </section>

        {site.isDemo && site.reviewItems ? (
          <section className="bg-[#0a0a0a] text-white">
            <div className="mx-auto max-w-6xl px-5 py-10 bp-md:py-14">
              <Up className="text-center"><p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ff3b30]">Reviews</p><h2 className="mt-2 font-display text-2xl font-black uppercase">{site.reviewHeading}</h2><DemoBadge className="mt-3 bg-white text-[#0a0a0a]" /></Up>
              <div className="mt-6 grid grid-cols-1 gap-4 bp-md:grid-cols-3">
                {site.reviewItems.map((r,i)=>(
                  <Up key={r.name} delay={i*0.08}><figure className="rounded-2xl border-2 border-white bg-white p-5 text-[#0a0a0a]"><div className="mb-2 flex gap-1">{Array.from({length:5}).map((_,s)=><Star key={s} className="h-3 w-3 fill-[#ff3b30] text-[#ff3b30]" />)}</div><blockquote className="font-serif text-[15px] break-words">“{r.quote}”</blockquote><figcaption className="mt-3 text-[10px] font-black uppercase tracking-wide text-[#0a0a0a]/40">{r.name} — DEMO</figcaption></figure></Up>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-[#0a0a0a] py-10 text-center text-white"><div className="mx-auto max-w-xl px-5"><Up><p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ff3b30]">Good work</p><h2 className="mt-2 font-display font-black uppercase">No fake reviews</h2><p className="mt-3 text-sm text-white/60">Prices above are real. Ask on WhatsApp for availability.</p><a href={waLink(site.whatsapp, `Hi ${site.businessName}!`)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-[#ff3b30] px-6 py-3 text-xs font-black uppercase text-white">Ask</a></Up></div></section>
        )}

        <section id="visit" className="bg-[#f4f4f5]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-10 bp-md:grid-cols-2 bp-md:py-14">
            <Up className="@container min-w-0"><p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ff3b30]">Find us</p><h2 className="mt-2 break-words font-display text-2xl font-black uppercase">{site.area}</h2>
              <div className="mt-4 space-y-3 text-sm">
                <p className="flex gap-2 break-words"><Clock className="h-4 w-4 shrink-0 text-[#ff3b30]" /> {site.hours}</p>
                <p className="flex gap-2 break-words"><Phone className="h-4 w-4 shrink-0 text-[#ff3b30]" /> {displayPhone(site.whatsapp)}</p>
                <p className="flex gap-2 break-words"><MapPin className="h-4 w-4 shrink-0 text-[#ff3b30]" /> {site.area}</p>
              </div>
            </Up>
            <Up delay={0.06}><div className="rounded-2xl border-2 border-[#0a0a0a] bg-[#0a0a0a] p-8 text-center text-white shadow-[6px_6px_0_#ff3b30]"><p className="font-display text-xl font-black uppercase">Pull up.</p><p className="mt-2 text-sm text-white/60">WhatsApp to book — we reply fast.</p><a href={bookLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ff3b30] px-6 py-3 text-xs font-black uppercase text-white">Book <ArrowRight className="h-4 w-4" /></a></div></Up>
          </div>
        </section>

        <footer className="border-t-2 border-[#0a0a0a] bg-white px-5 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-[#0a0a0a] font-display text-sm font-black text-white">{site.businessName.slice(0,2)}</span><span className="break-words font-display font-black uppercase">{site.businessName}</span></div>
            <SocialRow site={site} iconClassName="text-[#0a0a0a]/30" />
            <p className="text-[11px] font-black uppercase tracking-wide text-[#0a0a0a]/30">MzansiSite</p>
          </div>
        </footer>
      </div>
    </>
  );
}
