/**
 * Badge Overflow
 * Category: Data Display
 * Tags: badge, overflow, tags, list, compact, more
 * Description: Displays a list of tag badges where excess items beyond a max-visible threshold collapse into a "+N more" overflow badge. Clicking the overflow badge expands to show all tags. Three examples show different tag sets at different overflow points.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/badge-overflow.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";

const COLORS = [
  "bg-violet-50 text-violet-600 border-violet-100",
  "bg-blue-50 text-blue-600 border-blue-100",
  "bg-emerald-50 text-emerald-600 border-emerald-100",
  "bg-amber-50 text-amber-600 border-amber-100",
  "bg-rose-50 text-rose-600 border-rose-100",
  "bg-cyan-50 text-cyan-600 border-cyan-100",
  "bg-orange-50 text-orange-600 border-orange-100",
];

const ROWS = [
  {
    label: "Project Alpha",
    tags: ["React", "TypeScript", "Tailwind", "Vite", "Storybook", "Testing"],
    max: 3,
  },
  {
    label: "Team skills",
    tags: ["Figma", "Design Systems", "Prototyping", "Research", "Accessibility", "Animation", "Motion"],
    max: 4,
  },
  {
    label: "Tech stack",
    tags: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS", "Terraform", "CI/CD", "Kubernetes"],
    max: 3,
  },
];

function BadgeRow({ label, tags, max }: typeof ROWS[0]) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? tags : tags.slice(0, max);
  const extra = tags.length - max;

  return (
    <div className="space-y-1">
      <div className="text-[9px] text-neutral-500">{label}</div>
      <div className="flex flex-wrap gap-1">
        {visible.map((tag, i) => (
          <span key={tag} className={`px-1.5 py-0.5 text-[8px] font-medium border rounded-full ${COLORS[i % COLORS.length]}`}>{tag}</span>
        ))}
        {!expanded && extra > 0 && (
          <button
            onClick={() => setExpanded(true)}
            className="px-1.5 py-0.5 text-[8px] font-medium border rounded-full bg-neutral-100 text-neutral-500 border-neutral-200 hover:bg-neutral-200 transition-colors"
          >
            +{extra} more
          </button>
        )}
        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="px-1.5 py-0.5 text-[8px] font-medium border rounded-full bg-neutral-100 text-neutral-500 border-neutral-200 hover:bg-neutral-200 transition-colors"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
}

export default function BadgeOverflow() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 w-full max-w-xs space-y-3.5">
      {ROWS.map(row => <BadgeRow key={row.label} {...row} />)}
    </div>
  );
}
