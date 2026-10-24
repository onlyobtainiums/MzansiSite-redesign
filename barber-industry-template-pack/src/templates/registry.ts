import type { ComponentType } from 'react';
import type { TemplateId, TemplateProps } from '../types';
import VelvetTemplate from './velvet/VelvetTemplate';
import ForgeTemplate from './forge/ForgeTemplate';
import SavannaTemplate from './savanna/SavannaTemplate';
import PraxisTemplate from './praxis/PraxisTemplate';
import MarketTemplate from './market/MarketTemplate';
import VitalTemplate from './vital/VitalTemplate';

export interface TemplateDef {
  id: TemplateId;
  name: string;
  /** what this family leads with */
  strategy: string;
  /** one-line pitch in the chooser */
  blurb: string;
  /** palette chips shown on the selector */
  chips: string[];
  component: ComponentType<TemplateProps>;
}

export const TEMPLATES: TemplateDef[] = [
  {
    id: 'velvet',
    name: 'Velvet',
    strategy: 'Hero-first',
    blurb: 'An editorial opening frame — your name in the lights, then menu, frames and visiting details.',
    chips: ['#131009', '#f2ead9', '#c8a05c'],
    component: VelvetTemplate,
  },
  {
    id: 'forge',
    name: 'Forge',
    strategy: 'Services-first',
    blurb: 'Your price list leads. Category tabs, dotted leaders and plain numbers — no fluff.',
    chips: ['#ece9e2', '#17191d', '#ff4d00'],
    component: ForgeTemplate,
  },
  {
    id: 'savanna',
    name: 'Savanna',
    strategy: 'Trust-first',
    blurb: 'Hours, location and house standards upfront. Credentials only appear when they’re real.',
    chips: ['#f4ecdc', '#b65b2e', '#55602f'],
    component: SavannaTemplate,
  },
  {
    id: 'praxis',
    name: 'Praxis',
    strategy: 'Gallery-first',
    blurb: 'A portfolio wall of your work. Big featured frame, loose grid, honest empty states.',
    chips: ['#faf9f6', '#121212', '#2e4bff'],
    component: PraxisTemplate,
  },
  {
    id: 'market',
    name: 'Market',
    strategy: 'About-first',
    blurb: 'Your story told in chapters — who you are, what you do, where and when to find you.',
    chips: ['#fbf6ea', '#1f3d2b', '#d9501e'],
    component: MarketTemplate,
  },
  {
    id: 'vital',
    name: 'Vital',
    strategy: 'Enquiry-first',
    blurb: 'Contact is the homepage. WhatsApp front and centre, plus a clear enquiry form.',
    chips: ['#f4f6f1', '#0c3226', '#1faf57'],
    component: VitalTemplate,
  },
];

export const templateIndex = (id: TemplateId) => TEMPLATES.findIndex((t) => t.id === id);
export const templateById = (id: TemplateId) => TEMPLATES[templateIndex(id)];
