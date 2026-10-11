"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import MzansiLogo from "@/components/MzansiLogo";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Mail,
  TriangleAlert,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/lib/firebase/AuthProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const {
    user,
    loading,
    configured,
    error: authError,
    signIn,
    signUp,
    signInGoogle,
  } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"email" | "google" | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const redirectedRef = useRef(false);

  /* Redirect to dashboard when a user session is detected — handles BOTH
     popup resolution and redirect-flow return. Guard with ref to prevent
     double navigation. */
  useEffect(() => {
    if (!loading && user && !redirectedRef.current) {
      redirectedRef.current = true;
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  /* Bubble auth-provider errors into local state */
  useEffect(() => {
    if (authError) setLocalError(authError);
  }, [authError]);

  /* ——— Email / Google submit ——— */
  const submit = async (kind: "email" | "google") => {
    if (busy || redirecting) return;
    setLocalError(null);
    setBusy(kind);

    try {
      if (kind === "google") {
        const outcome = await signInGoogle();
        if (outcome === "redirect") {
          // Page is about to navigate away to Google — show a spinner
          setRedirecting(true);
          // Don't call router.replace — the redirect flow returns to /auth
          // which triggers getRedirectResult → onAuthStateChanged → the
          // useEffect above handles navigation to /dashboard
          return;
        }
        // outcome === "popup" — onAuthStateChanged fires → useEffect redirects
        // Don't call router.replace here; that causes a race condition
        return;
      }

      /* ——— Email path ——— */
      if (!email.trim() || !password) {
        setLocalError("Enter your email and password.");
        setBusy(null);
        return;
      }
      if (mode === "signup" && name.trim().length < 2) {
        setLocalError("Tell us your name.");
        setBusy(null);
        return;
      }

      if (mode === "signup") {
        await signUp(name, email, password);
      } else {
        await signIn(email, password);
      }
      // onAuthStateChanged → useEffect handles redirect

    } catch (e) {
      setLocalError(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(null);
    }
  };

  /* ——— Loading / redirecting state ——— */
  if (loading || redirecting || (!loading && user)) {
    return (
      <div className="grid min-h-screen place-items-center bg-ink text-bone">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-gold" />
          <p className="mt-4 text-sm font-medium text-bone/60">
            {redirecting ? "Redirecting to Google…" : "Loading your account…"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grain relative flex min-h-screen bg-ink text-bone">
      {/* ——— Brand panel (desktop left) ——— */}
      <div className="relative hidden flex-col justify-between overflow-hidden p-10 lg:flex lg:w-[46%]">
        <div
          className="pointer-events-none absolute -left-32 top-1/3 h-[30rem] w-[30rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,77,0,0.22), transparent 65%)" }}
          aria-hidden
        />
        <Link href="/" className="relative">
          <MzansiLogo size={40} wordmark className="[&_span]:text-2xl [&_span]:text-bone" />
        </Link>
        <div className="relative">
          <p className="font-serif text-5xl italic leading-snug text-bone/90 md:text-6xl">
            Your business,
            <br />
            your sites,
            <br />
            <span className="text-flame">one account.</span>
          </p>
          <ul className="mt-10 space-y-3 text-sm font-medium text-bone/55">
            {[
              "Save drafts, edit anytime",
              "Delete or buy more sites as you grow",
              "R149.99/month only when you publish",
            ].map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-bone/30">
          Free to build · Cancel anytime
        </p>
      </div>

      {/* ——— Form panel ——— */}
      <div className="relative flex flex-1 items-center justify-center bg-bone px-5 py-12 text-ink">
        <Link
          href="/"
          className="absolute left-5 top-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/45 transition-colors hover:text-ink md:left-8 md:top-8"
        >
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="w-full max-w-md"
        >
          {/* ——— Firebase not configured ——— */}
          {!configured ? (
            <div className="rounded-3xl border-2 border-ink bg-white/60 p-8 shadow-[8px_8px_0_#11130c]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/20">
                <TriangleAlert className="h-6 w-6 text-gold" />
              </span>
              <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight">
                Accounts need Firebase keys
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                Sign-in is wired and ready — just add these to{" "}
                <code className="rounded bg-ink/5 px-1.5 py-0.5 text-xs">.env</code>{" "}
                and restart:
              </p>
              <ul className="mt-4 space-y-2 font-mono text-[11px] text-ink/70">
                {[
                  "NEXT_PUBLIC_FIREBASE_API_KEY",
                  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
                  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
                  "NEXT_PUBLIC_FIREBASE_APP_ID",
                  "FIREBASE_PROJECT_ID",
                  "FIREBASE_CLIENT_EMAIL",
                  "FIREBASE_PRIVATE_KEY",
                ].map((v) => (
                  <li key={v} className="rounded-lg bg-ink/5 px-3 py-2">{v}</li>
                ))}
              </ul>
              <Link
                href="/templates"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-flame"
              >
                Browse templates meanwhile <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          ) : (
            /* ——— Real auth form ——— */
            <div className="rounded-3xl border-2 border-ink bg-white/60 p-8 shadow-[8px_8px_0_#11130c] md:p-10">
              <h1 className="font-display text-3xl font-extrabold tracking-tight">
                {mode === "signin" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-2 text-sm text-ink/55">
                {mode === "signin"
                  ? "Sign in to manage your websites."
                  : "One free account for every site you build."}
              </p>

              {/* Mode tabs */}
              <div className="mt-6 grid grid-cols-2 rounded-xl border-2 border-ink/10 bg-bone p-1">
                {(["signin", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m);
                      setLocalError(null);
                    }}
                    className={`rounded-lg py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                      mode === m ? "bg-ink text-bone" : "text-ink/50 hover:text-ink"
                    }`}
                  >
                    {m === "signin" ? "Sign in" : "Sign up"}
                  </button>
                ))}
              </div>

              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  void submit("email");
                }}
              >
                {/* Name (sign-up only) */}
                <AnimatePresence>
                  {mode === "signup" && (
                    <motion.label
                      key="name"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="block overflow-hidden"
                    >
                      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">
                        Your name
                      </span>
                      <div className="flex items-center gap-3 rounded-xl border-2 border-ink/12 bg-white px-4 py-3 transition-colors focus-within:border-ink">
                        <UserRound className="h-4.5 w-4.5 shrink-0 text-ink/35" />
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Naledi Dlamini"
                          className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-ink/30"
                          autoComplete="name"
                        />
                      </div>
                    </motion.label>
                  )}
                </AnimatePresence>

                {/* Email */}
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">
                    Email
                  </span>
                  <div className="flex items-center gap-3 rounded-xl border-2 border-ink/12 bg-white px-4 py-3 transition-colors focus-within:border-ink">
                    <Mail className="h-4.5 w-4.5 shrink-0 text-ink/35" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@business.co.za"
                      className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-ink/30"
                      autoComplete="email"
                    />
                  </div>
                </label>

                {/* Password */}
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">
                    Password
                  </span>
                  <div className="flex items-center gap-3 rounded-xl border-2 border-ink/12 bg-white px-4 py-3 transition-colors focus-within:border-ink">
                    <KeyRound className="h-4.5 w-4.5 shrink-0 text-ink/35" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === "signup" ? "6+ characters" : "Your password"}
                      className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-ink/30"
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="shrink-0 text-ink/35 transition-colors hover:text-ink"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4.5 w-4.5" />
                      ) : (
                        <Eye className="h-4.5 w-4.5" />
                      )}
                    </button>
                  </div>
                </label>

                {/* Error */}
                <AnimatePresence>
                  {localError && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 rounded-xl border border-flame/40 bg-flame/10 px-4 py-3"
                    >
                      <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
                      <p className="text-sm font-medium text-flame-deep leading-snug">{localError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={busy !== null}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-ink py-4 font-display text-sm font-bold uppercase tracking-[0.16em] text-bone transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#ff4d00] disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {busy === "email" && <Loader2 className="h-4.5 w-4.5 animate-spin" />}
                  {mode === "signin" ? "Sign in" : "Create account"}
                </button>
              </form>

              {/* Divider */}
              <div className="my-5 flex items-center gap-4">
                <span className="h-px flex-1 bg-ink/10" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/35">or</span>
                <span className="h-px flex-1 bg-ink/10" />
              </div>

              {/* Google */}
              <button
                onClick={() => void submit("google")}
                disabled={busy !== null}
                className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-ink/12 bg-white py-4 text-sm font-bold transition-all duration-300 hover:border-ink disabled:opacity-60"
              >
                {busy === "google" ? (
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                ) : (
                  <GoogleMark />
                )}
                Continue with Google
              </button>

              {/* Domain notice — shown only when using the preview environment */}
              <div className="mt-5 rounded-xl bg-ink/5 px-4 py-3">
                <p className="text-[10px] leading-relaxed text-ink/45">
                  <span className="font-bold">Google sign-in not working?</span> Make sure this domain is listed under{" "}
                  <span className="font-semibold">Firebase Console → Authentication → Settings → Authorised domains</span>.
                  Email + password always works without domain authorisation.
                </p>
              </div>

              <p className="mt-5 text-center text-xs leading-relaxed text-ink/40">
                By continuing you agree to fair use. Drafts are always free.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
