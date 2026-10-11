"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Marquee from "./Marquee";
import Reveal, { RiseWords } from "./Reveal";
import { scrollToId } from "./SmoothScroll";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-flame text-bone">
      <div className="border-b-2 border-ink/20 py-3.5">
        <Marquee
          inverted
          items={["See it before you pay", "Free to build", "R149/month to publish", "Cancel anytime"]}
          className="text-bone"
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 py-24 text-center md:px-10 md:py-36">
        {/* Glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(17,19,12,0.28) 0%, transparent 65%)" }}
          aria-hidden
        />

        <div className="relative">
          <Reveal>
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-bone/70">
              Built for salons · barbers · spas · plumbers · electricians · home services
            </p>
          </Reveal>
          <h2 className="mx-auto max-w-5xl font-display text-[13vw] font-extrabold uppercase leading-[0.9] tracking-tight sm:text-7xl md:text-8xl">
            <RiseWords text="See your website" />
            <br />
            <span className="serif-i normal-case text-ink">
              <RiseWords text="before" delay={0.15} />
            </span>{" "}
            <RiseWords text="you pay" delay={0.22} />
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.5 }}
              className="inline-block text-gold"
            >
              .
            </motion.span>
          </h2>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-8 max-w-xl text-base font-medium leading-relaxed text-bone/80 md:text-lg">
              Sixty seconds from now you could be looking at your business online — services, prices and a WhatsApp
              button that turns scrollers into bookings.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <button
              onClick={() => scrollToId("#builder")}
              className="group mt-12 inline-flex items-center gap-4 rounded-full border-2 border-ink bg-ink px-10 py-6 font-display text-base font-bold uppercase tracking-[0.16em] text-bone transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[10px_10px_0_rgba(17,19,12,0.35)] md:px-14 md:text-lg"
            >
              Create my free website
              <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45" />
            </button>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-bone/60">
              Free to build · Preview first · No card needed
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
