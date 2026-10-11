"use client";

/**
 * Client-side direct-to-Cloudinary uploads (stage 5).
 * Flow: get a short-lived signature from /api/uploads/sign → POST the file
 * straight to Cloudinary → get back a secure URL to save in the draft.
 * The API secret never touches the browser.
 */

export type UploadKind = "logo" | "gallery";

export interface UploadResult {
  url: string;
  publicId: string;
}

export interface CloudinarySignature {
  ok: boolean;
  configured?: boolean;
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
  error?: string;
}

async function fetchSignature(kind: UploadKind): Promise<CloudinarySignature | { ok: false; error: string; configured: false }> {
  const res = await fetch("/api/uploads/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind }),
  });
  const data = await res.json();
  return data;
}

/**
 * Upload one file to Cloudinary with progress reporting.
 * Uses XMLHttpRequest so we get real upload-progress events.
 */
export function uploadToCloudinary(
  file: File,
  kind: UploadKind,
  onProgress?: (pct: number) => void,
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    void (async () => {
      try {
        const sig = await fetchSignature(kind);
        if (!sig.ok) {
          reject(new Error(sig.error ?? "Uploads are not configured yet."));
          return;
        }

        const form = new FormData();
        form.append("file", file);
        form.append("api_key", sig.apiKey);
        form.append("timestamp", String(sig.timestamp));
        form.append("folder", sig.folder);
        form.append("signature", sig.signature);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`);

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
        });

        xhr.addEventListener("load", () => {
          try {
            const data = JSON.parse(xhr.responseText);
            if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
              resolve({ url: data.secure_url, publicId: data.public_id });
            } else {
              reject(new Error(data.error?.message ?? "Upload failed. Try a different image."));
            }
          } catch {
            reject(new Error("Upload response was unreadable."));
          }
        });
        xhr.addEventListener("error", () => reject(new Error("Network error during upload. Check your connection.")));
        xhr.send(form);
      } catch (err) {
        reject(err instanceof Error ? err : new Error("Upload failed."));
      }
    })();
  });
}
