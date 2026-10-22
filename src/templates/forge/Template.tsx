"use client";

import type { SiteData } from "../types";
import LegacyForge from "./legacy";
import Electrician from "./electrician";
import Plumber from "./plumber";
import Carpenter from "./carpenter";
import Construction from "./construction";

/**
 * Forge — Trades & Construction template dispatcher.
 *
 * Routes to an industry-specific design based on site.industry.
 * Industries without a dedicated design fall back to the legacy Forge layout.
 *
 * Priority industries with dedicated designs:
 *  - electrician  → Circuit   (angular, high-contrast, COC-focused)
 *  - plumber      → Flow     (water-inspired, booking-centred)
 *  - carpenter    → Grain    (crafted, warm, editorial gallery)
 *  - construction → Blueprint (architectural, strong grid, quote CTA)
 *
 * All other Forge industries (handyman, painter, roofer, solar, etc.)
 * render the legacy Forge layout unchanged.
 */
export default function ForgeTemplate({ site }: { site: SiteData }) {
  switch (site.industry) {
    case "electrician":
      return <Electrician site={site} />;
    case "plumber":
      return <Plumber site={site} />;
    case "carpenter":
      return <Carpenter site={site} />;
    case "construction":
      return <Construction site={site} />;
    default:
      return <LegacyForge site={site} />;
  }
}
