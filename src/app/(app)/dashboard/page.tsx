"use client";

import Link from "next/link";
import MzansiLogo from "@/components/MzansiLogo";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Presence from "@/components/Presence";
import {
  ArrowUpRight,
  ExternalLink,
  Eye,
  Globe,
  Image as ImageIcon,
  LayoutDashboard,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Trash2,
  TriangleAlert,
  
} from "lucide-react";
import { useAuth } from "@/lib/firebase/AuthProvider";
import { apiFetch } from "@/lib/api-fetch";
import type { Site } from "@/db/schema";
import { TEMPLATES } from "@/templates/registry";
import { industryLabel } from "@/templates/industries";
import AccountImageUploader, { type LocalImage } from "@/components/AccountImageUploader";
import ShareLink from "@/components/ShareLink";
import { formatRand, PLAN } from "@/lib/billing";
import { siteHost } from "@/lib/domain";

const EASE = [0.22, 1, 0.36, 1] as const;

type LoadState = "loading" | "ready" | "error";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, configured, logout, getToken } = useAuth();
  const [sites, setSites] = useState<Site[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [managingId, setManagingId] = useState<number | null>(null);
  const [managingSite, setManagingSite] = useState<Site | null>(null);
  const [logoState, setLogoState] = useState<LocalImage[]>([]);
  const [galleryState, setGalleryState] = useState<LocalImage[]>([]);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [publishingId, setPublishingId] = useState<number | null>(null);
  const [publishingMsg, setPublishingMsg] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const [confirmCancelId, setConfirmCancelId] = useState<number | null>(null);

  const load = useCallback(async (attempt = 0) => {
    setState("loading");
    setError(null);

    const token = await getToken();

    /*
     * Fresh sign-ins can momentarily have `user` restored before the ID token
     * is fully available. Retry a couple of times before giving up.
     */
    if (!token) {
      if (attempt < 4) {
        window.setTimeout(() => {
          void load(attempt + 1);
        }, 400 * (attempt + 1));
        return;
      }
      setError("We found your account, but your session is still loading. Please refresh once.");
      setState("error");
      return;
    }

    try {
      const { res, data } = await apiFetch<{ ok: boolean; sites?: Site[]; error?: string }>(
        "/api/sites",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if ((res.status === 401 || res.status === 403) && attempt < 1) {
        window.setTimeout(() => void load(attempt + 1), 350);
        return;
      }

      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not load your sites.");
      setSites(data.sites ?? []);
      setState("ready");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load your sites.");
      setState("error");
    }
  }, [getToken]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/auth");
      return;
    }
    void load();
  }, [loading, user, router, load]);

  const deleteSite = async (id: number) => {
    const token = await getToken();
    if (!token) return;
    setDeletingId(id);
    try {
      const { res, data } = await apiFetch<{ ok: boolean; error?: string }>(
        `/api/sites/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
      );
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not delete.");
      setSites((prev) => prev.filter((s) => s.id !== id));
      setConfirmId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete.");
    } finally {
      setDeletingId(null);
    }
  };

  const publishSite = async (site: Site) => {
    if (publishingId) return;
    const token = await getToken();
    if (!token) return;
    setPublishingId(site.id);
    setPublishingMsg(`Starting ${formatRand(PLAN.amountCents)}/month checkout for ${site.businessName}…`);
    try {
      const { res, data } = await apiFetch<{ ok: boolean; authorizationUrl?: string; configured?: boolean; error?: string }>(
        "/api/paystack/initialize",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ siteId: site.id }),
        },
      );
      if (!res.ok || !data.ok) {
        if (data.configured === false) {
          setError("Payments need Paystack keys — see .env.example. Drafts stay free.");
        } else {
          setError(data.error ?? "Could not start payment.");
        }
        setPublishingMsg(null);
        setPublishingId(null);
        return;
      }
      window.location.assign(data.authorizationUrl!);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start payment.");
      setPublishingMsg(null);
      setPublishingId(null);
    }
  };

  const cancelSubscription = async (site: Site) => {
    const token = await getToken();
    if (!token) return;
    setCancellingId(site.id);
    try {
      const { res, data } = await apiFetch<{ ok: boolean; message?: string; error?: string }>(
        "/api/paystack/cancel",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ siteId: site.id }),
        },
      );
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not cancel.");
      setSaveMsg(data.message ?? "Auto-renew cancelled. Site stays live until period end.");
      setConfirmCancelId(null);
      setTimeout(() => setSaveMsg(null), 4_500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not cancel.");
    } finally {
      setCancellingId(null);
    }
  };

  const openManager = (site: Site) => {
    setManagingId(site.id);
    setManagingSite(site);
    setLogoState(site.logoUrl ? [{ url: site.logoUrl, isLocal: false }] : []);
    setGalleryState(site.galleryUrls.map((u) => ({ url: u, isLocal: false })));
    setSaveMsg(null);
  };

  const saveImages = async () => {
    if (!managingSite) return;
    const token = await getToken();
    if (!token) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      const { res, data } = await apiFetch<{ ok: boolean; site?: Site; error?: string }>(
        `/api/sites/${managingSite.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            logoUrl: logoState.find((l) => !l.isLocal)?.url ?? null,
            galleryUrls: galleryState.filter((g) => !g.isLocal).map((g) => g.url),
            heroImageUrl: galleryState.find((g) => !g.isLocal)?.url,
          }),
        },
      );
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not save images.");
      if (data.site) setSites((prev) => prev.map((s) => (s.id === data.site!.id ? (data.site as Site) : s)));
      setSaveMsg("Photos saved. Preview updated.");
      setTimeout(() => {
        setManagingId(null);
        setManagingSite(null);
        setSaveMsg(null);
      }, 900);
    } catch (e) {
      setSaveMsg(e instanceof Error ? e.message : "Could not save images.");
    } finally {
      setSaving(false);
    }
  };

  /* ——— Shell frame ——— */
  const shell = (content: React.ReactNode) => (
    <div className="grain relative min-h-screen bg-bone text-ink">
      <header className="border-b-2 border-ink/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/">
            <MzansiLogo size={36} wordmark />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/templates" className="hidden text-xs font-bold uppercase tracking-[0.14em] text-ink/50 transition-colors hover:text-ink sm:block">
              Templates
            </Link>
            {user && (
              <>
                <span className="hidden items-center gap-2 rounded-full border border-ink/12 px-3.5 py-2 text-xs font-semibold text-ink/60 md:flex">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-flame text-[10px] font-bold text-bone">
                    {(user.displayName?.[0] ?? user.email?.[0] ?? "M").toUpperCase()}
                  </span>
                  {user.displayName ?? user.email}
                </span>
                <button
                  onClick={() => void logout().then(() => router.replace("/"))}
                  className="flex items-center gap-2 rounded-full border-2 border-ink/12 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-ink/60 transition-all hover:border-ink hover:text-ink"
                >
                  <LogOut className="h-3.5 w-3.5" /> Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      {content}
    </div>
  );

  /* ——— Gates ——— */
  if (!configured) {
    return shell(
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gold/20">
          <TriangleAlert className="h-7 w-7 text-gold" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight">Dashboard needs Firebase keys</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/55">
          The dashboard is built and ready — add the Firebase env vars from <code className="rounded bg-ink/5 px-1.5 py-0.5 text-xs">.env.example</code> and
          restart to activate accounts, site saving and deletion.
        </p>
        <Link href="/templates" className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-flame">
          Explore templates <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>,
    );
  }

  if (loading || (!user && configured)) {
    return shell(
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-flame" />
      </div>,
    );
  }

  /* ——— Dashboard ——— */
  return shell(
    <main className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <div className="mz-in-up" style={{ ["--mz-dur" as string]: "0.7s", ["--mz-from" as string]: "24px" }}>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-flame">
              <LayoutDashboard className="h-4 w-4" /> Your dashboard
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              Sharp, {user?.displayName?.split(" ")[0] ?? "boss"}.
            </h1>
            <p className="mt-2 text-sm text-ink/55">
              {sites.length === 0
                ? "No websites yet — build your first one free."
                : `${sites.length} site${sites.length === 1 ? "" : "s"} · drafts are free until you publish`}
            </p>
          </div>
          <Link
            href="/dashboard/new"
            className="group flex items-center gap-2.5 rounded-full bg-flame px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-bone shadow-[0_12px_28px_-10px_rgba(255,77,0,0.65)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <Plus className="h-4.5 w-4.5 transition-transform duration-300 group-hover:rotate-90" /> New website
          </Link>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-flame/40 bg-flame/10 px-5 py-4 text-sm font-medium text-flame-deep">
            {error} — try refreshing.
          </div>
        )}
        {publishingMsg && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-gold/40 bg-gold/10 px-5 py-4 text-sm font-medium text-ink/80">
            <Loader2 className="h-4 w-4 animate-spin text-gold" />
            {publishingMsg}
          </div>
        )}
        {saveMsg && (
          <div className="mt-6 rounded-2xl border border-wa/40 bg-wa/10 px-5 py-4 text-sm font-medium text-wa-deep">
            {saveMsg}
          </div>
        )}

        {/* ——— Sites grid ——— */}
        {state === "loading" ? (
          <div className="grid min-h-[40vh] place-items-center">
            <Loader2 className="h-8 w-8 animate-spin text-ink/30" />
          </div>
        ) : sites.length === 0 ? (
          <div
            className="mz-in-up mt-10 grid place-items-center rounded-3xl border-2 border-dashed border-ink/20 bg-white/40 px-8 py-20 text-center"
            style={{ ["--mz-dur" as string]: "0.7s", ["--mz-delay" as string]: "0.1s" }}
          >
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ink/5">
              <Globe className="h-8 w-8 text-ink/25" />
            </span>
            <h2 className="mt-6 font-display text-2xl font-extrabold">No sites yet</h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/50">
              Pick an industry, add your details, and get a live preview in about 30 seconds. Save as many drafts as
              you like — free.
            </p>
            <Link
              href="/dashboard/new"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-bone transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#ff4d00]"
            >
              <Plus className="h-4.5 w-4.5" /> Build my first site
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((site, i) => {
              const template = TEMPLATES.find((t) => t.id === site.templateId);
              const isConfirming = confirmId === site.id;
              const isDeleting = deletingId === site.id;
              return (
                <article
                  key={site.id}
                  className="mz-in-up group relative overflow-hidden rounded-3xl border-2 border-ink/10 bg-white/70 transition-all duration-300 hover:border-ink hover:shadow-[8px_8px_0_#11130c]"
                  style={{ ["--mz-dur" as string]: "0.6s", ["--mz-from" as string]: "28px", ["--mz-delay" as string]: `${i * 0.07}s` }}
                >
                  {/* Hero strip */}
                  <div className="relative h-36 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={site.heroImageUrl ?? ""}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                    <span
                      className={`absolute left-3.5 top-3.5 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] ${
                        site.status === "active" ? "bg-wa text-white" : "bg-gold text-ink"
                      }`}
                    >
                      {site.status === "active" ? "Published" : "Draft — free"}
                    </span>
                    <span className="absolute bottom-3 left-3.5 rounded-md bg-bone/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink">
                      {template?.name ?? site.templateId}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="truncate font-display text-xl font-extrabold tracking-tight">{site.businessName}</h3>
                    <p className="mt-0.5 truncate text-xs font-medium text-ink/50">
                      {industryLabel(site.industry)} · {site.area}
                    </p>
                      {/*
                       * A published site's whole point is the link — it gets
                       * a full copy/share block. A draft has no public address
                       * yet, so it keeps the quiet grey hint instead of offering
                       * a link that would just 404.
                       */}
                      {site.status === "active" ? (
                        <ShareLink slug={site.slug} className="mt-4" />
                      ) : (
                        <p className="mt-1 truncate font-mono text-[10px] text-ink/35">{siteHost(site.slug)}</p>
                      )}

                    {/* Actions */}
                    <div className="mt-5 flex items-center gap-2">
                      <Link
                        href={`/sites/${site.slug}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-ink py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 hover:bg-ink hover:text-bone"
                      >
                        <Eye className="h-3.5 w-3.5" /> Preview
                      </Link>
                      <button
                        onClick={() => openManager(site)}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink/12 text-ink/40 transition-all duration-300 hover:border-ink hover:text-ink"
                        aria-label="Manage photos"
                        title="Manage logo & photos"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </button>
                      {site.status === "active" ? (
                        <button
                          onClick={() => setConfirmCancelId(confirmCancelId === site.id ? null : site.id)}
                          disabled={cancellingId === site.id}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-wa py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-wa-deep transition-all duration-300 hover:bg-wa hover:text-white disabled:opacity-60"
                        >
                          {cancellingId === site.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
                          Manage
                        </button>
                      ) : (
                        <button
                          onClick={() => void publishSite(site)}
                          disabled={publishingId === site.id}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-flame py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-bone transition-all duration-300 hover:bg-flame-deep disabled:opacity-70"
                          title={`Publish — ${formatRand(PLAN.amountCents)}/month via Paystack`}
                        >
                          {publishingId === site.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ExternalLink className="h-3.5 w-3.5" />}
                          Publish
                        </button>
                      )}
                      <button
                        onClick={() => setConfirmId(isConfirming ? null : site.id)}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink/12 text-ink/40 transition-all duration-300 hover:border-flame hover:text-flame"
                        aria-label="Delete site"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Cancel auto-renew confirm */}
                    {confirmCancelId === site.id && site.status === "active" && (
                      <div
                        className="mz-in-up overflow-hidden"
                        style={{ ["--mz-dur" as string]: "0.3s", ["--mz-from" as string]: "-8px" }}
                      >
                        <div className="mt-4 rounded-xl border border-wa/40 bg-wa/10 p-4">
                          <p className="text-xs font-semibold text-ink/75">
                            Cancel auto-renew for <strong>{site.businessName}</strong>? It stays live until{" "}
                            <strong>{new Date(site.updatedAt).toLocaleDateString()}</strong>, then suspends. Resubscribe anytime.
                          </p>
                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() => void cancelSubscription(site)}
                              disabled={cancellingId === site.id}
                              className="flex items-center gap-2 rounded-full bg-wa px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white disabled:opacity-60"
                            >
                              {cancellingId === site.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                              Yes, stop renewal
                            </button>
                            <button
                              onClick={() => setConfirmCancelId(null)}
                              className="rounded-full border border-ink/20 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-ink/60"
                            >
                              Keep paying
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Delete confirm */}
                    {isConfirming && (
                      <div
                        className="mz-in-up overflow-hidden"
                        style={{ ["--mz-dur" as string]: "0.3s", ["--mz-from" as string]: "-8px" }}
                      >
                        <div className="mt-4 rounded-xl border border-flame/40 bg-flame/10 p-4">
                          <p className="text-xs font-semibold text-ink/75">
                            Delete <strong>{site.businessName}</strong> forever? This can&apos;t be undone.
                          </p>
                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() => void deleteSite(site.id)}
                              disabled={isDeleting}
                              className="flex items-center gap-2 rounded-full bg-flame px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-bone disabled:opacity-60"
                            >
                              {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                              Yes, delete
                            </button>
                            <button
                              onClick={() => setConfirmId(null)}
                              className="rounded-full border border-ink/20 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-ink/60"
                            >
                              Keep it
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}

            {/* Add-new tile */}
            <div
              className="mz-in-up"
              style={{ ["--mz-dur" as string]: "0.6s", ["--mz-from" as string]: "28px", ["--mz-delay" as string]: `${sites.length * 0.07}s` }}
            >
              <Link
                href="/dashboard/new"
                className="group flex h-full min-h-[300px] flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-ink/20 bg-white/30 transition-all duration-300 hover:border-flame hover:bg-flame/5"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-ink/15 transition-all duration-300 group-hover:rotate-90 group-hover:border-flame group-hover:bg-flame group-hover:text-bone">
                  <Plus className="h-6 w-6" />
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-[0.16em] text-ink/50 group-hover:text-flame">
                  Buy another site
                </span>
                <span className="text-xs text-ink/35">R149.99/m per published site</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ——— Photo manager bottom sheet ——— */}
      <Presence show={managingId !== null && !!managingSite} duration={550} className="mz-modal">
        {managingId !== null && managingSite && (
          <div
            className="mz-modal-overlay fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm"
            onClick={() => setManagingId(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="mz-modal-sheet absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[2rem] border-t-2 border-ink bg-bone p-6 pb-10 md:left-auto md:right-6 md:w-[min(560px,100vw-2rem)]"
            >
              <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-ink/15" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight">{managingSite.businessName}</h3>
                  <p className="mt-0.5 text-xs font-medium text-ink/50">Photos & logo — changes update your preview instantly</p>
                </div>
                <button
                  onClick={() => setManagingId(null)}
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink/12 text-ink/50 transition-colors hover:border-ink hover:text-ink"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {saveMsg && (
                <p
                  className={`mz-in-up mt-4 rounded-xl px-4 py-3 text-sm font-medium ${
                    saveMsg.includes("Photos saved") ? "border border-wa/30 bg-wa/10 text-wa-deep" : "border border-flame/40 bg-flame/10 text-flame-deep"
                  }`}
                >
                  {saveMsg}
                </p>
              )}

              {/* Logo */}
              <div className="mt-6 rounded-2xl border-2 border-ink/12 bg-white/60 p-5">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-ink/50">Logo</p>
                <AccountImageUploader
                  kind="logo"
                  images={logoState}
                  onChange={setLogoState}
                  maxCount={1}
                  maxBytes={2 * 1024 * 1024}
                  onActivity={setSaveMsg}
                />
              </div>

              {/* Gallery */}
              <div className="mt-4 rounded-2xl border-2 border-ink/12 bg-white/60 p-5">
                <div className="mb-1 flex items-baseline justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/50">Gallery photos</p>
                  <p className="text-[10px] font-semibold text-ink/40">{galleryState.length}/6</p>
                </div>
                <AccountImageUploader
                  kind="gallery"
                  images={galleryState}
                  onChange={setGalleryState}
                  maxCount={6}
                  maxBytes={8 * 1024 * 1024}
                  onActivity={setSaveMsg}
                />
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => void saveImages()}
                  disabled={saving || galleryState.some((g) => g.isLocal) || logoState.some((l) => l.isLocal)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-bone transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Save changes
                </button>
                <button
                  onClick={() => setManagingId(null)}
                  className="flex-1 rounded-full border-2 border-ink/15 py-3.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:border-ink"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Presence>
    </main>,
  );
}
