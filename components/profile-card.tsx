/**
 * Profile Card
 * Category: Cards
 * Tags: profile, user, avatar, stats, follow, card
 * Description: A user profile card with an avatar, display name, username, role badge, and a 3-stat row (followers, following, projects). Primary "Follow" and secondary "Message" CTAs. Clicking Follow toggles to an "Unfollow" state with a checkmark.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/profile-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Check, MessageCircle, UserCheck, UserPlus } from "lucide-react";

export default function ProfileCard() {
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(2841);

  const toggleFollow = () => {
    setFollowing(f => !f);
    setFollowers(n => following ? n - 1 : n + 1);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 w-full max-w-xs">
      <div className="flex flex-col items-center text-center gap-2.5">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xl font-bold">
            AC
          </div>
          <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
        </div>

        <div>
          <div className="text-sm font-semibold text-neutral-800">Aria Chen</div>
          <div className="text-[10px] text-neutral-400">@aria.chen</div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 text-[9px] font-semibold border border-violet-100">
          Design Lead
        </span>

        <p className="text-[10px] text-neutral-500 leading-relaxed max-w-[200px]">
          Designing systems at the intersection of clarity and craft.
        </p>

        {/* Stats */}
        <div className="w-full flex divide-x divide-neutral-100 border border-neutral-100 rounded-lg overflow-hidden">
          {[["2.8k", "Followers"], ["312", "Following"], ["47", "Projects"]].map(([val, label]) => (
            <div key={label} className="flex-1 py-2 text-center">
              <div className="text-xs font-semibold text-neutral-800">{val}</div>
              <div className="text-[8px] text-neutral-400">{label}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 w-full">
          <button
            onClick={toggleFollow}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${following ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200" : "bg-neutral-900 text-white hover:bg-neutral-700"}`}
          >
            {following ? <><UserCheck size={11} strokeWidth={1.5} />Following</> : <><UserPlus size={11} strokeWidth={1.5} />Follow</>}
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-medium border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors">
            <MessageCircle size={11} strokeWidth={1.5} />Message
          </button>
        </div>
      </div>
    </div>
  );
}
