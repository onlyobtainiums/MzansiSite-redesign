"use client";

import { CheckCheck, MessageCircleQuestion, PhoneOff } from "lucide-react";
import Reveal, { RiseWords } from "./Reveal";

const DMS = [
  { text: "Hi 👋 how much is a wash & blow dry?", time: "08:12" },
  { text: "Morning. Where exactly are you based?", time: "09:47" },
  { text: "Do you have space today?? 🙏", time: "11:03" },
  { text: "What services do you offer?", time: "13:26" },
  { text: "Sorry, how do I actually book?", time: "17:58" },
];

export default function Problem() {
  return (
    <section id="why" className="relative overflow-hidden bg-ink py-24 text-bone md:py-36">
      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(243,237,222,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(243,237,222,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-10">
          {/* Copy */}
          <div>
            <Reveal>
              <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-flame">
                <span className="h-px w-10 bg-flame" /> The daily grind
              </p>
            </Reveal>
            <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl">
              <RiseWords text="The same four" />
              <br />
              <RiseWords text="questions." delay={0.15} />
              <br />
              <span className="text-gold">
                <RiseWords text="Every." delay={0.3} />{" "}
                <RiseWords text="Single." delay={0.42} />{" "}
                <span className="serif-i normal-case text-flame">day.</span>
              </span>
            </h2>
            <Reveal delay={0.25}>
              <p className="mt-8 max-w-md text-base leading-relaxed text-bone/60 md:text-lg">
                Your customers want answers before they message you. Right now you&apos;re the website — repeating
                prices, directions and availability between actual paying work.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-10 flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-bone/15 bg-bone/5">
                    <MessageCircleQuestion className="h-5 w-5 text-gold" />
                  </span>
                  <p className="text-sm leading-snug text-bone/70">
                    <span className="font-display text-xl font-extrabold text-bone">30+</span>
                    <br />
                    repeat DMs a week
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-bone/15 bg-bone/5">
                    <PhoneOff className="h-5 w-5 text-flame" />
                  </span>
                  <p className="text-sm leading-snug text-bone/70">
                    <span className="font-display text-xl font-extrabold text-bone">Hours</span>
                    <br />
                    lost not doing your trade
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Chat stack */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-[2rem] border border-bone/12 bg-ink-soft/80 p-5 shadow-2xl md:p-7">
              <div className="mb-6 flex items-center gap-3 border-b border-bone/10 pb-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-wa/15 font-display text-sm font-bold text-wa">
                  YO
                </span>
                <div>
                  <p className="text-sm font-bold">Your phone, right now</p>
                  <p className="text-[11px] text-wa">online · typing…</p>
                </div>
                <span className="ml-auto rounded-full bg-flame/15 px-2.5 py-1 text-[10px] font-bold text-flame">
                  5 unread
                </span>
              </div>
              <div className="space-y-3">
                {DMS.map((dm, i) => (
                  <Reveal
                    key={dm.text}
                    delay={0.25 + i * 0.28}
                    y={24}
                    scale={0.96}
                    duration={0.6}
                    className="max-w-[85%] rounded-2xl rounded-tl-sm bg-bone/8 px-4 py-3"
                  >
                    <p className="text-sm leading-snug text-bone/85">{dm.text}</p>
                    <p className="mt-1 flex items-center justify-end gap-1 text-[10px] text-bone/40">
                      {dm.time} <CheckCheck className="h-3 w-3 text-wa" />
                    </p>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={1.8} y={10}>
                <p className="mt-6 text-center font-serif text-lg italic text-bone/50">
                  …and this is a <span className="text-flame not-italic">quiet</span> day.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
