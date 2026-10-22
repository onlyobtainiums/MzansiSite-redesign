import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Only canonical, indexable public URLs — no /api, /dashboard, /auth, /sites preview, or query strings
const PUBLIC_ROUTES = [
  "",
  "acceptable-use",
  "website-builder-south-africa",
  "website-for-salons",
  "website-for-barbers",
  "website-for-braiders",
  "website-for-nail-technicians",
  "website-for-small-businesses",
  "whatsapp-booking-website",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PUBLIC_ROUTES.map((route) => {
    const path = route ? `/${route}` : "/";
    const url = route ? `${SITE_URL}/${route}` : `${SITE_URL}/`;
    // Homepage most frequent, industry pages weekly
    const isHome = route === "";
    return {
      url,
      lastModified: now,
      changeFrequency: (isHome ? "daily" : "weekly") as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: isHome ? 1 : route.startsWith("website") || route === "whatsapp-booking-website" ? 0.85 : 0.5,
    };
  });
}
