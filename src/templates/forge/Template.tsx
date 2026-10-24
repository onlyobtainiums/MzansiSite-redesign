"use client";

import type { SiteData } from "../types";
import LegacyForge from "./legacy";
import BarberVariant2 from "../velvet/barber-variants/Variant2";
import Electrician from "./electrician";
import Plumber from "./plumber";
import PlumberV2ServicesFirst from "./variants/plumber/V2ServicesFirst";
import PlumberV3TrustFirst from "./variants/plumber/V3TrustFirst";
import PlumberV4GalleryFirst from "./variants/plumber/V4GalleryFirst";
import PlumberV5AboutFirst from "./variants/plumber/V5AboutFirst";
import PlumberV6BookingFirst from "./variants/plumber/V6BookingFirst";
import HairSalonVariant2 from "../velvet/hair-salon-variants/V2ServicesFirst";
import Carpenter from "./carpenter";
import Construction from "./construction";
import Handyman from "./handyman";
import Painter from "./painter";
import Roofer from "./roofer";
import Solar from "./solar";
import ApplianceRepair from "./applianceRepair";
import Aircon from "./aircon";
import Landscaper from "./landscaper";
import Waste from "./waste";
import Mechanic from "./mechanic";
import CarWash from "./carWash";
import Towing from "./towing";
import SecurityCompany from "./security";
import SelfStorage from "./storage";

/**
 * Forge — Trades & Construction template dispatcher.
 *
 * Routes to an industry-specific design based on site.industry.
 * Industries without a dedicated design fall back to the legacy Forge layout.
 *
 * Priority industries with dedicated designs (Step 1):
 *  - electrician  → Circuit   (angular, high-contrast, COC-focused)
 *  - plumber      → Flow      (water-inspired, booking-centred)
 *  - carpenter    → Grain     (crafted, warm, editorial gallery)
 *  - construction → Blueprint (architectural, strong grid, quote CTA)
 *
 * Additional dedicated designs (Stage 2):
 *  - handyman      → Toolbelt  (amber + slate, sharp fix-it layout)
 *  - painter       → Swatch    (terracotta + cream, colour-chip gallery)
 *  - roofer        → Shingle   (slate + orange diagonal, storm-ready)
 *  - solar         → Panel     (blue + yellow, ROI calculator energy)
 *  - applianceRepair → Workbench (charcoal + amber, workshop focused)
 *  - aircon        → Climate   (cool blue, cooling-focused)
 *  - landscaper    → Garden    (sage green organic, soft plant shapes)
 *  - waste         → Bin       (blocky green/grey, waste focused)
 *  - mechanic      → Garage    (dark grey + chrome, bay-door imagery)
 *  - carWash       → Shine     (water blue, wet-look reflection)
 *  - towing        → Flatbed   (emergency red + white, breakdown recovery)
 *  - securityCompany → Sentinel (dark navy + amber alert, CCTV monitoring)
 *  - selfStorage   → Unit      (purple + grey, storage unit grid)
 *
 * All other Forge industries render the legacy Forge layout unchanged.
 */
export default function ForgeTemplate({ site }: { site: SiteData }) {
  switch (site.industry) {
    case "electrician":
      return <Electrician site={site} />;
    case "plumber": {
      const v = (site.designVariant ?? 1) as number;
      if (v === 2) return <PlumberV2ServicesFirst site={site} />;
      if (v === 3) return <PlumberV3TrustFirst site={site} />;
      if (v === 4) return <PlumberV4GalleryFirst site={site} />;
      if (v === 5) return <PlumberV5AboutFirst site={site} />;
      if (v === 6) return <PlumberV6BookingFirst site={site} />;
      return <Plumber site={site} />;
    }
    case "carpenter":
      return <Carpenter site={site} />;
    case "construction":
      return <Construction site={site} />;
    case "handyman":
      return <Handyman site={site} />;
    case "painter":
      return <Painter site={site} />;
    case "roofer":
      return <Roofer site={site} />;
    case "barber":
      return <BarberVariant2 site={site} />;
    case "hairSalon":
      return <HairSalonVariant2 site={site} />;
    case "solar":
      return <Solar site={site} />;
    case "applianceRepair":
      return <ApplianceRepair site={site} />;
    case "aircon":
      return <Aircon site={site} />;
    case "landscaper":
      return <Landscaper site={site} />;
    case "waste":
      return <Waste site={site} />;
    case "mechanic":
      return <Mechanic site={site} />;
    case "carWash":
      return <CarWash site={site} />;
    case "towing":
      return <Towing site={site} />;
    case "securityCompany":
      return <SecurityCompany site={site} />;
    case "selfStorage":
      return <SelfStorage site={site} />;
    default:
      return <LegacyForge site={site} />;
  }
}
