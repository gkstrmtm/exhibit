import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import Layout from "@/components/layout";
import { useAuth } from "@/lib/auth";
import { ArrowLeft, Save, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT_COLORS = [
  "#2563eb", "#7c3aed", "#db2777", "#dc2626", "#ea580c",
  "#16a34a", "#0d9488", "#0284c7", "#4f46e5", "#1d4ed8",
];

export default function ProfileSettingsPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: profileData } = useQuery({
    queryKey: ["/api/profiles", user?.id],
    queryFn: async () => {
      const res = await fetch(`/api/profiles/${user!.id}`);
      return res.json();
    },
    enabled: !!user,
  });

  const [form, setForm] = useState({
    displayName: "",
    handle: "",
    headline: "",
    bio: "",
    website: "",
    location: "",
    timezone: "",
    themeAccent: "#2563eb",
    showcaseLayout: "grid" as "grid" | "curated",
    signatureStampText: "",
    signatureStampEnabled: false,
    availabilityStatus: "none" as string,
    skillTags: [] as string[],
    stackTags: [] as string[],
    coverPhotoUrl: "",
    hireAvailable: false,
  });
  const [newSkill, setNewSkill] = useState("");
  const [newStack, setNewStack] = useState("");

  useEffect(() => {
    if (profileData) {
      const { user: u, profile: p } = profileData;
      setForm({
        displayName: u.displayName || "",
        handle: u.handle || "",
        headline: p?.headline || "",
        bio: p?.bio || "",
        website: p?.website || "",
        location: p?.location || "",
        timezone: p?.timezone || "",
        themeAccent: p?.themeAccent || "#2563eb",
        showcaseLayout: p?.showcaseLayout || "grid",
        signatureStampText: p?.signatureStampText || "",
        signatureStampEnabled: p?.signatureStampEnabled || false,
        availabilityStatus: p?.availabilityStatus || "none",
        skillTags: p?.skillTags || [],
        stackTags: p?.stackTags || [],
        coverPhotoUrl: p?.coverPhotoUrl || "",
        hireAvailable: p?.hireAvailable || false,
      });
    }
  }, [profileData]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/profiles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profiles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      setLocation(`/profile/${user!.id}`);
    },
  });

  const addTag = (type: "skillTags" | "stackTags", value: string) => {
    if (!value.trim()) return;
    const arr = form[type];
    if (arr.length >= 10 || arr.includes(value.trim())) return;
    setForm({ ...form, [type]: [...arr, value.trim()] });
    if (type === "skillTags") setNewSkill("");
    else setNewStack("");
  };

  const removeTag = (type: "skillTags" | "stackTags", value: string) => {
    setForm({ ...form, [type]: form[type].filter(t => t !== value) });
  };

  if (!user) {
    return <Layout><div className="text-center py-20">Please sign in to edit your profile.</div></Layout>;
  }

  return (
    <Layout>
      <Link href={`/profile/${user.id}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />Back to profile
      </Link>

      <h1 className="text-2xl font-display font-bold tracking-tight mb-8">Edit Profile</h1>

      <div className="max-w-2xl space-y-8">
        {/* Identity */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Identity</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Display Name</label>
              <input data-testid="input-settings-displayname" type="text" value={form.displayName} onChange={e => setForm({ ...form, displayName: e.target.value })} className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Handle</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                <input data-testid="input-settings-handle" type="text" value={form.handle} onChange={e => setForm({ ...form, handle: e.target.value.replace(/[^a-zA-Z0-9_-]/g, "") })} className="w-full pl-8 pr-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Headline</label>
              <input type="text" value={form.headline} onChange={e => setForm({ ...form, headline: e.target.value })} placeholder="UI Engineer building accessible components" className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Bio</label>
              <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={4} className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            </div>
          </div>
        </section>

        {/* Links & Location */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Links & Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Website</label>
              <input type="url" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://" className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Location</label>
              <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="City, Country" className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Timezone</label>
              <input type="text" value={form.timezone} onChange={e => setForm({ ...form, timezone: e.target.value })} placeholder="UTC+0" className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Cover Photo URL</label>
              <input type="url" value={form.coverPhotoUrl} onChange={e => setForm({ ...form, coverPhotoUrl: e.target.value })} placeholder="https://..." className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
        </section>

        {/* Skills & Stack */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Skills & Stack</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Skills ({form.skillTags.length}/10)</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {form.skillTags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag("skillTags", tag)} className="hover:text-destructive">&times;</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag("skillTags", newSkill))} placeholder="Add skill..." className="flex-1 px-3 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <button onClick={() => addTag("skillTags", newSkill)} className="px-3 py-2 text-sm bg-muted rounded-lg hover:bg-muted/80">Add</button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Tech Stack ({form.stackTags.length}/10)</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {form.stackTags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-muted text-foreground text-xs rounded-full font-mono flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag("stackTags", tag)} className="hover:text-destructive">&times;</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={newStack} onChange={e => setNewStack(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag("stackTags", newStack))} placeholder="Add framework/tool..." className="flex-1 px-3 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <button onClick={() => addTag("stackTags", newStack)} className="px-3 py-2 text-sm bg-muted rounded-lg hover:bg-muted/80">Add</button>
              </div>
            </div>
          </div>
        </section>

        {/* Availability */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Availability</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "none", label: "Not Available" },
              { value: "open_to_work", label: "Open to Work" },
              { value: "freelance", label: "Freelance" },
              { value: "collab", label: "Open to Collaborate" },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setForm({ ...form, availabilityStatus: opt.value, hireAvailable: opt.value !== "none" })}
                className={cn("px-4 py-3 rounded-lg text-sm font-medium border transition-all", form.availabilityStatus === opt.value ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/30")}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* Appearance */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Appearance</h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-3 block">Accent Color</label>
              <div className="flex gap-3 flex-wrap">
                {ACCENT_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setForm({ ...form, themeAccent: color })}
                    className={cn("w-8 h-8 rounded-lg transition-all", form.themeAccent === color ? "ring-2 ring-offset-2 ring-foreground scale-110" : "hover:scale-105")}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-3 block">Showcase Layout</label>
              <div className="flex gap-3">
                {(["grid", "curated"] as const).map(layout => (
                  <button
                    key={layout}
                    onClick={() => setForm({ ...form, showcaseLayout: layout })}
                    className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all capitalize", form.showcaseLayout === layout ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/30")}
                  >
                    {layout}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Signature Stamp */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Signature Stamp</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Stamp Text</label>
              <input type="text" value={form.signatureStampText} onChange={e => setForm({ ...form, signatureStampText: e.target.value.slice(0, 40) })} placeholder="e.g., crafted by @yourname" className="w-full px-3 py-2.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.signatureStampEnabled} onChange={e => setForm({ ...form, signatureStampEnabled: e.target.checked })} className="w-4 h-4 rounded border-border" />
              <span className="text-sm">Show signature stamp on my exhibits</span>
            </label>
            {form.signatureStampText && (
              <div className="p-4 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs font-mono tracking-wider opacity-70" style={{ borderColor: form.themeAccent, color: form.themeAccent }}>
                  <Sparkles className="w-3 h-3" />{form.signatureStampText}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Save */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          {saveMutation.error && (
            <div className="text-sm text-destructive">{(saveMutation.error as Error).message}</div>
          )}
          <div className="flex-1" />
          <button
            data-testid="button-save-profile"
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </div>
    </Layout>
  );
}
