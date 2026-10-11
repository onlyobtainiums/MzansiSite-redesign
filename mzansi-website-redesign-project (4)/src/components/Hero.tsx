"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, MessageCircle, MousePointer2, Timer } from "lucide-react";
import { useRef } from "react";
import { TRADES } from "@/data/trades";
import Marquee from "./Marquee";
import PhoneMockup from "./PhoneMockup";
import { RiseWords } from "./Reveal";
import { scrollToId } from "./SmoothScroll";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const phoneX = useTransform(sx, (v) => v * 22);
  const phoneY = useTransform(sy, (v) => v * 16);
  const bubbleX = useTransform(sx, (v) => v * -34);
  const bubbleY = useTransform(sy, (v) => v * -26);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
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
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border-2 border-ink bg-bone px-4 py-2 shadow-[4px_4px_0_#11130c]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-wa" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] md:text-xs">
              The website builder for SA small business
            </span>
          </motion.div>

          <h1 className="font-display text-[15vw] font-extrabold uppercase leading-[0.88] tracking-tight sm:text-[11vw] lg:text-[6.6vw] xl:text-[6.2rem]">
            <RiseWords text="Your WhatsApp" delay={0.45} />
            <br />
            <RiseWords text="is a business." delay={0.62} />
            <br />
            <span className="text-flame">
              <RiseWords text="Give it a" delay={0.82} />{" "}
              <motion.span
                initial={{ opacity: 0, rotate: -6, scale: 0.8 }}
                animate={{ opacity: 1, rotate: -2, scale: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 1.15 }}
                className="serif-i inline-block normal-case tracking-normal"
              >
                storefront.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
            className="mt-7 max-w-md text-base leading-relaxed text-ink/70 md:text-lg"
          >
            A professional website with your services, prices, location and a big{" "}
            <span className="font-semibold text-ink">WhatsApp booking button</span> — built in about 60 seconds for
            salons, barbers, spas and trades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
            className="mt-9 flex flex-wrap items-center gap-4"
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
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.35 }}
            className="mt-12 grid max-w-lg grid-cols-3 divide-x-2 divide-ink/10"
          >
            {[
              ["60 sec", "to build your site"],
              ["R0", "until you publish"],
              ["R149/m", "all-in, cancel anytime"],
            ].map(([big, small]) => (
              <div key={big} className="px-4 first:pl-0">
                <p className="font-display text-2xl font-extrabold md:text-3xl">{big}</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-ink/50 md:text-xs">{small}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ——— Phone ——— */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotate: 8 }}
          animate={{ opacity: 1, y: 0, rotate: 3 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
          className="relative z-10 mx-auto w-full max-w-[340px] lg:max-w-none"
        >
          <motion.div style={{ x: phoneX, y: phoneY }} className="relative">
            <PhoneMockup trade={TRADES.salon} className="mx-auto" />

            {/* Rotating 60s badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              className="absolute -left-10 top-8 hidden h-28 w-28 items-center justify-center md:flex"
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
            </motion.div>

            {/* Floating WhatsApp bubble */}
            <motion.div style={{ x: bubbleX, y: bubbleY }} className="absolute -right-6 top-1/4 hidden lg:block" aria-hidden>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-52 rounded-2xl rounded-bl-sm border border-ink/10 bg-white p-3.5 shadow-[0_20px_40px_-16px_rgba(17,19,12,0.35)]"
              >
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
              </motion.div>
            </motion.div>

            {/* Floating price card */}
            <motion.div
              style={{ x: bubbleY, y: bubbleX }}
              className="absolute -left-8 bottom-16 hidden lg:block"
              aria-hidden
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="rotate-[-4deg] rounded-2xl border-2 border-ink bg-bone px-4 py-3 shadow-[6px_6px_0_#11130c]"
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink/50">No more DMs asking</p>
                <p className="font-serif text-xl italic text-flame">“how much?”</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative border-y-2 border-ink bg-ink py-3.5 text-bone"
      >
        <Marquee
          inverted
          items={["Free to build", "Preview before you pay", "R149/month to publish", "Cancel anytime", "Made in Mzansi", "WhatsApp bookings included"]}
        />
      </motion.div>
    </section>
  );
}
