import type { Metadata } from "next";
import MarketTemplate from "@/templates/market/Template";
import { getDemoSiteData } from "@/templates/demo-data";

export const metadata: Metadata = {
  title: "Bakery Preview — QA Only",
  robots: { index: false, follow: false, noarchive: true },
};

export default function BakeryPreviewPage() {
  const site = getDemoSiteData(
    { industry: "bakery", businessName: "Noma's Home Bakery" },
    { isDemo: true }
  );
  return (
    <>
      <div className="sr-only">Bakery QA Preview</div>
      <MarketTemplate site={site as any} />
    </>
  );
}
