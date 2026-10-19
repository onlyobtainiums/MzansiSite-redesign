"use client";

import { ArrowUp, Heart } from "lucide-react";
import MzansiLogo from "./MzansiLogo";
import { scrollToId } from "./SmoothScroll";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-20 text-bone">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div>
          <MzansiLogo size={40} wordmark className="[&_span]:text-bone [&_span]:text-2xl" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/50">
              The website builder made for South African small businesses. Services, prices and WhatsApp — so customers
              choose you, then enquire.
            </p>
          </div>

          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-bone/40">Explore</p>
            <ul className="space-y-3 text-sm font-semibold">
              {[
                ["Why MzansiSite", "#why"],
                ["Demo sites", "#demo"],
                ["Pricing", "#pricing"],
                ["FAQ", "#faq"],
              ].map(([label, href]) => (
                <li key={href}>
                  <button onClick={() => scrollToId(href)} className="link-sweep text-bone/70 hover:text-bone">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-bone/40">The deal</p>
            <ul className="space-y-3 text-sm font-medium text-bone/70">
              <li>R149.99/month · all-in</li>
              <li>No setup fees</li>
              <li>Cancel anytime</li>
              <li>Free preview, always</li>
            </ul>
          </div>

          <button
            onClick={() => scrollToId("#top")}
            className="group flex h-14 w-14 items-center justify-center self-start rounded-full border-2 border-bone/15 transition-all duration-300 hover:border-flame hover:bg-flame"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-bone/10 py-7 text-xs font-medium text-bone/40 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} MzansiSite. Made with <Heart className="inline h-3.5 w-3.5 fill-flame text-flame" /> for Mzansi&apos;s hustlers.</p>
          <div className="flex items-center gap-4">
            <a href="/acceptable-use" className="font-semibold uppercase tracking-[0.14em] text-bone/60 hover:text-bone">Acceptable Use</a>
            <span className="text-bone/20">·</span>
            <p className="font-semibold uppercase tracking-[0.16em]">Demo layouts shown are examples, not customer sites</p>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="select-none overflow-hidden pb-2" aria-hidden>
        <p className="whitespace-nowrap text-center font-display text-[13.5vw] font-extrabold uppercase leading-[0.8] tracking-tighter text-bone/[0.06]">
          MZANSISITE
        </p>
      </div>
    </footer>
  );
}
