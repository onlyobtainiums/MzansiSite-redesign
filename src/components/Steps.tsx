"use client";

import { Eye, Hammer, Rocket } from "lucide-react";
import Reveal, { RiseWords } from "./Reveal";

const STEPS = [
  {
    n: "01",
    icon: Hammer,
    title: "Build free",
    copy: "Business name, WhatsApp, area and trade. No card, no commitment — AI assembles your layout and copy.",
    price: "R0",
  },
  {
    n: "02",
    icon: Eye,
    title: "Preview first",
    copy: "See your site on phone and desktop. Tweak wording, swap photos, adjust prices before anyone sees it.",
    price: "R0",
  },
  {
    n: "03",
    icon: Rocket,
    title: "Publish",
    copy: "Go live when you're ready. Hosting, SSL, your .co.za address and WhatsApp enquiries all included.",
    price: "R149/m",
  },
];

export default function Steps() {
  return (
    <section className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 lg:flex-row lg:items-end">
          <h2 className="max-w-2xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl">
            <RiseWords text="Free to build." />
            <br />
            <RiseWords text="Pay only to" delay={0.15} />{" "}
            <span className="serif-i normal-case text-flame">
              <RiseWords text="publish." delay={0.28} />
            </span>
          </h2>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-ink/60">
              Three steps between the DMs you drown in today and a storefront that answers them for you.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            /* Reveal wraps the card so its inline fade-in transition cannot
               override the hover lift/skew, which is plain CSS here. */
            <Reveal key={step.n} delay={i * 0.14} y={48} duration={0.75}>
              <div
                className={`group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl border-2 border-ink p-8 transition-[translate,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[10px_10px_0_#11130c] ${
                  i === 1 ? "bg-ink text-bone" : "bg-white/60"
                } ${i === 0 ? "hover:-rotate-1" : i === 2 ? "hover:rotate-1" : ""}`}
              >
              <div className="flex items-start justify-between">
                <span
                  className={`font-display text-6xl font-extrabold tracking-tight ${
                    i === 1 ? "text-bone/15" : "text-ink/10"
                  }`}
                >
                  {step.n}
                </span>
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl border-2 transition-all duration-300 group-hover:rotate-[-8deg] ${
                    i === 1 ? "border-bone/20 bg-bone/10 text-gold" : "border-ink/10 bg-bone group-hover:bg-flame group-hover:text-bone"
                  }`}
                >
                  <step.icon className="h-5.5 w-5.5" />
                </span>
              </div>
              <div>
                <p className={`mb-2 font-display text-sm font-bold uppercase tracking-[0.2em] ${i === 1 ? "text-gold" : "text-flame"}`}>
                  {step.price}
                </p>
                <h3 className="font-display text-3xl font-extrabold tracking-tight">{step.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${i === 1 ? "text-bone/60" : "text-ink/60"}`}>{step.copy}</p>
              </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
