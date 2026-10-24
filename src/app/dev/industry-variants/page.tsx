import { notFound } from "next/navigation";
import { VariantClient } from "./client";

/**
 * DEV-ONLY visual comparison harness for the 18 industry-variant
 * combinations: Plumber V1–V6, Barber V1–V6, Hair Salon V1–V6.
 *
 * Server-side guard: allows local development (NODE_ENV=development) and
 * Vercel Preview (VERCEL_ENV=preview), but returns 404 in Vercel Production
 * (VERCEL_ENV=production). Vercel Preview runs with NODE_ENV=production, so
 * NODE_ENV alone cannot distinguish preview from production — VERCEL_ENV is
 * the reliable signal.
 *
 * This is an active server-side refusal, not merely a hidden link. The route
 * can never be exposed on the live production website.
 *
 * Renders every variant against identical industry demo data
 * (getDemoSiteData, isDemo: true). No database edits, migrations, or changes
 * to existing production routes.
 *
 * Variant mapping per industry (V1 is the default / fallback component):
 *  - plumber     → Plumber (base Flow), PlumberV2–V6 {ServicesFirst,TrustFirst,GalleryFirst,AboutFirst,BookingFirst}
 *  - barber      → BarberVariant1 … Variant6
 *  - hairSalon   → HairSalonV1HeroFirst, HairSalonV2–V6 {ServicesFirst,TrustFirst,GalleryFirst,AboutFirst,BookingFirst}
 *
 * `designVariant: undefined` falls back to V1 in the real Template dispatch
 * (VelvetTemplate / ForgeTemplate). That fallback is covered by the unit test
 * suites; this harness renders V1 by default to represent it.
 */
export default function DevIndustryVariantsPage() {
  const isDev = process.env.NODE_ENV === "development";
  const isPreview = process.env.VERCEL_ENV === "preview";

  if (!isDev && !isPreview) {
    notFound();
  }

  return <VariantClient />;
}
