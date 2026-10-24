import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES } from '../config/limits';

export function uid(): string {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
}

/** Digits only, e.g. 27825550147 */
export function sanitisePhone(value: string): string {
  return value.replace(/[^\d]/g, '').replace(/^0/, '27');
}

export function waLink(whatsappDigits: string, message: string): string {
  return `https://wa.me/${sanitisePhone(whatsappDigits)}?text=${encodeURIComponent(message)}`;
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function mailLink(email: string): string {
  return `mailto:${email.trim()}`;
}

export type WhatsAppCheck = { ok: true } | { ok: false; message: string };

export function validateWhatsApp(value: string): WhatsAppCheck {
  const digits = value.replace(/[^\d]/g, '');
  if (!digits) return { ok: false, message: 'Enter a WhatsApp number.' };
  if (digits.length < 10 || digits.length > 15)
    return { ok: false, message: 'Use international format, e.g. 082 555 0147 or +27 82 555 0147.' };
  return { ok: true };
}

/** Validate an image File; returns an error message or null when valid. */
export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type))
    return `"${file.name}" is ${file.type || 'an unknown type'} — please use JPG, PNG or WebP.`;
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

/** Split a textarea value into paragraphs for rendering. */
export function paragraphs(text: string): string[] {
  return text.split(/\n+/).map((p) => p.trim()).filter(Boolean);
}

export function formatCount(n: number, singular: string, plural?: string): string {
  return `${n} ${n === 1 ? singular : plural ?? singular + 's'}`;
}
