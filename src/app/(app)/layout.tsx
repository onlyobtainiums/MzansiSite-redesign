import type { ReactNode } from "react";
import AuthProvider from "@/lib/firebase/AuthProvider";

/**
 * Layout for the routes that actually use auth state — the marketing site
 * (its <Nav /> reads useAuth to swap "Sign in" for "Dashboard"), /auth, and
 * /dashboard.
 *
 * AuthProvider used to live in the ROOT layout, so every route pulled in the
 * Firebase client SDK. That included /sites/[slug] — meaning every visitor to
 * every customer's public website downloaded and initialised firebase/auth
 * (~33 KB gzipped plus the runtime setup) for a page that will never sign
 * anyone in. Customer sites now sit outside this group and ship no auth code
 * at all.
 *
 * Route groups do not affect URLs: /dashboard is still /dashboard.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
