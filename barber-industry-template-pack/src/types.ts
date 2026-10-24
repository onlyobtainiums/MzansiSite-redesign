/**
 * MzansiSite — Barber Template Pack
 * Shared data contracts.
 *
 * Template family components are pure renderers: they receive `TemplateProps`
 * and never store business data themselves. All user content lives in the
 * StudioContext so switching designs never loses preview data.
 */

export type TemplateId = 'velvet' | 'forge' | 'savanna' | 'praxis' | 'market' | 'vital';

export interface ServiceItem {
  id: string;
  category: string; // e.g. "Cuts", "Beard", "Extras"
  name: string;
  description: string;
  /** Display price string, e.g. "R240" or "from R120". Sample data only until the customer edits it. */
  price: string;
}

export interface HourRow {
  id: string;
  label: string; // e.g. "Mon – Fri"
  value: string; // e.g. "08:30 – 18:00"
}

export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  /** true = bundled sample imagery; false = uploaded by the customer */
  sample: boolean;
}

export interface BusinessData {
  name: string;
  tagline: string;
  /** About / story. Paragraphs separated by blank lines. */
  description: string;
  /** International format without "+", e.g. 27825550147 */
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  area: string; // suburb / township + city
  hours: HourRow[];
  services: ServiceItem[];
  /**
   * Qualifications, certificates, memberships — user-supplied only.
   * The pack never invents credentials; the sample business ships with none.
   */
  credentials: string[];
}

export interface StudioContent {
  business: BusinessData;
  /** dataURL of one uploaded logo, or null */
  logo: string | null;
  photos: PhotoItem[];
}

export type EditorTab = 'business' | 'services' | 'media';

export interface TemplateProps {
  business: BusinessData;
  logo: string | null;
  photos: PhotoItem[];
  /** Ask the host studio to open a specific editor tab (used by empty states). */
  onEditRequest?: (tab: EditorTab) => void;
}
