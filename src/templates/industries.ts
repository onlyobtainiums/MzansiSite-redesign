/**
 * Exhaustive industry catalog for MzansiSite.
 * Every industry is mapped to a default "Best Match" template,
 * though customers can cycle through all 6 live designs.
 */
export interface Industry {
  key: string;
  label: string;
  templateId: string;
}

export const INDUSTRIES: Record<string, { label: string; templateId: string }> = {
  // ——— Popular for salons & beauty ———
  hairSalon: { label: "Hair Salon", templateId: "velvet" },
  barber: { label: "Barber", templateId: "velvet" },
  spa: { label: "Spa / Massage Therapy", templateId: "velvet" },

  // ——— Every other trade ———
  plumber: { label: "Plumber", templateId: "forge" },
  electrician: { label: "Electrician", templateId: "forge" },
  handyman: { label: "Handyman", templateId: "forge" },
  painter: { label: "Painter", templateId: "forge" },
  carpenter: { label: "Carpenter", templateId: "forge" },
  roofer: { label: "Roofer", templateId: "forge" },
  cleaning: { label: "Cleaning Service", templateId: "vital" },
  solar: { label: "Solar Installer", templateId: "forge" },
  applianceRepair: { label: "Appliance Repair", templateId: "forge" },
  aircon: { label: "Air Conditioning", templateId: "forge" },
  pestControl: { label: "Pest Control", templateId: "vital" },
  landscaper: { label: "Landscaper / Garden Service", templateId: "forge" },
  hardware: { label: "Hardware Store", templateId: "market" },
  waste: { label: "Waste Management / Recycling", templateId: "forge" },

  // ——— Auto & Transport ———
  mechanic: { label: "Auto Mechanic", templateId: "forge" },
  carWash: { label: "Car Wash", templateId: "forge" },
  towing: { label: "Towing Service", templateId: "forge" },
  drivingSchool: { label: "Driving School", templateId: "vital" },
  movingCompany: { label: "Moving Company", templateId: "vital" },
  courier: { label: "Courier / Delivery Service", templateId: "vital" },

  // ——— Health ———
  doctor: { label: "Doctor", templateId: "praxis" },
  dentist: { label: "Dentist / Orthodontist", templateId: "praxis" },
  physio: { label: "Physiotherapist / Chiropractor", templateId: "praxis" },
  optometrist: { label: "Optometrist / Eye Care", templateId: "praxis" },
  pharmacy: { label: "Pharmacy", templateId: "market" },
  psychologist: { label: "Mental Health / Psychologist", templateId: "praxis" },

  // ——— Food ———
  restaurant: { label: "Restaurant / Shisanyama", templateId: "savanna" },
  coffeeShop: { label: "Coffee Shop & Café", templateId: "savanna" },
  bakery: { label: "Bakery / Home Bakery", templateId: "market" },
  catering: { label: "Catering Company", templateId: "savanna" },

  // ——— Tourism ———
  guestHouse: { label: "Guest House / B&B", templateId: "savanna" },
  lodge: { label: "Lodge / Safari / Game Reserve", templateId: "savanna" },
  tourGuide: { label: "Tour Guide / Tour Operator", templateId: "savanna" },

  // ——— Pets ———
  grocery: { label: "Grocery / Spaza Shop", templateId: "market" },
  vet: { label: "Veterinarian / Vet Clinic", templateId: "praxis" },
  dogTraining: { label: "Dog Training & Behaviour", templateId: "vital" },
  petBoarding: { label: "Pet Boarding / Kennels", templateId: "savanna" },

  // ——— Professional ———
  lawyer: { label: "Lawyer / Legal Firm", templateId: "praxis" },
  accountant: { label: "Accountant / Tax Practitioner", templateId: "praxis" },
  realEstate: { label: "Real Estate Agency", templateId: "praxis" },
  securityCompany: { label: "Security Company", templateId: "forge" },
  selfStorage: { label: "Self-Storage Facility", templateId: "forge" },

  // ——— Education ———
  daycare: { label: "Daycare / Crèche", templateId: "velvet" },
  preSchool: { label: "Pre-School / Nursery School", templateId: "velvet" },
  tutor: { label: "Tutor & Academic Coaching", templateId: "praxis" },

  // ——— Events & Misc ———
  eventPlanner: { label: "Event Planner & Coordinator", templateId: "velvet" },
  florist: { label: "Florist & Flower Shop", templateId: "velvet" },
  funeralHome: { label: "Funeral Home / Parlour", templateId: "praxis" },
  gym: { label: "Gym & Fitness Studio", templateId: "vital" },
  sportsAcademy: { label: "Sports Academy / Coaching", templateId: "vital" },

  // ——— Heavy ———
  construction: { label: "Construction & Civils", templateId: "forge" },
  farm: { label: "Farm / Agricultural Business", templateId: "vital" },
  golfClub: { label: "Golf Club / Sports Club", templateId: "savanna" },
};

export const INDUSTRY_LIST = Object.entries(INDUSTRIES).map(([key, v]) => ({
  key,
  label: v.label,
  templateId: v.templateId,
}));

export function industryLabel(key: string): string {
  return INDUSTRIES[key]?.label ?? key;
}
