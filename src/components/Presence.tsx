"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Mount-on-show, unmount-after-exit — replacing `AnimatePresence` + `exit`.
 *
 * A component that animates out cannot be removed from the tree the moment its
 * `show` flag flips, or there is nothing left to animate. This keeps it mounted
 * for the length of the exit transition, then drops it.
 *
 * The transition itself is CSS, driven by the `data-state` attribute, so the
 * animation runs on the compositor. Pass the animation class in `className`:
 * `mz-presence` for a simple fade, or `mz-modal` for an overlay + sheet whose
 * two halves animate independently via [data-state] child selectors.
 */
export default function Presence({
  show,
  duration = 300,
  className = "",
  children,
}: {
  show: boolean;
  /** Milliseconds — must match the transition duration in globals.css. */
  duration?: number;
  className?: string;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(show);
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setMounted(true);
      /*
       * Enter on the next frame. If the element mounts and becomes visible in
       * the same paint there is no transition to run — the browser only
       * animates between two rendered states.
       */
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), duration);
    return () => window.clearTimeout(timer);
  }, [show, duration]);

  if (!mounted) return null;

  return (
    <div
      className={className}
      data-state={visible ? "in" : "out"}
      style={{ ["--mz-dur" as string]: `${duration}ms` }}
    >
      {children}
    </div>
  );
}
