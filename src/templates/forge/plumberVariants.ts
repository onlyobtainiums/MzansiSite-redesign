import type { DesignVariant } from "../types";

export interface PlumberVariantMeta {
  id: DesignVariant;
  name: string;
  tagline: string;
  accent: string;
  previewLabel: string;
}

export const PLUMBER_VARIANTS: PlumberVariantMeta[] = [
  { id: 1, name: "Flow", tagline: "Water-inspired, booking-centred", accent: "#2dd4bf", previewLabel: "Dependable plumbing" },
  { id: 2, name: "Services First", tagline: "Service catalogue leads above the fold", accent: "#2dd4bf", previewLabel: "Services first" },
  { id: 3, name: "Trust First", tagline: "Reviews and accreditation up front", accent: "#2dd4bf", previewLabel: "Trust builders" },
  { id: 4, name: "Gallery First", tagline: "Recent jobs grid leads the page", accent: "#2dd4bf", previewLabel: "Job gallery" },
  { id: 5, name: "About First", tagline: "Story and promise lead the fold", accent: "#2dd4bf", previewLabel: "About the business" },
  { id: 6, name: "Booking First", tagline: "Sticky booking bar, instant WhatsApp", accent: "#2dd4bf", previewLabel: "Book now" },
];

export function getPlumberVariant(id: number): PlumberVariantMeta | undefined {
  return PLUMBER_VARIANTS.find((v) => v.id === id);
}
