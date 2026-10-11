import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

/**
 * Firebase Admin SDK — verifies ID tokens server-side.
 *
 * IMPORTANT: All errors from this module are wrapped in AuthError so that
 * route handlers can always catch them cleanly and return JSON responses.
 * Previously, cert() or initializeApp() could throw FirebaseAppError which
 * bypassed the route's catch block and caused the serverless function to
 * return an HTML 500 page instead of JSON.
 */

export function adminConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY,
  );
}

let adminApp: App | null = null;
let adminInitError: string | null = null;

/**
 * Parse the private key from the environment variable.
 * Handles all three formats Vercel users might paste:
 * 1. Real newlines (multi-line env var in Vercel dashboard)
 * 2. Literal \n (single-line with escaped newlines)
 * 3. Double-escaped \\n (from .env files)
 */
function parsePrivateKey(raw: string): string {
  // If it already contains real newlines and valid PEM markers, use as-is
  if (raw.includes("-----BEGIN") && raw.includes("\n") && !raw.includes("\\n")) {
    return raw;
  }
  // Replace escaped newlines (both \\n and \n literal strings)
  return raw.replace(/\\n/g, "\n");
}

export function getAdminApp(): App | null {
  if (adminApp) return adminApp;
  if (adminInitError) return null; // Don't retry a known-bad config
  if (!adminConfigured()) return null;

  try {
    const existing = getApps()[0];
    if (existing) {
      adminApp = existing;
      return adminApp;
    }

    const privateKey = parsePrivateKey(process.env.FIREBASE_PRIVATE_KEY!);

    adminApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });

    return adminApp;
  } catch (e) {
    // Log the real error for debugging in Vercel Function Logs
    const msg = e instanceof Error ? e.message : String(e);
    console.error("Firebase Admin init failed:", msg);
    adminInitError = msg;
    // Return null so callers get a clean AuthError("not-configured") instead of a crash
    return null;
  }
}

export interface VerifiedIdentity {
  uid: string;
  email: string;
  name?: string;
}

export async function verifyIdTokenFromRequest(
  request: Request,
): Promise<VerifiedIdentity> {
  const header = request.headers.get("authorization") ?? "";
  if (!header.startsWith("Bearer ")) {
    throw new AuthError("missing-token", "Sign in to continue.");
  }

  const app = getAdminApp();
  if (!app) {
    const detail = adminInitError
      ? `Firebase Admin failed to initialise: ${adminInitError}`
      : "Authentication is not configured on the server yet.";
    throw new AuthError("not-configured", detail);
  }

  try {
    const decoded = await getAuth(app).verifyIdToken(header.slice(7));
    return {
      uid: decoded.uid,
      email: decoded.email ?? "",
      name: typeof decoded.name === "string" ? decoded.name : undefined,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Token verification failed";
    throw new AuthError("invalid-token", `Your session expired — please sign in again. (${msg})`);
  }
}

export class AuthError extends Error {
  code: "missing-token" | "invalid-token" | "not-configured";
  constructor(code: AuthError["code"], message: string) {
    super(message);
    this.code = code;
  }
}
