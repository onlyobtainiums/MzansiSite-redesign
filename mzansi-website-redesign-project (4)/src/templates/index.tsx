import type { ComponentType } from "react";
import type { SiteData } from "./types";
import VelvetTemplate from "./velvet/Template";
import ForgeTemplate from "./forge/Template";
import SavannaTemplate from "./savanna/Template";
import PraxisTemplate from "./praxis/Template";
import MarketTemplate from "./market/Template";
import VitalTemplate from "./vital/Template";

/** Dispatcher: templateId → component. All six designs are live. */
export const TEMPLATE_COMPONENTS: Record<string, ComponentType<{ site: SiteData }>> = {
  velvet: VelvetTemplate,
  forge: ForgeTemplate,
  savanna: SavannaTemplate,
  praxis: PraxisTemplate,
  market: MarketTemplate,
  vital: VitalTemplate,
};

export function TemplateRenderer({ templateId, site }: { templateId: string; site: SiteData }) {
  const Template = TEMPLATE_COMPONENTS[templateId];
  if (!Template) return null;
  return <Template site={site} />;
}
