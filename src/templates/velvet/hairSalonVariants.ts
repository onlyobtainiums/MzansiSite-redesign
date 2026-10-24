import type { DesignVariant } from "../types";

export interface HairSalonVariantMeta {
  id: DesignVariant;
  name: string;
  tagline: string;
  accent: string;
  previewLabel: string;
}

export const HAIR_SALON_VARIANTS: HairSalonVariantMeta[] = [
  { id: 1, name: "Hero First", tagline: "Editorial hero, arched photography", accent: "#b98a2f", previewLabel: "Hero-led" },
  { id: 2, name: "Services First", tagline: "Treatment menu leads above the fold", accent: "#b98a2f", previewLabel: "Services first" },
  { id: 3, name: "Trust First", tagline: "Reviews and word-of-mouth up front", accent: "#b98a2f", previewLabel: "Trust builders" },
  { id: 4, name: "Gallery First", tagline: "Recent work grid leads the page", accent: "#b98a2f", previewLabel: "Work gallery" },
  { id: 5, name: "About First", tagline: "Story and craft lead the fold", accent: "#b98a2f", previewLabel: "About the salon" },
  { id: 6, name: "Booking First", tagline: "Sticky booking bar, instant WhatsApp", accent: "#b98a2f", previewLabel: "Book now" },
];

export function getHairSalonVariant(id: number): HairSalonVariantMeta | undefined {
  return HAIR_SALON_VARIANTS.find((v) => v.id === id);
}
