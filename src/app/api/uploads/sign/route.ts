import { NextResponse } from "next/server";
import { cloudinaryConfigured, generateUploadSignature, UPLOAD_LIMITS } from "@/lib/cloudinary";

/**
 * Vends short-lived Cloudinary signatures so browsers can upload directly
 * from the wizard (stage 5). The API secret never leaves the server.
 * `kind` decides the folder the file must land in (logo vs gallery).
 */
export async function POST(request: Request) {
  if (!cloudinaryConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Image uploads are not configured yet — add Cloudinary keys to .env.", configured: false },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  const kind = body?.kind === "logo" ? "logo" : "gallery";
  const { folder } = UPLOAD_LIMITS[kind];

  try {
    const signature = generateUploadSignature(folder);
    return NextResponse.json({ ok: true, ...signature, kind });
  } catch (error) {
    console.error("Cloudinary signing failed", error);
    return NextResponse.json({ ok: false, error: "Could not prepare upload." }, { status: 500 });
  }
}

/** Upload limits are public info — the uploader UI reads these. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    configured: cloudinaryConfigured(),
    limits: {
      gallery: { max: UPLOAD_LIMITS.gallery.max, maxBytes: UPLOAD_LIMITS.gallery.maxBytes },
      logo: { max: UPLOAD_LIMITS.logo.max, maxBytes: UPLOAD_LIMITS.logo.maxBytes },
    },
  });
}
