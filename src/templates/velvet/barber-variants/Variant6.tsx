"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Star, X } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../../types";
import { displayPhone, waLink } from "../../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../../shared";
import { Up } from "../../Reveal";
import { ImageWithFallback } from "../../forge/variants/shared/ImageWithFallback";

/* Velvet Barber Variant 6 — Bold (black & gold) — maximal, proud, loud */
export default function BarberVariant6({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const bookLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book.`);

  return (
    <>
      <WhatsAppFab site={site} accent="#facc15" />
      <div className="@container/page min-h-screen bg-[#0a0a0a] font-sans text-[#fafafa]">
        <div className="bg-[#facc15] px-4 py-2 text-center text-[11px] font-black tracking-[0.2em] uppercase text-[#0a0a0a]">Bold cuts · {site.hours} · {site.area} · GOLD STANDARD</div>

        <header className="sticky top-0 z-40 border-b-2 border-[#facc15] bg-[#0a0a0a]/90 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#facc15] font-display text-sm font-black text-[#0a0a0a]">{site.businessName.slice(0,1)}</span>
              <span className="truncate font-display text-[16px] font-black uppercase tracking-[0.08em] text-[#facc15]">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-6 text-xs font-black tracking-[0.14em] uppercase text-white/70 bp-md:flex">
              <a href="#services" className="hover:text-[#facc15]">Menu</a>
              <a href="#gallery" className="hover:text-[#facc15]">Gallery</a>
              <a href="#visit" className="hover:text-[#facc15]">Visit</a>
            </div>
            <div className="flex items-center gap-2">
              <a href={bookLink} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-[#facc15] px-6 py-2.5 text-xs font-black uppercase text-[#0a0a0a] hover:bg-white bp-sm:block">Book now</a>
              <button onClick={()=>setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#facc15] bg-[#0a0a0a] text-[#facc15] bp-md:hidden" aria-label="Menu">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t-2 border-[#facc15] bg-[#0a0a0a] px-5 py-4 bp-md:hidden">
              {["services","gallery","visit"].map(id=> (
                <a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)} className="block py-2 text-xs font-black uppercase tracking-wide text-white/70">{id}</a>
              ))}
            </div>
          )}
        </header>

        {/* Hero — full bleed big type */}
        <section id="top" className="relative overflow-hidden border-b-2 border-[#facc15] bg-[#0a0a0a] text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(250,204,21,0.18),transparent_45%)]" />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-12 bp-md:grid-cols-[1.1fr_0.9fr] bp-md:items-center bp-md:py-16">
            <Up className="min-w-0 @container">
              <p className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.2em] uppercase text-[#facc15]">— {site.area} — GOLD</p>
              <h1 className="mt-3 font-display text-[2.8rem] font-black uppercase leading-[0.85] tracking-[-0.03em] break-words bp-md:text-[4rem]">We<br/>don’t<br/><span className="text-[#facc15]">play.</span></h1>
              <div className="mt-4 h-1 w-20 bg-[#facc15]" aria-hidden />
              <p className="mt-5 max-w-[44ch] text-sm leading-relaxed text-white/60">{site.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={bookLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#facc15] px-7 py-3.5 text-xs font-black uppercase text-[#0a0a0a] hover:bg-white">Book on WhatsApp <ArrowRight className="h-4 w-4" /></a>
                <a href="#services" className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-xs font-black uppercase">Prices</a>
              </div>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#facc15]/30 bg-[#facc15]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#facc15]">Walk-ins welcome · Every day</div>
            </Up>
            <Up delay={0.1}>
              <div className="relative overflow-hidden rounded-[1.5rem] border-2 border-[#facc15] bg-[#111] p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <ImageWithFallback src={site.heroImageUrl} alt={site.businessName} className="aspect-[4/5] w-full rounded-[1.1rem] object-cover" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 rounded-xl bg-[#facc15] px-4 py-3 text-[#0a0a0a]">
                  <span className="font-display text-sm font-black uppercase">{site.services[0]?.name}</span>
                  <span className="rounded-full bg-[#0a0a0a] px-3 py-1 text-sm font-black text-[#facc15]">{site.services[0]?.price}</span>
                </div>
              </div>
            </Up>
          </div>
        </section>

        {/* Services — bold stacked blocks */}
        <section id="services" className="bg-[#0a0a0a]">
          <div className="mx-auto max-w-6xl px-5 py-12 bp-md:py-16">
            <Up className="text-center"><p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#facc15]">The price is the price</p><h2 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-white bp-md:text-4xl">Cuts & finishes</h2></Up>
            <div className="mt-8 space-y-3">
              {site.services.map((s,i)=>(
                <Up key={s.name} delay={i*0.04}>
                  <a href={waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book: ${s.name} (${s.price})`)} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-3 rounded-2xl border-2 border-white/10 bg-white/[0.06] p-5 hover:border-[#facc15]/50 bp-sm:flex-row bp-sm:items-center bp-sm:justify-between">
                    <div className="min-w-0"><h3 className="font-display text-[16px] font-black uppercase tracking-tight text-white break-words group-hover:text-[#facc15]">{s.name}</h3>{s.description && <p className="mt-1 text-xs text-white/50">{s.description}</p>}</div>
                    <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#facc15] px-4 py-2 font-black text-[#0a0a0a] bp-sm:shrink-0">{s.price} <ArrowRight className="h-3.5 w-3.5" /></span>
                  </a>
                </Up>
              ))}
            </div>
          </div>
        </section>

        {/* Statement */}
        <section className="border-y-2 border-[#facc15] bg-[#facc15] text-[#0a0a0a]">
          <div className="mx-auto max-w-6xl px-5 py-10 text-center bp-md:py-14">
            <Up><p className="text-[11px] font-black uppercase tracking-[0.2em]">Why we last</p><blockquote className="mx-auto mt-3 max-w-3xl font-display text-2xl font-black uppercase leading-tight break-words bp-md:text-3xl">“{site.aboutQuote ?? "Real prices. Real skill. No stories."}”</blockquote><p className="mx-auto mt-4 max-w-xl text-sm font-medium">{site.businessName} · {site.area}. {site.tagline}</p></Up>
            <Up delay={0.1}><div className="mt-6 grid grid-cols-3 gap-4 border-t-2 border-[#0a0a0a]/10 pt-5">
              {[[site.area.split(",")[0]||site.area,"based"],[site.services.length+" cuts","board"],[site.hours.split("·")[0].trim()||site.hours,"hours"]].map(([b,s])=>(
                <div key={s} className="min-w-0"><p className="break-words font-display font-black">{b}</p><p className="text-[10px] font-black uppercase tracking-wide text-[#0a0a0a]/60">{s}</p></div>
              ))}
            </div></Up>
          </div>
        </section>

        {/* Gallery — offset */}
        <section id="gallery" className="bg-[#0a0a0a]">
          <div className="mx-auto max-w-6xl px-5 py-12 bp-md:py-16">
            <Up className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#facc15]">Inside</p><h2 className="font-display text-2xl font-black uppercase text-white">{site.galleryHeading ?? "Built bold"}</h2></div><SocialRow site={site} iconClassName="text-white/40" /></Up>
            <div className="grid grid-cols-2 gap-3 bp-md:grid-cols-3 bp-md:gap-4">
              {gallery.map((url,i)=>(
                <Up key={`${url}-${i}`} delay={i*0.05}><div className={`overflow-hidden rounded-2xl border-2 ${i%2===0?"border-[#facc15]":"border-white/10"} bg-[#111]`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <ImageWithFallback src={url} alt={`${site.businessName} ${i + 1}`} className="aspect-[4/3] w-full object-cover" />
                </div></Up>
              ))}
            </div>
          </div>
        </section>

        {site.isDemo && site.reviewItems ? (
          <section className="border-y-2 border-[#facc15] bg-[#111]">
            <div className="mx-auto max-w-6xl px-5 py-12 bp-md:py-14">
              <Up className="text-center"><p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#facc15]">Reviews</p><h2 className="mt-2 font-display text-2xl font-black uppercase text-white">{site.reviewHeading}</h2><DemoBadge className="mt-3 bg-[#facc15] text-[#0a0a0a]" /></Up>
              <div className="mt-6 grid grid-cols-1 gap-4 bp-md:grid-cols-3">
                {site.reviewItems.map((r,i)=>(
                  <Up key={r.name} delay={i*0.08}><figure className="rounded-2xl border-2 border-[#facc15] bg-white p-6"><div className="mb-2 flex gap-1">{Array.from({length:5}).map((_,s)=><Star key={s} className="h-3 w-3 fill-[#facc15] text-[#facc15]" />)}</div><blockquote className="font-serif text-[15px] text-[#0a0a0a] break-words">“{r.quote}”</blockquote><figcaption className="mt-3 text-[11px] font-black uppercase text-[#0a0a0a]/40">{r.name} — DEMO</figcaption></figure></Up>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="border-y-2 border-[#facc15] bg-[#111] py-12 text-center text-white"><div className="mx-auto max-w-xl px-5"><Up><p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#facc15]">Straight up</p><h2 className="mt-2 font-display font-black uppercase">No fake reviews</h2><p className="mt-3 text-sm text-white/60">Prices above are real. WhatsApp for availability.</p><a href={waLink(site.whatsapp, `Hi ${site.businessName}!`)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-[#facc15] px-6 py-3 text-xs font-black uppercase text-[#0a0a0a]">Ask</a></Up></div></section>
        )}

        <section id="visit" className="bg-white text-[#0a0a0a]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-12 bp-md:grid-cols-2 bp-md:py-16">
            <Up className="@container min-w-0"><p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0a0a0a]/40">Visit</p><h2 className="mt-2 break-words font-display text-2xl font-black uppercase">{site.area}</h2>
              <div className="mt-5 space-y-3 text-sm">
                <p className="flex gap-2 break-words"><Clock className="h-4 w-4 shrink-0" /> {site.hours}</p>
                <p className="flex gap-2 break-words"><Phone className="h-4 w-4 shrink-0" /> {displayPhone(site.whatsapp)}</p>
                <p className="flex gap-2 break-words"><MapPin className="h-4 w-4 shrink-0" /> {site.area}</p>
              </div>
            </Up>
            <Up delay={0.08}><div className="rounded-2xl bg-[#0a0a0a] p-8 text-center text-white"><p className="font-display text-xl font-black uppercase">Walk in or book.</p><p className="mt-2 text-sm text-white/60">One WhatsApp secures your chair.</p><a href={bookLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#facc15] px-6 py-3 text-xs font-black uppercase text-[#0a0a0a]">Book <ArrowRight className="h-4 w-4" /></a></div></Up>
          </div>
        </section>

        <footer className="border-t-2 border-[#0a0a0a] bg-[#0a0a0a] px-5 py-8 text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3"><LogoBlock site={site} className="rounded-full bg-[#facc15] text-[#0a0a0a]" /><span className="break-words font-display font-black uppercase tracking-tight text-[#facc15]">{site.businessName}</span></div>
            <SocialRow site={site} iconClassName="text-white/40" />
            <p className="text-[11px] font-black uppercase tracking-wide text-white/30">MzansiSite · R149.99</p>
          </div>
        </footer>
      </div>
    </>
  );
}
