import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import Layout from "@/components/layout";
import { useAuth } from "@/lib/auth";
import { ComponentPreview } from "@/components/ui/component-preview";
import {
  MapPin, Globe, Calendar, Users, Code2, Heart, Loader2, UserPlus, UserMinus,
  Mail, Star, Trophy, ShoppingBag, GitFork, Shield, Sparkles, Package,
  Settings, Check, BarChart3, MessageSquare, Pin, ExternalLink, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Exhibit, CreatorProfile, Challenge, Pack, Testimonial } from "@shared/schema";

type ProfileTab = "showcase" | "exhibits" | "packs" | "challenges" | "reputation" | "testimonials";

function ProfileStrengthMeter({ strength, nextActions }: { strength: number; nextActions: string[] }) {
  return (
    <div className="p-4 bg-card rounded-xl border border-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold">Profile Strength</span>
        <span className="text-sm font-bold tabular-nums">{strength}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${strength}%`,
            background: strength >= 80 ? '#22c55e' : strength >= 50 ? '#eab308' : '#ef4444'
          }}
        />
      </div>
      {nextActions.length > 0 && (
        <div className="space-y-1.5">
          <div className="text-xs text-muted-foreground font-medium">Next steps to improve:</div>
          {nextActions.slice(0, 3).map(action => (
            <div key={action} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1 h-1 bg-primary rounded-full" />
              {action}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SignatureStamp({ text, accent }: { text: string; accent: string }) {
  if (!text) return null;
  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs font-mono tracking-wider opacity-70"
      style={{ borderColor: accent, color: accent }}
    >
      <Sparkles className="w-3 h-3" />
      {text}
    </div>
  );
}

function ReputationCard({ level, title, score, breakdown }: {
  level: number; title: string; score: number;
  breakdown: { signalType: string; total: number; count: number }[];
}) {
  const signalLabels: Record<string, { label: string; icon: React.ReactNode }> = {
    quality_check: { label: "Quality Checks", icon: <Check className="w-3.5 h-3.5 text-emerald-500" /> },
    save: { label: "Saves Received", icon: <Heart className="w-3.5 h-3.5 text-red-500" /> },
    remix_adoption: { label: "Remix Adoptions", icon: <GitFork className="w-3.5 h-3.5 text-blue-500" /> },
    challenge_placement: { label: "Challenge Placements", icon: <Trophy className="w-3.5 h-3.5 text-amber-500" /> },
    verified: { label: "Verified Status", icon: <Shield className="w-3.5 h-3.5 text-emerald-500" /> },
    exhibit_published: { label: "Exhibits Published", icon: <Code2 className="w-3.5 h-3.5 text-purple-500" /> },
    vote_received: { label: "Votes Received", icon: <Star className="w-3.5 h-3.5 text-amber-500" /> },
    founder_interest: { label: "Founder Interest", icon: <Users className="w-3.5 h-3.5 text-blue-500" /> },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          {level}
        </div>
        <div>
          <div className="text-xl font-bold">{title}</div>
          <div className="text-muted-foreground text-sm">Level {level} &middot; {score.toFixed(1)} reputation points</div>
        </div>
      </div>

      {breakdown.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {breakdown.map(signal => {
            const info = signalLabels[signal.signalType] || { label: signal.signalType, icon: <BarChart3 className="w-3.5 h-3.5" /> };
            return (
              <div key={signal.signalType} className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-1">
                  {info.icon}
                  <span className="text-xs font-medium">{info.label}</span>
                </div>
                <div className="text-lg font-bold tabular-nums">{signal.total.toFixed(0)}</div>
                <div className="text-xs text-muted-foreground">{signal.count} events</div>
              </div>
            );
          })}
        </div>
      )}

      {breakdown.length === 0 && (
        <div className="text-center py-8 bg-muted/20 rounded-lg border border-dashed border-border">
          <BarChart3 className="w-8 h-8 mx-auto mb-3 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No reputation signals yet. Start by publishing exhibits and entering challenges.</p>
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const [, params] = useRoute("/profile/:userId");
  const userId = params?.userId ? parseInt(params.userId) : 0;
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isOwnProfile = user?.id === userId;
  const [activeTab, setActiveTab] = useState<ProfileTab>("showcase");

  const { data, isLoading } = useQuery<any>({
    queryKey: ["/api/profiles", userId],
    queryFn: async () => {
      const res = await fetch(`/api/profiles/${userId}`);
      if (!res.ok) throw new Error("Profile not found");
      return res.json();
    },
    enabled: userId > 0,
  });

  const { data: followStatus } = useQuery({
    queryKey: ["/api/follow", userId, "status"],
    queryFn: async () => {
      const res = await fetch(`/api/follow/${userId}/status`);
      return res.json();
    },
    enabled: !!user && !isOwnProfile && userId > 0,
  });

  const { data: strengthData } = useQuery({
    queryKey: ["/api/profiles", userId, "strength"],
    queryFn: async () => {
      const res = await fetch(`/api/profiles/${userId}/strength`);
      return res.json();
    },
    enabled: isOwnProfile && userId > 0,
  });

  const followMutation = useMutation({
    mutationFn: async () => {
      if (followStatus?.following) {
        await fetch(`/api/follow/${userId}`, { method: "DELETE" });
      } else {
        await fetch(`/api/follow/${userId}`, { method: "POST" });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/follow", userId, "status"] });
      queryClient.invalidateQueries({ queryKey: ["/api/profiles", userId] });
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="text-center py-20">
          <div className="text-4xl mb-4">404</div>
          <div className="text-foreground font-medium">Profile not found</div>
        </div>
      </Layout>
    );
  }

  const { user: profileUser, profile, exhibits, pinnedExhibits, packs, challengeHistory, testimonials: profileTestimonials, reputationBreakdown, remixHighlights, exhibitCount, followerCount, followingCount } = data;
  const initials = profileUser.displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
  const accent = profile?.themeAccent || "#2563eb";

  const availabilityLabels: Record<string, string> = {
    open_to_work: "Open to Work",
    freelance: "Freelance Available",
    collab: "Open to Collaborate",
  };

  const tabs: { id: ProfileTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "showcase", label: "Showcase", icon: <Pin className="w-4 h-4" /> },
    { id: "exhibits", label: "Exhibits", icon: <Code2 className="w-4 h-4" />, count: exhibitCount },
    { id: "packs", label: "Packs", icon: <Package className="w-4 h-4" />, count: packs?.length },
    { id: "challenges", label: "Challenges", icon: <Trophy className="w-4 h-4" />, count: challengeHistory?.length },
    { id: "reputation", label: "Reputation", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "testimonials", label: "Endorsements", icon: <MessageSquare className="w-4 h-4" />, count: profileTestimonials?.length },
  ];

  return (
    <Layout>
      {/* Cover Photo */}
      {profile?.coverPhotoUrl && (
        <div className="relative -mx-6 md:-mx-12 -mt-6 md:-mt-12 mb-6 h-48 md:h-64 overflow-hidden">
          <img src={profile.coverPhotoUrl} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8 pb-8 border-b border-border">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shrink-0"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)` }}
        >
          {profileUser.avatarUrl ? (
            <img src={profileUser.avatarUrl} alt="" className="w-full h-full rounded-2xl object-cover" />
          ) : initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h1 data-testid="text-profile-name" className="text-2xl font-display font-bold tracking-tight">{profileUser.displayName}</h1>
            {profileUser.handle && (
              <span className="text-muted-foreground text-sm">@{profileUser.handle}</span>
            )}
            {profile?.availabilityStatus && profile.availabilityStatus !== "none" && (
              <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 text-xs font-medium rounded-full">
                {availabilityLabels[profile.availabilityStatus] || profile.availabilityStatus}
              </span>
            )}
            {profile?.level && profile.level > 1 && (
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border" style={{ borderColor: accent, color: accent }}>
                Lv.{profile.level} {profile.title}
              </span>
            )}
          </div>
          {profile?.headline && <p className="text-muted-foreground mb-2">{profile.headline}</p>}
          {profile?.bio && <p className="text-sm text-muted-foreground mb-3 max-w-2xl">{profile.bio}</p>}

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
            {profile?.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{profile.location}</span>}
            {profile?.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                <Globe className="w-3 h-3" />{new URL(profile.website).hostname}
              </a>
            )}
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Joined {new Date(profileUser.createdAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><Code2 className="w-3 h-3" />{exhibitCount} exhibits</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-foreground"><Users className="w-3 h-3" />{followerCount} followers</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-foreground">{followingCount} following</span>
          </div>

          {/* Skill + Stack Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {(profile?.skillTags || []).map((tag: string) => (
              <span key={tag} className="px-2.5 py-0.5 bg-muted text-foreground text-xs rounded-full font-medium">{tag}</span>
            ))}
            {(profile?.stackTags || []).map((tag: string) => (
              <span key={tag} className="px-2 py-0.5 text-xs rounded-full font-mono border border-border text-muted-foreground">{tag}</span>
            ))}
          </div>

          {/* Signature Stamp */}
          {profile?.signatureStampEnabled && profile?.signatureStampText && (
            <SignatureStamp text={profile.signatureStampText} accent={accent} />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-start gap-2 shrink-0">
          {isOwnProfile && (
            <Link href="/settings/profile">
              <button data-testid="button-edit-profile" className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-muted transition-all">
                <Settings className="w-4 h-4" />Edit Profile
              </button>
            </Link>
          )}
          {user && !isOwnProfile && (
            <>
              <button
                data-testid="button-follow"
                onClick={() => followMutation.mutate()}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border transition-all",
                  followStatus?.following ? "bg-muted border-border" : "text-white border-transparent"
                )}
                style={!followStatus?.following ? { backgroundColor: accent } : undefined}
              >
                {followStatus?.following ? <><UserMinus className="w-4 h-4" />Following</> : <><UserPlus className="w-4 h-4" />Follow</>}
              </button>
              <Link href={`/scout?to=${userId}`}>
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-muted transition-all">
                  <Mail className="w-4 h-4" />Contact
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Profile Strength (own profile only) */}
      {isOwnProfile && strengthData && (
        <div className="mb-8">
          <ProfileStrengthMeter strength={strengthData.strength} nextActions={strengthData.nextActions} />
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-8 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            data-testid={`button-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all",
              activeTab === tab.id ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className={cn("text-xs tabular-nums ml-1", activeTab === tab.id ? "opacity-70" : "text-muted-foreground")}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "showcase" && (
        <div className="space-y-8">
          {/* Pinned Exhibits */}
          {pinnedExhibits?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Pin className="w-5 h-5" />Pinned</h3>
              <div className={cn("gap-6", profile?.showcaseLayout === "curated" ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2")}>
                {pinnedExhibits.map((item: Exhibit) => (
                  <Link key={item.id} href={`/exhibit/${item.slug}`}>
                    <div className="p-4 border border-border rounded-xl hover:shadow-md transition-all cursor-pointer bg-card">
                      <div className="font-semibold mb-1">{item.title}</div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{item.category}</span>
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{item.saveCount}</span>
                        <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{item.remixCount}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Remix Highlights */}
          {remixHighlights?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><GitFork className="w-5 h-5" />Most Remixed</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {remixHighlights.map((item: Exhibit) => (
                  <Link key={item.id} href={`/exhibit/${item.slug}`}>
                    <div className="p-4 border border-border rounded-xl hover:shadow-md transition-all cursor-pointer bg-card">
                      <div className="font-semibold mb-1">{item.title}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <GitFork className="w-3 h-3" />{item.remixCount} remixes
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Featured Exhibits */}
          {exhibits?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Recent Work</h3>
              <div className="grid grid-cols-1 gap-6">
                {exhibits.slice(0, 3).map((item: Exhibit) => (
                  <Link key={item.id} href={`/exhibit/${item.slug}`}>
                    <ComponentPreview
                      title={item.title}
                      category={item.category}
                      description={item.description}
                      code={item.code}
                      htmlPreview={item.htmlPreview}
                      tags={item.tags || []}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {(!exhibits?.length && !pinnedExhibits?.length) && (
            <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-border">
              <Code2 className="w-8 h-8 mx-auto mb-3 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">No exhibits published yet.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "exhibits" && (
        <div>
          {exhibits?.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-border">
              <Code2 className="w-8 h-8 mx-auto mb-3 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">No exhibits published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {exhibits.map((item: Exhibit) => (
                <Link key={item.id} href={`/exhibit/${item.slug}`}>
                  <ComponentPreview
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    code={item.code}
                    htmlPreview={item.htmlPreview}
                    tags={item.tags || []}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "packs" && (
        <div>
          {!packs?.length ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-border">
              <Package className="w-8 h-8 mx-auto mb-3 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">No packs published yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {packs.map((pack: Pack) => (
                <Link key={pack.id} href={`/marketplace/${pack.slug}`}>
                  <div className="border border-border rounded-xl bg-card overflow-hidden hover:shadow-md transition-all cursor-pointer">
                    <div className="h-32 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950 dark:to-blue-950 flex items-center justify-center">
                      <Package className="w-10 h-10 text-muted-foreground/30" />
                    </div>
                    <div className="p-4">
                      <div className="font-semibold mb-1">{pack.title}</div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{pack.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "challenges" && (
        <div>
          {!challengeHistory?.length ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-border">
              <Trophy className="w-8 h-8 mx-auto mb-3 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">No challenge entries yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {challengeHistory.map((entry: any) => (
                <div key={entry.id} className="p-4 border border-border rounded-xl bg-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{entry.challenge.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{entry.challenge.description?.slice(0, 100)}</div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      {entry.rank && (
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Trophy className="w-4 h-4" />#{entry.rank}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground mt-1">Score: {entry.score.toFixed(1)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "reputation" && (
        <ReputationCard
          level={profile?.level || 1}
          title={profile?.title || "Newcomer"}
          score={profile?.reputationScore || 0}
          breakdown={reputationBreakdown || []}
        />
      )}

      {activeTab === "testimonials" && (
        <div>
          {!profileTestimonials?.length ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-border">
              <MessageSquare className="w-8 h-8 mx-auto mb-3 text-muted-foreground/40" />
              <p className="text-muted-foreground text-sm">No endorsements yet.</p>
              {user && !isOwnProfile && (
                <button className="mt-4 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg">
                  Write Endorsement
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {profileTestimonials.map((t: any) => (
                <div key={t.id} className="p-5 border border-border rounded-xl bg-card">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {t.author.displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Link href={`/profile/${t.author.id}`}>
                          <span className="font-medium text-sm hover:text-primary cursor-pointer">{t.author.displayName}</span>
                        </Link>
                        <div className="flex">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{t.content}</p>
                      <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{new Date(t.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
