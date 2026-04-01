import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import Layout from "@/components/layout";
import { CodeBlock } from "@/components/ui/code-block";
import { useAuth } from "@/lib/auth";
import { Eye, Code2, Monitor, Tablet, Smartphone, Heart, GitFork, ArrowLeft, Flag, Share2, Loader2, ExternalLink, Clock, Tag, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Exhibit } from "@shared/schema";

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
    if (previewRef.current && exhibit && activeTab === "preview") {
      previewRef.current.innerHTML = exhibit.htmlPreview;
    }
  }, [exhibit, activeTab]);

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
          <Link href="/browse" className="text-primary text-sm hover:underline">Back to library</Link>
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

  return (
    <Layout>
      {/* Back Link */}
      <Link href="/browse" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to library
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
                <div ref={previewRef} className="w-full overflow-auto" />
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
