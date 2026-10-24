"use client";

import { ArrowRight, Award, Clock, MapPin, Menu, Phone, Scissors, ShieldCheck, Sparkles, Star, X } from "lucide-react";
import { useState } from "react";
import type { SiteData } from "../../types";
import { displayPhone, waLink } from "../../types";
import { DemoBadge, LogoBlock, SocialRow, WhatsAppFab } from "../../shared";
import { Up } from "../../Reveal";

/* Velvet Barber Variant 1 — Executive (charcoal + brass) — Phase 3 preserved as default */
export default function BarberVariant1({ site }: { site: SiteData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gallery = site.galleryUrls.slice(0, 6);
  const bookLink = waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to make a booking.`);

  return (
    <>
      <WhatsAppFab site={site} accent="#b58a3a" />
      <div className="@container/page min-h-screen bg-[#fdf8f2] font-sans text-[#0f1113]">
        <div className="bg-[#0f1113] px-4 py-2 text-center text-[11px] font-medium tracking-[0.22em] text-[#fdf8f2]/80 uppercase">
          <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#c9a25a]" /> {site.hours}</span>
            <span className="hidden h-3 w-px bg-[#fdf8f2]/20 bp-sm:block" aria-hidden />
            <span className="hidden bp-sm:inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#c9a25a]" /> {site.area}</span>
            <span className="hidden h-3 w-px bg-[#fdf8f2]/20 bp-sm:block" aria-hidden />
            <span className="inline-flex items-center gap-1.5 text-[#c9a25a]"><Scissors className="h-3.5 w-3.5" /> Walk-ins welcome</span>
          </span>
        </div>
        <header className="sticky top-0 z-40 border-b border-[#0f1113] bg-[#fdf8f2]/95 backdrop-blur-md">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <LogoBlock site={site} className="shrink-0 rounded-full border-2 border-[#0f1113] bg-[#0f1113] font-display text-[#c9a25a]" />
              <span className="font-display break-words text-[15px] font-extrabold tracking-[0.08em] uppercase bp-md:text-lg">{site.businessName}</span>
            </a>
            <div className="hidden items-center gap-7 text-[11px] font-bold tracking-[0.18em] uppercase bp-md:flex">
              <a href="#services" className="text-[#0f1113]/60 hover:text-[#0f1113]">Cuts</a>
              <a href="#story" className="text-[#0f1113]/60 hover:text-[#0f1113]">The chair</a>
              <a href="#gallery" className="text-[#0f1113]/60 hover:text-[#0f1113]">Shop</a>
              <a href="#visit" className="text-[#0f1113]/60 hover:text-[#0f1113]">Visit</a>
            </div>
            <div className="flex items-center gap-3">
              <a href={bookLink} target="_blank" rel="noopener noreferrer" className="hidden rounded-full border-2 border-[#0f1113] bg-[#0f1113] px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] text-[#fdf8f2] uppercase hover:bg-[#b58a3a] hover:border-[#b58a3a] bp-sm:block">Book on WhatsApp</a>
              <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#0f1113] bg-[#fdf8f2] bp-md:hidden" aria-label="Menu">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
            </div>
          </nav>
          {menuOpen && (
            <div className="border-t border-[#0f1113] bg-[#fdf8f2] px-5 py-4 bp-md:hidden">
              {[["services","Cuts"],["story","The chair"],["gallery","Shop"],["visit","Visit"]].map(([id,label]) => (
                <a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)} className="block py-2.5 text-sm font-bold tracking-[0.16em] uppercase text-[#0f1113]/70">{label}</a>
              ))}
            </div>
          )}
        </header>

        <section id="top" className="relative overflow-hidden bg-[#0f1113] text-[#fdf8f2]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 top-0 h-[560px] w-[560px] rounded-full bg-[#c9a25a]/[0.07] blur-3xl" />
            <div className="absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#fdf8f2]/[0.04] blur-2xl" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9a25a]/40 to-transparent" aria-hidden />
          </div>
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-14 pt-12 bp-md:grid-cols-[1.05fr_0.95fr] bp-md:gap-12 bp-md:pb-16 bp-md:pt-16">
            <div className="relative z-10 min-w-0 @container">
              <Up><p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fdf8f2]/15 bg-[#fdf8f2]/5 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[#c9a25a] uppercase backdrop-blur"><MapPin className="h-3.5 w-3.5" /> {site.area} · {site.hours.split("·")[0].trim()}</p></Up>
              <Up delay={0.06}><h1 className="font-display text-[min(2.8rem,calc(100cqw/7.2))] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] break-words bp-md:text-[min(4.2rem,calc(100cqw/7.2))]">Stay <span className="text-[#c9a25a]">sharp.</span><br />Stay respected.</h1><div className="mt-4 h-1.5 w-16 bg-[#c9a25a]" aria-hidden /></Up>
              <Up delay={0.14}><p className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-[#fdf8f2]/70">{site.tagline}</p></Up>
              <Up delay={0.2}><div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={bookLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 rounded-full bg-[#c9a25a] px-7 py-3.5 font-display text-[13px] font-bold tracking-[0.14em] text-[#0f1113] uppercase shadow-[0_10px_24px_-10px_rgba(201,162,90,0.8)] hover:-translate-y-0.5 hover:bg-[#b58a3a]">Book on WhatsApp <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5" /></a>
                <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-[#fdf8f2]/20 px-6 py-3 text-[11px] font-bold tracking-[0.16em] uppercase text-[#fdf8f2] hover:bg-[#fdf8f2] hover:text-[#0f1113]">See prices</a>
              </div></Up>
              <Up delay={0.26}><div className="mt-7 flex flex-wrap items-center gap-3 text-[11px] font-semibold tracking-wide text-[#fdf8f2]/60">
                {site.isDemo && site.rating ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fdf8f2]/10 bg-[#fdf8f2]/5 px-3 py-1.5"><Star className="h-3.5 w-3.5 fill-[#c9a25a] text-[#c9a25a]" /> {site.rating} · {site.reviews} reviews <DemoBadge /></span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#fdf8f2]/10 bg-[#fdf8f2]/5 px-3 py-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#c9a25a]" /> Licensed · Walk-ins welcome</span>
                )}
                <span className="hidden h-3 w-px bg-[#fdf8f2]/15 bp-sm:block" aria-hidden />
                <span className="text-[#fdf8f2]/45">Mon–Sun · Early to late</span>
              </div></Up>
            </div>
            <Up delay={0.12} className="relative min-w-0">
              <div className="relative mx-auto max-w-[420px]">
                <div className="overflow-hidden rounded-[1.5rem] border-2 border-[#c9a25a]/40 bg-[#1a1d20] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={site.heroImageUrl} alt={site.businessName} className="aspect-[4/5] w-full object-cover" />
                  <div className="flex items-center justify-between gap-3 border-t border-[#c9a25a]/20 bg-[#0f1113] px-4 py-3">
                    <div className="min-w-0"><p className="text-[10px] font-bold tracking-[0.18em] text-[#c9a25a] uppercase">Next chair</p><p className="break-words font-display text-sm font-extrabold text-[#fdf8f2]">{site.services[0]?.name}</p></div>
                    <span className="shrink-0 rounded-full bg-[#c9a25a] px-3 py-1 font-display text-sm font-extrabold text-[#0f1113]">{site.services[0]?.price}</span>
                  </div>
                </div>
                <div className="absolute -right-2 top-6 max-w-[calc(100%+0.5rem)] break-words rounded-xl border-2 border-[#0f1113] bg-[#fdf8f2] px-3.5 py-2 font-display text-sm font-extrabold text-[#0f1113] shadow-[4px_4px_0_rgba(0,0,0,0.2)] bp-md:-right-4">{site.services[2]?.price ?? site.services[0]?.price}</div>
                <div className="absolute -bottom-3 -left-2 flex max-w-[calc(100%+0.5rem)] items-center gap-2 rounded-xl border-2 border-[#0f1113] bg-[#c9a25a] px-3 py-2.5 shadow-[4px_4px_0_rgba(0,0,0,0.2)] bp-md:-left-4">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0f1113] text-[#c9a25a]"><Scissors className="h-4 w-4" /></span>
                  <div className="min-w-0"><p className="text-[9px] font-bold tracking-[0.18em] text-[#0f1113]/70 uppercase">House special</p><p className="break-words font-display text-xs font-extrabold text-[#0f1113]">{site.services[1]?.name ?? "Cut + beard"}</p></div>
                </div>
              </div>
            </Up>
          </div>
          <div className="h-1 bg-[repeating-linear-gradient(90deg,#c9a25a_0_18px,#0f1113_18px_20px,#fdf8f2_20px_38px)] opacity-90" aria-hidden />
        </section>

        <div className="overflow-hidden border-y border-[#0f1113] bg-[#fdf8f2] py-3">
          <div className="marquee-track">
            {[0,1].map(n=>(
              <div key={n} className="flex shrink-0 items-center">
                {["Skin fades","Beard sculpt","Hot towel","Line-up","Kids cuts",site.area].map((t,i)=>(
                  <span key={`${n}-${i}`} className="flex items-center whitespace-nowrap"><span className="px-6 font-display text-[13px] font-extrabold uppercase tracking-[0.1em] text-[#0f1113]">{t}</span><span className="h-1.5 w-1.5 rounded-full bg-[#c9a25a]" aria-hidden /></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section id="services" className="bg-[#fdf8f2]">
          <div className="mx-auto max-w-4xl px-5 py-14 bp-md:py-20">
            <Up className="text-center">
              <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.28em] text-[#b58a3a] uppercase"><span className="h-px w-6 bg-[#b58a3a]" aria-hidden /> The board <span className="h-px w-6 bg-[#b58a3a]" aria-hidden /></p>
              <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight bp-md:text-5xl">Cuts & grooming</h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#0f1113]/60">Published prices. No DM games. WhatsApp to lock in your chair — we reply in minutes.</p>
            </Up>
            <div className="mt-12 space-y-1.5">
              {site.services.map((service,i)=>(
                <Up key={service.name} delay={i*0.04}>
                  <a href={waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to book: ${service.name} (${service.price})`)} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-1 rounded-2xl border border-transparent px-4 py-4 hover:border-[#0f1113]/10 hover:bg-white bp-sm:flex-row bp-sm:items-baseline bp-sm:gap-4">
                    <div className="min-w-0 flex-1"><h3 className="font-display text-[17px] font-extrabold uppercase tracking-[0.02em] break-words group-hover:text-[#b58a3a] bp-md:text-lg">{service.name}</h3>{service.description && <p className="mt-0.5 text-xs font-medium text-[#0f1113]/45">{service.description}</p>}</div>
                    <span className="mx-2 hidden flex-1 border-b border-dotted border-[#0f1113]/25 bp-sm:block" aria-hidden />
                    <span className="font-display text-lg font-extrabold text-[#b58a3a] bp-md:text-xl">{service.price}</span>
                    <span className="hidden rounded-full border border-[#b58a3a]/40 bg-[#fdf8f2] px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#b58a3a] uppercase opacity-0 group-hover:opacity-100 bp-sm:block">Book</span>
                  </a>
                </Up>
              ))}
            </div>
            <Up delay={0.2}><div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href={bookLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#0f1113] bg-[#0f1113] px-7 py-3.5 text-[13px] font-bold tracking-[0.14em] text-[#fdf8f2] uppercase hover:bg-[#c9a25a] hover:border-[#c9a25a] hover:text-[#0f1113]"><Phone className="h-4 w-4" /> Book on WhatsApp</a>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0f1113]/15 bg-white px-4 py-3 text-xs font-bold tracking-[0.14em] text-[#0f1113]/60 uppercase"><ShieldCheck className="h-4 w-4 text-[#b58a3a]" /> Clean tools · Every time</span>
            </div></Up>
          </div>
        </section>

        <section id="story" className="border-y border-[#0f1113] bg-[#0f1113] text-[#fdf8f2]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-14 bp-md:grid-cols-[0.95fr_1.05fr] bp-md:items-center bp-md:py-20">
            <Up>
              <div className="grid grid-cols-2 gap-3">
                {gallery.slice(0,4).map((url,i)=>(
                  <div key={`${url}-${i}`} className={`overflow-hidden rounded-2xl border border-[#fdf8f2]/10 ${i===1||i===3?"mt-6":""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`${site.businessName} tool ${i+1}`} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-[11px] font-medium tracking-[0.14em] text-[#fdf8f2]/40 uppercase">No faces in our shop shots — just tools, chairs and craft.</p>
            </Up>
            <div>
              <Up><p className="mb-3 flex items-center gap-2 text-[11px] font-bold tracking-[0.28em] text-[#c9a25a] uppercase"><Sparkles className="h-4 w-4" /> The chair</p><h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight break-words bp-md:text-4xl">Built for the neighbourhood — <span className="text-[#c9a25a]">sharp every time.</span></h2></Up>
              <Up delay={0.08}><blockquote className="mt-6 border-l-2 border-[#c9a25a] pl-4 font-serif text-[17px] leading-relaxed text-[#fdf8f2]/85 break-words">“{site.aboutQuote ?? "A fresh fade shouldn't cost you an hour of back-and-forth messages."}”</blockquote><p className="mt-6 max-w-[54ch] text-sm leading-relaxed text-[#fdf8f2]/60">{site.businessName} · {site.area}. Every price on the board, every booking on WhatsApp, every fade finished with a clean line-up. {site.tagline} {site.guarantee && `${site.guarantee}`}</p></Up>
              <Up delay={0.14}><div className="mt-8 grid grid-cols-3 gap-6 border-t border-[#fdf8f2]/10 pt-7">
                {[[site.area.split(",")[0]||site.area,"based in"],[site.services.length+" cuts","on the board"],[site.hours.split("·")[0].trim()||site.hours,"hours"]].map(([big,small])=>(
                  <div key={small} className="min-w-0"><p className="break-words font-display text-lg font-extrabold text-[#c9a25a] bp-md:text-xl">{big}</p><p className="mt-1 text-[10px] font-bold tracking-[0.16em] text-[#fdf8f2]/45 uppercase">{small}</p></div>
                ))}
              </div></Up>
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-[#fdf8f2]">
          <div className="mx-auto max-w-6xl px-5 py-14 bp-md:py-20">
            <Up className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
              <div className="@container w-full min-w-0 bp-md:w-auto bp-md:grow"><p className="mb-2 text-[11px] font-bold tracking-[0.28em] text-[#b58a3a] uppercase">Inside the shop</p><h2 className="font-display text-[min(2rem,calc(100cqw/14))] font-extrabold uppercase tracking-tight break-words bp-md:text-[min(3.25rem,calc(100cqw/14))]">{site.galleryHeading ?? "The tools of the trade"}</h2></div>
              <SocialRow site={site} iconClassName="text-[#0f1113]/40" />
            </Up>
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bp-md:grid bp-md:grid-cols-3 bp-md:gap-4 bp-md:overflow-visible bp-md:pb-0">
              {gallery.map((url,i)=>(
                <Up key={`${url}-${i}`} delay={i*0.04} className={`shrink-0 snap-center ${i===1||i===4?"bp-md:mt-6":""}`}>
                  <div className="w-[78vw] max-w-[320px] overflow-hidden rounded-2xl border-2 border-[#0f1113] bg-white bp-md:w-auto bp-md:max-w-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`${site.businessName} shop ${i+1}`} className="aspect-[4/3] w-full object-cover hover:scale-[1.02] duration-700" loading="lazy" />
                  </div>
                </Up>
              ))}
            </div>
            <p className="mt-3 text-center text-xs font-medium text-[#0f1113]/40 bp-md:hidden">Swipe to see more →</p>
            <Up delay={0.12}><div className="mt-10 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-[#0f1113]/10 bg-white p-5 bp-md:p-6">
              <Award className="h-5 w-5 text-[#b58a3a]" /><p className="text-center text-sm font-semibold text-[#0f1113]/70">Licensed barbers · Clean, disinfected tools every cut · Card & cash welcome</p>
              {site.isDemo && site.guarantee && <span className="rounded-full bg-[#0f1113] px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-[#fdf8f2] uppercase">{site.guarantee}</span>}
            </div></Up>
          </div>
        </section>

        {site.isDemo && site.reviewItems ? (
          <section id="reviews" className="border-y border-[#0f1113] bg-[#c9a25a] text-[#0f1113]">
            <div className="mx-auto max-w-6xl px-5 py-14 bp-md:py-20">
              <Up className="mb-8 text-center @container"><p className="mb-3 text-[11px] font-bold tracking-[0.28em] text-[#0f1113]/60 uppercase">From the chair</p><h2 className="font-display text-[min(2.2rem,calc(100cqw/7.5))] font-extrabold uppercase tracking-tight break-words bp-md:text-[min(3rem,calc(100cqw/7.5))]">{site.reviewHeading}</h2><DemoBadge className="mt-3 bg-[#0f1113] text-[#fdf8f2]" /></Up>
              <div className="grid grid-cols-1 gap-4 bp-md:grid-cols-3">
                {site.reviewItems.map((r,i)=>(
                  <Up key={r.name} delay={i*0.08}><figure className="flex h-full flex-col rounded-2xl border-2 border-[#0f1113] bg-[#fdf8f2] p-6 shadow-[4px_4px_0_#0f1113]"><div className="mb-3 flex gap-1">{Array.from({length:5}).map((_,s)=><Star key={s} className="h-3.5 w-3.5 fill-[#b58a3a] text-[#b58a3a]" />)}</div><blockquote className="flex-1 font-serif text-[16px] leading-snug break-words">“{r.quote}”</blockquote><figcaption className="mt-4 text-[11px] font-bold tracking-[0.16em] text-[#0f1113]/45 uppercase">{r.name} — DEMO</figcaption></figure></Up>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section id="reviews" className="border-y border-[#0f1113] bg-[#efe8da] py-14 bp-md:py-16">
            <div className="mx-auto max-w-3xl px-5 text-center"><Up><p className="mb-3 text-[11px] font-bold tracking-[0.28em] text-[#b58a3a] uppercase">What to expect</p><h2 className="font-display text-2xl font-extrabold uppercase tracking-tight break-words bp-md:text-3xl">Clear prices · Honest work</h2><p className="mt-4 text-sm leading-relaxed text-[#0f1113]/60">Prices are on the board above. WhatsApp us for availability — most cuts are booked within the week. We don&apos;t publish invented reviews; ask us for references.</p><a href={waLink(site.whatsapp, `Hi ${site.businessName}! I'd like to ask about your cuts.`)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0f1113] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#fdf8f2]">Ask on WhatsApp</a></Up></div>
          </section>
        )}

        <section id="visit" className="bg-[#fdf8f2]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-14 bp-md:grid-cols-2 bp-md:py-20">
            <Up className="@container min-w-0"><p className="mb-3 text-[11px] font-bold tracking-[0.28em] text-[#b58a3a] uppercase">Find the shop</p><h2 className="break-words font-display text-[min(2.1rem,calc(100cqw/18))] font-extrabold uppercase tracking-tight">{site.area}</h2>
              <div className="mt-7 space-y-5">
                <div className="flex items-center gap-4 border-b border-[#0f1113]/10 pb-5"><Clock className="h-5 w-5 text-[#b58a3a]" /><div className="min-w-0"><p className="text-[10px] font-bold tracking-[0.18em] text-[#0f1113]/40 uppercase">Hours</p><p className="break-words font-medium">{site.hours}</p></div></div>
                <div className="flex items-center gap-4 border-b border-[#0f1113]/10 pb-5"><Phone className="h-5 w-5 text-[#b58a3a]" /><div className="min-w-0"><p className="text-[10px] font-bold tracking-[0.18em] text-[#0f1113]/40 uppercase">Call / WhatsApp</p><p className="break-words font-medium">{displayPhone(site.whatsapp)}</p></div></div>
                <div className="flex items-center gap-4"><MapPin className="h-5 w-5 text-[#b58a3a]" /><div className="min-w-0"><p className="text-[10px] font-bold tracking-[0.18em] text-[#0f1113]/40 uppercase">Find us</p><p className="break-words font-medium">{site.area}</p></div></div>
              </div>
            </Up>
            <Up delay={0.1}><div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-[1.5rem] border-2 border-[#0f1113] bg-[#0f1113] p-8 text-center text-[#fdf8f2] shadow-[8px_8px_0_#0f1113] bp-md:p-10"><p className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight break-words bp-md:text-4xl">Walk in or book ahead.</p><p className="mt-4 max-w-xs text-sm leading-relaxed text-[#fdf8f2]/60">One WhatsApp message secures your chair — we confirm your time in minutes, every day.</p><a href={bookLink} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-[#c9a25a] px-7 py-3.5 text-[13px] font-bold tracking-[0.14em] text-[#0f1113] uppercase hover:-translate-y-0.5 hover:bg-[#b58a3a]">Book on WhatsApp <ArrowRight className="h-4 w-4" /></a></div></Up>
          </div>
        </section>

        <footer className="border-t-2 border-[#0f1113] bg-[#0f1113] px-5 py-10 text-[#fdf8f2]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 bp-md:flex-row">
            <div className="flex flex-wrap items-center gap-3"><LogoBlock site={site} className="rounded-full border border-[#c9a25a]/40 bg-[#fdf8f2] font-display text-[#0f1113]" /><span className="min-w-0 break-words font-display text-lg font-extrabold uppercase tracking-[0.06em]">{site.businessName}</span></div>
            <SocialRow site={site} iconClassName="text-[#fdf8f2]/50" />
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#fdf8f2]/40 uppercase">Powered by <span className="text-[#c9a25a]">MzansiSite</span></p>
          </div>
        </footer>
      </div>
    </>
  );
}
