import { Asterisk } from "lucide-react";
import type { ReactNode } from "react";

interface MarqueeProps {
  items: string[];
  className?: string;
  slow?: boolean;
  inverted?: boolean;
}

export default function Marquee({ items, className = "", slow = false, inverted = false }: MarqueeProps) {
  const row = (key: string): ReactNode => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${key}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="px-5 font-display text-sm font-bold uppercase tracking-[0.22em] md:text-base">{item}</span>
          <Asterisk className={`h-4 w-4 ${inverted ? "text-flame" : "text-gold"}`} />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div className={`marquee-track ${slow ? "slow" : ""}`}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
