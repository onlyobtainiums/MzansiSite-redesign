import type { DesignVariant } from "../types";

export interface HairSalonVariantMeta {
  id: DesignVariant;
  name: string;
  tagline: string;
  accent: string;
  previewLabel: string;
  strategy: string;
}

export const HAIR_SALON_VARIANTS: HairSalonVariantMeta[] = [
  {
    id: 1,
    name: "Velvet",
    tagline: "Hero-first editorial — arched frames, soft serif wordmark, then services and details.",
    accent: "#d8a18c",
    previewLabel: "Hero first",
    strategy: "Hero-first",
  },
  {
    id: 2,
    name: "Forge",
    tagline: "Services-first — full menu commands the page with sticky category rail and mono prices.",
    accent: "#d9f73a",
    previewLabel: "Services first",
    strategy: "Services-first",
  },
  {
    id: 3,
    name: "Savanna",
    tagline: "Trust-first — studio info, first-visit guide and standards upfront.",
    accent: "#3d6650",
    previewLabel: "Trust first",
    strategy: "Trust-first",
  },
  {
    id: 4,
    name: "Praxis",
    tagline: "Gallery-first — dark contact-sheet look-book with numbered plates and featured frame.",
    accent: "#e5cf9f",
    previewLabel: "Gallery first",
    strategy: "Gallery-first",
  },
  {
    id: 5,
    name: "Market",
    tagline: "About-first — a letter from the studio in serif, then the menu and directions.",
    accent: "#e0703f",
    previewLabel: "About first",
    strategy: "About-first",
  },
  {
    id: 6,
    name: "Vital",
    tagline: "Enquiry-first — hair consultation drafted into one WhatsApp message.",
    accent: "#1faf57",
    previewLabel: "Enquiry first",
    strategy: "Enquiry-first",
  },
];

export function getHairSalonVariant(id: number): HairSalonVariantMeta | undefined {
  return HAIR_SALON_VARIANTS.find((v) => v.id === id);
}
