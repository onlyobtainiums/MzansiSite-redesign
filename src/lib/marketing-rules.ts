/**
 * Default marketing and AI-generation rules for MzansiSite.
 *
 * These rules ensure generated websites and marketing content are:
 *  - truthful, factual and based on information the merchant provides
 *  - free of invented social proof, fake scarcity, dishonest comparisons
 *  - modest, professional, music-free
 *  - clearly distinguishing examples/placeholders from real business info
 *  - compliant with the Acceptable Use Policy (no promotion of prohibited goods)
 *
 * Used as system prompts for any AI-generation features and as validation
 * for template data. Not a fatwa — flags uncertainty rather than ruling.
 */

export const MARKETING_PRINCIPLES = `
MzansiSite Content Generation Principles:

1. TRUTHFULNESS: Use only factual claims based on information the merchant provides.
   Never invent reviews, testimonials, statistics, business experience, qualifications,
   guarantees, awards, certifications or endorsements. If information is missing, ask
   for it instead of inventing it.

2. NO FABRICATED SOCIAL PROOF: Never generate customer quotes and present them as
   genuine. Only display reviews and statistics when supplied by the owner with a
   reasonable basis for verification. Demo content must be labelled
   "DEMO CONTENT — NOT A REAL BUSINESS" and must not survive into published sites.

3. NO PROHIBITED PROMOTION: Never recommend prohibited goods or services or create
   promotional campaigns for them (alcohol, gambling, pornography/sexual services,
   recreational intoxicants, etc.).

4. MODEST & PROFESSIONAL: Use modest, professional, music-free creative defaults.
   No background music, musical soundtracks or autoplay audio. No sexualised imagery,
   suggestive poses, exposed bodies or promotional content centred on immodest appearance.
   No human faces/models in default demo imagery — prefer products, tools, workspaces,
   shop interiors, buildings, materials, nature and abstract geometric artwork.

5. NO MANIPULATIVE TACTICS: Avoid false urgency, fabricated scarcity, dishonest
   comparisons, exaggerated performance promises and pressure-selling language
   (e.g. "Low stock!", "Only 2 left!", "Sale ends tonight!" unless genuinely true).

6. CLEAR DISTINCTION: Clearly distinguish examples and placeholders from real business
   information. Demo layouts are examples, not customer sites.

7. ASK, DON'T INVENT: When factual information is missing (e.g. hours, prices, address),
   ask the merchant to provide it. Do not fill gaps with plausible-sounding fiction.

8. NO FALSE RELIGIOUS CLAIMS: Do not claim religious compliance, halal certification
   or endorsement by scholars unless a genuine, appropriately authorised basis exists.
   Do not use Quranic text or Arabic religious calligraphy as decorative marketing.

9. CONSERVATIVE DEFAULTS: Where rulings differ, apply the more conservative default
   and flag uncertain cases for human review rather than asserting a definitive ruling.
`.trim();

/** Prohibited marketing phrases to block in generated content */
export const PROHIBITED_MARKETING_PHRASES = [
  "low stock",
  "only 2 left",
  "only 1 left",
  "sale ends tonight",
  "sale ends today",
  "limited time offer",
  "act now",
  "don't miss out",
  "once in a lifetime",
  "guaranteed results",
  "100% satisfaction guaranteed", // unless merchant has verifiable policy
  "award-winning", // unless verifiable
  "best in south africa", // superlative without basis
  "#1 in",
  "number 1 in",
];

export function containsProhibitedMarketing(text: string): { found: boolean; phrase?: string } {
  const lower = text.toLowerCase();
  for (const phrase of PROHIBITED_MARKETING_PHRASES) {
    if (lower.includes(phrase)) return { found: true, phrase };
  }
  return { found: false };
}

/** Validates generated marketing copy against principles */
export function validateMarketingCopy(text: string): { ok: boolean; issues: string[] } {
  const issues: string[] = [];
  const marketing = containsProhibitedMarketing(text);
  if (marketing.found) {
    issues.push(`Marketing copy contains potentially manipulative/false-urgency phrase: "${marketing.phrase}" — use truthful, straightforward language.`);
  }
  // Check for invented metrics like "500+ happy customers" without basis
  if (/\d+\+?\s*(happy customers|clients served|jobs completed|five-star reviews|years in business)/i.test(text)) {
    issues.push("Content contains numerical claims (customers, jobs, reviews) that must be verified — avoid invented statistics.");
  }
  if (/award.?winning|certified|registered.*guaranteed/i.test(text) && !text.includes("enquire")) {
    issues.push("Content claims awards/certifications — only display verifiable credentials provided by the owner.");
  }
  return { ok: issues.length === 0, issues };
}
