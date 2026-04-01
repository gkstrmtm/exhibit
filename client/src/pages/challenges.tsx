import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { Trophy, Clock, Users, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Challenge } from "@shared/schema";

export default function ChallengesPage() {
  const { user } = useAuth();

  const { data: challenges = [], isLoading } = useQuery<Challenge[]>({
    queryKey: ["/api/challenges"],
    queryFn: async () => {
      const res = await fetch("/api/challenges");
      return res.json();
    },
  });

  const statusColors: Record<string, string> = {
    active: "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border-emerald-200 dark:border-emerald-800",
    upcoming: "bg-blue-50 dark:bg-blue-950 text-blue-600 border-blue-200 dark:border-blue-800",
    voting: "bg-amber-50 dark:bg-amber-950 text-amber-600 border-amber-200 dark:border-amber-800",
    completed: "bg-neutral-100 dark:bg-neutral-900 text-neutral-500 border-neutral-200 dark:border-neutral-800",
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 data-testid="text-challenges-title" className="text-3xl font-display font-bold tracking-tight mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-500" />
            Challenges
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Weekly design challenges. Build, compete, and prove your skills. Win badges and climb the leaderboard.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {!isLoading && challenges.length === 0 && (
        <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
          <h3 className="text-lg font-semibold mb-2">No challenges yet</h3>
          <p className="text-muted-foreground text-sm mb-6">Check back soon for new weekly challenges.</p>
          {user?.role === "admin" && (
            <Link href="/admin">
              <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg">
                Create Challenge (Admin)
              </button>
            </Link>
          )}
        </div>
      )}

      <div className="grid gap-6">
        {challenges.map((challenge) => (
          <Link key={challenge.id} href={`/challenges/${challenge.id}`}>
            <div className="p-6 border border-border rounded-xl bg-card hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn("px-2.5 py-0.5 text-xs font-medium rounded-full border", statusColors[challenge.status] || statusColors.upcoming)}>
                      {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{challenge.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{challenge.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Ends {new Date(challenge.endAt).toLocaleDateString()}</span>
                    {challenge.prizeDescription && <span className="flex items-center gap-1"><Trophy className="w-3 h-3" />{challenge.prizeDescription}</span>}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
