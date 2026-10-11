import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { sites } from "@/db/schema";
import { getAuthedUser } from "@/server/auth";
import { AuthError } from "@/lib/firebase/server";

function authFail(error: unknown) {
  if (error instanceof AuthError) {
    const status = error.code === "not-configured" ? 503 : 401;
    return NextResponse.json({ ok: false, error: error.message }, { status });
  }
  return null;
}

const sanitise = (v: unknown, max = 140) => (typeof v === "string" ? v.trim().slice(0, max) : "");

interface Ctx {
  params: Promise<{ id: string }>;
}

async function ownedSite(ctx: Ctx, userId: number) {
  const { id } = await ctx.params;
  const siteId = Number(id);
  if (!Number.isInteger(siteId)) return null;
  const [site] = await db
    .select()
    .from(sites)
    .where(and(eq(sites.id, siteId), eq(sites.userId, userId)))
    .limit(1);
  return site ?? null;
}

/** PATCH — update editable business details. */
export async function PATCH(request: Request, ctx: Ctx) {
  try {
    const user = await getAuthedUser(request);
    const site = await ownedSite(ctx, user.id);
    if (!site) return NextResponse.json({ ok: false, error: "Site not found." }, { status: 404 });

    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });

    const updates: Partial<{
      businessName: string;
      tagline: string;
      area: string;
      hours: string;
      whatsapp: string;
      email: string | null;
      logoUrl: string | null;
      heroImageUrl: string;
      galleryUrls: string[];
      updatedAt: Date;
    }> = { updatedAt: new Date() };

    if (body.businessName !== undefined) updates.businessName = sanitise(body.businessName, 60);
    if (body.tagline !== undefined) updates.tagline = sanitise(body.tagline, 140);
    if (body.area !== undefined) updates.area = sanitise(body.area, 80);
    if (body.hours !== undefined) updates.hours = sanitise(body.hours, 60);
    if (body.email !== undefined) updates.email = sanitise(body.email, 120) || null;
    if (body.whatsapp !== undefined) {
      const wa = sanitise(body.whatsapp, 20).replace(/[^+\d]/g, "");
      if (wa.replace(/\D/g, "").length < 9) {
        return NextResponse.json({ ok: false, error: "Enter a valid WhatsApp number." }, { status: 400 });
      }
      updates.whatsapp = wa;
    }
    if (updates.businessName !== undefined && updates.businessName.length < 2) {
      return NextResponse.json({ ok: false, error: "Business name is required." }, { status: 400 });
    }

    /* ——— Image fields (stage 5) ——— */
    if (body.logoUrl !== undefined) {
      updates.logoUrl = sanitise(body.logoUrl, 500) || null;
    }
    if (Array.isArray(body.galleryUrls)) {
      const urls = body.galleryUrls
        .filter((u: unknown) => typeof u === "string" && u.startsWith("https://"))
        .map((u: string) => u.slice(0, 500))
        .slice(0, 6);
      updates.galleryUrls = urls;
      // Keep hero consistent with the gallery contents
      const heroCandidate = sanitise(body.heroImageUrl, 500);
      if (heroCandidate && urls.includes(heroCandidate)) {
        updates.heroImageUrl = heroCandidate;
      } else if (urls.length && !urls.includes(site.heroImageUrl ?? "")) {
        updates.heroImageUrl = urls[0];
      }
    } else if (body.heroImageUrl !== undefined) {
      const heroCandidate = sanitise(body.heroImageUrl, 500);
      if (heroCandidate.startsWith("https://")) updates.heroImageUrl = heroCandidate;
    }

    const [updated] = await db.update(sites).set(updates).where(eq(sites.id, site.id)).returning();
    return NextResponse.json({ ok: true, site: updated });
  } catch (error) {
    const fail = authFail(error);
    if (fail) return fail;
    console.error("Update site failed", error);
    return NextResponse.json({ ok: false, error: "Could not save changes." }, { status: 500 });
  }
}

/** DELETE — soft delete (status → deleted) so records stay reconcilable. */
export async function DELETE(request: Request, ctx: Ctx) {
  try {
    const user = await getAuthedUser(request);
    const site = await ownedSite(ctx, user.id);
    if (!site) return NextResponse.json({ ok: false, error: "Site not found." }, { status: 404 });

    await db.update(sites).set({ status: "deleted", updatedAt: new Date() }).where(eq(sites.id, site.id));
    return NextResponse.json({ ok: true });
  } catch (error) {
    const fail = authFail(error);
    if (fail) return fail;
    console.error("Delete site failed", error);
    return NextResponse.json({ ok: false, error: "Could not delete that site." }, { status: 500 });
  }
}
