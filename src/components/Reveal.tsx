"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper — replaces the framer-motion version.
 *
 * framer-motion's `whileInView` cost ~65 KB gzipped on the marketing pages and
 * shipped to every customer's public site too. The behaviour it provided here
 * is a fade plus a short rise, which an IntersectionObserver and a CSS
 * transition do natively — on the compositor, off the main thread, which is
 * the thread a low-end phone is already busy with while parsing the page.
 *
 * Kept the original API on purpose: eleven components import this, so their
 * call sites did not have to change.
 *
 * Behaviour matches the old implementation:
 *   - starts hidden (opacity 0, offset by `y`)
 *   - reveals once, roughly when the element is 12% into the viewport
 *   - `delay` staggers siblings
 *
 * Two safety nets the framer-motion version did not have: a short-circuit for
 * prefers-reduced-motion, and a failsafe timer so content can never stay
 * invisible if the observer never fires.
 */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** Also animate from a smaller scale, e.g. for a badge appearing. */
  scale?: number;
  /** Seconds. Matches the duration previously passed to framer-motion. */
  duration?: number;
  className?: string;
  once?: boolean;
  /**
   * Element to render. Used where the reveal must be a grid item or keep
   * semantic markup (<article> for template cards). Cast internally because
   * the inline styles and ref are identical for every HTML element here.
   */
  as?: "div" | "article" | "section" | "span";
}

export default function Reveal({
  children,
  delay = 0,
  y = 36,
  scale,
  duration = 0.9,
  className = "",
  once = true,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { rootMargin: "-12% 0px" },
    );

    io.observe(el);

    /*
     * Failsafe. Some in-app browsers (the ones people actually reach a
     * WhatsApp-linked site from) have flaky IntersectionObserver behaviour. A
     * section stuck at opacity 0 is far worse than one that appears without an
     * animation, so show it regardless after a moment.
     */
    const failsafe = window.setTimeout(() => setShown(true), 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [once]);

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown
          ? "none"
          : `translateY(${y}px)${scale === undefined ? "" : ` scale(${scale})`}`,
        transition: `opacity ${duration}s ${ease} ${delay}s, transform ${duration}s ${ease} ${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Splits a headline into words and rises them from behind a mask.
 *
 * Same effect as before: each word sits in an overflow-hidden box and slides up
 * from 110%, staggered by index. One observer drives the whole line rather than
 * one animation value per word.
 */
export function RiseWords({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "-8% 0px" },
    );

    io.observe(el);
    const failsafe = window.setTimeout(() => setShown(true), 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden pb-[0.08em] align-bottom">
          <span
            className="inline-block will-change-transform"
            aria-hidden
            style={{
              transform: shown ? "none" : "translateY(110%)",
              transition: `transform 0.85s ${ease} ${delay + i * 0.055}s`,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
