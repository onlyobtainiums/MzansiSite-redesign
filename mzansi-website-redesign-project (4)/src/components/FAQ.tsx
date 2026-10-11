"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import Reveal, { RiseWords } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const FAQS = [
  {
    q: "Is it really free to build?",
    a: "Yes. You build and preview the entire site for free — no card, no trial countdown. You only pay R149/month at the moment you choose to publish it to your live .co.za address.",
  },
  {
    q: "I already get customers on WhatsApp. Why a website?",
    a: "Keep WhatsApp — that's where your bookings land. The site simply answers the repetitive questions (prices, services, area, hours) before people message you, so chats start at “I'd like to book” instead of “how much?”.",
  },
  {
    q: "Do my customers need to download anything?",
    a: "No. It's a normal website that opens in any browser. The WhatsApp button opens a chat with you — with a pre-filled message — in the app they already use every day.",
  },
  {
    q: "Can I use my own .co.za domain?",
    a: "Yes. Every published site gets a free yourname.mzansisite.co.za address, and you can connect your own .co.za domain whenever you're ready — we'll walk you through it on WhatsApp.",
  },
  {
    q: "What if I'm not good with technology?",
    a: "That's exactly who this is for. If you can send a WhatsApp message, you can run a MzansiSite. Updates are AI-assisted, and South African support is one message away.",
  },
  {
    q: "Can I cancel?",
    a: "Anytime, from your phone, without a phone call or a cancellation fee. Your site stays yours while your subscription is active.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <div className="mb-14 text-center md:mb-16">
          <Reveal>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-flame">Before you ask</p>
          </Reveal>
          <h2 className="mx-auto font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-6xl">
            <RiseWords text="Questions people ask" />
            <br />
            <span className="serif-i normal-case text-flame">
              <RiseWords text="before they pay." delay={0.2} />
            </span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.05} y={20}>
                <div
                  className={`overflow-hidden rounded-2xl border-2 transition-colors duration-300 ${
                    isOpen ? "border-ink bg-ink text-bone" : "border-ink/10 bg-white/50 hover:border-ink/40"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-baseline gap-4">
                      <span
                        className={`font-display text-sm font-bold ${isOpen ? "text-gold" : "text-ink/30"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-lg font-bold tracking-tight md:text-xl">{faq.q}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 ${
                        isOpen ? "border-flame bg-flame text-bone" : "border-ink/15"
                      }`}
                    >
                      <Plus className="h-4.5 w-4.5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                      >
                        <p className="max-w-3xl px-6 pb-7 pl-[4.4rem] text-sm leading-relaxed text-bone/70 md:px-8 md:pl-[5.2rem] md:text-base">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
