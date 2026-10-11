import { NextResponse } from "next/server";
import { and, desc, eq, ne } from "drizzle-orm";
import { db } from "@/db";
import { sites } from "@/db/schema";
import { getAuthedUser } from "@/server/auth";
import { AuthError } from "@/lib/firebase/server";
import { INDUSTRIES } from "@/templates/industries";
import { getDemoSiteData } from "@/templates/demo-data";
import { makeSlug } from "@/lib/slug";
import { describeError } from "@/lib/errors";

export const dynamic = "force-dynamic";

/** Always return JSON, even for unexpected errors */
function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

const sanitise = (v: unknown, max = 120) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/** GET — list the signed-in user's sites (deleted excluded). */
export async function GET(request: Request) {
  try {
    const user = await getAuthedUser(request);
    const rows = await db
      .select()
      .from(sites)
      .where(and(eq(sites.userId, user.id), ne(sites.status, "deleted")))
      .orderBy(desc(sites.createdAt));
    return NextResponse.json({ ok: true, sites: rows });
  } catch (error) {
    if (error instanceof AuthError) {
      const status = error.code === "not-configured" ? 503 : 401;
      return jsonError(error.message, status);
    }
    // describeError() unwraps Drizzle's "Failed query:" wrapper to the real
    // cause, so a database problem is obvious in the UI instead of generic.
    const msg = describeError(error);
    console.error("List sites failed:", msg, error);
    return jsonError(`Could not load your sites: ${msg}`, 500);
  }
}

/**
 * POST — create a new draft site from the dashboard wizard.
 */
export async function POST(request: Request) {
  try {
    const user = await getAuthedUser(request);
    const body = await request.json().catch(() => null);
    if (!body) return jsonError("Invalid payload", 400);

    const businessName = sanitise(body.businessName, 60);
    const industry =
      typeof body.industry === "string" && INDUSTRIES[body.industry]
        ? body.industry
        : null;
    const whatsapp = sanitise(body.whatsapp, 20).replace(/[^+\d]/g, "");
    const area = sanitise(body.area, 80);

    if (businessName.length < 2) return jsonError("Business name is required.", 400);
    if (!industry) return jsonError("Pick your industry.", 400);
    if (area.length < 2) return jsonError("Where are you based?", 400);
    if (whatsapp.replace(/\D/g, "").length < 9)
      return jsonError("Enter a valid WhatsApp number.", 400);

    const templateId = INDUSTRIES[industry].templateId;
    const starter = getDemoSiteData({ industry });

    const socials = {
      instagram: sanitise(body.socials?.instagram, 200) || undefined,
      facebook: sanitise(body.socials?.facebook, 200) || undefined,
      tiktok: sanitise(body.socials?.tiktok, 200) || undefined,
      website: sanitise(body.socials?.website, 200) || undefined,
    };

    const galleryUrls = Array.isArray(body.galleryUrls)
      ? body.galleryUrls
          .filter((u: unknown) => typeof u === "string")
          .map((u: string) => u.slice(0, 500))
          .slice(0, 6)
      : starter.galleryUrls;

    const heroCandidate = sanitise(body.heroImageUrl, 500);
    const heroImageUrl =
      heroCandidate && galleryUrls.includes(heroCandidate)
        ? heroCandidate
        : galleryUrls[0] ?? starter.heroImageUrl;
    const logoUrl = sanitise(body.logoUrl, 500) || undefined;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const [site] = await db
          .insert(sites)
          .values({
            userId: user.id,
            slug: makeSlug(businessName),
            templateId,
            status: "draft",
            businessName,
            tagline: sanitise(body.tagline, 140) || starter.tagline,
            industry,
            area,
            hours: sanitise(body.hours, 60) || starter.hours,
            whatsapp,
            phone: whatsapp,
            email: sanitise(body.email, 120) || undefined,
            logoUrl,
            heroImageUrl,
            galleryUrls,
            services: starter.services,
            socials,
          })
          .returning();
        return NextResponse.json({ ok: true, site });
      } catch (e) {
        if (attempt === 2) throw e;
      }
    }
    return jsonError("Could not create your site.", 500);
  } catch (error) {
    if (error instanceof AuthError) {
      const status = error.code === "not-configured" ? 503 : 401;
      return jsonError(error.message, status);
    }
    const msg = describeError(error);
    console.error("Create site failed:", msg, error);
    return jsonError(`Could not create your site: ${msg}`, 500);
  }
}
