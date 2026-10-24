/**
 * Barber template pack — image with shimmer placeholder (adapted for MzansiSite).
 * Mirrors the pack's src/components/SmartImage.tsx.
 */

import { useState } from "react";
import { cn } from "./cn";

export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn("relative overflow-hidden", !loaded && "mz-img-loading", className)}>
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading={eager ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName,
        )}
      />
    </div>
  );
}
