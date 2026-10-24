"use client";

import { useState } from "react";

/**
 * Renders an image with a graceful fallback when the source fails to load.
 * Instead of a broken image icon, a solid-colour placeholder with the alt text
 * is shown. Honest about the missing image — no fabricated imagery.
 */
export function ImageWithFallback({
  src,
  alt,
  className = "",
  fallbackClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-[#e2e8f0] text-[#64748b] ${fallbackClassName}`}
        aria-label={`Image unavailable: ${alt}`}
      >
        <span className="text-sm font-medium text-[#64748b]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
