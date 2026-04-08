/**
 * Project Card
 * Category: Cards
 * Tags: project, card, tags, status, members, avatars
 * Description: A project card showing name, description, a row of tag chips, a member avatar stack with overflow count, and a status badge. Three project cards are displayed in a column representing different states: Active, In Review, and Planning.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/project-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { MoreHorizontal } from "lucide-react";

const PROJECTS = [
  {
    name: "Design System v3",
    desc: "Consolidating tokens, components, and documentation into a single source of truth.",
    tags: ["Figma", "Tokens", "React"],
    members: ["AC", "MW", "SY", "JH"],
    extra: 2,
    status: "Active",
    statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    name: "Checkout Revamp",
    desc: "Reducing drop-off by streamlining the 3-step flow into a single-page experience.",
    tags: ["UX", "A/B Test"],
    members: ["SY", "RK"],
    extra: 0,
    status: "In Review",
    statusColor: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    name: "Mobile App",
    desc: "iOS and Android client with feature parity to the web, plus offline-first sync.",
    tags: ["React Native", "Sync"],
    members: ["MW", "JH", "VC"],
    extra: 1,
    status: "Planning",
    statusColor: "bg-blue-50 text-blue-600 border-blue-100",
  },
];

const AVATAR_COLORS = ["bg-violet-100 text-violet-700", "bg-blue-100 text-blue-700", "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700", "bg-rose-100 text-rose-700"];

export default function ProjectCard() {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 w-full max-w-xs space-y-2.5">
      {PROJECTS.map((p, i) => (
        <div key={p.name} className="bg-white border border-neutral-200 rounded-xl p-3.5 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="text-[11px] font-semibold text-neutral-800">{p.name}</div>
            <button className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded hover:bg-neutral-100 transition-colors">
              <MoreHorizontal size={12} strokeWidth={1.5} className="text-neutral-400" />
            </button>
          </div>
          <p className="text-[9px] text-neutral-500 leading-relaxed">{p.desc}</p>

          <div className="flex flex-wrap gap-1">
            {p.tags.map(t => (
              <span key={t} className="px-1.5 py-0.5 text-[8px] font-medium bg-neutral-100 text-neutral-600 rounded-md">{t}</span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-1.5">
              {p.members.map((m, j) => (
                <div key={j} className={`w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold border border-white ${AVATAR_COLORS[j % AVATAR_COLORS.length]}`}>{m}</div>
              ))}
              {p.extra > 0 && (
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold border border-white bg-neutral-100 text-neutral-500">+{p.extra}</div>
              )}
            </div>
            <span className={`px-1.5 py-0.5 text-[8px] font-semibold border rounded-full ${p.statusColor}`}>{p.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
