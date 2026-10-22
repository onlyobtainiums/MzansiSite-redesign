import type { Metadata } from "next";
import SavannaTemplate from "@/templates/savanna/Template";
import { getDemoSiteData } from "@/templates/demo-data";

/**
 * Temporary preview-only route for authorized QA review.
 * - Uses demo data, no DB seed required
 * - Not linked from navigation, not indexed
 * - Does not affect /sites/[slug] or customer routes
 * - Safe to remove before committing; retained here only for local verification
 */
export const metadata: Metadata = {
  title: "CoffeeShop Preview — QA Only",
  robots: { index: false, follow: false, noarchive: true },
};

export default function CoffeePreviewPage() {
  const site = getDemoSiteData(
    { industry: "coffeeShop", businessName: "Molo Café — Woodstock" },
    { isDemo: true }
  );
  // Inject a very long name variant check via query? Keep simple.
  return (
    <>
      {/* Hidden H1 for QA tooling */}
      <div className="sr-only">CoffeeShop QA Preview f9929ff</div>
      <SavannaTemplate site={site as any} />
    </>
  );
}
