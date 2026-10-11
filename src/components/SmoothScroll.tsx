"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";

let lenisRef: Lenis | null = null;

export function scrollToId(target: string) {
  if (lenisRef) {
    lenisRef.scrollTo(target, { offset: -72, duration: 1.5 });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    /*
     * Mouse/trackpad only — the same guard Cursor.tsx already uses.
     *
     * Lenis drives itself from a requestAnimationFrame loop that runs for the
     * whole life of the page. On a phone there is nothing for it to smooth:
     * touch scrolling is already native and GPU-accelerated, so the loop just
     * burns CPU and battery on the device least able to spare it and makes
     * scrolling feel heavier, not lighter. Touch devices now keep the browser's
     * own scrolling.
     *
     * scrollToId() already falls back to scrollIntoView when lenis is absent.
     */
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wantsMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || !wantsMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef = null;
    };
  }, []);

  return <>{children}</>;
}
