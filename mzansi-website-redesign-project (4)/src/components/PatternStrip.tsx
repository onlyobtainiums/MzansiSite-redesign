interface PatternStripProps {
  className?: string;
}

/**
 * Ndebele-inspired geometric band used as a section divider.
 */
export default function PatternStrip({ className = "" }: PatternStripProps) {
  const colors = ["#ff4d00", "#11130c", "#e3a72f", "#1fbf5f", "#11130c", "#c96f3f"];
  const triangles = Array.from({ length: 48 }, (_, i) => ({
    x: i * 24,
    color: colors[i % colors.length],
    up: i % 2 === 0,
  }));

  return (
    <div className={`overflow-hidden border-y-2 border-ink bg-bone ${className}`} aria-hidden>
      <svg width="100%" height="26" viewBox="0 0 1152 26" preserveAspectRatio="none" className="block h-[26px] w-full min-w-[1152px]">
        {triangles.map((t, i) => (
          <polygon
            key={i}
            points={t.up ? `${t.x},26 ${t.x + 12},2 ${t.x + 24},26` : `${t.x},0 ${t.x + 12},24 ${t.x + 24},0`}
            fill={t.color}
          />
        ))}
      </svg>
    </div>
  );
}
