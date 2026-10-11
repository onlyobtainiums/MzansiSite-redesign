"use client";

import Link from "next/link";

import { ArrowUpRight, LayoutDashboard, Menu, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/firebase/AuthProvider";
import MzansiLogo from "./MzansiLogo";
import { scrollToId } from "./SmoothScroll";

const SECTIONS: [string, string][] = [
  ["Why", "#why"],
  ["Demo", "#demo"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  /*
   * A passive scroll listener replaces framer-motion's scroll value. Passive
   * means the browser never has to wait for this handler before scrolling, and
   * it only ever flips a boolean, so it does no work per frame.
   */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu, as it would a dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header
      style={{ ["--mz-delay" as string]: "0.2s" }}
      className={`mz-in-down fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "bg-bone/90 shadow-[0_1px_0_rgba(17,19,12,0.1)] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-5 py-4 md:px-10">
        <button
          onClick={() => go("#top")}
          className="group flex min-w-0 items-center gap-2.5"
          aria-label="MzansiSite home"
        >
          {/*
            Icon only on phones. Logo + wordmark (~156px) + "Build free"
            (~144px) + the menu button (~40px) + padding and gaps needs about
            400px, so on a 390px phone the wordmark was being squeezed under the
            orange button. There is room again from 640px up.
          */}
          <span className="hidden sm:block">
            <MzansiLogo size={36} wordmark />
          </span>
          <span className="sm:hidden">
            <MzansiLogo size={34} wordmark={false} />
          </span>
        </button>

        {/*
          The full row needs roughly 900px: logo, five links, Sign in and the
          orange button. It used to appear at md (768px), where it did not fit —
          links ran into the logo and "Sign in" wrapped to two lines. Below lg
          the links live in the menu button instead.
        */}
        <div className="hidden items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.14em] lg:flex">
          {SECTIONS.map(([label, href]) => (
            <button key={href} onClick={() => scrollToId(href)} className="link-sweep">
              {label}
            </button>
          ))}
          <Link href="/templates" className="link-sweep text-flame">
            Templates
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="hidden items-center gap-2 rounded-full border-2 border-ink/15 px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:border-ink lg:flex"
            >
              <LayoutDashboard className="h-4 w-4 text-flame" />
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth"
              className="hidden items-center gap-2 rounded-full border-2 border-ink/15 px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:border-ink lg:flex"
            >
              <UserRound className="h-4 w-4" />
              Sign in
            </Link>
          )}
          <button
            onClick={() => go("#builder")}
            className="group flex items-center gap-2 rounded-full bg-flame px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-bone shadow-[0_10px_24px_-8px_rgba(255,77,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-flame-deep hover:shadow-[0_16px_30px_-8px_rgba(255,77,0,0.65)] md:px-5 md:text-[13px]"
          >
            Build free
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Without this the section links were unreachable on a phone. */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink/15 transition-colors hover:border-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mz-mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mz-mobile-menu" className="mz-in-down border-t border-ink/10 px-5 pb-5 pt-2 md:px-10 lg:hidden">
          <div className="flex flex-col">
            {SECTIONS.map(([label, href]) => (
              <button
                key={href}
                onClick={() => go(href)}
                className="border-b border-ink/10 py-3.5 text-left text-sm font-bold uppercase tracking-[0.14em]"
              >
                {label}
              </button>
            ))}
            <Link
              href="/templates"
              onClick={() => setOpen(false)}
              className="border-b border-ink/10 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-flame"
            >
              Templates
            </Link>
            <Link
              href={user ? "/dashboard" : "/auth"}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3.5 text-sm font-bold uppercase tracking-[0.14em]"
            >
              {user ? <LayoutDashboard className="h-4 w-4 text-flame" /> : <UserRound className="h-4 w-4" />}
              {user ? "Dashboard" : "Sign in"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
