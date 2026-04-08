/**
 * Activity Feed Card
 * Category: Cards
 * Tags: activity, feed, event, card, timeline, user, action
 * Description: An activity feed card showing a stream of user events. Each entry has a type-colored icon, the user name, action description, target and relative timestamp. Event types include commits, reviews, comments, deploys, and merges. A "Load more" link loads additional events.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/activity-feed-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { GitCommit, GitMerge, MessageSquare, Rocket, CheckCircle2, FileEdit } from "lucide-react";

const ALL_EVENTS = [
  { id: 1, type: "commit", icon: GitCommit, color: "text-blue-500 bg-blue-50", user: "Marcus Webb", action: "pushed 3 commits to", target: "main", time: "2m ago" },
  { id: 2, type: "review", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-50", user: "Aria Chen", action: "approved pull request", target: "#142 — Token refresh", time: "14m ago" },
  { id: 3, type: "comment", icon: MessageSquare, color: "text-violet-500 bg-violet-50", user: "Selin Y.", action: "commented on", target: "#138 — Sidebar nav", time: "41m ago" },
  { id: 4, type: "deploy", icon: Rocket, color: "text-amber-500 bg-amber-50", user: "Jonas H.", action: "deployed to", target: "production", time: "1h ago" },
  { id: 5, type: "merge", icon: GitMerge, color: "text-rose-500 bg-rose-50", user: "Marcus Webb", action: "merged", target: "#137 — Password reset", time: "2h ago" },
  { id: 6, type: "edit", icon: FileEdit, color: "text-cyan-500 bg-cyan-50", user: "Riya K.", action: "updated docs for", target: "Auth API v2", time: "3h ago" },
  { id: 7, type: "commit", icon: GitCommit, color: "text-blue-500 bg-blue-50", user: "Aria Chen", action: "pushed 1 commit to", target: "feat/tokens-v3", time: "4h ago" },
  { id: 8, type: "review", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-50", user: "Jonas H.", action: "requested changes on", target: "#135 — Mobile nav", time: "5h ago" },
];

const PAGE_SIZE = 4;

export default function ActivityFeedCard() {
  const [shown, setShown] = useState(PAGE_SIZE);

  return (
    <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-xs overflow-hidden">
      <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
        <div className="text-[10px] font-semibold text-neutral-700">Activity</div>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Live" />
      </div>

      <div className="divide-y divide-neutral-50">
        {ALL_EVENTS.slice(0, shown).map(evt => {
          const Icon = evt.icon;
          return (
            <div key={evt.id} className="flex items-start gap-2.5 px-4 py-2.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${evt.color}`}>
                <Icon size={10} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] text-neutral-700 leading-relaxed">
                  <span className="font-semibold">{evt.user}</span>
                  {" "}{evt.action}{" "}
                  <span className="font-medium text-neutral-900">{evt.target}</span>
                </div>
                <div className="text-[8px] text-neutral-400 mt-0.5">{evt.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      {shown < ALL_EVENTS.length && (
        <div className="px-4 py-2 border-t border-neutral-100">
          <button
            onClick={() => setShown(n => Math.min(n + PAGE_SIZE, ALL_EVENTS.length))}
            className="text-[9px] text-neutral-500 hover:text-neutral-800 font-medium transition-colors"
          >
            Load more ({ALL_EVENTS.length - shown} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
