"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Reveal, { RiseWords } from "./Reveal";
import TemplatePhonePreview from "./TemplatePhonePreview";
import { INDUSTRY_LIST } from "@/templates/industries";
import { TEMPLATES, type TemplateMeta } from "@/templates/registry";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ——— Which industries to show by default (first 5) ——— */
const DEFAULT_SHOWN = 4;

type Stage = "form" | "done";



export default function Builder() {
  /* ——— Form state ——— */
  const [stage, setStage] = useState<Stage>("form");
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [industryKey, setIndustryKey] = useState<string>("hairSalon");
  const [showAllIndustries, setShowAllIndustries] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* ——— Template browsing after generation ——— */
  const [templateIndex, setTemplateIndex] = useState(0);

  /* Identify which template matches the chosen industry */
  const matched = INDUSTRY_LIST.find((i) => i.key === industryKey);
  const matchedTemplateId = matched?.templateId ?? TEMPLATES[0].id;
  const allTemplates = TEMPLATES.filter((t) => t.status === "live");
  /* Put the matched template first, then the rest */
  const orderedTemplates: TemplateMeta[] = [
    ...allTemplates.filter((t) => t.id === matchedTemplateId),
    ...allTemplates.filter((t) => t.id !== matchedTemplateId),
  ];
  const activeTemplate = orderedTemplates[templateIndex] ?? orderedTemplates[0];

  const visibleIndustries = showAllIndustries ? INDUSTRY_LIST : INDUSTRY_LIST.slice(0, DEFAULT_SHOWN);

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => {
        const ct = r.headers.get("content-type") || "";
        return ct.includes("application/json") ? r.json() : null;
      })
      .then((d) => d && typeof d.total === "number" && setTotal(d.total))
      .catch(() => undefined);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const generate = async () => {
    setError(null);
    if (name.trim().length < 2) return setError("Tell us your business name.");
    if (area.trim().length < 2) return setError("Where are you based? e.g. Soweto, Johannesburg");
    if (whatsapp.replace(/\D/g, "").length < 9) return setError("Enter a valid WhatsApp number.");

    // Instantly show the designs, bypassing the fake loader
    setTemplateIndex(0);
    setStage("done");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: name,
          trade: industryKey,
          location: area,
          whatsapp,
        }),
      });
      
      const contentType = res.headers.get("content-type") || "";
      if (res.ok && contentType.includes("application/json")) {
        const data = await res.json();
        if (data.ok && typeof data.total === "number") setTotal(data.total);
      }
    } catch {
      // Ignore background lead-capture errors, customer experience comes first
    }
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setStage("form");
    setTemplateIndex(0);
  };

  const prevTemplate = () => setTemplateIndex((i) => (i - 1 + orderedTemplates.length) % orderedTemplates.length);
  const nextTemplate = () => setTemplateIndex((i) => (i + 1) % orderedTemplates.length);

  return (
    <section id="builder" className="relative overflow-hidden bg-ink py-24 text-bone md:py-36">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(255,77,0,0.16) 0%, rgba(227,167,47,0.06) 45%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Heading */}
        <div className="mb-14 max-w-3xl">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-gold">
              <Sparkles className="h-4 w-4" /> Try the builder — right here
            </p>
          </Reveal>
          <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl">
            <RiseWords text="Build yours in" />{" "}
            <span className="text-flame">
              <RiseWords text="60" delay={0.15} />{" "}
              <span className="serif-i normal-case">
                <RiseWords text="seconds." delay={0.25} />
              </span>
            </span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/60 md:text-lg">
              Four fields, zero card details. We&apos;ll show you a real preview of your site — then you choose which
              of our 6 designs fits your business best. Free.
            </p>
          </Reveal>
          {total !== null && total > 0 && (
            <Reveal delay={0.3}>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-bone/15 bg-bone/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-bone/70">
                <span className="h-2 w-2 animate-pulse rounded-full bg-wa" />
                {total} free {total === 1 ? "preview" : "previews"} generated so far
              </p>
            </Reveal>
          )}
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          {/* ——— Left: form / steps / done ——— */}
          <div className="w-full max-w-xl">
            <AnimatePresence mode="wait">
              {/* FORM */}
              {stage === "form" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="space-y-8"
                >
                  {/* ——— Industry picker ——— */}
                  <div>
                    <label className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-bone/50">
                      1 · Your industry
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {visibleIndustries.map((ind) => {
                        const tmpl = TEMPLATES.find((t) => t.id === ind.templateId);
                        const active = industryKey === ind.key;
                        return (
                          <button
                            key={ind.key}
                            onClick={() => setIndustryKey(ind.key)}
                            className={`group relative flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                              active
                                ? "border-gold bg-gold text-ink shadow-[3px_3px_0_rgba(243,237,222,0.25)]"
                                : "border-bone/20 text-bone/70 hover:border-bone/60 hover:text-bone"
                            }`}
                          >
                            {tmpl && (
                              <span
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{ backgroundColor: tmpl.accent }}
                              />
                            )}
                            {ind.label}
                          </button>
                        );
                      })}

                      {/* Show more / less toggle */}
                      <button
                        onClick={() => setShowAllIndustries((v) => !v)}
                        className="flex items-center gap-1.5 rounded-full border border-bone/20 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-bone/50 transition-all duration-300 hover:border-flame hover:text-flame"
                      >
                        {showAllIndustries ? (
                          <>Show less <ChevronDown className="h-3.5 w-3.5 rotate-180" /></>
                        ) : (
                          <>{INDUSTRY_LIST.length - DEFAULT_SHOWN}+ more <ChevronDown className="h-3.5 w-3.5" /></>
                        )}
                      </button>
                    </div>

                    {/* Show matched template label */}
                    {matched && (
                      <p className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-bone/35">
                        Design:{" "}
                        <span className="text-gold">
                          {TEMPLATES.find((t) => t.id === matched.templateId)?.name} —{" "}
                          {TEMPLATES.find((t) => t.id === matched.templateId)?.family}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* ——— Text fields ——— */}
                  {[
                    {
                      n: 2,
                      label: "Business name",
                      icon: Store,
                      value: name,
                      set: setName,
                      placeholder: "e.g. Naledi's Braids",
                      type: "text",
                    },
                    {
                      n: 3,
                      label: "Area & city",
                      icon: MapPin,
                      value: area,
                      set: setArea,
                      placeholder: "e.g. Soweto, Johannesburg",
                      type: "text",
                    },
                    {
                      n: 4,
                      label: "WhatsApp number",
                      icon: MessageCircle,
                      value: whatsapp,
                      set: setWhatsapp,
                      placeholder: "e.g. 082 123 4567",
                      type: "tel",
                    },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-bone/50">
                        {f.n} · {f.label}
                      </label>
                      <div className="group flex items-center gap-3 rounded-2xl border border-bone/20 bg-bone/5 px-5 py-4 transition-all duration-300 focus-within:border-gold focus-within:bg-bone/10">
                        <f.icon className="h-5 w-5 shrink-0 text-bone/40 transition-colors group-focus-within:text-gold" />
                        <input
                          type={f.type}
                          value={f.value}
                          onChange={(e) => f.set(e.target.value)}
                          placeholder={f.placeholder}
                          className="w-full bg-transparent text-base font-medium text-bone outline-none placeholder:text-bone/30"
                          maxLength={60}
                        />
                      </div>
                    </div>
                  ))}

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-flame/40 bg-flame/10 px-4 py-3 text-sm font-medium text-flame"
                    >
                      {error}
                    </motion.p>
                  )}

                  <div className="flex flex-wrap items-center gap-5 pt-2">
                    <button
                      onClick={generate}
                      className="group flex items-center gap-3 rounded-full bg-flame px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-bone transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-10px_rgba(255,77,0,0.6)]"
                    >
                      Generate my preview
                      <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <p className="flex items-center gap-2 text-xs font-medium text-bone/50">
                      <ShieldCheck className="h-4 w-4 text-wa" /> Free · No card · No strings
                    </p>
                  </div>
                </motion.div>
              )}

              {/* DONE */}
              {stage === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="space-y-6"
                >
                  {/* Success headline */}
                  <div className="rounded-3xl border border-wa/30 bg-wa/10 p-6 md:p-8">
                    <p className="flex items-center gap-3 font-display text-xl font-extrabold uppercase tracking-tight text-wa md:text-2xl">
                      <CheckCircle2 className="h-7 w-7 shrink-0" /> Sharp sharp, {name.trim().split(" ")[0]}!
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-bone/70 md:text-base">
                      Here&apos;s your <span className="font-bold text-bone">{activeTemplate.name}</span> preview —
                      designed for {activeTemplate.family}. Don&apos;t love it?{" "}
                      <button onClick={nextTemplate} className="font-bold text-gold underline underline-offset-4 transition-colors hover:text-flame">
                        Try the next design →
                      </button>
                    </p>
                  </div>

                  {/* Template switcher pills */}
                  <div>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-bone/40">
                      {orderedTemplates.length} designs · swipe to compare
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {orderedTemplates.map((t, i) => (
                        <button
                          key={t.id}
                          onClick={() => setTemplateIndex(i)}
                          className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                            i === templateIndex
                              ? "border-bone bg-bone text-ink"
                              : "border-bone/20 text-bone/55 hover:border-bone/60 hover:text-bone"
                          }`}
                        >
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.accent }} />
                          {t.name}
                          {i === 0 && <span className="rounded-full bg-gold/20 px-1.5 py-0.5 text-[9px] text-gold">Best match</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href="/dashboard"
                      className="group flex items-center gap-3 rounded-full bg-flame px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-bone transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-10px_rgba(255,77,0,0.6)]"
                    >
                      Publish for R149.99/m
                      <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <button
                      onClick={reset}
                      className="flex items-center gap-2 rounded-full border border-bone/20 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-bone/70 transition-all duration-300 hover:border-bone/60 hover:text-bone"
                    >
                      <RotateCcw className="h-4 w-4" /> Edit details
                    </button>
                  </div>
                  <p className="text-xs font-medium text-bone/40">
                    Hosting, SSL, unlimited edits and WhatsApp enquiries. Cancel anytime.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ——— Right: live template preview ——— */}
          <div className="relative mx-auto w-full max-w-[360px] lg:sticky lg:top-28 lg:max-w-none lg:w-[420px]">
            <AnimatePresence mode="wait">
              {stage === "done" ? (
                <motion.div
                  key={`preview-${activeTemplate.id}-${templateIndex}`}
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.97 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="relative"
                >
                  {/* Browser chrome */}
                  <div className="overflow-hidden rounded-2xl border-2 border-bone/20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
                    <div className="flex items-center gap-2 border-b border-bone/10 bg-bone/5 px-4 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-flame/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-wa/70" />
                      <span className="ml-2 truncate rounded-md bg-bone/10 px-3 py-1 text-[10px] font-medium text-bone/40">
                        {name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.mzansisite.co.za
                      </span>
                    </div>
                    <TemplatePhonePreview
                      templateId={activeTemplate.id}
                      industry={matched?.key ?? "hairSalon"}
                      businessName={name}
                      area={area}
                      whatsapp={whatsapp}
                    />
                  </div>

                  {/* Template name badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 14 }}
                    className="absolute -right-3 -top-3 rotate-3 rounded-xl border-2 border-bone/20 bg-ink px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-gold shadow-lg"
                  >
                    {activeTemplate.name} design
                  </motion.div>

                  {/* Prev / Next arrows */}
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={prevTemplate}
                      className="flex items-center gap-1.5 rounded-full border border-bone/20 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-bone/60 transition-all hover:border-bone hover:text-bone"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" /> Prev
                    </button>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-bone/35">
                      {templateIndex + 1} / {orderedTemplates.length}
                    </p>
                    <button
                      onClick={nextTemplate}
                      className="flex items-center gap-1.5 rounded-full border border-bone/20 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-bone/60 transition-all hover:border-bone hover:text-bone"
                    >
                      Next <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* "Not this?" prompt */}
                  <p className="mt-3 text-center text-[11px] font-medium text-bone/40">
                    Not feeling this one?{" "}
                    <button onClick={nextTemplate} className="font-bold text-flame underline underline-offset-4 hover:text-gold">
                      See the next design
                    </button>
                  </p>
                </motion.div>
              ) : (
                /* Placeholder while form is open */
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden rounded-2xl border-2 border-dashed border-bone/15 bg-bone/[0.03]"
                >
                  <div className="relative">
                    <div className="pointer-events-none opacity-30 blur-[1px]">
                      <TemplatePhonePreview
                        templateId={matchedTemplateId}
                        industry={industryKey}
                        businessName={name}
                        area={area}
                        whatsapp={whatsapp}
                      />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                      <div className="rounded-2xl border border-bone/20 bg-ink/80 px-6 py-4 backdrop-blur">
                        <p className="font-display text-sm font-bold uppercase tracking-[0.16em]">Your preview</p>
                        <p className="mt-1 text-xs text-bone/55">Fill in your details and click generate</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
