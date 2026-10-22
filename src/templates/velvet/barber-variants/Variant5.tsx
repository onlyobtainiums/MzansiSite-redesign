"use client";

import { ArrowRight, Clock, MapPin, Menu, Phone, ShieldCheck, Star, X, Sparkles } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../../types";
import { displayPhone, waLink } from "../../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../../shared";
import { Up } from "../../Reveal";

/* Velvet Barber Variant 5 — Studio (light & glass) — airy, modern studio with blue accent */
export default function BarberVariant5({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const bookLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book.`);

  return (
    <>
      <WhatsAppFab site={site} accent="#0ea5e9" />
      <div className="@container/page min-h-screen bg-[#f8fafc] font-sans text-[#0f172a]">
        <div className="bg-white border-b border-[#0f172a]/10 px-4 py-2 text-center text-[11px] tracking-[0.18em] uppercase text-[#0f172a]/50"><Clock className="mr-1.5 inline h-3 w-3 text-[#0ea5e9]" /> {site.hours} · {site.area}</div>

        <header className="sticky top-0 z-40 border-b border-[#0f172a]/10 bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 rounded-full bg-[#0ea5e9] text-white border border-[#0ea5e9]" />
              <span className="truncate font-display text-[15px] font-extrabold tracking-tight">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-6 text-xs font-semibold tracking-[0.14em] uppercase text-[#0f172a]/60 bp-md:flex">
              <a href="#services" className="hover:text-[#0ea5e9]">Services</a>
              <a href="#gallery" className="hover:text-[#0ea5e9]">Studio</a>
              <a href="#visit" className="hover:text-[#0ea5e9]">Visit</a>
            </div>
            <div className="flex items-center gap-2">
              <a href={bookLink} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-[#0ea5e9] px-5 py-2.5 text-xs font-bold tracking-[0.14em] uppercase text-white hover:bg-[#0284c7] bp-sm:block">Book</a>
              <button onClick={()=>setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-full border border-[#0f172a]/10 bg-white bp-md:hidden" aria-label="Menu">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#0f172a]/10 bg-white px-5 py-4 bp-md:hidden">
              {["services","gallery","visit"].map(id=> (
                <a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)} className="block py-2 text-xs font-semibold uppercase tracking-wide text-[#0f172a]/70">{id}</a>
              ))}
            </div>
          )}
        </header>

        {/* Hero — image left, text right (swaps on mobile) */}
        <section id="top" className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 bp-md:grid-cols-2 bp-md:items-center bp-md:py-14">
          <Up className="order-2 bp-md:order-1 min-w-0 @container">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#0ea5e9]/10 px-3 py-1 text-[11px] font-bold tracking-[0.16em] uppercase text-[#0ea5e9]"><Sparkles className="h-3.5 w-3.5" /> Modern studio · {site.area}</p>
            <h1 className="mt-4 font-display text-[2.4rem] font-extrabold leading-[0.9] tracking-tight break-words bp-md:text-[3.4rem]">Sharp<br/>work.<br/><span className="text-[#0ea5e9]">Soft light.</span></h1>
            <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-[#0f172a]/60">{site.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={bookLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-6 py-3 text-xs font-bold tracking-[0.14em] uppercase text-white hover:bg-[#0ea5e9]">Book on WhatsApp <ArrowRight className="h-4 w-4" /></a>
              <a href="#services" className="inline-flex items-center rounded-full border border-[#0f172a]/15 bg-white px-6 py-3 text-xs font-bold tracking-[0.14em] uppercase">Prices</a>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-[#0f172a]/50">
              <span className="rounded-full border border-[#0f172a]/10 bg-white px-3 py-1">{site.services.length} services</span>
              <span className="rounded-full bg-[#0ea5e9] px-3 py-1 font-bold text-white">Walk-ins welcome</span>
            </div>
          </Up>
          <Up delay={0.08} className="order-1 bp-md:order-2">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-[#0f172a]/10 bg-white p-2 shadow-[0_20px_40px_-16px_rgba(14,165,233,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.heroImageUrl} alt={site.businessName} className="aspect-[4/5] w-full rounded-[1.1rem] object-cover" />
              <div className="absolute bottom-4 left-4 max-w-[70%] rounded-xl border border-[#0f172a]/10 bg-white/95 px-3 py-2 backdrop-blur">
                <p className="text-[10px] tracking-[0.14em] uppercase text-[#0ea5e9]">Next chair</p>
                <p className="truncate font-semibold text-sm">{site.services[0]?.name} · {site.services[0]?.price}</p>
              </div>
            </div>
          </Up>
        </section>

        {/* Services — grid cards with soft shadows */}
        <section id="services" className="bg-white border-y border-[#0f172a]/10">
          <div className="mx-auto max-w-6xl px-5 py-12 bp-md:py-16">
            <Up className="text-center"><p className="text-[11px] tracking-[0.28em] uppercase text-[#0ea5e9]">Menu</p><h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Cuts & care</h2><p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#0f172a]/60">Clean prices — WhatsApp to secure a chair.</p></Up>
            <div className="mt-8 grid grid-cols-1 gap-4 bp-md:grid-cols-3">
              {site.services.map((s,i)=>(
                <Up key={s.name} delay={i*0.04}>
                  <a href={waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book: ${s.name} (${s.price})`)} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-2xl border border-[#0f172a]/10 bg-[#f8fafc] p-5 hover:border-[#0ea5e9]/30 hover:bg-white">
                    <h3 className="font-display text-[15px] font-extrabold break-words group-hover:text-[#0ea5e9]">{s.name}</h3>
                    {s.description && <p className="mt-2 text-xs leading-relaxed text-[#0f172a]/50">{s.description}</p>}
                    <div className="mt-auto pt-4 flex items-center justify-between"><span className="text-lg font-extrabold text-[#0ea5e9]">{s.price}</span><span className="rounded-full border border-[#0ea5e9]/20 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0ea5e9]">Book</span></div>
                  </a>
                </Up>
              ))}
            </div>
          </div>
        </section>

        {/* Story — light */}
        <section className="mx-auto max-w-6xl grid grid-cols-1 gap-8 px-5 py-12 bp-md:grid-cols-2 bp-md:items-center bp-md:py-16">
          <Up className="overflow-hidden rounded-2xl border border-[#0f172a]/10 bg-white p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery[1] ?? site.heroImageUrl} alt={`${site.businessName} work`} className="aspect-[4/3] w-full rounded-xl object-cover" loading="lazy" />
          </Up>
          <div>
            <Up><p className="text-[11px] tracking-[0.28em] uppercase text-[#0ea5e9]">The studio</p><h2 className="mt-2 font-display text-2xl font-extrabold leading-tight">Light, calm, precise.</h2></Up>
            <Up delay={0.06}><blockquote className="mt-4 font-serif text-lg leading-relaxed break-words text-[#0f172a]/80">“{site.aboutQuote ?? "A good cut is quiet confidence."}”</blockquote><p className="mt-4 text-sm leading-relaxed text-[#0f172a]/60">{site.businessName} · {site.area}. {site.tagline}</p></Up>
            <Up delay={0.12}><div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#0f172a]/10 pt-5">
              {[[site.area.split(",")[0]||site.area,"based"],[site.services.length+" services","menu"],[site.hours.split("·")[0].trim()||site.hours,"hours"]].map(([b,s])=>(
                <div key={s} className="min-w-0"><p className="break-words font-semibold text-[#0ea5e9]">{b}</p><p className="text-[10px] tracking-wide uppercase text-[#0f172a]/40">{s}</p></div>
              ))}
            </div></Up>
          </div>
        </section>

        {/* Gallery — airy */}
        <section id="gallery" className="border-y border-[#0f172a]/10 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-12 bp-md:py-16">
            <Up className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] tracking-[0.28em] uppercase text-[#0ea5e9]">Space</p><h2 className="mt-1 font-display text-2xl font-extrabold">{site.galleryHeading ?? "Light & craft"}</h2></div><SocialRow site={site} iconClassName="text-[#0f172a]/30" /></Up>
            <div className="grid grid-cols-2 gap-3 bp-md:grid-cols-3 bp-md:gap-4">
              {gallery.map((url,i)=>(
                <Up key={`${url}-${i}`} delay={i*0.04}><div className="overflow-hidden rounded-2xl border border-[#0f172a]/10 bg-[#f8fafc]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`${site.businessName} ${i+1}`} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                </div></Up>
              ))}
            </div>
          </div>
        </section>

        {site.isDemo && site.reviewItems ? (
          <section className="bg-[#f1f5f9]">
            <div className="mx-auto max-w-6xl px-5 py-12 bp-md:py-14">
              <Up className="text-center"><p className="text-[11px] tracking-[0.28em] uppercase text-[#0ea5e9]">From clients</p><h2 className="mt-2 font-display text-2xl font-extrabold">{site.reviewHeading}</h2><DemoBadge className="mt-3" /></Up>
              <div className="mt-6 grid grid-cols-1 gap-4 bp-md:grid-cols-3">
                {site.reviewItems.map((r,i)=>(
                  <Up key={r.name} delay={i*0.08}><figure className="rounded-2xl border border-[#0f172a]/10 bg-white p-6"><div className="mb-2 flex gap-1">{Array.from({length:5}).map((_,s)=><Star key={s} className="h-3 w-3 fill-[#0ea5e9] text-[#0ea5e9]" />)}</div><blockquote className="font-serif text-[15px] break-words">“{r.quote}”</blockquote><figcaption className="mt-3 text-[11px] uppercase tracking-wide text-[#0f172a]/40">{r.name} — DEMO</figcaption></figure></Up>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-[#f1f5f9] py-12 text-center"><div className="mx-auto max-w-xl px-5"><Up><p className="text-[11px] tracking-[0.28em] uppercase text-[#0ea5e9]">No fluff</p><h2 className="mt-2 font-display font-extrabold">Honest work</h2><p className="mt-3 text-sm text-[#0f172a]/60">Prices above. Ask on WhatsApp.</p><a href={waLink(site.whatsapp, `Hi ${site.businessName}!`)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-[#0ea5e9] px-6 py-3 text-xs uppercase tracking-wide text-white">Ask</a></Up></div></section>
        )}

        <section id="visit" className="bg-white border-t border-[#0f172a]/10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-12 bp-md:grid-cols-2">
            <Up className="@container min-w-0"><p className="text-[11px] tracking-[0.28em] uppercase text-[#0ea5e9]">Visit</p><h2 className="mt-2 break-words font-display text-2xl font-extrabold">{site.area}</h2>
              <div className="mt-5 space-y-3 text-sm">
                <p className="flex gap-2 break-words"><Clock className="h-4 w-4 shrink-0 text-[#0ea5e9]" /> {site.hours}</p>
                <p className="flex gap-2 break-words"><Phone className="h-4 w-4 shrink-0 text-[#0ea5e9]" /> {displayPhone(site.whatsapp)}</p>
                <p className="flex gap-2 break-words"><MapPin className="h-4 w-4 shrink-0 text-[#0ea5e9]" /> {site.area}</p>
              </div>
            </Up>
            <Up delay={0.08}><div className="rounded-2xl border border-[#0ea5e9]/20 bg-[#f0f9ff] p-8 text-center"><p className="font-display text-xl font-extrabold">Walk in or book</p><p className="mt-2 text-sm text-[#0f172a]/60">One WhatsApp secures your chair.</p><a href={bookLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0ea5e9] px-6 py-3 text-xs font-bold uppercase text-white">Book <ArrowRight className="h-4 w-4" /></a></div></Up>
          </div>
        </section>

        <footer className="border-t border-[#0f172a]/10 bg-white px-5 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3"><LogoBlock site={site} className="rounded-full bg-[#0ea5e9] text-white" /><span className="break-words font-display font-extrabold">{site.businessName}</span></div>
            <SocialRow site={site} iconClassName="text-[#0f172a]/30" />
            <p className="text-[11px] uppercase tracking-wide text-[#0f172a]/30">Powered by MzansiSite</p>
          </div>
        </footer>
      </div>
    </>
  );
}
