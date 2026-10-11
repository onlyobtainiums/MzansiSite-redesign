"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, Clock3, Layers } from "lucide-react";
import { TEMPLATES } from "@/templates/registry";
import { INDUSTRY_LIST } from "@/templates/industries";
import { getDemoSiteData } from "@/templates/demo-data";
import { TemplateRenderer } from "@/templates";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal, { RiseWords } from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";

const EASE = [0.22, 1, 0.36, 1] as const;

function LiveThumb({ templateId, industry }: { templateId: string; industry: string }) {
  const site = getDemoSiteData({ industry });
  return (
    <div className="pointer-events-none relative h-full w-full overflow-hidden bg-white">
      <div className="absolute left-0 top-0 h-[400%] w-[400%] origin-top-left" style={{ transform: "scale(0.25)" }}>
        <TemplateRenderer templateId={templateId} site={site} />
      </div>
    </div>
  );
}

export default function TemplatesGalleryPage() {
  return (
    <SmoothScroll>
      <div className="grain relative min-h-screen bg-bone text-ink">
        <Nav />
        <main className="pt-24 md:pt-32">
          {/* ——— Heading ——— */}
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">
            <Reveal>
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-ink/50 transition-colors hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" /> Back home
              </Link>
            </Reveal>
            <Reveal>
              <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-flame">
                <Layers className="h-4 w-4" /> The template library
              </p>
            </Reveal>
            <h1 className="max-w-5xl font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-tight md:text-8xl">
              <RiseWords text="Six designs." />
              <br />
              <span className="serif-i normal-case text-flame">
                <RiseWords text="Every" delay={0.12} />
              </span>{" "}
              <RiseWords text="South African trade." delay={0.2} />
            </h1>
            <Reveal delay={0.25}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-ink/60 md:text-lg">
                Each design is purpose-built per industry — real layouts, real copy, real prices. All six are live,
                covering every trade in Mzansi. Preview everything with demo businesses.
              </p>
            </Reveal>
          </div>

          {/* ——— Template grid ——— */}
          <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-16 md:px-10">
            <div className="grid grid-cols-1 gap-10 md:gap-14">
              {TEMPLATES.map((template, i) => {
                const isLive = template.status === "live";
                const industryLabels = INDUSTRY_LIST.filter((ind) => ind.templateId === template.id).map(
                  (ind) => ind.label,
                );
                return (
                  <motion.article
                    key={template.id}
                    initial={{ opacity: 0, y: 56 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-6% 0px" }}
                    transition={{ duration: 0.9, delay: 0.08 * i, ease: EASE }}
                    className={`grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
                  >
                    {/* Preview frame */}
                    <div className="group relative">
                      <div className="overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-[10px_10px_0_#11130c]">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 border-b-2 border-ink bg-bone px-4 py-2.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-flame/70" />
                          <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
                          <span className="h-2.5 w-2.5 rounded-full bg-wa/70" />
                          <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[10px] font-medium text-ink/50">
                            {isLive
                              ? `yourbusiness.mzansisite.co.za — ${template.name.toLowerCase()}`
                              : `${template.name.toLowerCase()} — ${template.statusLabel.toLowerCase()}`}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] ${
                              isLive ? "bg-wa/15 text-wa-deep" : "bg-gold/20 text-ink/60"
                            }`}
                          >
                            {template.statusLabel}
                          </span>
                        </div>
                        <div className="relative aspect-[16/10]">
                          {isLive ? (
                            <LiveThumb templateId={template.id} industry={template.previewIndustry} />
                          ) : (
                            /* Stage-gated: palette composition card */
                            <div className="grid h-full place-items-center bg-ink p-8">
                              <div className="w-full max-w-sm">
                                <div className="mb-6 flex items-center gap-2">
                                  <Clock3 className="h-4 w-4 text-gold" />
                                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-bone/50">
                                    Shipping in {template.statusLabel.toLowerCase()}
                                  </p>
                                </div>
                                <p className="font-display text-4xl font-extrabold uppercase tracking-tight text-bone">
                                  {template.name}
                                </p>
                                <p className="mt-1 font-serif text-xl italic text-bone/50">{template.family}</p>
                                <div className="mt-6 flex gap-2">
                                  {template.palette.map((hex) => (
                                    <span
                                      key={hex}
                                      className="h-10 flex-1 rounded-md border border-white/10"
                                      style={{ backgroundColor: hex }}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          {/* Hover veil for live previews */}
                          {isLive && (
                            <Link
                              href={`/templates/${template.id}`}
                              className="absolute inset-0 hidden items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:flex group-hover:bg-ink/45"
                            >
                              <span className="flex items-center gap-2 rounded-full bg-bone px-6 py-3.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
                                Open live preview <ArrowUpRight className="h-4 w-4" />
                              </span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-5xl font-extrabold text-ink/10">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
                            {template.name}
                          </h2>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame">{template.family}</p>
                        </div>
                      </div>
                      <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/60 md:text-base">
                        {template.description}
                      </p>

                      {/* Palette */}
                      <div className="mt-6 flex items-center gap-1.5">
                        {template.palette.map((hex) => (
                          <span
                            key={hex}
                            title={hex}
                            className="h-6 w-10 rounded-full border border-ink/10"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>

                      {/* Industries */}
                      <div className="mt-6">
                        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-ink/40">
                          Built for
                        </p>
                        <ul className="flex flex-wrap gap-1.5">
                          {industryLabels.slice(0, 5).map((label) => (
                            <li
                              key={label}
                              className="flex items-center gap-1.5 rounded-full border border-ink/12 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ink/60"
                            >
                              <Check className={`h-3 w-3 ${isLive ? "text-wa-deep" : "text-gold"}`} />
                              {label}
                            </li>
                          ))}
                          {industryLabels.length > 5 && (
                            <li className="rounded-full border border-ink/12 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ink/40">
                              +{industryLabels.length - 5} more
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="mt-8">
                        {isLive ? (
                          <Link
                            href={`/templates/${template.id}`}
                            className="group/btn inline-flex items-center gap-3 rounded-full border-2 border-ink bg-ink px-7 py-4 font-display text-xs font-bold uppercase tracking-[0.16em] text-bone transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#ff4d00]"
                          >
                            Preview {template.name} live
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-45" />
                          </Link>
                        ) : (
                          <span className="inline-flex items-center gap-2.5 rounded-full border-2 border-dashed border-ink/25 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-ink/40">
                            <Clock3 className="h-4 w-4 text-gold" /> Arrives in {template.statusLabel.toLowerCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
