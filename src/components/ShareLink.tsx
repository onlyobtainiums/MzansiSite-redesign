"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Share2 } from "lucide-react";
import { siteUrl } from "@/lib/domain";

/**
 * A published site's public address, with copy + native share.
 *
 * MzansiSite customers are WhatsApp businesses — the link almost always leaves
 * the app by being pasted into a WhatsApp chat or a bio. So the two primary
 * actions are "copy" and the phone's own share sheet (navigator.share), not a
 * desktop-style address bar. On devices without navigator.share the share
 * button is simply not rendered, and copy is the single action.
 */
export default function ShareLink({
  slug,
  tone = "light",
  className = "",
}: {
  slug: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const url = siteUrl(slug);
  const shown = url.replace(/^https?:\/\//, "");
  const [copied, setCopied] = useState(false);
  const [canShare] = useState(
    () => typeof navigator !== "undefined" && typeof navigator.share === "function",
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /*
       * clipboard.writeText needs a secure context and a user gesture; older
       * Android browsers and in-app webviews can still refuse it. Fall back to
       * the legacy selection trick so copying never silently does nothing.
       */
      const el = document.createElement("input");
      el.value = url;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function share() {
    try {
      await navigator.share({ title: "My website", url });
    } catch {
      /* The user dismissed the share sheet — not an error. */
    }
  }

  const dark = tone === "dark";
  const shell = dark
    ? "border-bone/15 bg-bone/5"
    : "border-ink/10 bg-ink/[0.03]";
  const urlText = dark ? "text-bone" : "text-ink";
  const faint = dark ? "text-bone/45" : "text-ink/40";
  const btn = dark
    ? "border-bone/25 text-bone hover:bg-bone hover:text-ink"
    : "border-ink/15 text-ink hover:bg-ink hover:text-bone";

  return (
    <div className={`rounded-2xl border ${shell} p-3 ${className}`}>
      <p className={`text-[9px] font-bold uppercase tracking-[0.18em] ${faint}`}>
        Your public link
      </p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-1.5 flex items-center gap-1.5 font-mono text-[11px] font-medium underline-offset-4 hover:underline ${urlText}`}
        title="Open your site"
      >
        <span className="truncate">{shown}</span>
        <ExternalLink className="h-3 w-3 shrink-0 opacity-50" />
      </a>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => void copy()}
          aria-label={copied ? "Link copied" : "Copy your public link"}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-full border-2 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ${btn}`}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>

        {canShare && (
          <button
            type="button"
            onClick={() => void share()}
            aria-label="Share your link"
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full border-2 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ${btn}`}
          >
            <Share2 className="h-3.5 w-3.5" />
            Share
          </button>
        )}
      </div>
    </div>
  );
}
