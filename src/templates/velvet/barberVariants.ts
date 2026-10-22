import type { DesignVariant } from "../types";

export interface BarberVariantMeta {
  id: DesignVariant;
  name: string;
  tagline: string;
  accent: string;
  previewLabel: string;
}

export const BARBER_VARIANTS: BarberVariantMeta[] = [
  { id: 1, name: "Executive", tagline: "Charcoal & brass — sharp, trusted", accent: "#c9a25a", previewLabel: "Stay sharp" },
  { id: 2, name: "Minimalist", tagline: "Ivory & ink — calm, modern", accent: "#0f1113", previewLabel: "Clean cut" },
  { id: 3, name: "Classic", tagline: "Wood & cream — timeless heritage", accent: "#8b5a2b", previewLabel: "Heritage" },
  { id: 4, name: "Urban", tagline: "Concrete & neon — street energy", accent: "#ff3b30", previewLabel: "Urban edge" },
  { id: 5, name: "Studio", tagline: "Light & glass — modern studio", accent: "#0ea5e9", previewLabel: "Studio" },
  { id: 6, name: "Bold", tagline: "Black & gold — loud, proud", accent: "#facc15", previewLabel: "Bold" },
];

export function getBarberVariant(id: number): BarberVariantMeta | undefined {
  return BARBER_VARIANTS.find((v) => v.id === id);
}
