/**
 * Barber template pack — shared utilities (adapted for MzansiSite).
 * Mirrors the pack's src/lib/utils.ts but reuses MzansiSite's waLink/telLink/mailLink from types.
 */
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "./limits";

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
  const rows = hours.split(/ · |\n/).filter(Boolean);
  return rows.map((row, i) => {
    const parts = row.trim().split(/\s{2,}|(?<=[a-zA-Z])\s+(?=\d)/);
    if (parts.length >= 2) {
      return { id: `hour-${i}`, label: parts[0].trim(), value: parts.slice(1).join(" ").trim() };
    }
    return { id: `hour-${i}`, label: row.trim(), value: "" };
  });
}

/** Digits only, e.g. 27825550147 */
export function sanitisePhone(value: string): string {
  return value.replace(/[^\d]/g, "").replace(/^0/, "27");
}

/** Validation result for a WhatsApp number. */
export type WhatsAppCheck = { ok: true } | { ok: false; message: string };

export function validateWhatsApp(value: string): WhatsAppCheck {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return { ok: false, message: "Enter a WhatsApp number." };
  if (digits.length < 10 || digits.length > 15)
    return { ok: false, message: "Use international format, e.g. 082 555 0147 or +27 82 555 0147." };
  return { ok: true };
}

/** Validate an image File; returns an error message or null when valid. */
export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type))
    return `"${file.name}" is ${file.type || "an unknown type"} — please use JPG, PNG or WebP.`;
  if (file.size > MAX_IMAGE_BYTES)
    return `"${file.name}" is ${(file.size / 1024 / 1024).toFixed(1)} MB — the limit is 4 MB per image.`;
  return null;
}

export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
    reader.readAsDataURL(file);
  });
}
