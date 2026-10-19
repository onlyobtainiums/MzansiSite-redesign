"use client";

import { ArrowDownRight, MessageCircle, MousePointer2, Timer } from "lucide-react";
import { useRef } from "react";
import { TRADES } from "@/data/trades";
import Marquee from "./Marquee";
import PhoneMockup from "./PhoneMockup";
import { RiseWords } from "./Reveal";
import { scrollToId } from "./SmoothScroll";

/**
 * The hero.
 *
 * This used to be the heaviest framer-motion consumer in the app: 26 motion
 * elements, plus two motion values and two springs driving a mouse parallax.
 * All of it is now CSS or plain DOM work:
 *
 *   entrance      → @keyframes with animation-delay (mz-in-*), so the delays
 *                   that stagger the headline, copy, buttons and stats are
 *                   declared, not animated in JavaScript
 *   parallax      → the pointer position is written to two custom properties on
 *                   the section, and the three floating layers read them in a
 *                   transform. No React re-render runs on mousemove.
 *   loops         → keyframes (mz-spin for the badge, mz-float-a/b for the cards)
 *
 * The parallax keeps a transition on `transform`, which reproduces the lazy,
 * eased feel of the old springs without a spring simulation.
 */
const PARALLAX_EASE = "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)";

/** Pointer-following layer. `x`/`y` are the multiplier for each axis, in px. */
function layerStyle(x: number, y: number) {
  return {
    transform: `translate3d(calc(var(--mx, 0) * ${x}px), calc(var(--my, 0) * ${y}px), 0)`,
    transition: PARALLAX_EASE,
  } as const;
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  /*
   * Writing to el.style directly (rather than setState) keeps this off React's
   * render path — the same reason framer-motion used motion values.
   */
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", String((e.clientX - rect.left) / rect.width - 0.5));
    el.style.setProperty("--my", String((e.clientY - rect.top) / rect.height - 0.5));
  };

  return (
    <section id="top" ref={ref} onMouseMove={onMouseMove} className="relative overflow-hidden pt-24 md:pt-28">
      {/* Giant faint background word */}
      <div className="pointer-events-none absolute inset-x-0 top-[18%] select-none overflow-hidden" aria-hidden>
        <div className="marquee-track slow opacity-[0.045]">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="whitespace-nowrap px-8 font-display text-[26vw] font-extrabold leading-none tracking-tighter">
              MZANSI
            </span>
          ))}
        </div>
      </div>

      {/* Sun glow behind phone */}
      <div
        className="pointer-events-none absolute right-[-10%] top-[6%] h-[44rem] w-[44rem] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,77,0,0.22) 0%, rgba(227,167,47,0.12) 42%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 pb-16 pt-6 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-4 lg:pb-20">
        {/* ——— Copy ——— */}
        <div className="relative z-10 pt-6 lg:pt-10">
          {/*
            Sizes are dictated by the longest unbreakable word, not by taste.
            "WHATSAPP" renders 9.6em wide in the display face and cannot break,
            and the container is 100vw minus 40px of padding below md and 80px
            above it — so a flat vw outgrows its own column: 9.4vw measured 9px
            over at 320px and 19px over at 768px, pushing the word into the
            right padding instead of lining it up with the rest of the page.
            Dividing the available width by 9.8 (a shade more than the real
            9.6em) keeps it inside at every width from 320px to 1920px. Desktop
            keeps its fixed sizes because there the layout is two columns.
          */}
            <h1 className="font-display text-[calc((100vw_-_40px)/9.8)] font-extrabold uppercase leading-[0.88] tracking-tight sm:text-[9.6vw] md:text-[calc((100vw_-_80px)/9.8)] lg:text-[6.6vw] xl:text-[6.2rem]">
            <RiseWords text="Your WhatsApp" delay={0.45} />
            <br />
            <RiseWords text="is a business." delay={0.62} />
            <br />
            <span className="text-flame">
              <RiseWords text="Give it a" delay={0.82} />{" "}
              <span
                className="mz-in-pop serif-i inline-block normal-case tracking-normal"
                style={{ ["--mz-delay" as string]: "1.15s" }}
              >
                storefront.
              </span>
            </span>
          </h1>

          <p
            className="mz-in-up mt-7 max-w-md text-base leading-relaxed text-ink/70 md:text-lg"
            style={{ ["--mz-delay" as string]: "1.05s" }}
          >
            A professional website with your services, prices, location and a big{" "}
            <span className="font-semibold text-ink">WhatsApp booking button</span> — built in about 60 seconds for
            salons, barbers, spas and trades.
          </p>

          <div
            className="mz-in-up mt-9 flex flex-wrap items-center gap-4"
            style={{ ["--mz-delay" as string]: "1.2s" }}
          >
            <button
              onClick={() => scrollToId("#builder")}
              className="group relative flex items-center gap-3 rounded-full border-2 border-ink bg-ink px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-bone transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_#ff4d00]"
            >
              Build my site — free
              <ArrowDownRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>
            <button
              onClick={() => scrollToId("#demo")}
              className="group flex items-center gap-2 rounded-full border-2 border-ink/15 px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] transition-all duration-300 hover:border-ink hover:bg-ink/5"
            >
              <MousePointer2 className="h-4 w-4 text-flame" />
              See demo sites
            </button>
          </div>

          {/* Stats */}
          <div
            className="mz-in-up mt-12 grid max-w-lg grid-cols-3 divide-x-2 divide-ink/10"
            style={{ ["--mz-delay" as string]: "1.35s" }}
          >
            {[
              ["60 sec", "to build your site"],
              ["R0", "until you publish"],
              ["R149.99/m", "all-in, cancel anytime"],
            ].map(([big, small]) => (
              <div key={big} className="px-2 first:pl-0 sm:px-4">
                {/* Sized to fit three columns across a 350px phone: at
                    text-2xl "R149.99/m" was cut off by the viewport edge and
                    "60 sec" wrapped onto two lines. */}
                <p className="font-display text-lg font-extrabold sm:text-2xl md:text-3xl">{big}</p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-ink/50 sm:text-[11px] md:text-xs">{small}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ——— Phone ——— */}
        <div
          className="mz-in-phone relative z-10 mx-auto w-full max-w-[340px] lg:max-w-none"
          style={{ ["--mz-delay" as string]: "0.6s" }}
        >
          <div className="relative" style={layerStyle(22, 16)}>
            <PhoneMockup trade={TRADES.salon} className="mx-auto" />

            {/* Rotating 60s badge */}
            <div
              className="mz-spin absolute -left-10 top-8 hidden h-28 w-28 items-center justify-center md:flex"
              aria-hidden
            >
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <path id="circlePath" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                </defs>
                <circle cx="50" cy="50" r="50" className="fill-gold" />
                <text className="fill-ink font-display text-[10.5px] font-bold uppercase" letterSpacing="2.5">
                  <textPath href="#circlePath">built in 60 seconds · built in 60 seconds ·</textPath>
                </text>
                <Timer className="text-ink" x="41" y="41" width="18" height="18" />
              </svg>
            </div>

            {/* Floating WhatsApp bubble */}
            <div className="absolute -right-6 top-1/4 hidden lg:block" style={layerStyle(-34, -26)} aria-hidden>
              <div className="mz-float-a w-52 rounded-2xl rounded-bl-sm border border-ink/10 bg-white p-3.5 shadow-[0_20px_40px_-16px_rgba(17,19,12,0.35)]">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-wa">
                    <MessageCircle className="h-3.5 w-3.5 fill-white text-wa" />
                  </span>
                  <p className="text-[10px] font-bold">New booking enquiry</p>
                </div>
                <p className="mt-2 text-[11px] leading-snug text-ink/70">
                  “Saw your prices online — can I book knotless braids for Saturday?”
                </p>
                <p className="mt-1.5 text-right text-[9px] font-medium text-wa-deep">✓✓ Ready to book</p>
              </div>
            </div>

            {/* Floating price card — its axes are deliberately crossed, as before */}
            <div className="absolute -left-8 bottom-16 hidden lg:block" style={layerStyle(-26, -34)} aria-hidden>
              <div className="mz-float-b rotate-[-4deg] rounded-2xl border-2 border-ink bg-bone px-4 py-3 shadow-[6px_6px_0_#11130c]">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink/50">No more DMs asking</p>
                <p className="font-serif text-xl italic text-flame">“how much?”</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div
        className="mz-in-fade relative border-y-2 border-ink bg-ink py-3.5 text-bone"
        style={{ ["--mz-delay" as string]: "1.5s" }}
      >
        <Marquee
          inverted
          items={["Free to build", "Preview before you pay", "R149.99/month to publish", "Cancel anytime", "Made in Mzansi", "WhatsApp bookings included"]}
        />
      </div>
    </section>
  );
}
