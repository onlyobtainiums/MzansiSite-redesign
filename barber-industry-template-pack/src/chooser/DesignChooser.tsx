/**
 * The MzansiSite design selector.
 *
 * • Auto-rotates through all six families every 6.5s (with progress bar)
 * • Prev / next, six named direct-selection buttons, play / pause
 * • Pauses on hover, focus, touch — and never restarts on its own after a
 *   manual choice. Rotation is fully off under prefers-reduced-motion.
 * • Each slide is a LIVE render of the real template (scaled down), fed by
 *   the current preview content — so any edits already made show up here too.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, BadgeCheck, MousePointerClick, Pause, Play,
  PencilLine, Rocket, Scissors, ShieldCheck,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { TEMPLATES } from '../templates/registry';
import { useStudio } from '../state/StudioContext';

const DURATION = 6500;
const STAGE_W = 1280;
const STAGE_H = 880;

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export default function DesignChooser() {
  const { openStudio, business, logo, photos, rotationPaused, setRotationPaused } = useStudio();
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [userPlay, setUserPlay] = useState(!rotationPaused);
  const [inspectPause, setInspectPause] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const playing = userPlay && !inspectPause && !reduced;
  const active = TEMPLATES[index];

  const goTo = useCallback((i: number, manual = true) => {
    setIndex(((i % TEMPLATES.length) + TEMPLATES.length) % TEMPLATES.length);
    if (manual) {
      // interacting with a design pauses auto-rotation until resumed
      setUserPlay(false);
      setRotationPaused(true);
    }
  }, [setRotationPaused]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % TEMPLATES.length), DURATION);
    return () => window.clearInterval(id);
  }, [playing, index]);

  // keyboard arrows when focus is anywhere in the carousel region
  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [index, goTo]);

  return (
    <div className="min-h-screen bg-[#17130d] font-['Inter'] text-[#f5f1e8]">
      {/* ------------------------------------------------ brand bar */}
      <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 md:px-10">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#b9662a] text-[#17130d]">
            <Scissors className="h-5 w-5" aria-hidden />
          </span>
          <div className="leading-tight">
            <p className="text-[15px] font-bold tracking-tight">MzansiSite Studio</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#f5f1e8]/50">Barber Template Pack · 6 designs</p>
          </div>
        </div>
        <button
          onClick={() => openStudio(active.id)}
          className="rounded-full bg-[#f5f1e8] px-5 py-2.5 text-[13px] font-bold text-[#17130d] transition-transform hover:-translate-y-0.5"
        >
          Personalise this design →
        </button>
      </header>

      {/* ------------------------------------------------ intro */}
      <section className="mx-auto max-w-7xl px-5 pt-2 md:px-10">
        <h1 className="font-velvet max-w-3xl text-[clamp(1.9rem,4.4vw,3.4rem)] font-light leading-[1.06]">
          Six ways to put your barbershop online.
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#f5f1e8]/65">
          Every design is a real, working website — not a mockup. Pick one, add your details and photos
          in a free preview, and only pay when you&apos;re ready to publish. Switching designs keeps everything you&apos;ve typed.
        </p>
      </section>

      {/* ------------------------------------------------ carousel */}
      <div
        ref={regionRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Barber website designs"
        className="mx-auto max-w-7xl px-5 pb-6 pt-8 outline-none md:px-10"
        tabIndex={-1}
      >
        <div
          className="relative overflow-hidden rounded-2xl border border-[#f5f1e8]/12 bg-[#0f0c08] shadow-2xl"
          onMouseEnter={() => setInspectPause(true)}
          onMouseLeave={() => setInspectPause(false)}
          onFocusCapture={() => setInspectPause(true)}
          onBlurCapture={() => setInspectPause(false)}
          onPointerDown={() => { setUserPlay(false); setRotationPaused(true); }}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(.7,0,.3,1)] motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {TEMPLATES.map((t, i) => (
              <div key={t.id} className="w-full shrink-0" aria-hidden={i !== index}>
                <ScaledStage>
                  <t.component business={business} logo={logo} photos={photos} />
                </ScaledStage>
              </div>
            ))}
          </div>

          {/* fade + label overlays */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0f0c08] to-transparent" />
          <p className="pointer-events-none absolute right-4 top-4 rounded-full bg-[#17130d]/85 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f5f1e8]/80 backdrop-blur">
            {active.strategy}
          </p>
          <span className="sr-only" aria-live="polite">
            Showing design {index + 1} of {TEMPLATES.length}: {active.name}
          </span>
        </div>

        {/* ------------------------------------------------ controls */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="flex gap-2">
            <ControlBtn label="Previous design" onClick={() => goTo(index - 1)}>
              <ArrowLeft className="h-4 w-4" />
            </ControlBtn>
            <ControlBtn label="Next design" onClick={() => goTo(index + 1)}>
              <ArrowRight className="h-4 w-4" />
            </ControlBtn>
            {reduced ? (
              <span className="ml-1 self-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f5f1e8]/45">
                Auto-rotation off · reduced motion
              </span>
            ) : (
              <ControlBtn
                label={userPlay ? 'Pause auto-rotation' : 'Resume auto-rotation'}
                onClick={() => { setUserPlay(!userPlay); setRotationPaused(userPlay); }}
              >
                {userPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </ControlBtn>
            )}
          </div>

          <div className="flex flex-1 flex-wrap gap-2" role="tablist" aria-label="Designs">
            {TEMPLATES.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === index}
                onClick={() => goTo(i)}
                className={cn(
                  'relative overflow-hidden rounded-full border px-4 py-2 text-[12px] font-bold tracking-wide transition-colors',
                  i === index
                    ? 'border-[#b9662a] bg-[#b9662a]/15 text-[#f5f1e8]'
                    : 'border-[#f5f1e8]/20 text-[#f5f1e8]/60 hover:border-[#f5f1e8]/50 hover:text-[#f5f1e8]',
                )}
              >
                <span className="relative z-10">{i + 1} · {t.name}</span>
                {i === index && playing && (
                  <span
                    key={index}
                    className="mz-progress-run absolute inset-y-0 left-0 bg-[#b9662a]/25"
                    style={{ animationDuration: `${DURATION}ms` }}
                    aria-hidden
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------ active design card */}
        <div key={active.id} className="mz-fade-in mt-6 grid items-center gap-6 rounded-2xl border border-[#f5f1e8]/12 bg-[#f5f1e8]/[0.04] p-6 md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-velvet text-3xl font-light">{active.name}</h2>
              <span className="rounded-full border border-[#b9662a]/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b9662a]">
                {active.strategy}
              </span>
              <span className="flex gap-1.5" aria-label="Palette">
                {active.chips.map((c) => (
                  <span key={c} className="h-4 w-4 rounded-full border border-white/20" style={{ background: c }} />
                ))}
              </span>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#f5f1e8]/65">{active.blurb}</p>
          </div>
          <button
            onClick={() => openStudio(active.id)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b9662a] px-7 py-4 text-sm font-bold text-[#17130d] transition-transform hover:-translate-y-0.5"
          >
            <MousePointerClick className="h-4 w-4" aria-hidden />
            Preview &amp; personalise {active.name}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------ how it works */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-4 md:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: MousePointerClick, t: '1 · Pick a design', d: 'Rotate through all six, or jump straight to one. Hover or touch pauses the rotation — it never pulls you away.' },
            { icon: PencilLine, t: '2 · Personalise free', d: 'Add your name, services, prices, WhatsApp number, logo and up to six photos. Changes are live but temporary — nothing is saved yet.' },
            { icon: Rocket, t: '3 · Subscribe to publish', d: 'A verified MzansiSite subscription unlocks the full editor — more photos per your plan — and publishing. Payments stay on the platform.' },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl border border-[#f5f1e8]/12 bg-[#f5f1e8]/[0.04] p-6">
              <s.icon className="h-5 w-5 text-[#b9662a]" aria-hidden />
              <h3 className="mt-3 text-[15px] font-bold">{s.t}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#f5f1e8]/60">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-start gap-4 rounded-2xl border border-[#b9662a]/30 bg-[#b9662a]/10 p-5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#b9662a]" aria-hidden />
          <div className="text-[13px] leading-relaxed text-[#f5f1e8]/75">
            <p className="font-bold text-[#f5f1e8]">Honesty, built in.</p>
            <p>
              All business details, prices and photos in these demos are <strong>sample content</strong>, clearly labelled.
              The designs never invent reviews, ratings, years of experience, awards or credentials — and a WhatsApp
              enquiry is never presented as a confirmed booking.
            </p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#17130d] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#b9662a]">
            <BadgeCheck className="h-3.5 w-3.5" /> Barber pack v1
          </span>
        </div>
      </section>
    </div>
  );
}

function ControlBtn({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full border border-[#f5f1e8]/25 text-[#f5f1e8]/80 transition-colors hover:border-[#b9662a] hover:text-[#b9662a]"
    >
      {children}
    </button>
  );
}

/** Renders children at a fixed 1280px stage, scaled to fit the available width. */
function ScaledStage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / STAGE_W));
    ro.observe(el);
    setScale(el.clientWidth / STAGE_W);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height: STAGE_H * scale }} aria-hidden inert>
      <div
        className="pointer-events-none absolute left-0 top-0 origin-top-left select-none"
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
      >
        <div style={{ width: STAGE_W, height: STAGE_H, overflow: 'hidden' }}>{children}</div>
      </div>
    </div>
  );
}
