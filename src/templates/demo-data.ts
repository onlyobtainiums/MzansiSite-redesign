import type { SiteData } from "./types";

type DemoInput = Partial<SiteData> & { industry: string };

/* ——— Pexels URL helpers ——— */
const px = (id: number, w = 800, h = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=${h}&w=${w}&fm=webp`;
const pxWide = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200&fm=webp`;
const pxSq = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900&fm=webp`;
const pxT = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800&fm=webp`;

/* ——— Photo ID banks per category ———
 * Audited 2025-10: All default imagery now uses modest, non-human subjects:
 * products, professional tools, salon equipment, workspaces, shop interiors,
 * buildings, materials, nature and abstract geometric artwork.
 * No human faces/models, no sexualised imagery, no autoplay audio/video.
 * Example replacements: salon chairs/mirrors instead of models, tool benches
 * instead of technicians, clinic interiors instead of practitioners, food
 * flat-lays instead of diners, lodge exteriors instead of guests.
 */
// Beauty — salon interiors, tools, products, workspaces (no models)
const BEAUTY_IDS    = [3184296, 3212167, 3993446, 3993467, 7750119, 3997983];
const BARBER_IDS    = [897271, 10775078, 13809242, 7697221, 1319460, 4449799];
const SPA_IDS       = [6621334, 6187471, 3997983, 6186744, 6187305, 6187256];
// Trades — tools, materials, workspaces (no people)
const TRADE_IDS     = [221902, 2769743, 1216589, 1108109, 356040, 221902];
const PAINT_IDS     = [6474135, 7217975, 7217974, 6474135, 7217975, 7217974];
const CLEAN_IDS     = [6196235, 33701232, 6197106, 6196235, 33701232, 6197106];
const SOLAR_IDS     = [11645008, 11644973, 6961215, 11645008, 11644973, 6961215];
// Auto — workshop tools, vehicle details, interiors (no drivers)
const MECH_IDS      = [3806288, 190574, 244206, 3806288, 190574, 244206];
const CAR_WASH_IDS  = [4870707, 6872601, 4870691, 4870707, 6872601, 4870691];
// Health — clinic interiors, equipment, materials (no practitioners/patients)
const MEDICAL_IDS   = [40568, 7089401, 3938023, 3952248, 263402, 40568];
const DENTAL_IDS    = [6627524, 3844581, 6627483, 3844581, 6627524, 6627483];
const VET_IDS       = [1805168, 7469231, 28644631, 1805168, 7469231, 28644631];
// Food & Tourism — dishes/ingredients/flat-lays, building exteriors, landscapes (no diners)
const REST_IDS      = [958545, 1640777, 958545, 1099680, 958545, 1640777];
const CAFE_IDS      = [1307698, 1695052, 585752, 1307698, 1695052, 585752];
const BAKERY_IDS    = [1571075, 1079020, 4881596, 1571075, 1079020, 4881596];
const CATER_IDS     = [7245469, 38742724, 38549538, 7245469, 38742724, 38549538];
const LODGE_IDS     = [258154, 417074, 258154, 417074, 338504, 338504];
// Pet — pet accessories, kennel interiors, nature (no owner faces)
const PET_IDS       = [1805168, 7469231, 28644631, 1805168, 7469231, 28644631];
// Professional — office interiors, documents, buildings (no lawyers/accountants posing)
const LEGAL_IDS     = [566040, 4427430, 566040, 4427430, 4427446, 4427446];
const ACCT_IDS      = [6694960, 6694914, 6694960, 6694914, 8052845, 8052845];
const RE_IDS        = [323780, 1396122, 1396122, 323780, 1063999, 1063999];
const SEC_IDS       = [430208, 859013, 430208, 859013, 31282368, 31282368];
// Events — venue interiors, floral arrangements (no guests)
const EVENT_IDS     = [2608517, 17001844, 1190298, 2608517, 17001844, 1190298];
const FLOWER_IDS    = [691339, 931162, 691339, 931162, 34375019, 34375019];
// Gym — equipment, studio interiors, geometric (no flexing models)
const GYM_IDS       = [7917632, 4164836, 414029, 7917632, 4164836, 414029];
// Ag / farm — fields, produce, equipment
const FARM_IDS      = [974314, 2252584, 974314, 2252584, 5425806, 5425806];
// Delivery — vans, parcels, warehouse (no couriers posing)
const DELIV_IDS     = [6169129, 6169047, 6169135, 6169129, 6169047, 6169135];

const gallery = (ids: number[]) => ids.map((id, i) =>
  i === 0 ? pxT(id) : i % 3 === 2 ? pxSq(id) : pxT(id)
);

/* ——— Full BASE dataset — one entry per specific industry ——— */
const BASE: Record<string, SiteData> = {

  /* ════════ BEAUTY ════════ */
  hairSalon: {
    businessName: "Naledi's Braids & Beauty",
    tagline: "Expert knotless braids, silk presses and treatments. Where Soweto comes to glow.",
    industry: "hairSalon", area: "Soweto, Johannesburg",
    hours: "Tue – Sat · 08:00 – 18:00", whatsapp: "0821234567",
    heroImageUrl: pxT(BEAUTY_IDS[0]), galleryUrls: gallery(BEAUTY_IDS),
    services: [
      { name: "Knotless braids", price: "R450", description: "Waist-length, hair included" },
      { name: "Silk press", price: "R380", description: "Wash, treatment & press" },
      { name: "Wash & blow-dry", price: "R180" },
      { name: "Kids cornrows (u12)", price: "R220" },
      { name: "Wig install", price: "R350", description: "Customised lace melt" },
      { name: "Colour treatment", price: "from R550" },
    ],
    socials: { instagram: "https://instagram.com", tiktok: "https://tiktok.com" },
    rating: "4.9", reviews: 132, yearsInBusiness: 7,
  },

  barber: {
    businessName: "Siya's Cuts",
    tagline: "Skin fades, beard sculpting and clean shaves — Khayelitsha's sharpest shop.",
    industry: "barber", area: "Khayelitsha, Cape Town",
    hours: "Mon – Sun · 08:00 – 19:00", whatsapp: "0839876543",
    heroImageUrl: pxT(BARBER_IDS[0]), galleryUrls: gallery(BARBER_IDS),
    services: [
      { name: "Skin fade", price: "R120", description: "Any grade, line-up included" },
      { name: "Cut + beard combo", price: "R180" },
      { name: "Beard sculpt & hot towel", price: "R90" },
      { name: "Kids cut (u12)", price: "R80" },
      { name: "Design / pattern", price: "R50 extra" },
      { name: "House call", price: "R300", description: "Within 10km" },
    ],
    socials: { instagram: "https://instagram.com", tiktok: "https://tiktok.com" },
    rating: "4.8", reviews: 211, yearsInBusiness: 5,
  },

  spa: {
    businessName: "Amara Day Spa",
    tagline: "Massage, facials and glow rituals — Umhlanga's escape from everything.",
    industry: "spa", area: "Umhlanga, Durban",
    hours: "Mon – Sat · 09:00 – 17:00", whatsapp: "0845551234",
    heroImageUrl: pxT(SPA_IDS[0]), galleryUrls: gallery(SPA_IDS),
    services: [
      { name: "Full-body massage", price: "R550", description: "60 min, aromatherapy oils" },
      { name: "Glow facial", price: "R380" },
      { name: "Mani + pedi combo", price: "R420" },
      { name: "Hot stone ritual", price: "R620", description: "75 min deep release" },
      { name: "Couples escape", price: "R1,050", description: "2 people, 90 min" },
      { name: "Back & neck massage", price: "R350", description: "30 min express" },
    ],
    socials: { instagram: "https://instagram.com", facebook: "https://facebook.com" },
    rating: "5.0", reviews: 98, yearsInBusiness: 4,
  },

  /* ════════ TRADES ════════ */
  plumber: {
    businessName: "Dlamini Plumbing",
    tagline: "24/7 geyser repairs, leak detection and drain unblocking across Centurion.",
    industry: "plumber", area: "Centurion, Pretoria",
    hours: "24/7 Emergency call-outs", whatsapp: "0824455667",
    heroImageUrl: pxT(TRADE_IDS[0]), galleryUrls: gallery(TRADE_IDS),
    services: [
      { name: "Emergency call-out", price: "R450", description: "Within 60 min, 24/7" },
      { name: "Geyser repair / install", price: "R950" },
      { name: "Drain unblocking", price: "R650" },
      { name: "Leak detection", price: "R550", description: "Thermal imaging" },
      { name: "Bathroom renovation", price: "from R18,000" },
      { name: "New pipe installation", price: "quoted" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.9", reviews: 167, yearsInBusiness: 11,
  },

  electrician: {
    businessName: "Mokoena Electrical",
    tagline: "Certified electrical repairs, solar installs and COC certificates — same day.",
    industry: "electrician", area: "Roodepoort, Johannesburg",
    hours: "Mon – Sat · 07:00 – 18:00 · 24/7 emergencies", whatsapp: "0813334455",
    heroImageUrl: pxT(TRADE_IDS[1]), galleryUrls: gallery(TRADE_IDS),
    services: [
      { name: "Call-out & diagnosis", price: "R450" },
      { name: "COC certificate", price: "R850" },
      { name: "DB board repair / upgrade", price: "R950" },
      { name: "Lighting installation", price: "R650/room" },
      { name: "Solar & inverter setup", price: "from R24,000" },
      { name: "Pre-sale electrical inspection", price: "R750" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.8", reviews: 143, yearsInBusiness: 9,
  },

  handyman: {
    businessName: "Fix-It Handyman Services",
    tagline: "Leaks, shelves, gates and general maintenance — hourly and day rates available.",
    industry: "handyman", area: "Randburg, Johannesburg",
    hours: "Mon – Sat · 07:00 – 17:00", whatsapp: "0827771234",
    heroImageUrl: pxT(TRADE_IDS[2]), galleryUrls: gallery(TRADE_IDS),
    services: [
      { name: "Hourly rate", price: "R350/hr", description: "1-hour minimum" },
      { name: "Half-day (4 hrs)", price: "R1,200" },
      { name: "Full day", price: "R2,000" },
      { name: "TV wall mount", price: "R450" },
      { name: "Door / lock repair", price: "R350" },
      { name: "Tile replacement", price: "R650" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.8", reviews: 94, yearsInBusiness: 6,
  },

  painter: {
    businessName: "ProFinish Painting",
    tagline: "Interior & exterior painting with clean edges, quality paints and zero mess.",
    industry: "painter", area: "Bellville, Cape Town",
    hours: "Mon – Sat · 07:00 – 17:00", whatsapp: "0836669988",
    heroImageUrl: pxT(PAINT_IDS[0]), galleryUrls: gallery(PAINT_IDS),
    services: [
      { name: "Interior room", price: "from R1,800", description: "Walls only, paint excluded" },
      { name: "Exterior house", price: "from R6,500" },
      { name: "Roof painting", price: "from R4,500" },
      { name: "Waterproofing", price: "from R3,200" },
      { name: "Epoxy garage floor", price: "from R2,800" },
      { name: "Feature wall", price: "R950" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.9", reviews: 78, yearsInBusiness: 8,
  },

  carpenter: {
    businessName: "Makwela Woodworks",
    tagline: "Custom built-in cupboards, kitchens and furniture — made in Mzansi, built to last.",
    industry: "carpenter", area: "Midrand, Gauteng",
    hours: "Mon – Fri · 07:30 – 16:30", whatsapp: "0811112233",
    heroImageUrl: pxT(TRADE_IDS[3]), galleryUrls: gallery(TRADE_IDS),
    services: [
      { name: "Built-in wardrobe", price: "from R4,500/m" },
      { name: "Kitchen cupboards", price: "from R6,500/m" },
      { name: "Custom TV unit", price: "from R3,800" },
      { name: "Deck / patio", price: "from R12,000" },
      { name: "Repair & restoration", price: "quoted" },
      { name: "Site measure & quote", price: "Free" },
    ],
    socials: { instagram: "https://instagram.com" },
    rating: "4.9", reviews: 62, yearsInBusiness: 13,
  },

  roofer: {
    businessName: "TopGuard Roofing",
    tagline: "Leak repairs, IBR and corrugated roofing for homes and businesses.",
    industry: "roofer", area: "Boksburg, Gauteng",
    hours: "Mon – Sat · 07:00 – 17:00", whatsapp: "0845554321",
    heroImageUrl: pxT(TRADE_IDS[4]), galleryUrls: gallery(TRADE_IDS),
    services: [
      { name: "Leak repair", price: "from R950" },
      { name: "Full roof replace (IBR)", price: "from R350/m²" },
      { name: "Fascia & gutters", price: "from R180/m" },
      { name: "Roof inspection & report", price: "R650" },
      { name: "Waterproofing", price: "from R220/m²" },
      { name: "Insulation installation", price: "from R150/m²" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.8", reviews: 55, yearsInBusiness: 10,
  },

  cleaning: {
    businessName: "Sparkle Pro Cleaning",
    tagline: "Home, office and end-of-lease cleaning — arrive dirty, leave spotless.",
    industry: "cleaning", area: "Sandton, Johannesburg",
    hours: "Mon – Sat · 07:00 – 17:00", whatsapp: "0722225566",
    heroImageUrl: pxT(CLEAN_IDS[0]), galleryUrls: gallery(CLEAN_IDS),
    services: [
      { name: "Home deep clean", price: "from R850", description: "2-bed, 1-bath" },
      { name: "Regular weekly clean", price: "from R550" },
      { name: "Office cleaning", price: "quoted", description: "Per m², minimum 2× /week" },
      { name: "End-of-lease clean", price: "from R1,200" },
      { name: "Carpet steam clean", price: "R350/room" },
      { name: "Window cleaning", price: "from R450" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.9", reviews: 189, yearsInBusiness: 5,
  },

  solar: {
    businessName: "Bright Future Solar",
    tagline: "Solar installations for homes and businesses — site assessment and clear quotes.",
    industry: "solar", area: "Pretoria East",
    hours: "Mon – Fri · 08:00 – 17:00", whatsapp: "0124445678",
    heroImageUrl: pxWide(SOLAR_IDS[0]), galleryUrls: gallery(SOLAR_IDS),
    services: [
      { name: "Site assessment", price: "Free" },
      { name: "Basic 5kW home system", price: "from R65,000", description: "Installed, 10yr warranty" },
      { name: "10kW business system", price: "from R120,000" },
      { name: "Battery-only retrofit", price: "from R28,000" },
      { name: "Geyser conversion", price: "from R8,500" },
      { name: "Annual service & check", price: "R1,200" },
    ],
    socials: { facebook: "https://facebook.com", website: "https://example.co.za" },
    rating: "4.9", reviews: 114, yearsInBusiness: 7,
  },

  applianceRepair: {
    businessName: "QuickFix Appliances",
    tagline: "Washing machines, fridges and stoves — diagnosis and repair, parts quoted separately.",
    industry: "applianceRepair", area: "Durbanville, Cape Town",
    hours: "Mon – Sat · 08:00 – 17:30", whatsapp: "0219998877",
    heroImageUrl: pxT(TRADE_IDS[5]), galleryUrls: gallery(TRADE_IDS),
    services: [
      { name: "Diagnosis call-out", price: "R350", description: "Credited on repair" },
      { name: "Washing machine repair", price: "from R550" },
      { name: "Fridge / freezer repair", price: "from R650" },
      { name: "Stove & oven repair", price: "from R450" },
      { name: "Dishwasher repair", price: "from R550" },
      { name: "Tumble dryer repair", price: "from R500" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.8", reviews: 221, yearsInBusiness: 9,
  },

  aircon: {
    businessName: "ArcticAir Conditioning",
    tagline: "Supply, install, service and repair of all air conditioning brands.",
    industry: "aircon", area: "Tyger Valley, Cape Town",
    hours: "Mon – Fri · 08:00 – 17:00 · Emergency 24/7", whatsapp: "0218887766",
    heroImageUrl: pxT(TRADE_IDS[0]), galleryUrls: gallery(TRADE_IDS),
    services: [
      { name: "Supply & install (9000 BTU)", price: "R6,500" },
      { name: "Supply & install (18000 BTU)", price: "R9,500" },
      { name: "Annual service / gas top-up", price: "R850" },
      { name: "Repair call-out", price: "R550 + parts" },
      { name: "Ducted system design", price: "quoted" },
      { name: "Older unit removal", price: "R350" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.8", reviews: 97, yearsInBusiness: 11,
  },

  pestControl: {
    businessName: "Shields Pest Control",
    tagline: "Cockroaches, ants, termites and rodents — eliminated and prevented.",
    industry: "pestControl", area: "Kempton Park, Gauteng",
    hours: "Mon – Sat · 07:00 – 17:00", whatsapp: "0112223344",
    heroImageUrl: pxT(CLEAN_IDS[1]), galleryUrls: gallery(CLEAN_IDS),
    services: [
      { name: "General pest spray (2-bed)", price: "R550" },
      { name: "Cockroach treatment", price: "R650" },
      { name: "Termite inspection & treatment", price: "from R1,800" },
      { name: "Rodent bait program", price: "R750" },
      { name: "Bed bug treatment", price: "R1,200" },
      { name: "6-month maintenance plan", price: "R2,400" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.8", reviews: 134, yearsInBusiness: 7,
  },

  landscaper: {
    businessName: "GreenScape Gardens",
    tagline: "Garden maintenance, landscaping and irrigation — always neat, never late.",
    industry: "landscaper", area: "Constantia, Cape Town",
    hours: "Mon – Sat · 07:00 – 17:00", whatsapp: "0218885566",
    heroImageUrl: pxT(FARM_IDS[0]), galleryUrls: gallery(FARM_IDS),
    services: [
      { name: "Monthly garden maintenance", price: "from R850" },
      { name: "Lawn mowing (standard)", price: "R350" },
      { name: "Tree felling & pruning", price: "from R650" },
      { name: "New garden design & plant", price: "quoted" },
      { name: "Irrigation installation", price: "from R3,500" },
      { name: "Rubble / green waste removal", price: "from R550" },
    ],
    socials: { instagram: "https://instagram.com" },
    rating: "4.9", reviews: 88, yearsInBusiness: 9,
  },

  hardware: {
    businessName: "Phakama Hardware",
    tagline: "Building materials, tools and fixings — everything the trade needs, at fair prices.",
    industry: "hardware", area: "Soweto, Johannesburg",
    hours: "Mon – Sat · 07:00 – 17:30 · Sun 08:00 – 13:00", whatsapp: "0116667788",
    heroImageUrl: pxT(TRADE_IDS[2]), galleryUrls: gallery(TRADE_IDS),
    services: [
      { name: "Bulk cement (50kg)", price: "R220/bag" },
      { name: "Building sand (per load)", price: "R950" },
      { name: "Power tools hire", price: "from R150/day" },
      { name: "Steel reinforcing bar", price: "quoted/ton" },
      { name: "PVC & HDPE pipe", price: "priced per m" },
      { name: "Free delivery (JHB Metro)", price: "R350 + orders" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.7", reviews: 203, yearsInBusiness: 18,
  },

  waste: {
    businessName: "GreenBin Waste Solutions",
    tagline: "Rubbish removal, building rubble and recycling collection — same day available.",
    industry: "waste", area: "Midrand, Gauteng",
    hours: "Mon – Sat · 06:00 – 16:00", whatsapp: "0113335566",
    heroImageUrl: pxT(CLEAN_IDS[2]), galleryUrls: gallery(CLEAN_IDS),
    services: [
      { name: "Skip hire (4m³)", price: "R1,200/week" },
      { name: "Skip hire (8m³)", price: "R1,850/week" },
      { name: "Same-day rubble removal", price: "from R950" },
      { name: "Garden refuse removal", price: "from R550" },
      { name: "Office clearance", price: "quoted" },
      { name: "Monthly recycling pickup", price: "R450" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.7", reviews: 76, yearsInBusiness: 5,
  },

  /* ════════ AUTO & TRANSPORT ════════ */
  mechanic: {
    businessName: "AutoPro Repairs",
    tagline: "Full mechanical services, diagnostics and COF — quotes provided before work begins.",
    industry: "mechanic", area: "Germiston, Gauteng",
    hours: "Mon – Sat · 07:30 – 17:30", whatsapp: "0845550011",
    heroImageUrl: pxT(MECH_IDS[0]), galleryUrls: gallery(MECH_IDS),
    services: [
      { name: "Major service", price: "from R1,800" },
      { name: "Minor service", price: "from R950" },
      { name: "Computer diagnostics", price: "R450" },
      { name: "Brake replacement (set)", price: "from R850" },
      { name: "Clutch overhaul", price: "quoted" },
      { name: "Certificate of Fitness (COF)", price: "R650" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.9", reviews: 89, yearsInBusiness: 12,
  },

  carWash: {
    businessName: "Diamond Auto Spa",
    tagline: "Hand wash, full valet and interior shampoo — your car, showroom clean.",
    industry: "carWash", area: "Fourways, Johannesburg",
    hours: "Mon – Sun · 08:00 – 17:00", whatsapp: "0113334455",
    heroImageUrl: pxWide(CAR_WASH_IDS[0]), galleryUrls: gallery(CAR_WASH_IDS),
    services: [
      { name: "Express hand wash", price: "R80" },
      { name: "Full hand wash & vac", price: "R150" },
      { name: "Full valet (interior + ext)", price: "R350" },
      { name: "Interior shampoo", price: "R450" },
      { name: "Engine clean", price: "R250" },
      { name: "Mini-bus & SUV surcharge", price: "+R50" },
    ],
    socials: { instagram: "https://instagram.com", tiktok: "https://tiktok.com" },
    rating: "4.8", reviews: 445, yearsInBusiness: 4,
  },

  towing: {
    businessName: "Speed Towing & Recovery",
    tagline: "24/7 breakdown recovery, accident towing and flatbed transport.",
    industry: "towing", area: "Johannesburg Metro",
    hours: "24/7 · All areas", whatsapp: "0800123456",
    heroImageUrl: pxWide(DELIV_IDS[0]), galleryUrls: gallery(DELIV_IDS),
    services: [
      { name: "Breakdown tow (local)", price: "R550" },
      { name: "Flatbed transport", price: "from R850" },
      { name: "Jump start", price: "R250" },
      { name: "Flat tyre change", price: "R200" },
      { name: "Long-distance tow", price: "R18/km" },
      { name: "Accident recovery", price: "quoted" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.8", reviews: 312, yearsInBusiness: 8,
  },

  drivingSchool: {
    businessName: "PassFirst Driving School",
    tagline: "Code 8, 10 & 14 lessons — pass first time with our patient, certified instructors.",
    industry: "drivingSchool", area: "Pretoria Central",
    hours: "Mon – Sat · 07:00 – 17:00", whatsapp: "0124441234",
    heroImageUrl: pxWide(DELIV_IDS[1]), galleryUrls: gallery(DELIV_IDS),
    services: [
      { name: "Code 8 lesson (1hr)", price: "R350" },
      { name: "10-lesson package", price: "R3,000" },
      { name: "K53 theory prep", price: "R200" },
      { name: "Yard test coaching", price: "R450" },
      { name: "Code 10 lesson", price: "R400" },
      { name: "Emergency stop session", price: "R350" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.9", reviews: 521, yearsInBusiness: 11,
  },

  movingCompany: {
    businessName: "MoveEase Removals",
    tagline: "Local and long-distance furniture removals — careful, insured and on time.",
    industry: "movingCompany", area: "Durban Metro",
    hours: "Mon – Sat · 06:00 – 18:00", whatsapp: "0318886677",
    heroImageUrl: pxWide(DELIV_IDS[2]), galleryUrls: gallery(DELIV_IDS),
    services: [
      { name: "Studio / 1-bed move", price: "from R1,800" },
      { name: "2-bed house move", price: "from R2,800" },
      { name: "3-bed house move", price: "from R4,200" },
      { name: "Office relocation", price: "quoted" },
      { name: "Single item delivery", price: "from R450" },
      { name: "Packing service", price: "R650 add-on" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.8", reviews: 187, yearsInBusiness: 7,
  },

  courier: {
    businessName: "SwiftRoute Couriers",
    tagline: "Same-day and next-day courier across Gauteng — tracked, signed and delivered.",
    industry: "courier", area: "Midrand, Gauteng",
    hours: "Mon – Fri · 07:00 – 18:00 · Sat 08:00 – 13:00", whatsapp: "0115553344",
    heroImageUrl: pxWide(DELIV_IDS[0]), galleryUrls: gallery(DELIV_IDS),
    services: [
      { name: "Same-day local", price: "R120" },
      { name: "Next-day Gauteng", price: "R85" },
      { name: "Cape Town / Durban", price: "R195" },
      { name: "Bulk / pallet quote", price: "quoted" },
      { name: "Monthly account", price: "from R1,500/m" },
      { name: "Return collection", price: "R75 extra" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.7", reviews: 678, yearsInBusiness: 5,
  },

  /* ════════ HEALTH ════════ */
  doctor: {
    businessName: "Main Street Medical",
    tagline: "Compassionate GP care for the whole family — same-day appointments available.",
    industry: "doctor", area: "Randburg, Johannesburg",
    hours: "Mon – Fri · 08:30 – 17:00 · Sat 08:30 – 12:30", whatsapp: "0725551234",
    heroImageUrl: pxT(MEDICAL_IDS[0]), galleryUrls: gallery(MEDICAL_IDS),
    services: [
      { name: "Consultation", price: "R550" },
      { name: "Annual wellness check", price: "R850" },
      { name: "Flu vaccination", price: "R250" },
      { name: "Blood test referral", price: "R150 admin" },
      { name: "Sick note / certificate", price: "R120" },
      { name: "Chronic medication script", price: "R200" },
    ],
    socials: { website: "https://example.co.za" },
    rating: "4.9", reviews: 312, yearsInBusiness: 15,
  },

  dentist: {
    businessName: "Bright Smile Dental",
    tagline: "Gentle family dentistry — checkups, whitening and implants with no judgment.",
    industry: "dentist", area: "Tyger Valley, Cape Town",
    hours: "Mon – Fri · 08:00 – 17:00 · Sat 08:00 – 13:00", whatsapp: "0219994455",
    heroImageUrl: pxT(DENTAL_IDS[0]), galleryUrls: gallery(DENTAL_IDS),
    services: [
      { name: "Checkup & clean", price: "R750" },
      { name: "Tooth filling", price: "from R650" },
      { name: "Extraction", price: "from R750" },
      { name: "Teeth whitening", price: "R2,800" },
      { name: "Root canal", price: "from R3,500" },
      { name: "Dental implant", price: "from R12,000" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.9", reviews: 276, yearsInBusiness: 12,
  },

  physio: {
    businessName: "ActiveLife Physiotherapy",
    tagline: "Sports injuries, back pain and post-op rehab — move better, feel better.",
    industry: "physio", area: "Bryanston, Johannesburg",
    hours: "Mon – Fri · 07:30 – 18:00 · Sat 08:00 – 12:00", whatsapp: "0117778899",
    heroImageUrl: pxT(MEDICAL_IDS[1]), galleryUrls: gallery(MEDICAL_IDS),
    services: [
      { name: "Initial assessment", price: "R850", description: "60 min, full history" },
      { name: "Follow-up session", price: "R650" },
      { name: "Dry needling", price: "R750" },
      { name: "Sports massage", price: "R600" },
      { name: "Kinesiology taping", price: "R200 add-on" },
      { name: "Home visit", price: "R1,200" },
    ],
    socials: { instagram: "https://instagram.com" },
    rating: "4.9", reviews: 198, yearsInBusiness: 8,
  },

  optometrist: {
    businessName: "ClearVision Eye Care",
    tagline: "Eye tests, designer frames and contact lenses — see Mzansi clearly.",
    industry: "optometrist", area: "Menlyn, Pretoria",
    hours: "Mon – Fri · 09:00 – 17:30 · Sat 09:00 – 13:00", whatsapp: "0124442233",
    heroImageUrl: pxT(MEDICAL_IDS[2]), galleryUrls: gallery(MEDICAL_IDS),
    services: [
      { name: "Full eye test", price: "R450" },
      { name: "Kids' eye test", price: "R350" },
      { name: "Contact lens fitting", price: "R600" },
      { name: "Glasses from R", price: "from R1,200", description: "Frame + lenses" },
      { name: "Designer frames", price: "from R2,500" },
      { name: "Emergency walk-in", price: "R500" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.8", reviews: 154, yearsInBusiness: 10,
  },

  pharmacy: {
    businessName: "Healing Hands Pharmacy",
    tagline: "Prescriptions, OTCs and wellness supplements — with a pharmacist you can talk to.",
    industry: "pharmacy", area: "Krugersdorp, Gauteng",
    hours: "Mon – Fri · 08:00 – 18:00 · Sat 08:00 – 14:00", whatsapp: "0117773322",
    heroImageUrl: pxT(MEDICAL_IDS[3]), galleryUrls: gallery(MEDICAL_IDS),
    services: [
      { name: "Prescription dispensing", price: "R50 fee" },
      { name: "Medicine delivery (local)", price: "R80" },
      { name: "Repeat script service", price: "R30/m" },
      { name: "Blood pressure check", price: "Free" },
      { name: "Blood glucose test", price: "R50" },
      { name: "Flu vaccination", price: "R280" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.8", reviews: 421, yearsInBusiness: 14,
  },

  psychologist: {
    businessName: "Mindful Space Psychology",
    tagline: "Individual, couples and trauma therapy — a safe space to heal and grow.",
    industry: "psychologist", area: "Rondebosch, Cape Town",
    hours: "Mon – Fri · 08:00 – 18:00 · Sat mornings", whatsapp: "0219995566",
    heroImageUrl: pxT(MEDICAL_IDS[4]), galleryUrls: gallery(MEDICAL_IDS),
    services: [
      { name: "Initial session (90 min)", price: "R1,200" },
      { name: "Individual therapy (60 min)", price: "R950" },
      { name: "Couples therapy (90 min)", price: "R1,400" },
      { name: "Trauma-focused EMDR", price: "R1,100" },
      { name: "Employee wellness session", price: "quoted" },
      { name: "Online / telehealth session", price: "R900" },
    ],
    socials: { website: "https://example.co.za" },
    rating: "5.0", reviews: 89, yearsInBusiness: 9,
  },

  /* ════════ FOOD ════════ */
  restaurant: {
    businessName: "Lapa Grill Shisanyama",
    tagline: "Authentic wood-fired grill and Mzansi flavours — come hungry, leave happy.",
    industry: "restaurant", area: "Umlazi, Durban",
    hours: "Daily · 11:00 – 22:00", whatsapp: "0312223344",
    heroImageUrl: pxWide(REST_IDS[0]), galleryUrls: gallery(REST_IDS),
    services: [
      { name: "Mixed Grill Platter", price: "R350", description: "Wors, chops & steak" },
      { name: "Braai Chops (500g)", price: "R180" },
      { name: "Quarter chicken", price: "R85" },
      { name: "Pap & chakalaka", price: "R45" },
      { name: "Braai pack (6 pax)", price: "R950" },
      { name: "Function catering", price: "from R120 pp" },
    ],
    socials: { facebook: "https://facebook.com", instagram: "https://instagram.com" },
    rating: "4.7", reviews: 543, yearsInBusiness: 6,
  },

  coffeeShop: {
    businessName: "Roast & Co. Café",
    tagline: "Single-origin pour-overs, freshly baked pastries and a corner to breathe.",
    industry: "coffeeShop", area: "Woodstock, Cape Town",
    hours: "Mon – Fri · 07:00 – 16:00 · Sat 08:00 – 14:00", whatsapp: "0218887799",
    heroImageUrl: pxT(CAFE_IDS[0]), galleryUrls: gallery(CAFE_IDS),
    services: [
      { name: "Flat white / Latte", price: "R45" },
      { name: "Filter coffee", price: "R35" },
      { name: "Specialty cold brew", price: "R55" },
      { name: "All-day breakfast", price: "R120" },
      { name: "Toasted sandwich", price: "R75" },
      { name: "Cake slice", price: "R55" },
    ],
    socials: { instagram: "https://instagram.com", tiktok: "https://tiktok.com" },
    rating: "4.9", reviews: 682, yearsInBusiness: 4,
  },

  bakery: {
    businessName: "Noma's Home Bakery",
    tagline: "Freshly baked bread, cakes and savouries — order today, collect tomorrow.",
    industry: "bakery", area: "Pietermaritzburg, KZN",
    hours: "Tue – Sat · 07:00 – 14:00", whatsapp: "0332221234",
    heroImageUrl: pxT(BAKERY_IDS[0]), galleryUrls: gallery(BAKERY_IDS),
    services: [
      { name: "Sourdough loaf", price: "R85" },
      { name: "Custom birthday cake", price: "from R550" },
      { name: "Cupcakes (12)", price: "R250" },
      { name: "Savoury muffins (6)", price: "R120" },
      { name: "Croissants (6)", price: "R150" },
      { name: "Wedding cake", price: "from R2,500" },
    ],
    socials: { instagram: "https://instagram.com", facebook: "https://facebook.com" },
    rating: "5.0", reviews: 341, yearsInBusiness: 5,
  },

  catering: {
    businessName: "Ubuntu Catering Co.",
    tagline: "Corporate lunches, weddings and stokvels — delicious food, professionally served.",
    industry: "catering", area: "Midrand, Gauteng",
    hours: "Mon – Sat · 07:00 – 19:00", whatsapp: "0118885566",
    heroImageUrl: pxWide(CATER_IDS[0]), galleryUrls: gallery(CATER_IDS),
    services: [
      { name: "Corporate lunch (pp)", price: "from R95 pp" },
      { name: "Wedding reception (pp)", price: "from R250 pp" },
      { name: "Stokvel / event package", price: "from R1,800" },
      { name: "Braai package (20 pax)", price: "R3,200" },
      { name: "Wait staff (per person)", price: "R550/event" },
      { name: "Equipment hire", price: "quoted" },
    ],
    socials: { instagram: "https://instagram.com", facebook: "https://facebook.com" },
    rating: "4.9", reviews: 127, yearsInBusiness: 8,
  },

  /* ════════ TOURISM ════════ */
  guestHouse: {
    businessName: "Lavender Stay B&B",
    tagline: "A quiet stay with mountain views and breakfast included (see rates for details).",
    industry: "guestHouse", area: "Dullstroom, Mpumalanga",
    hours: "Check-in 14:00 · Check-out 10:00", whatsapp: "0827778899",
    heroImageUrl: pxWide(LODGE_IDS[0]), galleryUrls: gallery(LODGE_IDS),
    services: [
      { name: "Double room (B&B)", price: "R950/night" },
      { name: "Family suite", price: "R1,450/night" },
      { name: "Extra breakfast", price: "R120 pp" },
      { name: "Late check-out (to 14:00)", price: "R200" },
      { name: "Packed lunch", price: "R95 pp" },
      { name: "Airport/town transfer", price: "R450" },
    ],
    socials: { instagram: "https://instagram.com", facebook: "https://facebook.com" },
    rating: "4.9", reviews: 214, yearsInBusiness: 9,
  },

  lodge: {
    businessName: "Thaba View Safari Lodge",
    tagline: "Eight rooms in the Bushveld — two hours from Joburg, self-catering and guided options.",
    industry: "lodge", area: "Waterberg, Limpopo",
    hours: "Check-in 14:00 · Check-out 10:00", whatsapp: "0155553344",
    heroImageUrl: pxWide(LODGE_IDS[1]), galleryUrls: gallery(LODGE_IDS),
    services: [
      { name: "Luxury bush suite", price: "R1,850/night", description: "King bed, private deck, full board" },
      { name: "Family chalet", price: "R2,600/night" },
      { name: "Sunset game drive", price: "R650 pp" },
      { name: "Bush breakfast picnic", price: "R280 pp" },
      { name: "Day visitor (drive + lunch)", price: "R950 pp" },
      { name: "JHB transfer (one-way)", price: "R1,200" },
    ],
    socials: { instagram: "https://instagram.com", facebook: "https://facebook.com" },
    rating: "5.0", reviews: 189, yearsInBusiness: 12,
  },

  tourGuide: {
    businessName: "Mzansi Xplore Tours",
    tagline: "Small-group city tours, township experiences and Joburg history walks.",
    industry: "tourGuide", area: "Johannesburg CBD",
    hours: "Daily · 08:00 – 18:00", whatsapp: "0117771122",
    heroImageUrl: pxWide(LODGE_IDS[2]), galleryUrls: gallery(LODGE_IDS),
    services: [
      { name: "Soweto full-day tour", price: "R650 pp" },
      { name: "Apartheid Museum combo", price: "R450 pp" },
      { name: "Joburg CBD walking tour", price: "R350 pp" },
      { name: "Cradle of Humankind day", price: "R850 pp" },
      { name: "Private group (10+)", price: "from R4,500/group" },
      { name: "Custom itinerary", price: "quoted" },
    ],
    socials: { instagram: "https://instagram.com", tiktok: "https://tiktok.com" },
    rating: "4.9", reviews: 412, yearsInBusiness: 7,
  },

  /* ════════ PETS ════════ */
  vet: {
    businessName: "Paw & Claw Veterinary",
    tagline: "Compassionate vet care for dogs, cats and small animals — walk-ins welcome.",
    industry: "vet", area: "Sunninghill, Johannesburg",
    hours: "Mon – Fri · 08:00 – 18:00 · Sat 08:00 – 13:00", whatsapp: "0117774455",
    heroImageUrl: pxT(VET_IDS[0]), galleryUrls: gallery(VET_IDS),
    services: [
      { name: "Consultation", price: "R450" },
      { name: "Vaccination (annual)", price: "R350" },
      { name: "Sterilisation (cat)", price: "R1,200" },
      { name: "Sterilisation (dog)", price: "from R1,800" },
      { name: "Dental clean", price: "from R2,200" },
      { name: "Microchipping", price: "R250" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.9", reviews: 287, yearsInBusiness: 11,
  },

  dogTraining: {
    businessName: "Good Dog Academy",
    tagline: "Puppy classes, obedience training and behaviour rehab — positive reinforcement always.",
    industry: "dogTraining", area: "Roodepoort, Johannesburg",
    hours: "Tue – Sat · 09:00 – 16:00", whatsapp: "0117772233",
    heroImageUrl: pxT(PET_IDS[0]), galleryUrls: gallery(PET_IDS),
    services: [
      { name: "Puppy starter class (6wk)", price: "R1,200" },
      { name: "Obedience class (8wk)", price: "R1,800" },
      { name: "1-on-1 behaviour session", price: "R950" },
      { name: "In-home training", price: "R1,200/visit" },
      { name: "Board & train (1 week)", price: "R3,500" },
      { name: "Group class (drop-in)", price: "R250" },
    ],
    socials: { instagram: "https://instagram.com" },
    rating: "5.0", reviews: 143, yearsInBusiness: 6,
  },

  petBoarding: {
    businessName: "Happy Paws Boarding",
    tagline: "Safe, loving overnight care for dogs and cats — daily updates sent to you.",
    industry: "petBoarding", area: "Centurion, Pretoria",
    hours: "Drop-off & collection: 07:00 – 18:00 daily", whatsapp: "0124447788",
    heroImageUrl: pxT(PET_IDS[1]), galleryUrls: gallery(PET_IDS),
    services: [
      { name: "Dog boarding (small)", price: "R250/night" },
      { name: "Dog boarding (large)", price: "R350/night" },
      { name: "Cat boarding", price: "R180/night" },
      { name: "Day care", price: "R150/day" },
      { name: "Grooming (bath & trim)", price: "R350" },
      { name: "Pick-up & drop-off", price: "R150 each way" },
    ],
    socials: { facebook: "https://facebook.com", instagram: "https://instagram.com" },
    rating: "4.9", reviews: 198, yearsInBusiness: 7,
  },

  grocery: {
    businessName: "Ntombi's Spaza & Grocery",
    tagline: "Fresh bread, cold drinks, airtime and essentials — your corner shop, always open.",
    industry: "grocery", area: "Khayelitsha, Cape Town",
    hours: "Mon – Sun · 06:00 – 22:00", whatsapp: "0836661234",
    heroImageUrl: pxT(FARM_IDS[1]), galleryUrls: gallery(FARM_IDS),
    services: [
      { name: "Airtime & data", price: "All networks" },
      { name: "Fresh bread daily", price: "R18 – R28" },
      { name: "Cold drinks & ice", price: "from R15" },
      { name: "Paraffin & gas", price: "priced daily" },
      { name: "Bulk order (WhatsApp)", price: "quoted" },
      { name: "School tuck shop packs", price: "from R25" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.7", reviews: 312, yearsInBusiness: 9,
  },

  /* ════════ PROFESSIONAL ════════ */
  lawyer: {
    businessName: "Mashaba Attorneys",
    tagline: "Family, labour and property law — consultations by appointment, fees quoted in writing.",
    industry: "lawyer", area: "Sandton, Johannesburg",
    hours: "Mon – Fri · 08:00 – 17:00", whatsapp: "0825556677",
    heroImageUrl: pxT(LEGAL_IDS[0]), galleryUrls: gallery(LEGAL_IDS),
    services: [
      { name: "Initial consultation", price: "R850", description: "60 min + written summary" },
      { name: "Contract drafting", price: "from R2,500" },
      { name: "Uncontested divorce", price: "from R7,500" },
      { name: "CCMA representation", price: "from R5,000" },
      { name: "Property transfer", price: "per tariff" },
      { name: "Debt collection (success)", price: "10% + R500" },
    ],
    socials: { website: "https://example.co.za" },
    rating: "4.9", reviews: 187, yearsInBusiness: 15,
  },

  accountant: {
    businessName: "TrueNorth Tax & Accounting",
    tagline: "Bookkeeping, tax returns and payroll — SARS-compliant and always on deadline.",
    industry: "accountant", area: "Century City, Cape Town",
    hours: "Mon – Fri · 08:30 – 16:30", whatsapp: "0836667788",
    heroImageUrl: pxT(ACCT_IDS[0]), galleryUrls: gallery(ACCT_IDS),
    services: [
      { name: "Personal tax return", price: "R950" },
      { name: "Monthly bookkeeping", price: "from R1,800" },
      { name: "VAT / PAYE submission", price: "R950" },
      { name: "Payroll (up to 10 staff)", price: "R1,200/m" },
      { name: "Company registration", price: "R1,500" },
      { name: "Annual financial statements", price: "from R6,500" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.8", reviews: 96, yearsInBusiness: 12,
  },

  realEstate: {
    businessName: "Kasi Realty",
    tagline: "Buying, selling and renting property across Gauteng — honest, fast and fully PPRA registered.",
    industry: "realEstate", area: "Midrand, Gauteng",
    hours: "Mon – Fri · 08:00 – 17:30 · Sat 09:00 – 13:00", whatsapp: "0114445566",
    heroImageUrl: pxWide(RE_IDS[0]), galleryUrls: gallery(RE_IDS),
    services: [
      { name: "Property valuation", price: "Free" },
      { name: "Listing & marketing", price: "Commission on sale" },
      { name: "Tenant placement", price: "1 month's rent" },
      { name: "Rental management", price: "8% of rental" },
      { name: "Bond pre-qualification", price: "Free" },
      { name: "Sectional title advice", price: "R850" },
    ],
    socials: { facebook: "https://facebook.com", instagram: "https://instagram.com" },
    rating: "4.8", reviews: 143, yearsInBusiness: 9,
  },

  security: {
    businessName: "Sentinel Security Services",
    tagline: "Armed response, CCTV monitoring and access control for homes and business.",
    industry: "security", area: "Johannesburg South",
    hours: "24/7 Monitoring Centre", whatsapp: "0117776655",
    heroImageUrl: pxT(SEC_IDS[0]), galleryUrls: gallery(SEC_IDS),
    services: [
      { name: "Armed response (monthly)", price: "R450/m" },
      { name: "CCTV monitoring (4 cam)", price: "R650/m" },
      { name: "Alarm installation", price: "from R4,500" },
      { name: "CCTV installation (4 cam)", price: "from R5,500" },
      { name: "Electric fence", price: "from R185/m" },
      { name: "Access control system", price: "from R3,800" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.8", reviews: 234, yearsInBusiness: 14,
  },

  storage: {
    businessName: "SafeStore Self Storage",
    tagline: "Clean, dry and secure self-storage units — access 7 days a week.",
    industry: "storage", area: "Brackenfell, Cape Town",
    hours: "Mon – Sat · 07:00 – 18:00 · Sun 08:00 – 14:00", whatsapp: "0218883322",
    heroImageUrl: pxT(TRADE_IDS[2]), galleryUrls: gallery(TRADE_IDS),
    services: [
      { name: "Locker (1m³)", price: "R350/m" },
      { name: "Small unit (4m³)", price: "R650/m" },
      { name: "Medium unit (10m³)", price: "R1,100/m" },
      { name: "Large unit (20m³)", price: "R1,850/m" },
      { name: "Vehicle / caravan storage", price: "R950/m" },
      { name: "Padlock purchase", price: "R120" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.8", reviews: 112, yearsInBusiness: 8,
  },

  /* ════════ EDUCATION ════════ */
  daycare: {
    businessName: "Sunshine Crèche & Daycare",
    tagline: "Safe, nurturing care for ages 3 months – 5 years — fully registered with DSD.",
    industry: "daycare", area: "Benoni, Gauteng",
    hours: "Mon – Fri · 06:30 – 17:30", whatsapp: "0119998877",
    heroImageUrl: pxT(BEAUTY_IDS[1]), galleryUrls: gallery(BEAUTY_IDS),
    services: [
      { name: "Full day (3m – 2yr)", price: "R2,800/m" },
      { name: "Full day (2yr – 5yr)", price: "R2,400/m" },
      { name: "After-care (to 17:30)", price: "R800/m" },
      { name: "Once-a-week",          price: "R550" },
      { name: "Meals & snacks",       price: "Included" },
      { name: "Registration fee",     price: "R350 once-off" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.9", reviews: 89, yearsInBusiness: 8,
  },

  preSchool: {
    businessName: "Little Stars Pre-Primary",
    tagline: "Play-based learning that prepares children for Grade 1 — phonics, maths and love.",
    industry: "preSchool", area: "Kempton Park, Gauteng",
    hours: "Mon – Fri · 07:00 – 13:00", whatsapp: "0119996655",
    heroImageUrl: pxT(BEAUTY_IDS[2]), galleryUrls: gallery(BEAUTY_IDS),
    services: [
      { name: "Grade R (full year)",   price: "R1,800/m" },
      { name: "Grade 0 (full year)",   price: "R1,600/m" },
      { name: "After-care to 17:00",   price: "R950/m" },
      { name: "Extra-murals",          price: "from R200/term" },
      { name: "School uniform",        price: "R450 set" },
      { name: "Annual registration",   price: "R500" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.9", reviews: 178, yearsInBusiness: 11,
  },

  tutor: {
    businessName: "AceIt Tutoring",
    tagline: "Maths, science and English from Grade 4 to Matric — we close the gap.",
    industry: "tutor", area: "Bloemfontein, Free State",
    hours: "Mon – Fri 15:00 – 19:00 · Sat 09:00 – 13:00", whatsapp: "0512223344",
    heroImageUrl: pxT(ACCT_IDS[1]), galleryUrls: gallery(ACCT_IDS),
    services: [
      { name: "1-on-1 session (60 min)", price: "R350" },
      { name: "Small group (3 learners)", price: "R200 pp" },
      { name: "Online session",           price: "R280" },
      { name: "Monthly package (8 sess)", price: "R2,400" },
      { name: "Exam prep crash course",   price: "R1,200" },
      { name: "Matric rewrite prep",      price: "from R3,500" },
    ],
    socials: { instagram: "https://instagram.com" },
    rating: "4.9", reviews: 217, yearsInBusiness: 6,
  },

  /* ════════ EVENTS & LIFESTYLE ════════ */
  eventPlanner: {
    businessName: "Celebration Events Co.",
    tagline: "Weddings, year-end functions and birthday bashes — conceptualised, decorated and delivered.",
    industry: "eventPlanner", area: "Johannesburg North",
    hours: "Mon – Sat · 09:00 – 17:00", whatsapp: "0117775544",
    heroImageUrl: pxWide(EVENT_IDS[0]), galleryUrls: gallery(EVENT_IDS),
    services: [
      { name: "Event consultation", price: "R850" },
      { name: "Wedding coordination", price: "from R8,500" },
      { name: "Décor package (50 pax)", price: "from R4,500" },
      { name: "Corporate year-end", price: "quoted" },
      { name: "Birthday party setup", price: "from R2,200" },
      { name: "MC services",         price: "from R2,500" },
    ],
    socials: { instagram: "https://instagram.com", facebook: "https://facebook.com" },
    rating: "4.9", reviews: 132, yearsInBusiness: 7,
  },

  florist: {
    businessName: "Bloom & Stem Florist",
    tagline: "Fresh flowers, bouquets and wedding florals — same-day delivery across the city.",
    industry: "florist", area: "Waterfall, Midrand",
    hours: "Mon – Sat · 08:00 – 17:00", whatsapp: "0117779988",
    heroImageUrl: pxT(FLOWER_IDS[0]), galleryUrls: gallery(FLOWER_IDS),
    services: [
      { name: "Classic bouquet",       price: "from R350" },
      { name: "Premium rose dozen",    price: "R550" },
      { name: "Wedding bridal bouquet",price: "from R1,200" },
      { name: "Table centrepieces",    price: "from R650 each" },
      { name: "Floral arch / backdrop",price: "from R3,500" },
      { name: "Same-day delivery",     price: "R120" },
    ],
    socials: { instagram: "https://instagram.com", tiktok: "https://tiktok.com" },
    rating: "4.9", reviews: 284, yearsInBusiness: 5,
  },

  funeralHome: {
    businessName: "Dignity Funeral Services",
    tagline: "Compassionate and dignified funeral care — available 24 hours for your family.",
    industry: "funeralHome", area: "Soweto, Johannesburg",
    hours: "24/7 availability", whatsapp: "0114441122",
    heroImageUrl: pxT(LEGAL_IDS[1]), galleryUrls: gallery(LEGAL_IDS),
    services: [
      { name: "Basic funeral package",    price: "from R8,500" },
      { name: "Standard funeral package", price: "from R14,000" },
      { name: "Premium funeral package",  price: "from R22,000" },
      { name: "Cremation service",        price: "from R6,500" },
      { name: "Repatriation (national)",  price: "quoted" },
      { name: "Tombstone services",       price: "from R3,500" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.9", reviews: 198, yearsInBusiness: 20,
  },

  gym: {
    businessName: "IronCore Fitness Studio",
    tagline: "Weights, HIIT classes and personal training — no judgment, real results.",
    industry: "gym", area: "Claremont, Cape Town",
    hours: "Mon – Fri · 05:00 – 21:00 · Sat–Sun 07:00 – 15:00", whatsapp: "0218886677",
    heroImageUrl: pxT(GYM_IDS[0]), galleryUrls: gallery(GYM_IDS),
    services: [
      { name: "Monthly membership",     price: "R450/m" },
      { name: "Day pass",               price: "R80" },
      { name: "Personal training (1hr)",price: "R450" },
      { name: "10-session PT pack",     price: "R3,800" },
      { name: "Group class (weekly)",   price: "R300/m" },
      { name: "Nutrition consultation", price: "R650" },
    ],
    socials: { instagram: "https://instagram.com", tiktok: "https://tiktok.com" },
    rating: "4.8", reviews: 412, yearsInBusiness: 6,
  },

  sportsAcademy: {
    businessName: "Striker Soccer Academy",
    tagline: "Football coaching for ages 5 – 18 — skills, fitness and a lifelong love of the game.",
    industry: "sportsAcademy", area: "Tembisa, Gauteng",
    hours: "Tue, Thu, Sat · 08:00 – 12:00", whatsapp: "0119994433",
    heroImageUrl: pxT(GYM_IDS[1]), galleryUrls: gallery(GYM_IDS),
    services: [
      { name: "Monthly academy fee",   price: "R550/m" },
      { name: "Individual skill session",price: "R350" },
      { name: "Goalkeeper coaching",   price: "R400/session" },
      { name: "Holiday camp (5 days)", price: "R1,200" },
      { name: "Kit (jersey + shorts)",  price: "R380" },
      { name: "Tournament entry",       price: "R100 pp" },
    ],
    socials: { instagram: "https://instagram.com", facebook: "https://facebook.com" },
    rating: "4.9", reviews: 167, yearsInBusiness: 5,
  },

  construction: {
    businessName: "Kagiso Construction & Civils",
    tagline: "Residential builds, extensions and civil works — site visits and written quotes available.",
    industry: "construction", area: "Midrand, Gauteng",
    hours: "Mon – Sat · 07:00 – 17:00", whatsapp: "0768889900",
    heroImageUrl: pxT(TRADE_IDS[3]), galleryUrls: gallery(TRADE_IDS),
    services: [
      { name: "Site visit & quote",      price: "R500 (credited)" },
      { name: "Home extensions",         price: "from R8,500/m²" },
      { name: "Kitchen renovation",      price: "from R45,000" },
      { name: "Boundary walls & paving", price: "from R950/m" },
      { name: "Full home build",         price: "quoted" },
      { name: "Architectural drawings",  price: "from R8,000" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.9", reviews: 86, yearsInBusiness: 14,
  },

  farm: {
    businessName: "GreenAcre Farm Fresh",
    tagline: "Weekly veg boxes and free-range staples — harvested Tuesday, at your door Thursday.",
    industry: "farm", area: "Tarlton, Gauteng",
    hours: "Orders close Tue 18:00 · Collection/delivery Thu", whatsapp: "0836661234",
    heroImageUrl: pxT(FARM_IDS[0]), galleryUrls: gallery(FARM_IDS),
    services: [
      { name: "Weekly veg box",        price: "R250", description: "8–10 seasonal veg, feeds 4" },
      { name: "Free-range eggs (30)",  price: "R95" },
      { name: "Raw farm honey 500g",   price: "R120" },
      { name: "Spinach bundle",        price: "R45" },
      { name: "Monthly subscription",  price: "R900/m" },
      { name: "Restaurant standing order", price: "quoted" },
    ],
    socials: { instagram: "https://instagram.com", facebook: "https://facebook.com" },
    rating: "5.0", reviews: 91, yearsInBusiness: 5,
  },

  golfClub: {
    businessName: "Highveld Golf & Country Club",
    tagline: "18 holes of manicured Highveld greens — membership, visitors and corporate days welcome.",
    industry: "golfClub", area: "Benoni, Gauteng",
    hours: "Mon – Sun · 06:00 – 18:00", whatsapp: "0119997788",
    heroImageUrl: pxWide(LODGE_IDS[0]), galleryUrls: gallery(LODGE_IDS),
    services: [
      { name: "Visitor green fee (18 holes)", price: "R450" },
      { name: "Visitor fee (9 holes)",       price: "R280" },
      { name: "Annual membership",            price: "R8,500/yr" },
      { name: "Corporate day (12 pax)",       price: "from R6,500" },
      { name: "Golf cart hire",               price: "R250" },
      { name: "Driving range bucket",         price: "R80" },
    ],
    socials: { facebook: "https://facebook.com" },
    rating: "4.7", reviews: 312, yearsInBusiness: 28,
  },
};

/* ——— Fall-through alias map (catches any key not in BASE directly) ——— */
const FALLBACK: Record<string, string> = {
  hairSalon: "hairSalon", barber: "barber", spa: "spa",
  plumber: "plumber", electrician: "electrician", handyman: "handyman",
  painter: "painter", carpenter: "carpenter", roofer: "roofer",
  cleaning: "cleaning", solar: "solar", applianceRepair: "applianceRepair",
  aircon: "aircon", pestControl: "pestControl", landscaper: "landscaper",
  hardware: "hardware", waste: "waste",
  mechanic: "mechanic", carWash: "carWash", towing: "towing",
  drivingSchool: "drivingSchool", movingCompany: "movingCompany", courier: "courier",
  doctor: "doctor", dentist: "dentist", physio: "physio",
  optometrist: "optometrist", pharmacy: "pharmacy", psychologist: "psychologist",
  restaurant: "restaurant", coffeeShop: "coffeeShop", bakery: "bakery", catering: "catering",
  guestHouse: "guestHouse", lodge: "lodge", tourGuide: "tourGuide",
  vet: "vet", dogTraining: "dogTraining", petBoarding: "petBoarding", grocery: "grocery",
  lawyer: "lawyer", accountant: "accountant", realEstate: "realEstate",
  security: "security", storage: "storage",
  daycare: "daycare", preSchool: "preSchool", tutor: "tutor",
  eventPlanner: "eventPlanner", florist: "florist", funeralHome: "funeralHome",
  gym: "gym", sportsAcademy: "sportsAcademy",
  construction: "construction", farm: "farm", golfClub: "golfClub",
};

/**
 * Industry-specific dynamic copy: reviews, section headings, guarantees.
 * This is what makes "Plumber on Velvet" say plumbing things, not salon things.
 */
import type { ReviewItem } from "./types";

interface IndustryCopy {
  serviceNoun: string;
  galleryHeading: string;
  aboutQuote: string;
  reviewHeading: string;
  reviewItems: ReviewItem[];
  guarantee: string;
}

const COPY: Record<string, IndustryCopy> = {
  hairSalon: {
    serviceNoun: "treatments", galleryHeading: "Fresh from the chair",
    aboutQuote: "You shouldn't have to DM five times to find out what a style costs.",
    reviewHeading: "What our clients say", guarantee: "Not happy with the style? We'll fix it the same day, free.",
    reviewItems: [
      { quote: "Booked on WhatsApp at 8am, in the chair by 10. My braids have never lasted this long.", name: "Tebogo M.", label: "Knotless braids" },
      { quote: "Prices are right there on the site — no 'DM for price' games. That's why I trust them.", name: "Lerato K.", label: "Regular client" },
      { quote: "Send my whole family here now. Professional, on time, and the results speak for themselves.", name: "Ayesha P.", label: "Family" },
    ],
  },
  barber: {
    serviceNoun: "services", galleryHeading: "Latest cuts",
    aboutQuote: "A fresh fade shouldn't cost you an hour of back-and-forth messages.",
    reviewHeading: "From the chair", guarantee: "Touch-up within 3 days if the line-up isn't perfect.",
    reviewItems: [
      { quote: "Sharpest fade in the Cape. I've been coming every two weeks for three years.", name: "Thabo N.", label: "Skin fade" },
      { quote: "My son actually asks to go to the barber now. That's the review.", name: "Sipho M.", label: "Kids cut" },
      { quote: "Clean, fast, and the beard sculpt is chef's kiss. No appointment needed.", name: "Jamal F.", label: "Walk-in" },
    ],
  },
  spa: {
    serviceNoun: "treatments", galleryHeading: "The experience",
    aboutQuote: "You deserve an hour where nobody needs anything from you.",
    reviewHeading: "Guest experiences", guarantee: "If the treatment isn't to your standard, your next session is on us.",
    reviewItems: [
      { quote: "The hot stone ritual melted a month of stress in 75 minutes. I've rebooked already.", name: "Zanele W.", label: "Hot stone" },
      { quote: "Cleanest spa I've been to. Therapists are properly trained, not just winging it.", name: "Natasha vd M.", label: "Facial" },
      { quote: "Bought the couples escape for our anniversary. Best R1,050 I've ever spent.", name: "Kagiso D.", label: "Couples" },
    ],
  },
  plumber: {
    serviceNoun: "services", galleryHeading: "Recent jobs",
    aboutQuote: "A burst geyser at midnight shouldn't mean a mystery bill at sunrise.",
    reviewHeading: "Client feedback", guarantee: "If it leaks again within 6 months, we come back free.",
    reviewItems: [
      { quote: "Geyser burst at 11pm, they were here by midnight. Fixed and cleaned up by 1am.", name: "Mr. Botha", label: "Emergency" },
      { quote: "Quoted in writing before touching a pipe. That's rare. That's why I keep calling them.", name: "Nomsa K.", label: "Repeat client" },
      { quote: "Bathroom renovation done in 5 days. On time, on budget, zero surprises.", name: "Dave M.", label: "Renovation" },
    ],
  },
  electrician: {
    serviceNoun: "services", galleryHeading: "Completed work",
    aboutQuote: "Load-shedding is bad enough — your wiring shouldn't be another problem.",
    reviewHeading: "What clients say", guarantee: "Every job comes with a written workmanship guarantee.",
    reviewItems: [
      { quote: "Got our COC certificate same day. Estate agent was impressed. Sale went through.", name: "R. Naidoo", label: "COC" },
      { quote: "Solar install done in one day. Haven't bought Eskom power since March.", name: "P. van Wyk", label: "Solar" },
      { quote: "DB board was a fire hazard. They fixed it, explained everything, and the price was fair.", name: "Lindiwe M.", label: "DB board" },
    ],
  },
  handyman: {
    serviceNoun: "jobs", galleryHeading: "Before & after",
    aboutQuote: "One call, one person, everything fixed — no need to hire five different guys.",
    reviewHeading: "Happy homeowners", guarantee: "Workmanship guaranteed — we fix it right the first time.",
    reviewItems: [
      { quote: "Hung shelves, fixed the gate AND replaced a tap — all in one visit. Legend.", name: "Sarah B.", label: "Half-day" },
      { quote: "Reliable, on time, cleans up after himself. That alone puts him above everyone else.", name: "Mr. Pillay", label: "Repeat client" },
      { quote: "Finally found someone who actually shows up when they say they will.", name: "Khanyi N.", label: "Referral" },
    ],
  },
  painter: {
    serviceNoun: "services", galleryHeading: "Recent projects",
    aboutQuote: "A fresh coat of paint shouldn't mean paint on your furniture.",
    reviewHeading: "What homeowners say", guarantee: "If it peels within 12 months, we repaint free.",
    reviewItems: [
      { quote: "Entire house interior done in 3 days. Clean edges, no mess, and they moved the furniture back.", name: "Elise v.R.", label: "Interior" },
      { quote: "The feature wall colour they suggested is now the most complimented thing in our lounge.", name: "Tshego M.", label: "Feature wall" },
      { quote: "Third painter we tried. First one who actually prepped the walls properly.", name: "James O.", label: "Exterior" },
    ],
  },
  mechanic: {
    serviceNoun: "services", galleryHeading: "In the workshop",
    aboutQuote: "You shouldn't need a degree in engines to understand your quote.",
    reviewHeading: "Driver reviews", guarantee: "90-day warranty on all parts and labour.",
    reviewItems: [
      { quote: "They showed me the old brake pads vs the new ones. Honest and transparent.", name: "Tshepo M.", label: "Brakes" },
      { quote: "My car's been going here for 8 years. Never overcharged, never missed anything.", name: "Uncle Pete", label: "Loyal client" },
      { quote: "Diagnosed a misfire that two other workshops couldn't find. Sorted in one day.", name: "R. Adams", label: "Diagnostics" },
    ],
  },
  carWash: {
    serviceNoun: "packages", galleryHeading: "Spotless results",
    aboutQuote: "Your car deserves better than a bucket and a dirty sponge.",
    reviewHeading: "Happy drivers", guarantee: "Not spotless? We'll redo it on the spot, no charge.",
    reviewItems: [
      { quote: "Full valet for R350 — carpets, dashboard, engine bay. Looked brand new.", name: "Lebo K.", label: "Full valet" },
      { quote: "I bring both cars every Saturday. Consistent quality every single time.", name: "Mr. Singh", label: "Weekly" },
      { quote: "The interior shampoo got rid of a smell I'd accepted as permanent. Magic.", name: "Anele D.", label: "Interior" },
    ],
  },
  doctor: {
    serviceNoun: "services", galleryHeading: "Our practice",
    aboutQuote: "Healthcare shouldn't feel like a production line — we take the time to listen.",
    reviewHeading: "Patient feedback", guarantee: "Same-day appointments available — your health shouldn't wait.",
    reviewItems: [
      { quote: "First doctor in years who actually listened to me explain my symptoms fully.", name: "Patience M.", label: "Consultation" },
      { quote: "The whole family sees Dr. Main Street. Even my teenager trusts them.", name: "The Molefe family", label: "Family care" },
      { quote: "WhatsApp for appointments is a game-changer. No more sitting on hold.", name: "J. Erasmus", label: "Booking" },
    ],
  },
  dentist: {
    serviceNoun: "treatments", galleryHeading: "Our clinic",
    aboutQuote: "We know you'd rather be anywhere else — so we make it quick, gentle and clear.",
    reviewHeading: "Patient reviews", guarantee: "Nervous? We'll go at your pace, every single time.",
    reviewItems: [
      { quote: "First dentist I've been to where I didn't feel judged for waiting too long. Gentle and kind.", name: "Nandi S.", label: "Check-up" },
      { quote: "Whitening results were incredible. Wish I'd done it years ago.", name: "Kyle B.", label: "Whitening" },
      { quote: "Kids loved the experience. No tears, no drama. We'll be back every 6 months.", name: "The Nkosi family", label: "Family" },
    ],
  },
  restaurant: {
    serviceNoun: "menu", galleryHeading: "On the grill",
    aboutQuote: "Good food is meant to be shared — bring the family, bring the neighbours.",
    reviewHeading: "What diners say", guarantee: "Not enjoying your meal? Tell us before you leave and we'll fix it.",
    reviewItems: [
      { quote: "The mixed grill platter is worth the drive from anywhere in Durban. Proper fire-cooked.", name: "Bongani Z.", label: "Dine-in" },
      { quote: "We order the braai pack for every family gathering. Never disappoints.", name: "The Zulu family", label: "Takeaway" },
      { quote: "Pap and chakalaka like gogo used to make. This is home cooking done right.", name: "Nomvula T.", label: "Regular" },
    ],
  },
  coffeeShop: {
    serviceNoun: "menu", galleryHeading: "Our space",
    aboutQuote: "Good coffee and a quiet corner — some things are worth slowing down for.",
    reviewHeading: "From our regulars", guarantee: "Not loving your cup? We'll make you a new one.",
    reviewItems: [
      { quote: "Best flat white in Woodstock. The baristas actually know what they're doing.", name: "Mia R.", label: "Coffee" },
      { quote: "I work from here three mornings a week. Great WiFi, better pastries.", name: "Daniel K.", label: "Remote work" },
      { quote: "The cold brew got me through tax season. Owe these guys my sanity.", name: "S. Okonkwo", label: "Cold brew" },
    ],
  },
  guestHouse: {
    serviceNoun: "rooms & rates", galleryHeading: "Your stay",
    aboutQuote: "Home-from-home hospitality with the attention a hotel never gives.",
    reviewHeading: "Guest book", guarantee: "Free cancellation up to 48 hours before check-in.",
    reviewItems: [
      { quote: "Felt more like visiting family than staying at a B&B. Breakfast was unreal.", name: "Pieter & Anél", label: "Couple" },
      { quote: "Two nights turned into four. The mountain views make it impossible to leave.", name: "Kavisha R.", label: "Extended stay" },
      { quote: "Cleanest rooms, warmest welcome. We've already booked for December.", name: "The Dlamini family", label: "Family" },
    ],
  },
  lodge: {
    serviceNoun: "experiences", galleryHeading: "The wild side",
    aboutQuote: "Two hours from the city and a lifetime from your inbox.",
    reviewHeading: "Guest stories", guarantee: "Weather cancels a game drive? We reschedule at no cost.",
    reviewItems: [
      { quote: "Saw a leopard 20 metres from the deck. The kids still talk about it daily.", name: "The Ngcobo family", label: "Safari" },
      { quote: "Third anniversary here. The sundowner drive is worth every cent.", name: "Mthunzi & Nomsa", label: "Couples" },
      { quote: "Two hours from Joburg and it feels like another country. Best-value escape.", name: "J. Khumalo", label: "Weekend" },
    ],
  },
  lawyer: {
    serviceNoun: "practice areas", galleryHeading: "The firm",
    aboutQuote: "Most people don't fear the process — they fear being left in the dark. So we answer.",
    reviewHeading: "Client outcomes", guarantee: "Every fee quoted in writing before we start. No exceptions.",
    reviewItems: [
      { quote: "Quoted Tuesday, transfer lodged Friday. I've never had professionals this responsive.", name: "R. Oosthuizen", label: "Property" },
      { quote: "Told me honestly my CCMA case was weak, saved me thousands, then helped me settle.", name: "N. Dube", label: "Labour" },
      { quote: "Five years, three businesses, one WhatsApp away. I don't Google lawyers anymore.", name: "S. Pillay", label: "Retainer" },
    ],
  },
  accountant: {
    serviceNoun: "services", galleryHeading: "Our work",
    aboutQuote: "Deadlines don't care about your excuses — but we make sure you never need one.",
    reviewHeading: "Client feedback", guarantee: "SARS penalty from our filing? We cover it. Simple.",
    reviewItems: [
      { quote: "First tax practitioner who explained my return in actual English. No jargon.", name: "Busisiwe K.", label: "Personal tax" },
      { quote: "Switched from a big firm. Cheaper, faster, and they remember my name.", name: "M. van der Merwe", label: "SME" },
      { quote: "Three years of clean SARS submissions. Haven't thought about tax season since.", name: "T. Mokoena", label: "Bookkeeping" },
    ],
  },
  cleaning: {
    serviceNoun: "services", galleryHeading: "Before & after",
    aboutQuote: "A clean space changes how you feel — we make sure it's spotless, not just tidy.",
    reviewHeading: "Happy homes & offices", guarantee: "Not satisfied? We'll come back within 24 hours and redo it free.",
    reviewItems: [
      { quote: "End-of-lease clean got our full deposit back. The landlord was genuinely impressed.", name: "K. Adams", label: "End-of-lease" },
      { quote: "Weekly cleans for 2 years. Same team, same quality, never missed a day.", name: "Mrs. Nkosi", label: "Regular" },
      { quote: "Office carpet hadn't been cleaned in years. Looks like they replaced it. They didn't.", name: "SureFinance PTY", label: "Commercial" },
    ],
  },
  solar: {
    serviceNoun: "solutions", galleryHeading: "Installations",
    aboutQuote: "Load-shedding took enough from us. We give the power back — permanently.",
    reviewHeading: "What homeowners say", guarantee: "25-year panel warranty, 10-year inverter warranty, installed in a day.",
    reviewItems: [
      { quote: "Haven't bought Eskom power since the install. The system paid for itself in 18 months.", name: "P. van Wyk", label: "Home 5kW" },
      { quote: "They sized the system perfectly for our shop. No oversell, no undersell.", name: "R. Patel", label: "Business" },
      { quote: "Install was done by 4pm. We watched loadshedding from the couch that evening. With lights on.", name: "J. Moloto", label: "Residential" },
    ],
  },
  vet: {
    serviceNoun: "services", galleryHeading: "Our patients",
    aboutQuote: "They can't tell you what's wrong — but we'll figure it out, gently.",
    reviewHeading: "Pet parent reviews", guarantee: "After-hours emergency line for all registered patients.",
    reviewItems: [
      { quote: "Our rescue dog was terrified of vets. Dr. Paw handled him with so much patience.", name: "Lisa T.", label: "Nervous dog" },
      { quote: "Vaccination, microchip and checkup all done in one calm visit. No drama.", name: "Bongani N.", label: "Routine" },
      { quote: "They called the next day to check on our cat after surgery. That's care.", name: "The Fourie family", label: "Post-op" },
    ],
  },
  gym: {
    serviceNoun: "memberships & classes", galleryHeading: "The floor",
    aboutQuote: "Results come from consistency, not Instagram. We just make showing up easy.",
    reviewHeading: "Member stories", guarantee: "First week free. Cancel your membership anytime, no penalty.",
    reviewItems: [
      { quote: "Lost 12kg in 6 months. The PT knew exactly how hard to push without breaking me.", name: "Thando M.", label: "Weight loss" },
      { quote: "Best gym vibe in Cape Town. No ego, just people putting in work.", name: "C. Hendricks", label: "Atmosphere" },
      { quote: "5am crew is my second family. Been coming for 3 years and counting.", name: "Zanele W.", label: "Community" },
    ],
  },
  courier: {
    serviceNoun: "delivery options", galleryHeading: "On the road",
    aboutQuote: "A parcel lost is a customer lost — we treat every package like it's ours.",
    reviewHeading: "Sender feedback", guarantee: "Proof of delivery on every shipment. Lost = refunded.",
    reviewItems: [
      { quote: "Same-day delivery to Pretoria from Midrand, R120. Cheaper and faster than the big guys.", name: "Online Seller SA", label: "E-commerce" },
      { quote: "Monthly account saves us at least R2k. Tracking links keep customers happy.", name: "K. Dlamini", label: "Business" },
      { quote: "They collected, delivered and sent me the POD before my coffee got cold.", name: "Nomsa R.", label: "Once-off" },
    ],
  },
  bakery: {
    serviceNoun: "baked goods", galleryHeading: "From the oven",
    aboutQuote: "Baked with love, priced with respect — good bread shouldn't cost a fortune.",
    reviewHeading: "What customers say", guarantee: "Not fresh? Not right? We replace it, no questions.",
    reviewItems: [
      { quote: "The sourdough is the best in PMB. Crusty outside, soft inside. Perfect.", name: "Helen K.", label: "Bread" },
      { quote: "Custom cake for my daughter's 5th was EXACTLY what I showed in the picture.", name: "Tumi M.", label: "Custom cake" },
      { quote: "Friday morning croissants have become a family ritual. Thank you, Noma.", name: "The Erasmus family", label: "Regular" },
    ],
  },
  realEstate: {
    serviceNoun: "services", galleryHeading: "Properties",
    aboutQuote: "Buying or selling — you deserve an agent who answers the phone after 5pm.",
    reviewHeading: "Client reviews", guarantee: "No sale, no commission. We earn our fee.",
    reviewItems: [
      { quote: "Sold our house in 3 weeks at asking price. Marketing was professional and fast.", name: "The Molefe family", label: "Seller" },
      { quote: "Found us the perfect 3-bed in our budget. Didn't push us into something bigger.", name: "J. & N. Peters", label: "Buyer" },
      { quote: "Best tenant screening process. Haven't had a late payment in 2 years.", name: "Landlord, Midrand", label: "Rental" },
    ],
  },
  eventPlanner: {
    serviceNoun: "packages", galleryHeading: "Our events",
    aboutQuote: "Your only job on the day should be to enjoy it. We handle everything else.",
    reviewHeading: "Client love", guarantee: "Full refund if we don't deliver exactly what was agreed.",
    reviewItems: [
      { quote: "Our wedding was perfect. Every detail, every timeline, every flower — exactly right.", name: "Lesego & Tebogo", label: "Wedding" },
      { quote: "Year-end function for 200 people, planned in 3 weeks. Flawless execution.", name: "HR Director, TechCo", label: "Corporate" },
      { quote: "The décor was even better than my Pinterest board. I actually cried.", name: "Naledi K.", label: "Birthday" },
    ],
  },
  florist: {
    serviceNoun: "arrangements", galleryHeading: "Fresh today",
    aboutQuote: "Flowers say what words can't — we make sure they say it beautifully.",
    reviewHeading: "Happy recipients", guarantee: "Same-day delivery before 14:00 or we add a free bouquet.",
    reviewItems: [
      { quote: "Sent roses for Valentine's. She said they were the most beautiful she'd ever received.", name: "Anonymous sender", label: "Roses" },
      { quote: "Wedding florals were breathtaking. The arch alone was worth the entire budget.", name: "Bride, Dec '24", label: "Wedding" },
      { quote: "I order monthly for reception. Always fresh, always creative, always on time.", name: "Luxury Dental", label: "Corporate" },
    ],
  },
  funeralHome: {
    serviceNoun: "services", galleryHeading: "Our chapel",
    aboutQuote: "In your hardest moment, you deserve people who handle everything with care.",
    reviewHeading: "Family testimonials", guarantee: "24/7 availability — we're here whenever you need us.",
    reviewItems: [
      { quote: "They handled everything with such dignity. Our family could just grieve.", name: "The Sithole family", label: "Full service" },
      { quote: "Transparent pricing from the first call. No hidden costs during the worst week of our lives.", name: "M. Khuzwayo", label: "Pricing" },
      { quote: "The repatriation was handled seamlessly. They communicated every step.", name: "N. Okonkwo", label: "Repatriation" },
    ],
  },
  security: {
    serviceNoun: "solutions", galleryHeading: "Installations",
    aboutQuote: "Your family's safety isn't something you should have to worry about. That's our job.",
    reviewHeading: "Protected clients", guarantee: "Response time under 5 minutes or your monthly fee is waived.",
    reviewItems: [
      { quote: "Alarm triggered at 2am. Armed response was at our gate in 4 minutes flat.", name: "D. van Tonder", label: "Response" },
      { quote: "The CCTV footage helped police arrest the suspect the same week. Worth every cent.", name: "N. Mthembu", label: "CCTV" },
      { quote: "Three years, zero incidents. That's the best review a security company can get.", name: "S. Govender", label: "Prevention" },
    ],
  },
  daycare: {
    serviceNoun: "programmes", galleryHeading: "A day with us",
    aboutQuote: "Your child's first classroom should feel like a second home.",
    reviewHeading: "What parents say", guarantee: "DSD registered. First aid trained. CCTV in all rooms.",
    reviewItems: [
      { quote: "My daughter runs to the gate every morning. That tells me everything I need to know.", name: "Palesa M.", label: "Toddler" },
      { quote: "Daily photo updates on WhatsApp. I never feel like I'm missing anything.", name: "J. Robertson", label: "Communication" },
      { quote: "Clean, structured, and the teachers genuinely love the children. Couldn't ask for more.", name: "The Dlamini family", label: "Siblings" },
    ],
  },
};

/* Default copy for industries not explicitly listed above */
const DEFAULT_COPY: IndustryCopy = {
  serviceNoun: "services", galleryHeading: "Our work",
  aboutQuote: "We let our work speak for itself — and our customers confirm it.",
  reviewHeading: "What clients say", guarantee: "Quality guaranteed on every job.",
  reviewItems: [
    { quote: "Professional, on time, and the quality exceeded expectations.", name: "Happy Customer", label: "Service" },
    { quote: "Found them on WhatsApp, booked the same day. Couldn't be easier.", name: "Repeat Client", label: "Booking" },
    { quote: "Fair prices, honest communication, great results. Highly recommend.", name: "Local Resident", label: "Value" },
  ],
};

export function getDemoSiteData(input: DemoInput, opts?: { isDemo?: boolean }): SiteData {
  const isDemo = opts?.isDemo ?? true;
  const key = FALLBACK[input.industry] ?? "hairSalon";
  const base = BASE[key] ?? BASE.hairSalon;
  const copy = COPY[key] ?? DEFAULT_COPY;

  /*
   * Drop the keys the caller left undefined before spreading.
   *
   * The caller maps nullable database columns like this:
   *     whatsapp: site.whatsapp ?? undefined
   * so a site with no WhatsApp number arrives as `{ whatsapp: undefined }`.
   * A plain `...input` would then OVERWRITE the demo default from `base` with
   * undefined — and templates legitimately assume these are strings, e.g.
   *     site.whatsapp.replace(/\D/g, "")
   * which threw "Cannot read properties of undefined (reading 'replace')" and
   * returned a 500 on a customer's own live site. Only spread values that
   * actually exist, so a missing field falls back to the industry default
   * instead of blanking out or crashing the page.
   *
   * The three structured fields are still normalised explicitly below.
   */
  const provided = Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  ) as Partial<SiteData>;

  const demoExtras = isDemo
    ? {
        rating: base.rating,
        reviews: base.reviews,
        yearsInBusiness: base.yearsInBusiness,
        serviceNoun: copy.serviceNoun,
        galleryHeading: copy.galleryHeading,
        aboutQuote: copy.aboutQuote,
        reviewHeading: copy.reviewHeading,
        reviewItems: copy.reviewItems,
        guarantee: copy.guarantee,
        isDemo: true as const,
      }
    : {
        rating: undefined,
        reviews: undefined,
        yearsInBusiness: undefined,
        serviceNoun: copy.serviceNoun,
        galleryHeading: copy.galleryHeading,
        aboutQuote: copy.aboutQuote,
        reviewHeading: undefined, // do not show review headings on published sites unless owner supplies
        reviewItems: undefined,
        guarantee: undefined,
        isDemo: false as const,
      };

  return {
    ...base,
    ...demoExtras,
    ...provided,
    // Ensure published sites do not retain demo-only fields if owner did not provide them
    ...(isDemo ? {} : { rating: undefined, reviews: undefined, yearsInBusiness: undefined, reviewItems: undefined, guarantee: undefined, reviewHeading: undefined }),
    industry: input.industry,
    galleryUrls: (input.galleryUrls ?? base.galleryUrls).slice(0, 6),
    services: input.services ?? base.services,
    socials: input.socials ?? base.socials,
    isDemo,
  };
}

export function demoIndustriesForTemplate(templateId: string): string[] {
  if (templateId === "velvet")  return ["hairSalon", "barber", "spa", "eventPlanner", "florist"];
  if (templateId === "forge")   return ["plumber", "electrician", "mechanic", "construction", "solar"];
  if (templateId === "savanna") return ["guestHouse", "lodge", "restaurant", "coffeeShop", "tourGuide"];
  if (templateId === "praxis")  return ["lawyer", "accountant", "doctor", "dentist", "realEstate"];
  if (templateId === "market")  return ["bakery", "grocery", "hardware", "pharmacy", "catering"];
  if (templateId === "vital")   return ["cleaning", "courier", "gym", "drivingSchool", "dogTraining"];
  return [];
}
