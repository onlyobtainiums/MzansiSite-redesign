/**
 * Barber template pack — shared utilities (adapted for MzansiSite).
 * Mirrors the pack's src/lib/utils.ts but reuses MzansiSite's waLink from types.
 */

export function uid(): string {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
}

/** Split a textarea value into paragraphs for rendering. */
export function paragraphs(text: string): string[] {
  return text.split(/\n+/).map((p) => p.trim()).filter(Boolean);
}

/** Parse a MzansiSite hours string ("Mon – Fri 08:30 – 18:00") into HourRow[]. */
export interface HourRow {
  id: string;
  label: string;
  value: string;
}

export function parseHours(hours: string | undefined): HourRow[] {
  if (!hours) return [];
  // Split on " · " or newlines to get day-range + time pairs
  const rows = hours.split(/ · |\n/).filter(Boolean);
  return rows.map((row, i) => {
    const parts = row.trim().split(/\s{2,}|(?<=[a-zA-Z])\s+(?=\d)/);
    if (parts.length >= 2) {
      return { id: `hour-${i}`, label: parts[0].trim(), value: parts.slice(1).join(" ").trim() };
    }
    return { id: `hour-${i}`, label: row.trim(), value: "" };
  });
}
