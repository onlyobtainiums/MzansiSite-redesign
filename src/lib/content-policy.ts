/**
 * Conservative Islamic business and content standards for MzansiSite.
 *
 * This module defines:
 *  - Clearly prohibited categories (blocked outright)
 *  - Ambiguous cases requiring human review (flagged)
 *  - Helper functions for validating site content against the policy
 *
 * PRINCIPLES:
 *  - Conservative defaults where rulings differ (e.g. if scholars differ on
 *    tobacco, we treat recreational tobacco/shisha as prohibited; medicinal
 *    pharmacy sales are permitted).
 *  - Do NOT assume an entire broad industry is impermissible because some
 *    businesses in it offer prohibited services. Restaurants, pharmacies,
 *    beauty, salons, spas, event businesses are judged on their *actual
 *    offerings*, not category name alone.
 *  - Never claim MzansiSite is halal-certified.
 *  - Classifier is not perfectly accurate — flag uncertain cases for admin review.
 */

/** Clearly prohibited activities — blocked outright */
export const PROHIBITED_KEYWORDS: Record<string, { terms: string[]; label: string; reason: string }> = {
  alcohol: {
    label: "Alcohol sales & promotion",
    terms: [
      "alcohol", "liquor", "bottle store", "bottlestore", "tavern", "pub", "bar", "shebeen",
      "brewery", "distillery", "wine", "beer", "whiskey", "whisky", "vodka", "gin", "rum", "tequila",
      "brandy", "champagne", "cider", "sorghum beer", "umqombothi",
    ],
    reason: "Alcohol sales and promotion are not permitted on this platform.",
  },
  gambling: {
    label: "Gambling, betting & wagering",
    terms: [
      "casino", "betting", "bookmaker", "lottery", "lotto", "poker", "blackjack", "roulette",
      "slot machine", "slots", "sports betting", "horse racing betting", "gamble", "wagering",
      "betway", "hollywoodbets", "sunbet",
    ],
    reason: "Gambling, betting and wagering are not permitted on this platform.",
  },
  adult: {
    label: "Pornography & sexual services",
    terms: [
      "porn", "pornography", "explicit sexual", "escort", "brothel", "strip club", "stripper",
      "erotic massage", "sensual massage", "happy ending", "adult entertainment", "sex work",
      "prostitut", "onlyfans", "nude", "xxx",
    ],
    reason: "Pornography, explicit sexual content and sexual services are not permitted.",
  },
  intoxicants: {
    label: "Recreational intoxicants & drugs",
    terms: [
      "cannabis", "marijuana", "dagga", "weed", "cocaine", "heroin", "meth", "ecstasy", "mdma",
      "lsd", "tik", "nyaope", "whoonga", "shisha", "hookah", "hubbly", "recreational drug",
    ],
    reason: "Recreational intoxicants and illegal drugs are not permitted.",
  },
};

/** Ambiguous cases — flagged for human review, not auto-blocked */
export const AMBIGUOUS_KEYWORDS: Record<string, { terms: string[]; label: string; reason: string }> = {
  tobacco: {
    label: "Tobacco & vape (requires review)",
    terms: ["tobacco", "cigarette", "cigar", "vape", "vaping", "e-cigarette", "snuff"],
    reason: "Tobacco/vape products require review to ensure no recreational intoxicant promotion. Medicinal contexts differ.",
  },
  music_entertainment: {
    label: "Music & entertainment (review content)",
    terms: ["nightclub", "dj service", "live music venue", "concert promotion"],
    reason: "Entertainment businesses require review to ensure no alcohol/gambling tie-ins or immodest promotion.",
  },
  spa_massage: {
    label: "Spa/massage — review offerings",
    terms: ["spa", "massage", "body rub", "thai massage"],
    reason: "Spa and massage services are permitted when offering legitimate wellness services; flagged for review to exclude sexual services.",
  },
  restaurant_mixed: {
    label: "Food service — review menu",
    terms: ["restaurant menu", "food and alcohol", "bar and grill"],
    reason: "Restaurants are permitted; flagged when menu mentions alcohol service to verify compliance.",
  },
  finance_interest: {
    label: "Financial services — review",
    terms: ["payday loan", "interest loan", "loan shark", "high-interest"],
    reason: "Interest-based lending requires review under conservative business standards.",
  },
};

/** Placeholder/demo contact values that must not be published */
export const PLACEHOLDER_PATTERNS: { pattern: RegExp; label: string }[] = [
  { pattern: /^0821234567$/, label: "Demo WhatsApp number (Naledi's Braids)" },
  { pattern: /^0839876543$/, label: "Demo WhatsApp number (Siya's Cuts)" },
  { pattern: /^0845551234$/, label: "Demo WhatsApp number (Amara Day Spa)" },
  { pattern: /^0824455667$/, label: "Demo WhatsApp number (Dlamini Plumbing)" },
  { pattern: /0821234567|0839876543|0845551234|0824455667|0813334455|0827771234|0836669988/i, label: "Demo WhatsApp number" },
  { pattern: /example\.co\.za/i, label: "Placeholder website (example.co.za)" },
  { pattern: /noreply|test@test|placeholder/i, label: "Placeholder contact" },
];

/** Combined check result */
export interface PolicyCheckResult {
  blocked: boolean;
  flagged: boolean;
  reasons: string[];
  categories: string[]; // e.g. ["alcohol", "gambling"]
  flaggedCategories: string[];
}

function normalize(text: string): string {
  return text.toLowerCase();
}

function containsTerm(text: string, term: string): boolean {
  const lower = normalize(text);
  const t = normalize(term);
  // word-boundary sensitive for short terms like "bar", "pub", "wine"
  if (t.length <= 4) {
    // match as whole word or with plural s
    const re = new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}s?\\b`, "i");
    return re.test(lower);
  }
  return lower.includes(t);
}

/**
 * Analyze arbitrary text (business name, tagline, service descriptions, etc.)
 * Returns blocked/flagged status with human-readable reasons.
 */
export function analyzeContent(text: string): PolicyCheckResult {
  const reasons: string[] = [];
  const categories: string[] = [];
  const flaggedCategories: string[] = [];
  let blocked = false;
  let flagged = false;

  if (!text || !text.trim()) {
    return { blocked: false, flagged: false, reasons: [], categories: [], flaggedCategories: [] };
  }

  for (const [key, cat] of Object.entries(PROHIBITED_KEYWORDS)) {
    for (const term of cat.terms) {
      if (containsTerm(text, term)) {
        blocked = true;
        if (!categories.includes(key)) {
          categories.push(key);
          reasons.push(`${cat.label}: matched "${term}" — ${cat.reason}`);
        }
        break; // one reason per category is enough
      }
    }
  }

  for (const [key, cat] of Object.entries(AMBIGUOUS_KEYWORDS)) {
    // Only flag ambiguous if not already blocked for that text region
    let alreadyBlocked = false;
    for (const blockedKey of categories) {
      if (cat.terms.some((t) => PROHIBITED_KEYWORDS[blockedKey]?.terms.includes(t))) {
        alreadyBlocked = true;
        break;
      }
    }
    if (alreadyBlocked) continue;
    for (const term of cat.terms) {
      if (containsTerm(text, term)) {
        flagged = true;
        if (!flaggedCategories.includes(key)) {
          flaggedCategories.push(key);
          reasons.push(`${cat.label}: matched "${term}" — ${cat.reason}`);
        }
        break;
      }
    }
  }

  return { blocked, flagged, reasons, categories, flaggedCategories };
}

/**
 * Analyze a whole site's textual content.
 */
export function analyzeSiteContent(data: {
  businessName?: string;
  tagline?: string;
  industry?: string;
  area?: string;
  services?: { name: string; price: string; description?: string }[];
  hours?: string;
}): PolicyCheckResult {
  const combined = [
    data.businessName ?? "",
    data.tagline ?? "",
    data.industry ?? "",
    data.area ?? "",
    data.hours ?? "",
    ...(data.services ?? []).flatMap((s) => [s.name, s.price, s.description ?? ""]),
  ].join(" | ");

  return analyzeContent(combined);
}

/**
 * Check if contact info appears to be demo/placeholder data.
 */
export function checkPlaceholderContact(data: {
  whatsapp?: string;
  phone?: string;
  email?: string;
  socials?: Record<string, string | undefined>;
  businessName?: string;
}): { isPlaceholder: boolean; reasons: string[] } {
  const reasons: string[] = [];
  const checks: [string | undefined, string][] = [
    [data.whatsapp, "WhatsApp"],
    [data.phone, "phone"],
    [data.email, "email"],
  ];
  for (const [val, label] of checks) {
    if (!val) continue;
    for (const { pattern, label: desc } of PLACEHOLDER_PATTERNS) {
      if (pattern.test(val)) {
        reasons.push(`${label} appears to be placeholder/demo data: ${desc} (${val})`);
      }
    }
  }
  if (data.socials) {
    for (const [k, v] of Object.entries(data.socials)) {
      if (!v) continue;
      for (const { pattern, label: desc } of PLACEHOLDER_PATTERNS) {
        if (pattern.test(v)) {
          reasons.push(`Social ${k} appears to be placeholder: ${desc}`);
        }
      }
    }
  }
  // Business name that is exactly a demo name
  const demoNames = [
    "naledi's braids", "siya's cuts", "amara day spa", "dlamini plumbing",
    "mokoena electrical", "fix-it handyman", "profinish painting",
  ];
  if (data.businessName && demoNames.includes(data.businessName.toLowerCase().trim())) {
    // Not strictly placeholder, but flag if combined with other placeholders
    if (reasons.length > 0) {
      reasons.push(`Business name matches demo dataset: "${data.businessName}" — ensure this is your real business name.`);
    }
  }
  return { isPlaceholder: reasons.length > 0, reasons };
}

/**
 * Full publishing validation — blocked, flagged, placeholder.
 * Used by API routes before allowing site creation/update/publish.
 */
export function validateForPublish(data: {
  businessName?: string;
  tagline?: string;
  industry?: string;
  area?: string;
  services?: { name: string; price: string; description?: string }[];
  hours?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
  socials?: Record<string, string | undefined>;
}): {
  allowed: boolean;
  blocked: boolean;
  flagged: boolean;
  isPlaceholder: boolean;
  errors: string[];
  warnings: string[];
} {
  const policy = analyzeSiteContent(data);
  const placeholder = checkPlaceholderContact(data);

  const errors: string[] = [];
  const warnings: string[] = [];

  if (policy.blocked) {
    errors.push(...policy.reasons.map((r) => `Blocked: ${r}`));
    errors.push(
      "This content includes clearly prohibited goods or services under our Acceptable Use Policy. Remove the listed items before publishing. If you believe this is a mistake, contact support for review."
    );
  }
  if (policy.flagged) {
    warnings.push(...policy.reasons.map((r) => `Review required: ${r}`));
    warnings.push(
      "Your business type or description has been flagged for manual review. An administrator will review it shortly; you can still save as draft."
    );
  }
  if (placeholder.isPlaceholder) {
    // Placeholder contact is a hard block for publishing (not for draft)
    errors.push(...placeholder.reasons);
    errors.push(
      "Replace placeholder/demo contact details with your real business contact information before publishing."
    );
  }

  // Additional check: whatsapp is required for publishing
  const waDigits = (data.whatsapp ?? "").replace(/\D/g, "");
  if (!waDigits || waDigits.length < 9) {
    errors.push("A valid WhatsApp number is required to publish — it powers your site's booking button.");
  }

  // Business name length
  if (!data.businessName || data.businessName.trim().length < 2) {
    errors.push("Business name is required.");
  }

  return {
    allowed: errors.length === 0,
    blocked: policy.blocked,
    flagged: policy.flagged,
    isPlaceholder: placeholder.isPlaceholder,
    errors,
    warnings,
  };
}

export const ACCEPTABLE_USE_POLICY_TEXT = `
MzansiSite Acceptable Use Policy — Business Content

1. MzansiSite helps legitimate South African businesses present honest information
   and receive customer enquiries. We do not knowingly create or promote websites
   for prohibited activities.

2. Prohibited offerings include: alcohol sales/promotion, gambling/betting/wagering,
   pornography/explicit sexual content/sexual services, recreational intoxicants
   and illegal drugs, and other activities expressly prohibited under conservative
   business standards.

3. The policy applies to all published text, product listings, service descriptions,
   calls to action and marketing content — not just category names.

4. Broad industries (restaurants, pharmacies, beauty, salons, spas, events, etc.)
   are judged on their actual offerings, not assumed impermissible. A restaurant
   that does not promote alcohol is permitted; a spa offering legitimate wellness
   services is permitted.

5. Ambiguous cases are flagged for administrator review. The automated classifier
   is not perfectly accurate and does not issue religious rulings.

6. Merchants must not publish invented reviews, testimonials, ratings, awards,
   certifications or statistics. Only display information you can verify.

7. Merchants must ensure all media (photos, logos) is owned or properly licensed
   and does not contain immodest, sexualised or unlawful content.

8. MzansiSite is not a halal-certified service and does not claim endorsement
   by any religious authority.

9. Violations may result in suspension of publishing until corrected. Repeated or
   deliberate violations may result in account review.

10. For questions about whether a specific offering is permitted, contact support
    before publishing. When in doubt, conservative defaults apply.
`.trim();

export const MERCHANT_DECLARATION_TEXT = `
By publishing your site you confirm that:
- All business information, services, prices and contact details you provide are true and accurate to your knowledge;
- Your advertised offerings comply with MzansiSite's Acceptable Use Policy and applicable South African law;
- You will not use the site to promote prohibited goods or services;
- You own or have permission to use all images and content you upload;
- You understand that invented reviews, ratings, awards or certifications must not be displayed as genuine.
`.trim();
