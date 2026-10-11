"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Clock, MapPin, MessageCircle, Share2, Star } from "lucide-react";
import type { Trade } from "@/data/trades";

interface PhoneMockupProps {
  trade: Trade;
  businessName?: string;
  area?: string;
  className?: string;
}

/**
 * A generated storefront rendered inside a phone shell.
 * Used by the hero, the industry demo and the live builder preview.
 */
export default function PhoneMockup({ trade, businessName, area, className = "" }: PhoneMockupProps) {
  const name = businessName?.trim() || trade.business;
  const location = area?.trim() || trade.area;

  return (
    <div className={`relative ${className}`}>
      <div className="phone-shell relative mx-auto aspect-[9/19] w-full max-w-[320px] overflow-hidden rounded-[2.6rem] border-[6px] border-ink bg-white text-left">
        {/* Status bar */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-ink">
          <span>9:41</span>
          <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
          <div className="flex items-center gap-1">
            <span className="inline-block h-2 w-3 rounded-[2px] border border-ink" />
            <span className="inline-block h-2 w-2 rounded-full bg-ink" />
          </div>
        </div>

        {/* Browser chrome */}
        <div className="relative z-10 mt-8 flex items-center gap-2 border-b border-ink/10 bg-bone/80 px-4 py-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-wa/15">
            <span className="h-1.5 w-1.5 rounded-full bg-wa" />
          </span>
          <span className="truncate text-[9px] font-medium tracking-wide text-ink/60">
            {name.toLowerCase().replace(/[^a-z0-9]+/g, "") || "yourbusiness"}.mzansisite.co.za
          </span>
          <Share2 className="ml-auto h-3 w-3 text-ink/40" />
        </div>

        {/* Storefront */}
        <div className="relative h-[calc(100%-3.4rem)] overflow-y-auto overscroll-contain pb-16" data-lenis-prevent>
          {/* Hero image */}
          <div className="relative h-40 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={trade.image} alt={trade.label} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <span className="absolute left-3 top-3 rounded-full bg-bone/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-ink">
              {trade.badge}
            </span>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-1.5 text-white">
                <h3 className="font-display text-lg font-bold leading-none">{name}</h3>
                <BadgeCheck className="h-4 w-4 shrink-0 text-wa" />
              </div>
              <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-white/85">
                <MapPin className="h-3 w-3" /> {location}
              </p>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-2 border-b border-ink/8 px-3 py-2.5">
            <span className="flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-ink">
              <Star className="h-3 w-3 fill-gold text-gold" /> {trade.rating}
              <span className="font-normal text-ink/50">({trade.reviews})</span>
            </span>
            <span className="flex items-center gap-1 text-[9px] font-medium text-ink/50">
              <Clock className="h-3 w-3" /> {trade.hours}
            </span>
          </div>

          {/* Blurb */}
          <p className="px-3 pt-3 text-[11px] leading-relaxed text-ink/70">{trade.blurb}</p>

          {/* Services */}
          <div className="px-3 pt-4">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-display text-[11px] font-bold uppercase tracking-[0.14em]">Services & prices</h4>
              <span className="text-[8px] font-semibold uppercase tracking-widest text-ink/35">ZAR</span>
            </div>
            <ul className="divide-y divide-ink/8 overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm">
              {trade.services.map((service) => (
                <li key={service.name} className="flex items-center justify-between px-3 py-2.5">
                  <span className="text-[11px] font-medium text-ink/80">{service.name}</span>
                  <span className="flex items-center gap-2">
                    <span className="h-px w-4 bg-ink/15" />
                    <span className="font-display text-[11px] font-bold">{service.price}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gallery strip */}
          <div className="mt-4 px-3">
            <h4 className="mb-2 font-display text-[11px] font-bold uppercase tracking-[0.14em]">Recent work</h4>
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={trade.image}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ objectPosition: `${20 + i * 30}% ${30 + i * 20}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sticky WhatsApp CTA */}
          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-ink/10 bg-white/95 px-3 py-2.5 backdrop-blur">
            <motion.div
              animate={{ scale: [1, 1.025, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center gap-2 rounded-full bg-wa py-2.5 text-[11px] font-bold text-white shadow-[0_8px_20px_-6px_rgba(31,191,95,0.6)]"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-white" />
              WhatsApp us to book
            </motion.div>
          </div>
        </div>

        {/* Floating WhatsApp FAB inside screen */}
        <div className="absolute bottom-16 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-wa shadow-lg">
          <MessageCircle className="h-4.5 w-4.5 fill-white text-wa" />
        </div>
      </div>
    </div>
  );
}
