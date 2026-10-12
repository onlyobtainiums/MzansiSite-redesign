"use client";

import { Globe } from "lucide-react";
import { useState } from "react";
import Reveal, { RiseWords } from "./Reveal";
import TemplatePhonePreview from "./TemplatePhonePreview";
import { TEMPLATES } from "@/templates/registry";
import { demoIndustriesForTemplate } from "@/templates/demo-data";
import { industryLabel } from "@/templates/industries";

const EASE = [0.22, 1, 0.36, 1] as const;

const DEMO_TEMPLATES = TEMPLATES.filter((t) => t.status === "live");

export default function Demo() {
  const [templateIdx, setTemplateIdx] = useState(0);
  const [industryIdx, setIndustryIdx] = useState(0);

  const template = DEMO_TEMPLATES[templateIdx];
  const industries = demoIndustriesForTemplate(template.id);
  const industry = industries[industryIdx] ?? industries[0];

  const switchTemplate = (idx: number) => {
    setTemplateIdx(idx);
    setIndustryIdx(0);
  };

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

        {/* Template tabs */}
        <Reveal delay={0.1}>
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {DEMO_TEMPLATES.map((t, i) => (
              <button
                key={t.id}
                onClick={() => switchTemplate(i)}
                className={`relative flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                  templateIdx === i
                    ? "border-ink bg-ink text-bone shadow-[4px_4px_0_#ff4d00]"
                    : "border-ink/15 bg-transparent hover:border-ink"
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.accent }} />
                {t.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Industry switcher */}
        <Reveal delay={0.15}>
          <div className="mb-8 flex flex-wrap justify-center gap-1.5">
            {industries.map((key, i) => (
              <button
                key={key}
                onClick={() => setIndustryIdx(i)}
                className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                  industryIdx === i
                    ? "border-flame bg-flame text-bone"
                    : "border-ink/12 text-ink/50 hover:border-ink hover:text-ink"
                }`}
              >
                {industryLabel(key)}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Preview */}
        <div className="relative mx-auto flex min-h-[600px] items-start justify-center">
          {/*
            Keyed on the selection so React mounts a fresh node for each
            template/industry pair, which replays the CSS entrance animation.
            An exit animation is not needed here — the new preview takes over.
          */}
          <div
            key={`${template.id}-${industry}`}
            className="mz-in-up relative z-10 mx-auto w-full max-w-[320px]"
            style={{ ["--mz-from" as string]: "40px", ["--mz-dur" as string]: "0.5s" }}
          >
              <TemplatePhonePreview
                templateId={template.id}
                industry={industry}
              />

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
    </section>
  );
}
