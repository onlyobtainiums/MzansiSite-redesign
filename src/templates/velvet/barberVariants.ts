import type { DesignVariant } from "../types";

export interface BarberVariantMeta {
  id: DesignVariant;
  name: string;
  tagline: string;
  accent: string;
  previewLabel: string;
  strategy: string;
}

export const BARBER_VARIANTS: BarberVariantMeta[] = [
  {
    id: 1,
    name: "Velvet",
    tagline: "Hero-first editorial — your name in the lights, then menu, frames and visiting details.",
    accent: "#c8a05c",
    previewLabel: "Hero first",
    strategy: "Hero-first",
  },
  {
    id: 2,
    name: "Forge",
    tagline: "Services-first industrial — your price list leads with category tabs, dotted leaders and plain numbers.",
    accent: "#ff4d00",
    previewLabel: "Services first",
    strategy: "Services-first",
  },
  {
    id: 3,
    name: "Savanna",
    tagline: "Trust-first — hours, location and house standards upfront. Credentials only when they’re real.",
    accent: "#b65b2e",
    previewLabel: "Trust first",
    strategy: "Trust-first",
  },
  {
    id: 4,
    name: "Praxis",
    tagline: "Gallery-first portfolio — big featured frame, loose grid, honest empty states.",
    accent: "#2e4bff",
    previewLabel: "Gallery first",
    strategy: "Gallery-first",
  },
  {
    id: 5,
    name: "Market",
    tagline: "About-first — your story in chapters with drop-cap, then services and where to find you.",
    accent: "#1f3d2b",
    previewLabel: "About first",
    strategy: "About-first",
  },
  {
    id: 6,
    name: "Vital",
    tagline: "Enquiry-first — contact is the homepage. WhatsApp front and centre plus a clear enquiry form.",
    accent: "#0c3226",
    previewLabel: "Enquiry first",
    strategy: "Enquiry-first",
  },
];

export function getBarberVariant(id: number): BarberVariantMeta | undefined {
  return BARBER_VARIANTS.find((v) => v.id === id);
}
