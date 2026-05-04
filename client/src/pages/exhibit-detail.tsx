import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import Layout from "@/components/layout";
import { BrandWordmark } from "@/components/brand-wordmark";
import { CodeBlock } from "@/components/ui/code-block";
import { HtmlPreviewFrame } from "@/components/ui/html-preview-frame";
import { useAuth } from "@/lib/auth";
import { getExhibitBackTarget } from "@/lib/exhibit-navigation";
import { Eye, Code2, Monitor, Tablet, Smartphone, Heart, GitFork, ArrowLeft, Flag, Share2, Loader2, ExternalLink, Clock, Tag, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Exhibit } from "@shared/schema";

type FunnelDetailTheme = {
  familyLabel: string;
  useCaseLabel: string;
  pageClass: string;
  headerClass: string;
  borderClass: string;
  accentClass: string;
  mutedClass: string;
  titleClass: string;
  summaryPanelClass: string;
  metaPanelClass: string;
  previewShellClass: string;
  previewFrameClass: string;
  chipClass: string;
  tabActiveClass: string;
  tabIdleClass: string;
  deviceActiveClass: string;
  deviceIdleClass: string;
  note: string;
};

function isFunnelExhibit(exhibit: Exhibit) {
  return exhibit.category === "Funnels";
}

function getFunnelDetailTheme(exhibit: Exhibit): FunnelDetailTheme {
  const haystack = `${exhibit.title} ${(exhibit.tags || []).join(" ")}`.toLowerCase();

  if (/webinar|training|event/.test(haystack)) {
    return {
      familyLabel: "Event Funnel",
      useCaseLabel: "Registration and attendance conversion",
      pageClass: "bg-slate-50 text-slate-900",
      headerClass: "bg-white/95 text-slate-900 backdrop-blur",
      borderClass: "border-slate-200",
      accentClass: "text-blue-700",
      mutedClass: "text-slate-600",
      titleClass: "text-slate-950",
      summaryPanelClass: "bg-white",
      metaPanelClass: "bg-white",
      previewShellClass: "bg-white",
      previewFrameClass: "bg-slate-50",
      chipClass: "border border-blue-100 bg-blue-50 text-blue-700",
      tabActiveClass: "bg-slate-900 text-white",
      tabIdleClass: "bg-white text-slate-600 hover:bg-slate-50",
      deviceActiveClass: "bg-slate-900 text-white",
      deviceIdleClass: "bg-white text-slate-600 hover:bg-slate-50",
      note: "Use a direct event promise, clear timing, and a single registration path. This should look ready for a real campaign launch.",
    };
  }

  if (/qualification|qualify|survey|intake|fit form/.test(haystack)) {
    return {
      familyLabel: "Qualification Funnel",
      useCaseLabel: "Lead screening and sales qualification",
      pageClass: "bg-stone-50 text-slate-900",
      headerClass: "bg-white/95 text-slate-900 backdrop-blur",
      borderClass: "border-stone-200",
      accentClass: "text-emerald-700",
      mutedClass: "text-slate-600",
      titleClass: "text-slate-950",
      summaryPanelClass: "bg-white",
      metaPanelClass: "bg-white",
      previewShellClass: "bg-white",
      previewFrameClass: "bg-stone-50",
      chipClass: "border border-emerald-100 bg-emerald-50 text-emerald-700",
      tabActiveClass: "bg-slate-900 text-white",
      tabIdleClass: "bg-white text-slate-600 hover:bg-slate-50",
      deviceActiveClass: "bg-slate-900 text-white",
      deviceIdleClass: "bg-white text-slate-600 hover:bg-slate-50",
      note: "Keep the page calm and legible. The value is in screening quality and field clarity, not visual performance.",
    };
  }

  if (/dm|conversation|chat|social/.test(haystack)) {
    return {
      familyLabel: "Conversation Funnel",
      useCaseLabel: "Direct-response outreach to booked call",
      pageClass: "bg-slate-50 text-slate-900",
      headerClass: "bg-white/95 text-slate-900 backdrop-blur",
      borderClass: "border-slate-200",
      accentClass: "text-cyan-700",
      mutedClass: "text-slate-600",
      titleClass: "text-slate-950",
      summaryPanelClass: "bg-white",
      metaPanelClass: "bg-white",
      previewShellClass: "bg-white",
      previewFrameClass: "bg-slate-50",
      chipClass: "border border-cyan-100 bg-cyan-50 text-cyan-700",
      tabActiveClass: "bg-slate-900 text-white",
      tabIdleClass: "bg-white text-slate-600 hover:bg-slate-50",
      deviceActiveClass: "bg-slate-900 text-white",
      deviceIdleClass: "bg-white text-slate-600 hover:bg-slate-50",
      note: "This should look like a credible handoff from outreach to sales, with message continuity and a clean scheduling step.",
    };
  }

  if (/advertorial|story|editorial|bridge/.test(haystack)) {
    return {
      familyLabel: "Narrative Funnel",
      useCaseLabel: "Story-led education before application",
      pageClass: "bg-stone-50 text-slate-900",
      headerClass: "bg-white/95 text-slate-900 backdrop-blur",
      borderClass: "border-stone-200",
      accentClass: "text-amber-700",
      mutedClass: "text-slate-600",
      titleClass: "text-slate-950",
      summaryPanelClass: "bg-white",
      metaPanelClass: "bg-white",
      previewShellClass: "bg-white",
      previewFrameClass: "bg-stone-50",
      chipClass: "border border-amber-100 bg-amber-50 text-amber-700",
      tabActiveClass: "bg-slate-900 text-white",
      tabIdleClass: "bg-white text-slate-600 hover:bg-slate-50",
      deviceActiveClass: "bg-slate-900 text-white",
      deviceIdleClass: "bg-white text-slate-600 hover:bg-slate-50",
      note: "The page should read like a polished long-form marketing asset that a serious services company would actually publish.",
    };
  }

  if (/confirmation|confirmed|receipt|thank-you|thank you/.test(haystack)) {
    return {
      familyLabel: "Confirmation Funnel",
      useCaseLabel: "Post-booking receipt and next-step reinforcement",
      pageClass: "bg-slate-50 text-slate-900",
      headerClass: "bg-white/95 text-slate-900 backdrop-blur",
      borderClass: "border-slate-200",
      accentClass: "text-emerald-700",
      mutedClass: "text-slate-600",
      titleClass: "text-slate-950",
      summaryPanelClass: "bg-white",
      metaPanelClass: "bg-white",
      previewShellClass: "bg-white",
      previewFrameClass: "bg-slate-50",
      chipClass: "border border-emerald-100 bg-emerald-50 text-emerald-700",
      tabActiveClass: "bg-slate-900 text-white",
      tabIdleClass: "bg-white text-slate-600 hover:bg-slate-50",
      deviceActiveClass: "bg-slate-900 text-white",
      deviceIdleClass: "bg-white text-slate-600 hover:bg-slate-50",
      note: "This page should feel like a real appointment confirmation: clear, transactional, and immediately useful after the booking step.",
    };
  }

  if (/pre-call|indoctrination|show-up|confirmation|prep/.test(haystack)) {
    return {
      familyLabel: "Pre-Call Funnel",
      useCaseLabel: "Post-booking confirmation and show-up prep",
      pageClass: "bg-slate-50 text-slate-900",
      headerClass: "bg-white/95 text-slate-900 backdrop-blur",
      borderClass: "border-slate-200",
      accentClass: "text-indigo-700",
      mutedClass: "text-slate-600",
      titleClass: "text-slate-950",
      summaryPanelClass: "bg-white",
      metaPanelClass: "bg-white",
      previewShellClass: "bg-white",
      previewFrameClass: "bg-slate-50",
      chipClass: "border border-indigo-100 bg-indigo-50 text-indigo-700",
      tabActiveClass: "bg-slate-900 text-white",
      tabIdleClass: "bg-white text-slate-600 hover:bg-slate-50",
      deviceActiveClass: "bg-slate-900 text-white",
      deviceIdleClass: "bg-white text-slate-600 hover:bg-slate-50",
      note: "Make logistics, expectations, and next steps obvious. This should feel dependable, not dramatic.",
    };
  }

  return {
    familyLabel: "VSL Funnel",
    useCaseLabel: "Video-led authority building with booking CTA",
    pageClass: "bg-slate-50 text-slate-900",
    headerClass: "bg-white/95 text-slate-900 backdrop-blur",
    borderClass: "border-slate-200",
    accentClass: "text-sky-700",
    mutedClass: "text-slate-600",
    titleClass: "text-slate-950",
    summaryPanelClass: "bg-white",
    metaPanelClass: "bg-white",
    previewShellClass: "bg-white",
    previewFrameClass: "bg-slate-50",
    chipClass: "border border-sky-100 bg-sky-50 text-sky-700",
    tabActiveClass: "bg-slate-900 text-white",
    tabIdleClass: "bg-white text-slate-600 hover:bg-slate-50",
    deviceActiveClass: "bg-slate-900 text-white",
    deviceIdleClass: "bg-white text-slate-600 hover:bg-slate-50",
    note: "The page should look like a production-ready marketing asset for a serious agency, consultancy, or B2B service brand.",
  };
}

export default function ExhibitDetail() {
  const [, params] = useRoute("/exhibit/:slug");
  const slug = params?.slug || "";
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const previewRef = useRef<HTMLDivElement>(null);

  const { data: exhibit, isLoading } = useQuery<Exhibit>({
    queryKey: ["/api/exhibits", slug],
    queryFn: async () => {
      const res = await fetch(`/api/exhibits/${slug}`);
      if (!res.ok) throw new Error("Exhibit not found");
      return res.json();
    },
    enabled: !!slug,
  });

  const { data: saveStatus } = useQuery({
    queryKey: ["/api/saves", exhibit?.id, "status"],
    queryFn: async () => {
      const res = await fetch(`/api/saves/${exhibit!.id}/status`);
      return res.json();
    },
    enabled: !!user && !!exhibit,
  });

  const { data: remixes = [] } = useQuery<Exhibit[]>({
    queryKey: ["/api/exhibits", exhibit?.id, "remixes"],
    queryFn: async () => {
      const res = await fetch(`/api/exhibits/${exhibit!.id}/remixes`);
      return res.json();
    },
    enabled: !!exhibit,
  });

  const { data: creatorData } = useQuery({
    queryKey: ["/api/profiles", exhibit?.creatorId],
    queryFn: async () => {
      const res = await fetch(`/api/profiles/${exhibit!.creatorId}`);
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!exhibit?.creatorId,
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (saveStatus?.saved) {
        await fetch(`/api/saves/${exhibit!.id}`, { method: "DELETE" });
      } else {
        await fetch(`/api/saves/${exhibit!.id}`, { method: "POST" });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/saves", exhibit?.id, "status"] });
    },
  });

  useEffect(() => {
    if (previewRef.current && exhibit && activeTab === "preview" && device === "desktop") {
      previewRef.current.innerHTML = exhibit.htmlPreview;
    }
  }, [exhibit, activeTab, device]);

  const backTarget = getExhibitBackTarget(slug);

  const handleBackNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!backTarget.useHistoryBack || typeof window === "undefined" || window.history.length <= 1) {
      return;
    }

    event.preventDefault();
    window.history.back();
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (!exhibit) {
    return (
      <Layout>
        <div className="text-center py-20">
          <div className="text-4xl mb-4">404</div>
          <div className="text-foreground font-medium mb-2">Exhibit not found</div>
          <Link href={backTarget.href} onClick={handleBackNavigation} className="text-primary text-sm hover:underline">{backTarget.label}</Link>
        </div>
      </Layout>
    );
  }

  const licenseLabels: Record<string, string> = {
    free: "Free — Attribution Required",
    personal: "Personal License",
    commercial: "Commercial License",
    team: "Team / Enterprise License",
  };

  const funnelMode = isFunnelExhibit(exhibit);
  const funnelTheme = funnelMode ? getFunnelDetailTheme(exhibit) : null;

  if (funnelMode && funnelTheme) {
    return (
      <div className={cn("min-h-screen", funnelTheme.pageClass)}>
        <header className={cn("border-b", funnelTheme.headerClass, funnelTheme.borderClass)}>
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-5">
            <div className="flex items-center gap-4">
              <Link href={backTarget.href} onClick={handleBackNavigation} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
                <ArrowLeft className="w-4 h-4" />
                {backTarget.label}
              </Link>
              <div className={cn("hidden h-6 w-px md:block", funnelTheme.borderClass)} />
              <Link href="/" className="inline-flex items-center gap-2">
                <BrandWordmark size="sm" />
              </Link>
            </div>
            <div className={cn("hidden rounded-full px-3 py-1 text-xs font-medium md:block", funnelTheme.chipClass)}>{funnelTheme.familyLabel}</div>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-6 py-8">
          <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
            <aside className="space-y-6">
              <section className={cn("rounded-2xl border px-6 py-6 shadow-sm", funnelTheme.borderClass, funnelTheme.summaryPanelClass)}>
                <div className="flex flex-wrap items-center gap-3">
                  <div className={cn("rounded-full px-3 py-1 text-xs font-medium", funnelTheme.chipClass)}>{funnelTheme.familyLabel}</div>
                  <div className={cn("text-sm", funnelTheme.mutedClass)}>{funnelTheme.useCaseLabel}</div>
                </div>
                <h1 data-testid="text-exhibit-title" className={cn("mt-5 text-4xl font-semibold tracking-tight sm:text-5xl", funnelTheme.titleClass)}>{exhibit.title}</h1>
                <p className={cn("mt-4 text-base leading-7", funnelTheme.mutedClass)}>{exhibit.description}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className={cn("rounded-xl border px-4 py-4", funnelTheme.borderClass)}>
                    <div className={cn("text-xs font-semibold uppercase tracking-[0.14em]", funnelTheme.accentClass)}>Recommended Use</div>
                    <div className={cn("mt-2 text-sm leading-6", funnelTheme.mutedClass)}>{funnelTheme.note}</div>
                  </div>
                  <div className={cn("rounded-xl border px-4 py-4", funnelTheme.borderClass)}>
                    <div className={cn("text-xs font-semibold uppercase tracking-[0.14em]", funnelTheme.accentClass)}>Included Tags</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className={cn("rounded-full px-3 py-1 text-xs font-medium", funnelTheme.chipClass)}>{exhibit.category}</span>
                      {(exhibit.tags || []).map((tag) => (
                        <span key={tag} className={cn("rounded-full px-3 py-1 text-xs font-medium", funnelTheme.chipClass)}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className={cn("rounded-2xl border px-6 py-6 shadow-sm", funnelTheme.borderClass, funnelTheme.metaPanelClass)}>
                <div className={cn("text-xs font-semibold uppercase tracking-[0.14em]", funnelTheme.accentClass)}>Asset Details</div>
                <div className="mt-4 grid gap-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                    <span className={funnelTheme.mutedClass}>Views</span>
                    <span className="font-medium">{exhibit.viewCount}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                    <span className={funnelTheme.mutedClass}>Saves</span>
                    <span className="font-medium">{exhibit.saveCount}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                    <span className={funnelTheme.mutedClass}>Remixes</span>
                    <span className="font-medium">{exhibit.remixCount}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                    <span className={funnelTheme.mutedClass}>License</span>
                    <span className="font-medium text-right">{licenseLabels[exhibit.licenseType] || exhibit.licenseType}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                    <span className={funnelTheme.mutedClass}>Version</span>
                    <span className="font-medium">v{exhibit.version}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className={funnelTheme.mutedClass}>Status</span>
                    <span className="font-medium">{exhibit.productionReady ? "Production Ready" : "In Progress"}</span>
                  </div>
                </div>
                {user && (
                  <button
                    data-testid="button-save-exhibit"
                    onClick={() => saveMutation.mutate()}
                    className={cn(
                      "mt-5 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
                      funnelTheme.borderClass,
                      saveStatus?.saved ? funnelTheme.tabActiveClass : funnelTheme.tabIdleClass,
                    )}
                  >
                    <Heart className={cn("w-4 h-4", saveStatus?.saved && "fill-current")} />
                    {saveStatus?.saved ? "Saved" : "Save Exhibit"}
                  </button>
                )}
              </section>
              {(exhibit.techStack || []).length > 0 && (
                <section className={cn("rounded-2xl border px-6 py-6 shadow-sm", funnelTheme.borderClass, funnelTheme.metaPanelClass)}>
                  <div className={cn("text-xs font-semibold uppercase tracking-[0.14em]", funnelTheme.accentClass)}>Tech Stack</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(exhibit.techStack || []).map((tech) => (
                      <span key={tech} className={cn("rounded-full px-3 py-1 text-xs font-medium", funnelTheme.chipClass)}>{tech}</span>
                    ))}
                  </div>
                </section>
              )}

              {exhibit.creatorId && (
                <section className={cn("rounded-2xl border px-6 py-6 shadow-sm", funnelTheme.borderClass, funnelTheme.metaPanelClass)}>
                  <div className={cn("text-xs font-semibold uppercase tracking-[0.14em]", funnelTheme.accentClass)}>Creator</div>
                  <Link href={`/profile/${exhibit.creatorId}`}>
                    <div className="mt-4 flex items-center gap-4 cursor-pointer group" data-testid="link-creator-profile">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                        style={{ background: creatorData?.profile?.themeAccent || "#6366f1" }}
                      >
                        {creatorData?.user?.avatarUrl ? (
                          <img src={creatorData.user.avatarUrl} alt="" className="w-full h-full rounded-xl object-cover" />
                        ) : (
                          creatorData?.user?.displayName?.charAt(0)?.toUpperCase() || <User className="w-5 h-5" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold group-hover:opacity-70 transition-opacity">{creatorData?.user?.displayName || "Creator"}</div>
                        {creatorData?.profile?.headline && <div className={cn("mt-1 text-xs truncate", funnelTheme.mutedClass)}>{creatorData.profile.headline}</div>}
                      </div>
                    </div>
                  </Link>
                </section>
              )}
            </aside>

            <section className="space-y-4">
              <div className={cn("rounded-2xl border px-6 py-5 shadow-sm", funnelTheme.borderClass, funnelTheme.metaPanelClass)}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className={cn("text-xs font-semibold uppercase tracking-[0.14em]", funnelTheme.accentClass)}>Preview Workspace</div>
                    <div className={cn("mt-2 text-sm leading-6", funnelTheme.mutedClass)}>Review the live implementation, switch breakpoints, or inspect the source code without the library shell getting in the way.</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className={cn("inline-grid grid-cols-2 overflow-hidden rounded-xl border", funnelTheme.borderClass)}>
                      <button
                        data-testid="button-tab-preview"
                        onClick={() => setActiveTab("preview")}
                        className={cn("flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors", activeTab === "preview" ? funnelTheme.tabActiveClass : funnelTheme.tabIdleClass)}
                      >
                        <Eye className="w-4 h-4" />Preview
                      </button>
                      <button
                        data-testid="button-tab-code"
                        onClick={() => setActiveTab("code")}
                        className={cn("flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors", activeTab === "code" ? funnelTheme.tabActiveClass : funnelTheme.tabIdleClass)}
                      >
                        <Code2 className="w-4 h-4" />Code
                      </button>
                    </div>

                    {activeTab === "preview" && (
                      <div className={cn("hidden sm:inline-grid grid-cols-3 overflow-hidden rounded-xl border", funnelTheme.borderClass)}>
                        {(["desktop", "tablet", "mobile"] as const).map((displayDevice) => (
                          <button
                            key={displayDevice}
                            onClick={() => setDevice(displayDevice)}
                            className={cn("flex items-center justify-center px-4 py-3 transition-colors", device === displayDevice ? funnelTheme.deviceActiveClass : funnelTheme.deviceIdleClass)}
                          >
                            {displayDevice === "desktop" ? <Monitor className="w-4 h-4" /> : displayDevice === "tablet" ? <Tablet className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={cn("rounded-2xl border p-4 shadow-sm lg:p-6", funnelTheme.borderClass, funnelTheme.previewShellClass)}>
                {activeTab === "preview" ? (
                  <div className="space-y-4">
                    <div className={cn("rounded-xl border px-4 py-4", funnelTheme.borderClass, funnelTheme.metaPanelClass)}>
                      <div className={cn("text-xs font-semibold uppercase tracking-[0.14em]", funnelTheme.accentClass)}>Live Preview</div>
                      <div className={cn("mt-2 text-sm leading-7", funnelTheme.mutedClass)}>This is the production component in context. The wrapper is intentionally quiet so the actual page design carries the review.</div>
                    </div>

                    <div className={cn("min-h-[760px] overflow-hidden rounded-2xl border bg-white shadow-sm", funnelTheme.borderClass, device === "mobile" ? "mx-auto w-[375px] max-h-[667px]" : device === "tablet" ? "mx-auto w-[768px] max-h-[900px]" : funnelTheme.previewFrameClass)}>
                      {device === "desktop" ? (
                        <div ref={previewRef} className="w-full overflow-auto" />
                      ) : (
                        <HtmlPreviewFrame
                          htmlPreview={exhibit.htmlPreview}
                          title={`${exhibit.title} ${device} preview`}
                          viewport={device}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[760px] overflow-hidden rounded-2xl border border-[#2b2b2b] bg-[#1e1e1e]">
                    <CodeBlock code={exhibit.code} className="h-full border-0 rounded-none" />
                  </div>
                )}
              </div>

              {remixes.length > 0 && (
                <section className={cn("rounded-2xl border px-6 py-6 shadow-sm", funnelTheme.borderClass, funnelTheme.metaPanelClass)}>
                  <div className={cn("text-xs font-semibold uppercase tracking-[0.14em]", funnelTheme.accentClass)}>Related Variations</div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {remixes.map(r => (
                      <Link key={r.id} href={`/exhibit/${r.slug}`}>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 cursor-pointer transition-colors hover:bg-white">
                          <div className="font-medium text-sm">{r.title}</div>
                          <div className={cn("mt-1 text-xs", funnelTheme.mutedClass)}>{r.description?.slice(0, 100)}...</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <Layout>
      {/* Back Link */}
      <Link href={backTarget.href} onClick={handleBackNavigation} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        {backTarget.label}
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h1 data-testid="text-exhibit-title" className="text-3xl font-display font-bold tracking-tight mb-2">{exhibit.title}</h1>
          <p className="text-muted-foreground max-w-2xl">{exhibit.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">{exhibit.category}</span>
            {(exhibit.tags || []).map(tag => (
              <span key={tag} className="px-2.5 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {user && (
            <button
              data-testid="button-save-exhibit"
              onClick={() => saveMutation.mutate()}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border transition-all",
                saveStatus?.saved
                  ? "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-600"
                  : "border-border hover:bg-muted"
              )}
            >
              <Heart className={cn("w-4 h-4", saveStatus?.saved && "fill-current")} />
              {saveStatus?.saved ? "Saved" : "Save"}
            </button>
          )}
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-muted transition-all">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          {user && (
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-muted transition-all text-muted-foreground">
              <Flag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
        <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{exhibit.viewCount} views</span>
        <span className="flex items-center gap-1.5"><Heart className="w-4 h-4" />{exhibit.saveCount} saves</span>
        <span className="flex items-center gap-1.5"><GitFork className="w-4 h-4" />{exhibit.remixCount} remixes</span>
        <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" />{licenseLabels[exhibit.licenseType] || exhibit.licenseType}</span>
        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />v{exhibit.version}</span>
        {exhibit.verified && <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 text-xs font-medium rounded-full">Verified</span>}
        {exhibit.accessible && <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 text-xs font-medium rounded-full">Accessible</span>}
        {exhibit.productionReady && <span className="px-2 py-0.5 bg-purple-50 dark:bg-purple-950 text-purple-600 text-xs font-medium rounded-full">Production Ready</span>}
      </div>

      {/* Preview / Code Panel */}
      <div className="border border-border bg-card rounded-xl overflow-hidden shadow-sm mb-8">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-neutral-50/50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-muted/50 p-0.5 rounded-lg border border-border/50">
              <button
                data-testid="button-tab-preview"
                onClick={() => setActiveTab("preview")}
                className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all", activeTab === "preview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                <Eye className="w-3.5 h-3.5" />Preview
              </button>
              <button
                data-testid="button-tab-code"
                onClick={() => setActiveTab("code")}
                className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all", activeTab === "code" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                <Code2 className="w-3.5 h-3.5" />Code
              </button>
            </div>
          </div>
          {activeTab === "preview" && (
            <div className="hidden sm:flex items-center bg-background/50 border border-border/50 rounded-lg p-0.5">
              {(["desktop", "tablet", "mobile"] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setDevice(d)}
                  className={cn("p-1.5 rounded-md transition-all", device === d ? "bg-white dark:bg-neutral-800 text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
                >
                  {d === "desktop" ? <Monitor className="w-3.5 h-3.5" /> : d === "tablet" ? <Tablet className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="min-h-[500px] relative">
          {activeTab === "preview" ? (
            <div className="w-full min-h-[500px] flex items-center justify-center p-8 overflow-hidden bg-neutral-100/30 dark:bg-neutral-900/30">
              <div className={cn("transition-all duration-500 border border-border/40 bg-background shadow-sm overflow-hidden rounded-md ring-1 ring-black/5",
                device === "mobile" ? "w-[375px] max-h-[667px] shadow-xl" : device === "tablet" ? "w-[768px] shadow-lg" : "w-full"
              )}>
                {device === "desktop" ? (
                  <div ref={previewRef} className="w-full overflow-auto" />
                ) : (
                  <HtmlPreviewFrame
                    htmlPreview={exhibit.htmlPreview}
                    title={`${exhibit.title} ${device} preview`}
                    viewport={device}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-[#1e1e1e]">
              <CodeBlock code={exhibit.code} className="h-full border-0 rounded-none" />
            </div>
          )}
        </div>
      </div>

      {/* Attribution / Remix Chain */}
      {exhibit.parentExhibitId && (
        <div className="mb-8 p-4 bg-muted/30 rounded-lg border border-border">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Remixed From</div>
          <Link href={`/exhibit/${exhibit.parentExhibitId}`} className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
            <GitFork className="w-3.5 h-3.5" />View Original
          </Link>
        </div>
      )}

      {/* Remixes */}
      {remixes.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <GitFork className="w-5 h-5" />Remixes ({remixes.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {remixes.map(r => (
              <Link key={r.id} href={`/exhibit/${r.slug}`}>
                <div className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className="font-medium text-sm">{r.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{r.description?.slice(0, 80)}...</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {(exhibit.techStack || []).length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-muted-foreground uppercase tracking-wider">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {(exhibit.techStack || []).map(t => (
              <span key={t} className="px-3 py-1 bg-muted text-foreground text-xs font-medium rounded-md border border-border">{t}</span>
            ))}
          </div>
        </div>
      )}

      {/* Creator Info */}
      {exhibit.creatorId && (
        <div className="p-6 bg-card rounded-xl border border-border">
          <Link href={`/profile/${exhibit.creatorId}`}>
            <div className="flex items-center gap-4 cursor-pointer group" data-testid="link-creator-profile">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ background: `linear-gradient(135deg, ${creatorData?.profile?.themeAccent || '#6366f1'}, ${creatorData?.profile?.themeAccent || '#6366f1'}88)` }}
              >
                {creatorData?.user?.avatarUrl ? (
                  <img src={creatorData.user.avatarUrl} alt="" className="w-full h-full rounded-xl object-cover" />
                ) : (
                  creatorData?.user?.displayName?.charAt(0)?.toUpperCase() || <User className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {creatorData?.user?.displayName || "Creator"}
                  </span>
                  {creatorData?.user?.handle && (
                    <span className="text-xs text-muted-foreground">@{creatorData.user.handle}</span>
                  )}
                  {creatorData?.profile?.level && creatorData.profile.level > 1 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full border" style={{ borderColor: creatorData.profile.themeAccent, color: creatorData.profile.themeAccent }}>
                      Lv.{creatorData.profile.level}
                    </span>
                  )}
                </div>
                {creatorData?.profile?.headline && (
                  <div className="text-xs text-muted-foreground truncate">{creatorData.profile.headline}</div>
                )}
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-3">
                  <span>{creatorData?.exhibitCount || 0} exhibits</span>
                  <span>{creatorData?.followerCount || 0} followers</span>
                </div>
              </div>
              {creatorData?.profile?.signatureStampEnabled && creatorData?.profile?.signatureStampText && (
                <div className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[10px] font-mono tracking-wider opacity-60 shrink-0" style={{ borderColor: creatorData.profile.themeAccent, color: creatorData.profile.themeAccent }}>
                  <Sparkles className="w-2.5 h-2.5" />{creatorData.profile.signatureStampText}
                </div>
              )}
            </div>
          </Link>
        </div>
      )}
    </Layout>
  );
}
