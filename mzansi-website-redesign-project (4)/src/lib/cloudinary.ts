import crypto from "crypto";

/**
 * Cloudinary helpers for signed browser uploads (stage 5).
 * Browser uploads go straight to Cloudinary — we only vend short-lived
 * signatures from /api/uploads/sign so the API secret never ships.
 * Docs: https://cloudinary.com/documentation/upload_images#generating_authentication_signatures
 */

export function cloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET,
  );
}

export interface UploadSignature {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
}

export function generateUploadSignature(folder: string): UploadSignature {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary is not configured (CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET)");
  }

  const timestamp = Math.round(Date.now() / 1000);
  const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha256").update(toSign).digest("hex");

  return { cloudName, apiKey, timestamp, folder, signature };
}

/** Delivery URL limits — 6 gallery shots + 1 logo per site. */
export const UPLOAD_LIMITS = {
  gallery: { max: 6, folder: "mzansisite/gallery", maxBytes: 8 * 1024 * 1024 },
  logo: { max: 1, folder: "mzansisite/logos", maxBytes: 2 * 1024 * 1024 },
} as const;
