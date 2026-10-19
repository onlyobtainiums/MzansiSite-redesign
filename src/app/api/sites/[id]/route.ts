import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { sites } from "@/db/schema";
import { getAuthedUser } from "@/server/auth";
import { AuthError } from "@/lib/firebase/server";
import { validateForPublish } from "@/lib/content-policy";

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
      phone: string | null;
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
      if (wa && wa.replace(/\D/g, "").length < 9) {
        return NextResponse.json({ ok: false, error: "That WhatsApp number looks too short." }, { status: 400 });
      }
      updates.whatsapp = wa;
    }
    if (body.phone !== undefined) {
      const tel = sanitise(body.phone, 20).replace(/[^+\d]/g, "");
      if (tel && tel.replace(/\D/g, "").length < 9) {
        return NextResponse.json({ ok: false, error: "That phone number looks too short." }, { status: 400 });
      }
      updates.phone = tel || null;
    }
    if (updates.businessName !== undefined && updates.businessName.length < 2) {
      return NextResponse.json({ ok: false, error: "Business name is required." }, { status: 400 });
    }

    // Content policy validation for updated fields — block prohibited, flag ambiguous
    const candidate = {
      businessName: (updates.businessName ?? site.businessName) as string,
      tagline: (updates.tagline ?? site.tagline ?? "") as string,
      industry: site.industry,
      area: (updates.area ?? site.area ?? "") as string,
      hours: (updates.hours ?? site.hours ?? "") as string,
      whatsapp: (updates.whatsapp as string | undefined) ?? site.whatsapp ?? undefined,
      phone: (updates.phone as string | null | undefined) ?? site.phone ?? undefined,
      email: (updates.email as string | null | undefined) ?? site.email ?? undefined,
      services: site.services,
      socials: site.socials as Record<string, string | undefined>,
    };
    const policy = validateForPublish(candidate);
    if (policy.blocked) {
      return NextResponse.json({ ok: false, error: policy.errors.join(" "), blocked: true, reasons: policy.errors }, { status: 400 });
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
