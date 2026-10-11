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
