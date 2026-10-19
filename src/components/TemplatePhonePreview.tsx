"use client";

import { useMemo } from "react";
import { TemplateRenderer } from "@/templates";
import { getDemoSiteData } from "@/templates/demo-data";

interface TemplatePhonePreviewProps {
  templateId: string;
  industry: string;
  businessName?: string;
  area?: string;
  whatsapp?: string;
  className?: string;
}

/**
 * Renders a real template inside a phone shell without using an iframe.
 * This avoids browser/preview-environment iframe load errors while still
 * showing a true mobile-width version of the site.
 */
export default function TemplatePhonePreview({
  templateId,
  industry,
  businessName,
  area,
  whatsapp,
  className = "",
}: TemplatePhonePreviewProps) {
  const site = useMemo(() => {
    const overrides: Record<string, string> = { industry };

    const cleanName = businessName?.trim();
    const cleanArea = area?.trim();
    const cleanWhatsapp = whatsapp?.trim();

    if (cleanName) overrides.businessName = cleanName;
    if (cleanArea) overrides.area = cleanArea;
    if (cleanWhatsapp) overrides.whatsapp = cleanWhatsapp;

    return getDemoSiteData(overrides as { industry: string; businessName?: string; area?: string; whatsapp?: string }, { isDemo: true });
  }, [industry, businessName, area, whatsapp]);

  /**
   * Templates are designed responsively. We render them at a real mobile width
   * (390px), then scale them down into the phone shell viewport.
   */
  const previewWidth = 390;
  const previewHeight = 700;
  const shellWidth = 308;
  const scale = shellWidth / previewWidth;
  const scaledHeight = Math.round(previewHeight * scale);

  return (
    <div className={`mx-auto w-full max-w-[320px] ${className}`}>
      <div className="relative overflow-hidden rounded-[2.4rem] border-[5px] border-ink bg-white shadow-[0_40px_80px_-20px_rgba(17,19,12,0.35)]">
        {/* Phone notch / status bar */}
        <div className="relative z-20 flex items-center justify-between bg-white px-5 pt-2 pb-1">
          <span className="text-[10px] font-bold text-ink">9:41</span>
          <div className="absolute left-1/2 top-1 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
          <div className="flex gap-1">
            <span className="h-2 w-2.5 rounded-[2px] border border-ink" />
            <span className="h-2 w-2 rounded-full bg-ink" />
          </div>
        </div>

        {/* Clipped scaled mobile site */}
        <div className="relative w-full overflow-hidden bg-white" style={{ height: `${scaledHeight}px` }}>
          <div
            className="origin-top-left pointer-events-none"
            style={{ width: `${previewWidth}px`, transform: `scale(${scale})` }}
          >
            <div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`, overflow: "hidden" }}>
              <TemplateRenderer templateId={templateId} site={site} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
