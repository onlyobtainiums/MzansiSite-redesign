import type { ServiceItem, SocialLinks } from "@/db/schema";

/** A customer review rendered in the template. */
export interface ReviewItem {
  quote: string;
  name: string;
  label?: string; // e.g. "Property transfer" or "Repeat client"
}

/** Everything a template needs to render a finished storefront. */
export interface SiteData {
  businessName: string;
  tagline: string;
  industry: string; // IndustryKey
  area: string;
  hours: string;
  whatsapp: string;
  phone?: string;
  email?: string;
  logoUrl?: string;
  heroImageUrl: string;
  galleryUrls: string[];
  services: ServiceItem[];
  socials: SocialLinks;
  rating?: string;
  reviews?: number;
  yearsInBusiness?: number;
  isDemo?: boolean;

  /** ——— Dynamic copy so every template adapts to the industry ——— */
  /** Short noun for the service category: "work", "treatments", "menu" */
  serviceNoun?: string;
  /** Gallery section heading: "Recent work", "Our dishes", "Portfolio" */
  galleryHeading?: string;
  /** About / promise quote shown in the dark split section */
  aboutQuote?: string;
  /** Review section heading: "What clients say", "Guest book" */
  reviewHeading?: string;
  /** 3 realistic customer reviews */
  reviewItems?: ReviewItem[];
  /** Guarantee or trust banner text */
  guarantee?: string;
}

export type TemplateStatus = "live" | "phase-2" | "phase-3";

export interface TemplateMeta {
  id: string;
  name: string;
  family: string;
  description: string;
  status: TemplateStatus;
  statusLabel: string;
  /** Industries this design is purpose-built for (see industries.ts). */
  industries: string[];
  previewIndustry: string;
  accent: string;
  palette: string[];
}

/** Format any SA number into a wa.me deep link. */
export function waLink(phone: string, message?: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `27${digits.slice(1)}`;
  if (!digits.startsWith("27")) digits = `27${digits}`;
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Nicely formatted display number: 082 123 4567 */
export function displayPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  return phone;
}
