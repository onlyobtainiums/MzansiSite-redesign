/**
 * PRAXIS — gallery-first portfolio design.
 * The photos do the talking: a featured frame, then a loose masonry grid.
 * Includes a genuinely useful empty state for when no photos exist yet.
 * Clean white gallery, one electric accent.
 */
import { ArrowDownRight, ImagePlus, Images, MessageCircle, Phone } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { TemplateProps } from '../../types';
import { SmartImage } from '../../components/SmartImage';
import { SamplePill, WhatsAppAction, defaultEnquiry } from '../../components/kit';
import { telLink } from '../../lib/utils';

const ACCENT = '#2e4bff';
const ASPECTS = ['aspect-[4/5]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-square'];

export default function PraxisTemplate({ business: b, logo, photos, onEditRequest }: TemplateProps) {
  const name = b.name || 'Your Barbershop';
  const [featured, ...rest] = photos;
  const hasOnlySamples = photos.length > 0 && photos.every((p) => p.sample);

  return (
    <div className="@container bg-[#faf9f6] font-praxis text-[#121212]">
      {/* ------------------------------------------------ slim header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#121212]/10 bg-[#faf9f6]/90 px-5 py-4 backdrop-blur @md:px-10">
        <p className="flex items-center gap-3 text-sm font-semibold tracking-tight">
          {logo && <img src={logo} alt="" className="h-7 w-7 rounded-full object-cover" />}
          {name}
        </p>
        <div className="flex items-center gap-4 text-[12px] font-medium">
          <a href="#praxis-work" className="hidden hover:underline @sm:inline">Work</a>
          <a href="#praxis-details" className="hidden hover:underline @sm:inline">Details</a>
          {b.phone && (
            <a href={telLink(b.phone)} className="grid h-9 w-9 place-items-center rounded-full border border-[#121212]/20" aria-label="Call the shop">
              <Phone className="h-4 w-4" />
            </a>
          )}
        </div>
      </header>

      {/* ------------------------------------------------ intro */}
      <section className="px-5 pb-8 pt-12 @md:px-10 @md:pt-16">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
          Portfolio · {name}
        </p>
        <h1 className="max-w-[18ch] text-[clamp(1.9rem,5cqw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
          The work tells you everything. Look closely, then come sit.
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#121212]/65">
          {b.tagline || 'Add your one-liner in the editor.'}
        </p>
        {hasOnlySamples && (
          <button
            type="button"
            onClick={() => onEditRequest?.('media')}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-dashed border-[#121212]/35 px-4 py-2 text-[12px] font-semibold text-[#121212]/70 transition-colors hover:border-[#2e4bff] hover:text-[#2e4bff]"
          >
            <Images className="h-3.5 w-3.5" /> These are sample photos — upload your own to replace them
          </button>
        )}
      </section>

      {/* ------------------------------------------------ featured frame */}
      {featured && (
        <figure className="px-5 @md:px-10">
          <SmartImage src={featured.src} alt={featured.alt} eager className="aspect-[16/10] w-full rounded-xl @md:aspect-[21/10]" />
          <figcaption className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#121212]/55">
            <span style={{ color: ACCENT }}>Featured</span>
            <span>{featured.alt}</span>
            {featured.sample && <SamplePill label="Sample photo" />}
          </figcaption>
        </figure>
      )}

      {/* ------------------------------------------------ the grid */}
      <section id="praxis-work" className="px-5 py-12 @md:px-10 @md:py-16">
        {photos.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-[#121212]/25 bg-white px-6 py-16 text-center @md:py-24">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full" style={{ background: `${ACCENT}14`, color: ACCENT }}>
              <ImagePlus className="h-6 w-6" aria-hidden />
            </span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">Your work goes here.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#121212]/60">
              This design is built around your photographs: fades, chairs, tools, the shop itself.
              Add up to six photos in the free preview — more once you publish.
            </p>
            <button
              type="button"
              onClick={() => onEditRequest?.('media')}
              className="mt-6 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: ACCENT }}
            >
              Open photo uploads
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-lg font-semibold tracking-tight">Selected frames</h2>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#121212]/50">
                {photos.length} / 6 preview slots
              </p>
            </div>
            <div className="columns-2 gap-4 @md:columns-3">
              {rest.map((p, i) => (
                <figure key={p.id} className="mb-4 break-inside-avoid">
                  <SmartImage src={p.src} alt={p.alt} className={cn('w-full rounded-lg', ASPECTS[i % ASPECTS.length])} />
                  <figcaption className="mt-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#121212]/50">
                    <ArrowDownRight className="h-3 w-3 shrink-0" style={{ color: ACCENT }} />
                    <span className="truncate">{p.alt}</span>
                    {p.sample && <span className="ml-auto shrink-0 rounded-full border border-[#121212]/15 px-1.5 py-0.5 text-[9px]">Sample</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        )}
      </section>

      {/* ------------------------------------------------ services as captions */}
      <section className="border-t border-[#121212]/10 px-5 py-12 @md:px-10">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <h2 className="text-[clamp(1.4rem,3cqw,2rem)] font-semibold tracking-tight">Behind those frames</h2>
          <SamplePill label="Sample prices" />
        </div>
        <ul className="grid gap-x-12 @md:grid-cols-2 @lg:grid-cols-3">
          {b.services.map((s) => (
            <li key={s.id} className="border-b border-[#121212]/10 py-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[14px] font-semibold">{s.name}</p>
                <p className="text-[14px] font-semibold" style={{ color: ACCENT }}>{s.price}</p>
              </div>
              {s.description && <p className="mt-1 text-[12.5px] leading-relaxed text-[#121212]/55">{s.description}</p>}
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------ details strip */}
      <section id="praxis-details" className="border-t border-[#121212]/10 bg-white px-5 py-10 @md:px-10">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6 text-sm">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#121212]/45">Hours</p>
            <p className="mt-1 font-medium">
              {b.hours.map((h) => `${h.label}: ${h.value}`).join('  ·  ') || 'Add opening hours'}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#121212]/45">Where</p>
            <p className="mt-1 font-medium">{b.address || 'Add your address'}{b.area ? `, ${b.area}` : ''}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#121212]/10 pt-8">
          <p className="text-lg font-semibold tracking-tight">Like what you see? Enquire first — we confirm by reply.</p>
          <WhatsAppAction
            whatsapp={b.whatsapp}
            message={defaultEnquiry(name)}
            iconClassName="h-4 w-4"
            className="rounded-full bg-[#2e4bff] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            label="Enquire on WhatsApp"
          />
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 px-5 py-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[#121212]/45 @md:px-10">
        <span className="flex items-center gap-2"><MessageCircle className="h-3.5 w-3.5" style={{ color: ACCENT }} />{name}</span>
        <span>Design: Praxis · MzansiSite demo</span>
      </footer>
    </div>
  );
}
