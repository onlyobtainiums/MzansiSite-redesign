"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The templates' scroll-reveal wrapper — without an animation library.
 *
 * Every template used to define its own `Up` around framer-motion's
 * `whileInView`. That pulled framer-motion into the bundle of every customer
 * website (six templates, one import each) so that a visitor could watch a
 * paragraph fade in. framer-motion is ~47 KB gzipped on a customer's page, and
 * its reveal animations run from JS on the main thread — which is exactly the
 * thread a low-end phone is already struggling with while it parses and paints.
 *
 * This does the same job with an IntersectionObserver and a CSS transition, so
 * the compositor handles the animation and no animation library is shipped.
 *
 * Behaviour is deliberately identical to the old component:
 *   - starts hidden (opacity 0, shifted down by `y`)
 *   - reveals once, when the element is ~10% into the viewport
 *   - `delay` staggers siblings, e.g. gallery tiles
 *
 * One safety net the old version lacked: if IntersectionObserver is missing, or
 * the element never intersects (some in-app webviews), the content still
 * becomes visible rather than staying stuck at opacity 0.
 */
export function Up({
  children,
  delay = 0,
  className = "",
  y = 30,
  duration = 0.8,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect the OS setting: no movement, no waiting.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
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
      { rootMargin: "-10% 0px" },
    );

    io.observe(el);

    /*
     * Failsafe: if nothing has triggered the reveal shortly after mount the
     * observer is not doing its job in this browser, so show the content
     * anyway. A blank section is far worse than an unattractive animation.
     */
    const failsafe = window.setTimeout(() => setShown(true), 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity ${duration}s ${ease} ${delay}s, transform ${duration}s ${ease} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default Up;
