/**
 * Avatar Group
 * Category: Data Display
 * Tags: avatar, group, stack, overflow, members, faces
 * Description: A stacked avatar row showing up to 5 visible member initials with an overflow "+N more" counter. Hovering an avatar reveals the member name in a tooltip. Three density sizes (sm, md, lg) are demonstrated side by side. The group also shows a total member count label.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/avatar-group.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";

const MEMBERS = [
  { initials: "AC", name: "Aria Chen", color: "bg-violet-100 text-violet-700" },
  { initials: "MW", name: "Marcus Webb", color: "bg-blue-100 text-blue-700" },
  { initials: "SY", name: "Selin Y.", color: "bg-emerald-100 text-emerald-700" },
  { initials: "JH", name: "Jonas H.", color: "bg-amber-100 text-amber-700" },
  { initials: "RK", name: "Riya K.", color: "bg-rose-100 text-rose-700" },
  { initials: "VC", name: "Viv C.", color: "bg-cyan-100 text-cyan-700" },
  { initials: "TM", name: "Teo M.", color: "bg-orange-100 text-orange-700" },
  { initials: "IV", name: "Ines V.", color: "bg-pink-100 text-pink-700" },
];

const SIZES = [
  { label: "sm", wh: "w-6 h-6", text: "text-[7px]", offset: "-ml-2", ring: "ring-1" },
  { label: "md", wh: "w-8 h-8", text: "text-[9px]", offset: "-ml-2.5", ring: "ring-2" },
  { label: "lg", wh: "w-10 h-10", text: "text-[10px]", offset: "-ml-3", ring: "ring-2" },
];

const MAX_VISIBLE = 5;

function AvatarRow({ size }: { size: typeof SIZES[0] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const visible = MEMBERS.slice(0, MAX_VISIBLE);
  const extra = MEMBERS.length - MAX_VISIBLE;

  return (
    <div className="flex items-center gap-3">
      <span className="text-[9px] text-neutral-400 font-mono w-4">{size.label}</span>
      <div className="flex items-center">
        {visible.map((m, i) => (
          <div
            key={m.initials}
            className={`relative ${i > 0 ? size.offset : ""}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className={`${size.wh} ${size.ring} ring-white rounded-full flex items-center justify-center font-bold cursor-default transition-transform hover:scale-110 hover:z-10 ${m.color} ${size.text}`}>
              {m.initials}
            </div>
            {hovered === i && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap bg-neutral-900 text-white text-[8px] px-2 py-0.5 rounded-md z-20 pointer-events-none">
                {m.name}
              </div>
            )}
          </div>
        ))}
        {extra > 0 && (
          <div className={`${size.offset} ${size.wh} ${size.ring} ring-white rounded-full flex items-center justify-center bg-neutral-100 text-neutral-600 font-semibold cursor-default ${size.text}`}>
            +{extra}
          </div>
        )}
      </div>
      <span className="text-[9px] text-neutral-400">{MEMBERS.length} members</span>
    </div>
  );
}

export default function AvatarGroup() {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-4">
      <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Avatar group sizes</div>
      {SIZES.map(s => <AvatarRow key={s.label} size={s} />)}
    </div>
  );
}
