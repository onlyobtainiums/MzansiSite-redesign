import type { Metadata } from "next";
import VelvetTemplate from "@/templates/velvet/Template";
import { getDemoSiteData } from "@/templates/demo-data";

export const metadata: Metadata = {
  title: "Barber Preview — QA Only",
  robots: { index: false, follow: false, noarchive: true },
};

export default function BarberPreviewPage() {
  const site = getDemoSiteData(
    { industry: "barber", businessName: "Siya's Cuts — Khayelitsha" },
    { isDemo: true }
  );
  return (
    <>
      <div className="sr-only">Barber QA Preview</div>
      <VelvetTemplate site={site as any} />
    </>
  );
}
