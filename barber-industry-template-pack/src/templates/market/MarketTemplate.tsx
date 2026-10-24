/**
 * MARKET — about-first design.
 * The story is the homepage: chaptered narrative with a drop cap,
 * then services, then where & when. Kraft paper, ink green, slab serif.
 * Story fields are editable; fallbacks are friendly, never fake.
 */
import { ArrowRight, BookOpen, Clock, MapPin, MessageCircle, PenLine, Phone, Mail } from 'lucide-react';
import type { TemplateProps } from '../../types';
import { SmartImage } from '../../components/SmartImage';
import { BrandMark, SamplePill, WhatsAppAction, defaultEnquiry } from '../../components/kit';
import { mailLink, paragraphs, telLink } from '../../lib/utils';

const GREEN = '#1f3d2b';
const TOMATO = '#d9501e';

export default function MarketTemplate({ business: b, logo, photos, onEditRequest }: TemplateProps) {
  const name = b.name || 'Your Barbershop';
  const paras = paragraphs(b.description);
  const picture = photos[6] ?? photos[2] ?? photos[0];

  return (
    <div className="@container bg-[#fbf6ea] font-market-sans text-[#1f3d2b]">
      {/* ------------------------------------------------ masthead */}
      <header className="border-b border-[#1f3d2b]/15 px-5 py-6 @md:px-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandMark logo={logo} name={name} className="h-11 w-11 rounded-lg text-xs" />
            <div className="leading-tight">
              <p className="font-market text-xl font-semibold">{name}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1f3d2b]/60">{b.area || 'Your area'}</p>
            </div>
          </div>
          <WhatsAppAction
            whatsapp={b.whatsapp}
            message={defaultEnquiry(name)}
            className="rounded-lg bg-[#1f3d2b] px-5 py-2.5 text-sm font-semibold text-[#fbf6ea] transition-transform hover:-translate-y-0.5"
            iconClassName="h-4 w-4"
            label="Say hello"
          />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 @md:px-10">
        {/* ------------------------------------------------ story hero */}
        <section className="border-b border-dashed border-[#1f3d2b]/25 py-12 @md:py-16">
          <p className="mb-4 inline-flex items-center gap-2 rounded-md px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white" style={{ background: TOMATO }}>
            <BookOpen className="h-3.5 w-3.5" aria-hidden /> Our story, first
          </p>
          <h1 className="font-market text-[clamp(2rem,5.6cqw,4.2rem)] font-semibold leading-[1.04]">
            {b.tagline || 'Every barbershop has a story. This one starts with yours.'}
          </h1>
          <p className="mt-5 max-w-[58ch] text-[15px] leading-relaxed text-[#1f3d2b]/75">
            {name} — {b.area || 'your area'}. Scroll our chapters: who we are, what we do at the chair,
            and exactly where and when to find us.
          </p>
        </section>

        {/* ------------------------------------------------ chapter 01 */}
        <section className="grid gap-10 border-b border-dashed border-[#1f3d2b]/25 py-12 @md:py-16 @lg:grid-cols-[auto_1fr]">
          <ChapterNo n="01" label="Who we are" />
          <div>
            {paras.length === 0 ? (
              <button
                type="button"
                onClick={() => onEditRequest?.('business')}
                className="w-full rounded-xl border-2 border-dashed border-[#1f3d2b]/30 bg-white/60 px-6 py-12 text-left"
              >
                <p className="flex items-center gap-2 font-market text-xl font-semibold" style={{ color: TOMATO }}>
                  <PenLine className="h-5 w-5" /> Tell your story here
                </p>
                <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-[#1f3d2b]/70">
                  Where did the shop start? What do regulars know you for? What should a first-time
                  client expect? Add it in the editor — this space is reserved for the real thing.
                </p>
              </button>
            ) : (
              <>
                <p className="font-market text-[clamp(1.35rem,3.2cqw,2rem)] font-medium leading-snug">
                  <span className="float-left mr-3 mt-1 font-market text-[3.4em] font-semibold leading-[0.8]" style={{ color: TOMATO }}>
                    {paras[0].charAt(0)}
                  </span>
                  {paras[0].slice(1)}
                </p>
                {paras.slice(1).map((p, i) => (
                  <p key={i} className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-[#1f3d2b]/80">{p}</p>
                ))}
                <SamplePill label="Sample story — edit in 'Business'" className="mt-5" />
              </>
            )}
          </div>
        </section>

        {/* ------------------------------------------------ interlude photo */}
        {picture && (
          <figure className="border-b border-dashed border-[#1f3d2b]/25 py-10">
            <SmartImage src={picture.src} alt={picture.alt} className="aspect-[21/9] w-full rounded-xl border border-[#1f3d2b]/20" />
            <figcaption className="mt-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1f3d2b]/55">
              {picture.alt} {picture.sample && <SamplePill label="Sample photo" />}
            </figcaption>
          </figure>
        )}

        {/* ------------------------------------------------ chapter 02 */}
        <section className="grid gap-10 border-b border-dashed border-[#1f3d2b]/25 py-12 @md:py-16 @lg:grid-cols-[auto_1fr]">
          <ChapterNo n="02" label="What we do" />
          <div>
            <div className="mb-6 flex items-center gap-3">
              <p className="text-sm text-[#1f3d2b]/70">Everything below is what keeps our chairs busy:</p>
              <SamplePill label="Sample prices" />
            </div>
            <ul className="overflow-hidden rounded-xl border border-[#1f3d2b]/20 bg-white/70">
              {b.services.map((s, i) => (
                <li key={s.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-dashed border-[#1f3d2b]/15 px-5 py-4 last:border-0">
                  <span className="font-market text-lg font-semibold tabular-nums" style={{ color: TOMATO }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1">
                    <span className="font-market text-lg font-semibold">{s.name}</span>
                    {s.description && <span className="block text-[13px] text-[#1f3d2b]/65">{s.description}</span>}
                  </span>
                  <span className="font-market text-lg font-semibold">{s.price}</span>
                </li>
              ))}
              {b.services.length === 0 && (
                <li className="px-5 py-10 text-center text-sm text-[#1f3d2b]/60">
                  No services yet — add your menu in the editor.
                </li>
              )}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------ chapter 03 */}
        <section className="grid gap-10 py-12 @md:py-16 @lg:grid-cols-[auto_1fr]">
          <ChapterNo n="03" label="Find us" />
          <div className="grid gap-5 @md:grid-cols-2">
            {/* hand-drawn style map card */}
            <div className="relative overflow-hidden rounded-xl border border-[#1f3d2b]/25 bg-[#f3ecd8] p-5">
              <svg aria-hidden className="absolute inset-0 h-full w-full text-[#1f3d2b]/10" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0 20 H100 M0 55 H100 M0 85 H100 M25 0 V100 M60 0 V100 M85 0 V100" stroke="currentColor" strokeWidth="0.6" fill="none" />
                <path d="M25 55 Q45 40 60 55 T100 45" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
              <div className="relative">
                <p className="flex items-center gap-2 font-market text-xl font-semibold"><MapPin className="h-5 w-5" style={{ color: TOMATO }} />{b.address || 'Add your address'}</p>
                <p className="mt-1 text-sm font-semibold text-[#1f3d2b]/70">{b.area || 'Your area'}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.address} ${b.area}`)}`}
                  target="_blank" rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white"
                  style={{ background: GREEN }}
                >
                  Open in Maps <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            {/* hours + contact */}
            <div className="rounded-xl border border-[#1f3d2b]/25 bg-white/70 p-5">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1f3d2b]/60">
                <Clock className="h-3.5 w-3.5" /> Shop hours
              </p>
              <ul className="space-y-2.5">
                {b.hours.map((h) => (
                  <li key={h.id} className="flex justify-between gap-4 text-sm">
                    <span className="font-semibold">{h.label}</span>
                    <span>{h.value}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 border-t border-dashed border-[#1f3d2b]/20 pt-4 text-sm">
                {b.phone && <a href={telLink(b.phone)} className="flex items-center gap-2 font-semibold hover:underline"><Phone className="h-3.5 w-3.5" /> {b.phone}</a>}
                {b.email && <a href={mailLink(b.email)} className="flex items-center gap-2 font-semibold hover:underline"><Mail className="h-3.5 w-3.5" /> {b.email}</a>}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ closing note */}
        <section className="mb-14 rounded-xl px-6 py-10 text-center text-[#fbf6ea] @md:px-12" style={{ background: GREEN }}>
          <p className="font-market text-[clamp(1.5rem,3.6cqw,2.4rem)] font-semibold leading-snug">
            “{b.tagline || 'Walk in a stranger, leave a regular.'}”
          </p>
          <WhatsAppAction
            whatsapp={b.whatsapp}
            message={defaultEnquiry(name)}
            className="mt-6 rounded-lg bg-[#fbf6ea] px-7 py-3 text-sm font-semibold text-[#1f3d2b] transition-transform hover:-translate-y-0.5"
            iconClassName="h-4 w-4"
            label="Start with a message"
          />
          <p className="mt-4 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#fbf6ea]/60">
            <MessageCircle className="h-3.5 w-3.5" /> Enquiries answered during shop hours
          </p>
        </section>
      </main>

      <footer className="border-t border-[#1f3d2b]/15 px-5 py-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1f3d2b]/50">
        {name} · Design: Market · MzansiSite demo — story and prices are samples until edited
      </footer>
    </div>
  );
}

function ChapterNo({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex flex-row items-center gap-4 @lg:w-44 @lg:flex-col @lg:items-start @lg:gap-1">
      <span className="font-market text-[clamp(2.4rem,5cqw,4rem)] font-semibold leading-none" style={{ color: TOMATO }}>{n}</span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1f3d2b]/60">{label}</span>
    </div>
  );
}
