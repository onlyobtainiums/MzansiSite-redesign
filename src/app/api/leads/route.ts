import { NextResponse } from "next/server";
import { count } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";

export const dynamic = "force-dynamic";

const TRADES = new Set(["salon", "barber", "spa", "plumber", "other"]);

function sanitise(value: unknown, max = 80): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    const businessName = sanitise(body.businessName, 60);
    const location = sanitise(body.location, 80);
    const whatsapp = sanitise(body.whatsapp, 20).replace(/[^+\d]/g, "");
    const trade = TRADES.has(body.trade) ? body.trade : "other";

    if (businessName.length < 2) {
      return NextResponse.json({ ok: false, error: "Tell us your business name." }, { status: 400 });
    }
    if (location.length < 2) {
      return NextResponse.json({ ok: false, error: "Where are you based?" }, { status: 400 });
    }
    if (whatsapp.replace(/\D/g, "").length < 9) {
      return NextResponse.json({ ok: false, error: "Enter a valid WhatsApp number." }, { status: 400 });
    }

    await db.insert(leads).values({ businessName, trade, location, whatsapp });
    const [{ value: total }] = await db.select({ value: count() }).from(leads);

    return NextResponse.json({ ok: true, total });
  } catch (error) {
    console.error("Lead capture failed", error);
    return NextResponse.json({ ok: false, error: "Something went wrong. Try again." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [{ value: total }] = await db.select({ value: count() }).from(leads);
    return NextResponse.json({ ok: true, total });
  } catch (error) {
    console.error("Lead count failed", error);
    return NextResponse.json({ ok: true, total: 0 });
  }
}
