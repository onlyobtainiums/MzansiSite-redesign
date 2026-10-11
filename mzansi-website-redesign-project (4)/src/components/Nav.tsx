"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, LayoutDashboard, UserRound } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/firebase/AuthProvider";
import MzansiLogo from "./MzansiLogo";
import { scrollToId } from "./SmoothScroll";

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-bone/85 shadow-[0_1px_0_rgba(17,19,12,0.1)] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10">
        <button
          onClick={() => scrollToId("#top")}
          className="group flex items-center gap-2.5"
          aria-label="MzansiSite home"
        >
          <MzansiLogo size={36} wordmark />
        </button>

        <div className="hidden items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.14em] md:flex">
          {[
            ["Why", "#why"],
            ["Demo", "#demo"],
            ["Pricing", "#pricing"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <button key={href} onClick={() => scrollToId(href)} className="link-sweep">
              {label}
            </button>
          ))}
          <Link href="/templates" className="link-sweep text-flame">
            Templates
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="hidden items-center gap-2 rounded-full border-2 border-ink/15 px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:border-ink md:flex"
            >
              <LayoutDashboard className="h-4 w-4 text-flame" />
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth"
              className="hidden items-center gap-2 rounded-full border-2 border-ink/15 px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:border-ink md:flex"
            >
              <UserRound className="h-4 w-4" />
              Sign in
            </Link>
          )}
          <button
            onClick={() => scrollToId("#builder")}
            className="group flex items-center gap-2 rounded-full bg-flame px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-bone shadow-[0_10px_24px_-8px_rgba(255,77,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-flame-deep hover:shadow-[0_16px_30px_-8px_rgba(255,77,0,0.65)] md:px-5 md:text-[13px]"
          >
            Build free
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
