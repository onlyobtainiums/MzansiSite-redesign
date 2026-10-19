import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowUpRight, Clock3, Loader2 } from "lucide-react";
import { getTemplate } from "@/templates/registry";
import { getDemoSiteData, demoIndustriesForTemplate } from "@/templates/demo-data";
import { TemplateRenderer } from "@/templates";
import { INDUSTRY_LIST } from "@/templates/industries";

interface PageProps {
  params: Promise<{ templateId: string }>;
  searchParams: Promise<{ 
    industry?: string;
    mode?: string;
    name?: string;
    area?: string;
    whatsapp?: string;
  }>;
}

async function TemplatePageContent({ templateId, searchParams }: { templateId: string, searchParams: PageProps["searchParams"] }) {
  const { industry, mode, name, area, whatsapp } = await searchParams;
  const meta = getTemplate(templateId);
  if (!meta) notFound();

  const isFrame = mode === "frame";

  const demoIndustries = demoIndustriesForTemplate(templateId);
  const chosenIndustry = industry || meta.previewIndustry;
  
  const site = getDemoSiteData({ 
    industry: chosenIndustry,
    businessName: name || undefined,
    area: area || undefined,
    whatsapp: whatsapp || undefined,
  }, { isDemo: true });

  if (meta.status !== "live") {
    return (
      <div className="grid min-h-screen place-items-center bg-ink px-5 text-bone text-center">
        <div className="max-w-lg">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{meta.statusLabel} · In the works</p>
          <h1 className="mt-5 font-display text-6xl font-extrabold uppercase tracking-tight">{meta.name}</h1>
          <p className="mt-2 font-serif text-2xl italic text-bone/60">{meta.family}</p>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-bone/55">{meta.description}</p>
          <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-bone/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-bone/70">
            <Clock3 className="h-4 w-4 text-gold" /> Shipping soon
          </div>
          <Link href="/templates" className="mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-flame">
            <ArrowLeft className="h-4 w-4" /> Back to templates
          </Link>
        </div>
      </div>
    );
  }

  if (isFrame) {
    return (
      <div className="bg-white min-h-screen overflow-x-hidden">
        <TemplateRenderer templateId={templateId} site={site} />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="sticky top-0 z-[60] border-b-2 border-ink bg-bone/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-4 py-2.5 md:px-8">
          <div className="flex items-center gap-3">
            <Link href="/templates" className="grid h-8 w-8 place-items-center rounded-full border-2 border-ink/15 transition-colors hover:border-ink">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <p className="font-display text-sm font-extrabold uppercase tracking-tight">{meta.name} <span className="font-normal text-ink/40">· {meta.family}</span></p>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-flame">Live template preview</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {demoIndustries.map((key) => (
              <Link key={key} href={`/templates/${templateId}?industry=${key}`} className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-all ${key === chosenIndustry ? "border-ink bg-ink text-bone" : "border-ink/15 text-ink/55 hover:border-ink hover:text-ink"}`}>
                {INDUSTRY_LIST.find(i => i.key === key)?.label.split(',')[0] ?? key}
              </Link>
            ))}
          </div>
          <Link href="/#builder" className="flex items-center gap-2 rounded-full bg-flame px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-bone transition-all duration-300 hover:-translate-y-0.5 hover:bg-flame-deep">
            Use this template <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
      <TemplateRenderer templateId={templateId} site={site} />
    </div>
  );
}

export default async function TemplatePreviewPage({ params, searchParams }: PageProps) {
  const { templateId } = await params;
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center bg-white"><Loader2 className="h-8 w-8 animate-spin text-ink/20" /></div>}>
      <TemplatePageContent templateId={templateId} searchParams={searchParams} />
    </Suspense>
  );
}
