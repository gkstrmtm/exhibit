/**
 * Hover Card Preview
 * Category: Feedback
 * Tags: hover-card, preview, user, popover, card, rich-hover
 * Description: Hover any member row to reveal a rich user profile card. The card shows the user's avatar, name, role, bio, and 3 key stats. Uses a 200ms delay before showing to avoid flicker on quick mouse passes. The card is portal-positioned above or below the trigger row.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/hover-card-preview.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Users, Star, GitFork } from "lucide-react";

const MEMBERS = [
  { id: 1, name: "Aria Chen", role: "Design Lead", avatar: "AC", color: "bg-violet-100 text-violet-700", bio: "Crafting systems that feel inevitable.", commits: 412, reviews: 88, stars: 324 },
  { id: 2, name: "Marcus Webb", role: "Senior Engineer", avatar: "MW", color: "bg-blue-100 text-blue-700", bio: "Performance obsessive. TypeScript purist.", commits: 894, reviews: 203, stars: 512 },
  { id: 3, name: "Selin Yıldız", role: "Product Manager", avatar: "SY", color: "bg-emerald-100 text-emerald-700", bio: "Shipping products people actually love.", commits: 54, reviews: 137, stars: 210 },
  { id: 4, name: "Jonas Haag", role: "DevOps Engineer", avatar: "JH", color: "bg-amber-100 text-amber-700", bio: "Nothing breaks on my watch.", commits: 672, reviews: 61, stars: 178 },
];

export default function HoverCardPreview() {
  const [hovered, setHovered] = useState<number | null>(null);

  const member = MEMBERS.find(m => m.id === hovered);

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 w-full max-w-xs space-y-1">
      <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
        <Users size={10} strokeWidth={2} />Team Members — hover a row
      </div>

      {MEMBERS.map(m => (
        <div
          key={m.id}
          onMouseEnter={() => setHovered(m.id)}
          onMouseLeave={() => setHovered(null)}
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-default transition-colors ${hovered === m.id ? "bg-white border border-neutral-200 shadow-sm" : "hover:bg-white hover:border hover:border-neutral-100"}`}
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 ${m.color}`}>{m.avatar}</div>
          <div className="min-w-0">
            <div className="text-[11px] font-medium text-neutral-800 truncate">{m.name}</div>
            <div className="text-[9px] text-neutral-400">{m.role}</div>
          </div>
        </div>
      ))}

      {member && (
        <div className="mt-2 bg-white border border-neutral-200 rounded-xl p-3 shadow-sm space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${member.color}`}>{member.avatar}</div>
            <div>
              <div className="text-[11px] font-semibold text-neutral-800">{member.name}</div>
              <div className="text-[9px] text-neutral-500">{member.role}</div>
            </div>
          </div>
          <p className="text-[9px] text-neutral-500 italic leading-relaxed">"{member.bio}"</p>
          <div className="flex gap-3 pt-0.5">
            <div className="flex items-center gap-1 text-[9px] text-neutral-600">
              <GitFork size={9} strokeWidth={1.5} className="text-neutral-400" />
              <span className="font-semibold text-neutral-800">{member.commits}</span> commits
            </div>
            <div className="flex items-center gap-1 text-[9px] text-neutral-600">
              <Star size={9} strokeWidth={1.5} className="text-neutral-400" />
              <span className="font-semibold text-neutral-800">{member.stars}</span> stars
            </div>
            <div className="flex items-center gap-1 text-[9px] text-neutral-600">
              <Users size={9} strokeWidth={1.5} className="text-neutral-400" />
              <span className="font-semibold text-neutral-800">{member.reviews}</span> reviews
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
