export type TradeKey = "salon" | "barber" | "spa" | "plumber";

export interface Service {
  name: string;
  price: string;
}

export interface Trade {
  key: TradeKey;
  label: string;
  badge: string;
  business: string;
  area: string;
  blurb: string;
  image: string;
  accent: string;
  services: Service[];
  hours: string;
  rating: string;
  reviews: number;
}

export const TRADES: Record<TradeKey, Trade> = {
  salon: {
    key: "salon",
    label: "Hair Salon",
    badge: "Hair & Braids",
    business: "Naledi's Braids — DEMO",
    area: "Soweto, Johannesburg",
    blurb: "Knotless braids, installs and treatments — enquire for prices and availability.",
    image:
      "https://images.pexels.com/photos/3212167/pexels-photo-3212167.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800&fm=webp",
    accent: "#c96f3f",
    services: [
      { name: "Knotless braids", price: "R450" },
      { name: "Wash & blow-dry", price: "R180" },
      { name: "Kids cornrows", price: "R220" },
      { name: "Wig install", price: "R350" },
    ],
    hours: "Tue – Sat · 08:00 – 18:00",
    rating: "4.9",
    reviews: 132,
  },
  barber: {
    key: "barber",
    label: "Barbershop",
    badge: "Cuts & Fades",
    business: "Siya's Cuts — DEMO",
    area: "Khayelitsha, Cape Town",
    blurb: "Sharp fades, clean shaves and beard sculpting — walk-ins and bookings welcome.",
    image:
      "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800&fm=webp",
    accent: "#7a8b6f",
    services: [
      { name: "Skin fade", price: "R120" },
      { name: "Cut + beard combo", price: "R180" },
      { name: "Beard sculpt", price: "R90" },
      { name: "Kids cut (u12)", price: "R80" },
    ],
    hours: "Mon – Sun · 08:00 – 19:00",
    rating: "4.8",
    reviews: 211,
  },
  spa: {
    key: "spa",
    label: "Day Spa",
    badge: "Wellness & Beauty",
    business: "Amara Day Spa — DEMO",
    area: "Umhlanga, Durban",
    blurb: "Wellness treatments in a calm space — enquire for treatments and availability.",
    image:
      "https://images.pexels.com/photos/6621334/pexels-photo-6621334.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800&fm=webp",
    accent: "#a3856a",
    services: [
      { name: "Full-body massage", price: "R550" },
      { name: "Glow facial", price: "R380" },
      { name: "Mani + pedi", price: "R420" },
      { name: "Hot stone ritual", price: "R620" },
    ],
    hours: "Mon – Sat · 09:00 – 17:00",
    rating: "5.0",
    reviews: 98,
  },
  plumber: {
    key: "plumber",
    label: "Plumbing",
    badge: "Home Services",
    business: "Dlamini Plumbing — DEMO",
    area: "Centurion, Pretoria",
    blurb: "Geysers, leaks and blockages — enquire for quotes and availability.",
    image:
      "https://images.pexels.com/photos/221902/pexels-photo-221902.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800&fm=webp",
    accent: "#4a6b8a",
    services: [
      { name: "Call-out fee", price: "R450" },
      { name: "Geyser repair", price: "R950" },
      { name: "Drain unblock", price: "R650" },
      { name: "Leak detection", price: "R550" },
    ],
    hours: "Mon – Sat · 07:00 – 17:00",
    rating: "4.9",
    reviews: 167,
  },
};

export const TRADE_LIST = Object.values(TRADES);
