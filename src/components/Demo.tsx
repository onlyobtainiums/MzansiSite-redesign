"use client";

import { Globe, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import Reveal, { RiseWords } from "./Reveal";
import TemplatePhonePreview from "./TemplatePhonePreview";
import { TEMPLATES } from "@/templates/registry";
import { demoIndustriesForTemplate } from "@/templates/demo-data";
import { industryLabel } from "@/templates/industries";

const DEMO_TEMPLATES = TEMPLATES.filter((t) => t.status === "live");

// Gentle auto-cycle intervals (spec: ~3–4s, resume after 8–10s)
const AUTO_INTERVAL = 3500;
const RESUME_DELAY = 9000;

// Fixed industry set for the Website Examples section — matches the 5 tabs
// shown in the screenshot / spec. Using a single global list keeps the
// selectors stable while cycling demonstrates every design × industry combo
// via the existing fallback in getDemoSiteData (no new template systems).
const DEMO_INDUSTRIES = demoIndustriesForTemplate("velvet"); // hairSalon, barber, spa, eventPlanner, florist

export default function Demo() {
  const [templateIdx, setTemplateIdx] = useState(0);
  const [industryIdx, setIndustryIdx] = useState(0);

  const template = DEMO_TEMPLATES[templateIdx];
  const industries = DEMO_INDUSTRIES;
  const industry = industries[industryIdx] ?? industries[0];

  // Interaction pause state
  const [isPausedByInteraction, setIsPausedByInteraction] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Visibility / reduced-motion state
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Refs to avoid stale closures in interval
  const templateIdxRef = useRef(templateIdx);
  const industryIdxRef = useRef(industryIdx);
  useEffect(() => { templateIdxRef.current = templateIdx; }, [templateIdx]);
  useEffect(() => { industryIdxRef.current = industryIdx; }, [industryIdx]);

  // ── Respect reduced-motion preference (disables auto cycling) ──
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ── Pause when browser tab is hidden ──
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const pauseForInteraction = useCallback(() => {
    setIsPausedByInteraction(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPausedByInteraction(false);
    }, RESUME_DELAY);
  }, []);

  const switchTemplate = useCallback((idx: number) => {
    setTemplateIdx(idx);
    pauseForInteraction();
  }, [pauseForInteraction]);

  const selectIndustry = useCallback((idx: number) => {
    setIndustryIdx(idx);
    setTemplateIdx(0);
    pauseForInteraction();
  }, [pauseForInteraction]);

  // ── Automatic cycling ──
  // INVERTED: show each different DESIGN for each INDUSTRY
  // Inner loop = designs, outer loop = industries.
  // e.g. HairSalon: Velvet → Forge → Savanna → Praxis → Market → Vital → Barber: Velvet → Forge → ...
  useEffect(() => {
    // Respect reduced-motion, hidden tab, and user interaction pause
    if (prefersReducedMotion || !isTabVisible || isPausedByInteraction) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Use gentle interval ~3.5s
    intervalRef.current = setInterval(() => {
      const curTemplateIdx = templateIdxRef.current;
      const nextTemplate = curTemplateIdx + 1;
      if (nextTemplate < DEMO_TEMPLATES.length) {
        setTemplateIdx(nextTemplate);
      } else {
        // Design wrapped — advance to next industry and reset design
        setTemplateIdx(0);
        setIndustryIdx((prev) => (prev + 1) % DEMO_INDUSTRIES.length);
      }
    }, AUTO_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [prefersReducedMotion, isTabVisible, isPausedByInteraction]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const isAutoActive = !prefersReducedMotion && isTabVisible && !isPausedByInteraction;

  return (
    <section id="demo" className="relative overflow-hidden bg-bone-deep py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-12 text-center md:mb-16">
          <Reveal>
            <p className="mb-6 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-flame">
              <span className="h-px w-10 bg-flame" /> Website examples <span className="h-px w-10 bg-flame" />
            </p>
          </Reveal>
          <h2 className="mx-auto max-w-4xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl">
            <RiseWords text="See what your" />{" "}
            <span className="serif-i normal-case text-flame">
              <RiseWords text="customers" delay={0.15} />
            </span>{" "}
            <RiseWords text="will open." delay={0.28} />
          </h2>
        </div>

        {/* Auto-cycle status cue — subtle, not flashy */}
        <div className="mb-4 flex items-center justify-center gap-2" aria-live="polite" aria-atomic="true">
          <span
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
              isAutoActive
                ? "border-ink/10 bg-white text-ink/60"
                : "border-amber-300 bg-amber-50 text-amber-800"
            }`}
          >
            {isAutoActive ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-40"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-flame"></span>
                </span>
                Auto-rotating
              </>
            ) : prefersReducedMotion ? (
              <>
                <Pause className="h-3 w-3" /> Paused — reduced motion
              </>
            ) : !isTabVisible ? (
              <>
                <Pause className="h-3 w-3" /> Paused — tab hidden
              </>
            ) : (
              <>
                <Pause className="h-3 w-3" /> Paused — click to explore
              </>
            )}
          </span>
          {/* Manual resume hint when paused by interaction */}
          {isPausedByInteraction && !prefersReducedMotion && isTabVisible && (
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/40 sm:inline">
              Resumes in {Math.round(RESUME_DELAY / 1000)}s
            </span>
          )}
        </div>

        {/* Template tabs — design selector */}
        <Reveal delay={0.1}>
          <div
            className="mb-3 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Design templates"
          >
            {DEMO_TEMPLATES.map((t, i) => {
              const isActive = templateIdx === i;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="demo-preview"
                  tabIndex={0}
                  onClick={() => switchTemplate(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      e.preventDefault();
                      const next = (i + 1) % DEMO_TEMPLATES.length;
                      (e.currentTarget.parentElement?.children[next] as HTMLElement)?.focus();
                    }
                    if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      const prev = (i - 1 + DEMO_TEMPLATES.length) % DEMO_TEMPLATES.length;
                      (e.currentTarget.parentElement?.children[prev] as HTMLElement)?.focus();
                    }
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      switchTemplate(i);
                    }
                  }}
                  className={`group relative flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 cursor-pointer ${
                    isActive
                      ? "border-ink bg-ink text-bone shadow-[4px_4px_0_#ff4d00]"
                      : "border-ink/15 bg-transparent text-ink/70 hover:border-ink hover:text-ink hover:bg-white/50"
                  }`}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.accent }} aria-hidden />
                  {t.name}
                  {/* Subtle progress line for active tab when auto-cycling */}
                  {isActive && isAutoActive && !prefersReducedMotion && (
                    <span
                      key={`progress-design-${template.id}-${industry}`}
                      className="pointer-events-none absolute inset-x-3 -bottom-[2px] h-[2px] origin-left overflow-hidden rounded-full bg-flame/20"
                      aria-hidden
                    >
                      <span
                        className="absolute inset-0 bg-flame"
                        style={{
                          animation: `demo-progress ${AUTO_INTERVAL}ms linear forwards`,
                        }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {/* Helper text — makes clickability obvious without relying on animation */}
          <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
            Click a design to preview it instantly — auto-cycles every {AUTO_INTERVAL / 1000}s
          </p>
        </Reveal>

        {/* Industry switcher */}
        <Reveal delay={0.15}>
          <div
            className="mb-6 flex flex-wrap justify-center gap-1.5"
            role="tablist"
            aria-label="Industry examples"
          >
            {industries.map((key, i) => {
              const isActive = industryIdx === i;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="demo-preview"
                  tabIndex={0}
                  onClick={() => selectIndustry(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      e.preventDefault();
                      const next = (i + 1) % industries.length;
                      (e.currentTarget.parentElement?.children[next] as HTMLElement)?.focus();
                    }
                    if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      const prev = (i - 1 + industries.length) % industries.length;
                      (e.currentTarget.parentElement?.children[prev] as HTMLElement)?.focus();
                    }
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      selectIndustry(i);
                    }
                  }}
                  className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 cursor-pointer ${
                    isActive
                      ? "border-flame bg-flame text-bone shadow-sm"
                      : "border-ink/12 text-ink/50 hover:border-ink hover:text-ink hover:bg-white"
                  }`}
                >
                  {industryLabel(key)}
                </button>
              );
            })}
          </div>
          <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
            Try an industry — preview updates immediately
          </p>
          {/* Global progress bar */}
          <div className="mx-auto mb-8 h-[2px] w-full max-w-md overflow-hidden rounded-full bg-ink/10">
            {isAutoActive && !prefersReducedMotion ? (
              <div
                key={`${template.id}-${industry}-bar`}
                className="h-full bg-flame origin-left"
                style={{ animation: `demo-progress ${AUTO_INTERVAL}ms linear forwards` }}
                aria-hidden
              />
            ) : (
              <div className="h-full w-0 bg-flame/30" aria-hidden />
            )}
          </div>
        </Reveal>

        {/* Preview — must actually change when selection changes */}
        <div
          id="demo-preview"
          role="tabpanel"
          aria-label={`${template.name} preview for ${industryLabel(industry)}`}
          className="relative mx-auto flex min-h-[600px] items-start justify-center"
        >
          <div
            key={`${template.id}-${industry}`}
            className={`relative z-10 mx-auto w-full max-w-[320px] ${
              prefersReducedMotion ? "" : "animate-[demo-fade_0.45s_ease-out]"
            }`}
            style={
              prefersReducedMotion
                ? undefined
                : ({ ["--mz-from" as string]: "12px", ["--mz-dur" as string]: "0.45s" } as React.CSSProperties)
            }
          >
            <TemplatePhonePreview templateId={template.id} industry={industry} />

            {/* Template label */}
            <div className="mt-4 text-center">
              <p className="font-display text-sm font-extrabold uppercase tracking-tight">
                {template.name} <span className="font-normal text-ink/40">· {template.family}</span>
              </p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-flame">
                Showing: {industryLabel(industry)}
              </p>
            </div>
          </div>
        </div>

        {/* Caption */}
        <Reveal delay={0.1}>
          <p className="mt-10 flex items-center justify-center gap-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink/40">
            <Globe className="h-4 w-4" /> Demo layouts — yours could be live today
          </p>
        </Reveal>
      </div>

      {/* Local keyframes for subtle transitions */}
      <style>{`
        @keyframes demo-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes demo-fade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="demo-progress"], [style*="demo-fade"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
