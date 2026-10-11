"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { firebaseConfigured, getFirebaseAuth, getGoogleProvider } from "./client";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  configured: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<"popup" | "redirect">;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  configured: false,
  error: null,
  signIn: async () => {},
  signUp: async () => {},
  signInGoogle: async () => "redirect",
  logout: async () => {},
  getToken: async () => null,
});

export function useAuth() {
  return useContext(AuthContext);
}

/** Human-readable Firebase auth error codes — comprehensive list. */
function toMessage(code: string): string {
  switch (code) {
    // Credential errors
    case "auth/email-already-in-use":
      return "That email already has an account — sign in instead.";
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/weak-password":
      return "Password needs at least 6 characters.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Wrong email or password. Try again.";

    // Popup-specific errors
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Sign-in was cancelled — the popup was closed. Try again.";
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in popup. We'll redirect you to Google instead.";

    // Domain / config errors
    case "auth/unauthorized-domain":
      return "This domain isn't authorised in Firebase Console. Go to Authentication → Settings → Authorised domains and add it.";
    case "auth/operation-not-allowed":
      return "Google sign-in isn't enabled in Firebase Console. Go to Authentication → Sign-in method → Google and enable it.";
    case "auth/user-disabled":
      return "This account has been disabled. Contact support.";

    // Network errors
    case "auth/network-request-failed":
      return "Network hiccup — check your connection and try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/internal-error":
      return "Firebase returned an internal error. Check the browser console for details.";

    default:
      return `Sign-in failed (${code || "unknown"}). Try again or use email instead.`;
  }
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const configured = firebaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /** Mirror the Firebase user into our Postgres users table (best effort). */
  const syncUser = useCallback(async (u: User) => {
    try {
      const token = await u.getIdToken();
      const res = await fetch("/api/auth/sync", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      // Best-effort: log failures for debugging but don't crash the UI
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.warn(`[syncUser] /api/auth/sync returned ${res.status}:`, text.slice(0, 200));
      }
    } catch (e) {
      console.warn("[syncUser] sync failed:", e instanceof Error ? e.message : e);
    }
  }, []);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    const auth = getFirebaseAuth();

    // Capture the redirect result FIRST (handles Google redirect flow).
    // getRedirectResult resolves immediately with null when there's no pending redirect.
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
          void syncUser(result.user);
        }
      })
      .catch((e) => {
        const code =
          typeof e === "object" && e && "code" in e
            ? String((e as { code: string }).code)
            : "";
        if (code && code !== "auth/no-auth-event") {
          setError(toMessage(code));
        }
      });

    /*
     * Use onIdTokenChanged instead of onAuthStateChanged so consumers only
     * proceed once Firebase has restored a usable session/token, not merely a
     * user object shell. This prevents the dashboard from mounting with
     * `user` truthy while `getIdToken()` is still temporarily unavailable.
     */
    const unsub = onIdTokenChanged(auth, async (u: User | null) => {
      setUser(u);
      setLoading(false);
      if (u) void syncUser(u);
    });

    return unsub;
  }, [configured, syncUser]);

  const run = useCallback(async <T,>(fn: () => Promise<T>): Promise<T> => {
    setError(null);
    try {
      return await fn();
    } catch (e) {
      const code =
        typeof e === "object" && e && "code" in e
          ? String((e as { code: string }).code)
          : "";
      const message = toMessage(code);
      setError(message);
      throw new Error(message);
    }
  }, []);

  /**
   * Google sign-in: tries a popup first (instant, no page reload).
   * If the browser blocks it (sandboxed iframe, strict popup policy, mobile
   * browsers) it automatically falls back to a full-page redirect.
   * Returns "popup" | "redirect" so the caller knows whether to wait for
   * navigation (redirect) or handle the resolved user directly (popup).
   */
  const signInGoogle = useCallback(async (): Promise<"popup" | "redirect"> => {
    return run(async () => {
      const auth = getFirebaseAuth();
      const provider = getGoogleProvider();

      try {
        await signInWithPopup(auth, provider);
        return "popup" as const;
      } catch (e) {
        const code =
          typeof e === "object" && e && "code" in e
            ? String((e as { code: string }).code)
            : "";

        // These codes mean we should fall back to redirect
        const shouldRedirect = [
          "auth/popup-blocked",
          "auth/popup-closed-by-user",
          "auth/cancelled-popup-request",
        ].includes(code);

        if (shouldRedirect) {
          // Clear the local error — we're handling it gracefully
          setError(null);
          await signInWithRedirect(auth, provider);
          return "redirect" as const;
        }

        // Re-throw other errors (unauthorized-domain, operation-not-allowed, etc.)
        throw e;
      }
    });
  }, [run]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured,
      error,
      signIn: (email, password) =>
        run(() =>
          signInWithEmailAndPassword(getFirebaseAuth(), email, password).then(
            () => undefined,
          ),
        ),
      signUp: (name, email, password) =>
        run(async () => {
          const cred = await createUserWithEmailAndPassword(
            getFirebaseAuth(),
            email,
            password,
          );
          if (name.trim())
            await updateProfile(cred.user, { displayName: name.trim() });
          await syncUser(cred.user);
        }),
      signInGoogle,
      logout: () => signOut(getFirebaseAuth()),
      getToken: async () => {
        const auth = getFirebaseAuth();
        const candidate = user ?? auth.currentUser;
        if (!candidate) return null;
        try {
          const token = await candidate.getIdToken();
          if (token) return token;
        } catch {
          /* retry forced refresh below */
        }
        try {
          return await candidate.getIdToken(true);
        } catch {
          return null;
        }
      },
    }),
    [user, loading, configured, error, run, syncUser, signInGoogle],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
