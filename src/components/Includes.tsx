"use client";

import {
  BadgeCheck,
  Banknote,
  Camera,
  MapPin,
  MessageCircle,
  CalendarCheck,
  Info,
} from "lucide-react";
import Reveal, { RiseWords } from "./Reveal";

const CELLS = [
  {
    icon: Banknote,
    title: "Services & prices",
    copy: "Your full price list in Rand, so nobody has to ask “how much” again.",
    big: true,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp button",
    copy: "One tap opens a chat with you, message pre-filled.",
    big: false,
  },
  {
    icon: MapPin,
    title: "Location & hours",
    copy: "Area, directions and when you're open — always up to date.",
    big: false,
  },
  {
    icon: Camera,
    title: "Photo gallery",
    copy: "Show off your best work instead of describing it in DMs.",
    big: false,
  },
  {
    icon: Info,
    title: "Business info",
    copy: "Everything a new customer needs to trust you, in one place.",
    big: false,
  },
  {
    icon: CalendarCheck,
    title: "Booking-ready CTA",
    copy: "Customers arrive on WhatsApp ready to book — not to interview you.",
    big: true,
  },
];

export default function Includes() {
  return (
    <section className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-flame">
                <span className="h-px w-10 bg-flame" /> The fix
              </p>
            </Reveal>
            <h2 className="max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl">
              <RiseWords text="One link with" />
              <br />
              <span className="serif-i normal-case text-flame">
                <RiseWords text="everything" delay={0.15} />
              </span>{" "}
              <RiseWords text="they need." delay={0.25} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-ink/60">
              MzansiSite builds a professional page around your business — so people see your work, check your prices,
              then tap WhatsApp ready to book.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CELLS.map((cell, i) => (
            /* The reveal and the hover lift live on separate elements: Reveal sets
               an inline `transition` for the fade-in, which would otherwise
               override the utility that transitions the hover. */
            <Reveal key={cell.title} delay={i * 0.08} y={40} className={cell.big ? "sm:col-span-2" : ""}>
              <div className="group relative h-full overflow-hidden rounded-3xl border-2 border-ink/10 bg-white/60 p-7 transition-[translate,border-color] duration-300 hover:-translate-y-1.5 hover:border-ink">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-flame/0 blur-2xl transition-all duration-500 group-hover:bg-flame/15"
                aria-hidden
              />
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border-2 border-ink/10 bg-bone transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bone">
                <cell.icon className="h-5.5 w-5.5" />
              </span>
              <h3 className="font-display text-xl font-extrabold tracking-tight md:text-2xl">{cell.title}</h3>
              <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-ink/60">{cell.copy}</p>
              <BadgeCheck className="absolute bottom-6 right-6 h-5 w-5 text-ink/10 transition-colors duration-300 group-hover:text-wa" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
