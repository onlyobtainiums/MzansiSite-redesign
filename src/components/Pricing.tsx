"use client";

import { BadgePercent, Check, Lock, XCircle } from "lucide-react";
import Reveal, { RiseWords } from "./Reveal";
import { scrollToId } from "./SmoothScroll";

const FEATURES = [
  "Professional one-page website",
  "Hosting & SSL included",
  "Big WhatsApp booking button",
  "Services, prices & gallery",
  "AI-powered updates anytime",
  "Your .co.za address",
  "Mobile-first design",
  "South African support",
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-bone-deep py-24 md:py-36">
      {/* Giant background price */}
      <div
        className="pointer-events-none absolute -right-20 top-1/2 hidden -translate-y-1/2 select-none font-display text-[34rem] font-extrabold leading-none tracking-tighter text-ink/[0.04] lg:block"
        aria-hidden
      >
        149
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="mb-14 text-center md:mb-20">
          <Reveal>
            <p className="mb-6 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-flame">
              <BadgePercent className="h-4 w-4" /> Transparent pricing
            </p>
          </Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl">
            <RiseWords text="One price." />{" "}
            <span className="serif-i normal-case text-flame">
              <RiseWords text="Everything" delay={0.15} />
            </span>{" "}
            <RiseWords text="in." delay={0.28} />
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Free card */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border-2 border-ink/12 bg-white/50 p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-ink/45">Start here</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-6xl font-extrabold tracking-tight">R0</span>
                <span className="text-sm font-semibold text-ink/45">to build & preview</span>
              </div>
              <ul className="mt-7 space-y-3">
                {["Build your full site", "Preview on phone & desktop", "Edit as much as you like", "No card required"].map(
                  (f) => (
                    <li key={f} className="flex items-center gap-3 text-sm font-medium text-ink/70">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-ink/8">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ),
                )}
              </ul>
              <p className="mt-8 border-t border-ink/10 pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                You only ever pay when you decide to go live
              </p>
            </div>
          </Reveal>

          {/* Paid card */}
          <Reveal
            delay={0.2}
            y={48}
            className="relative overflow-hidden rounded-3xl border-2 border-ink bg-ink p-8 text-bone shadow-[12px_12px_0_#ff4d00] md:p-12"
          >
            <span className="absolute right-6 top-6 rotate-3 rounded-full bg-gold px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
              Most popular
            </span>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Publish when ready</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-7xl font-extrabold tracking-tight md:text-8xl">R149</span>
              <span className="text-base font-semibold text-bone/50">/month</span>
            </div>
            <p className="mt-2 text-sm font-medium text-bone/50">Billed monthly · no setup fees</p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm font-medium text-bone/80">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-wa/20">
                    <Check className="h-3 w-3 text-wa" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollToId("#builder")}
              className="mt-9 flex w-full items-center justify-center gap-3 rounded-full bg-flame py-4.5 font-display text-sm font-bold uppercase tracking-[0.16em] text-bone transition-all duration-300 hover:-translate-y-0.5 hover:bg-flame-deep"
            >
              Start free — publish when ready
            </button>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-bone/45">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" /> Secure Paystack payment
              </span>
              <span className="flex items-center gap-1.5">
                <XCircle className="h-3.5 w-3.5" /> Cancel anytime
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center font-serif text-xl italic text-ink/50 md:text-2xl">
            Less than <span className="text-flame">R5 a day</span> — about one cancelled braids appointment a month.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
