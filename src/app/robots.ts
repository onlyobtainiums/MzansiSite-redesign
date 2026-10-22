import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Robots.txt — allow core search / AI answer-engine crawlers, no new training block.
 * Do not disallow GPTBot / Google-Extended without explicit approval (training vs search purpose).
 * Reference: https://help.openai.com/en/articles/12627856 — OAI-SearchBot = answer engines / search,
 * GPTBot = training. Google-Extended is separate from Googlebot.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard",
          "/dashboard/*",
          "/auth",
          "/sites/",
          "/_next/",
        ],
      },
      // Explicit allow for legitimate answer-engine crawlers (reinforce not blocked)
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "BingPreview", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      // Do not add restrictive AI-training directives without review:
      // GPTBot and Google-Extended left at default (allowed) per instruction.
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
