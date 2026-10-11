import type { TemplateMeta } from "./types";
export type { TemplateMeta };

/**
 * The 6-design template system. Two designs ship per stage so the platform
 * stays stable — stages 2 and 3 are previewed as "coming" cards.
 */
export const TEMPLATES: TemplateMeta[] = [
  {
    id: "velvet",
    name: "Velvet",
    family: "Beauty & Wellness",
    description:
      "Editorial luxe for salons, spas, nail and lash studios. Arched photography, menu-style pricing and a book-in-one-tap flow.",
    status: "live",
    statusLabel: "Live now",
    industries: ["hairSalon", "barber", "spa", "florist", "eventPlanner", "daycare", "preSchool"],
    previewIndustry: "hairSalon",
    accent: "#b98a2f",
    palette: ["#f6efe6", "#241a12", "#b98a2f", "#c17857"],
  },
  {
    id: "forge",
    name: "Forge",
    family: "Trades & Construction",
    description:
      "Rugged, high-trust design for plumbers, electricians, builders and heavy industry. Big numbers, bold promises, 24/7 call-out energy.",
    status: "live",
    statusLabel: "Live now",
    industries: ["plumber", "electrician", "handyman", "painter", "carpenter", "roofer", "solar", "mechanic", "construction", "security"],
    previewIndustry: "plumber",
    accent: "#ffc400",
    palette: ["#16181a", "#ffc400", "#eceae3", "#5b6570"],
  },
  {
    id: "savanna",
    name: "Savanna",
    family: "Hospitality & Tourism",
    description:
      "Warm, wanderlust layouts for guesthouses, shuttles, tour operators and eateries. Full-bleed imagery and enquiry-first flow.",
    status: "live",
    statusLabel: "Live now",
    industries: ["guestHouse", "lodge", "tourGuide", "restaurant", "coffeeShop", "catering", "golfClub", "petBoarding"],
    previewIndustry: "guestHouse",
    accent: "#d97b2b",
    palette: ["#1d241a", "#f5ead8", "#d97b2b", "#8a9a6b"],
  },
  {
    id: "praxis",
    name: "Praxis",
    family: "Professional & Finance",
    description:
      "Crisp, credibility-first pages for law, accounting, consulting, finance and insurance. Structured, serif-led, boardroom ready.",
    status: "live",
    statusLabel: "Live now",
    industries: ["lawyer", "accountant", "realEstate", "doctor", "dentist", "physio", "optometrist", "psychologist", "vet", "tutor", "funeralHome"],
    previewIndustry: "lawyer",
    accent: "#1f3a5f",
    palette: ["#f4f2ec", "#101c2c", "#1f3a5f", "#a8895b"],
  },
  {
    id: "market",
    name: "Market",
    family: "Retail & Commerce",
    description:
      "Product-led storefronts for retail, e-commerce, wholesale and manufacturing. Catalogue grids, specials and WhatsApp ordering.",
    status: "live",
    statusLabel: "Live now",
    industries: ["bakery", "grocery", "hardware", "pharmacy"],
    previewIndustry: "bakery",
    accent: "#e0402a",
    palette: ["#fbf7ef", "#191406", "#e0402a", "#2f7d4f"],
  },
  {
    id: "vital",
    name: "Vital",
    family: "Services & Utilities",
    description:
      "Clean, versatile service design for IT, telecoms, transport, agriculture and general services. Card-driven and endlessly adaptable.",
    status: "live",
    statusLabel: "Live now",
    industries: ["cleaning", "courier", "gym", "drivingSchool", "dogTraining", "movingCompany", "pestControl", "sportsAcademy", "farm"],
    previewIndustry: "cleaning",
    accent: "#0e7a5f",
    palette: ["#f2f6f3", "#0c1d18", "#0e7a5f", "#d9a62e"],
  },
];

export function getTemplate(id: string): TemplateMeta | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export const LIVE_TEMPLATES = TEMPLATES.filter((t) => t.status === "live");
