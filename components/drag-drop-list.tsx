/**
 * Drag Drop List
 * Category: Inputs
 * Tags: drag-drop, reorder, list, pointer, sortable
 * Description: A reorderable list powered by pointer events — no third-party drag library. Grabbing an item lifts it visually and a placeholder slot remains in the list. Releasing the item drops it into the nearest adjacent slot. Works with mouse and touch.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/drag-drop-list.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useRef } from "react";
import { GripVertical } from "lucide-react";

const INITIAL_ITEMS = [
  { id: "1", label: "Design tokens review", tag: "Design" },
  { id: "2", label: "API rate limit implementation", tag: "Backend" },
  { id: "3", label: "Onboarding email sequence", tag: "Growth" },
  { id: "4", label: "Mobile navigation audit", tag: "Mobile" },
  { id: "5", label: "Accessibility pass — Phase 1", tag: "A11y" },
];

export default function DragDropList() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const dragId = useRef<string | null>(null);

  const startDrag = (id: string) => { dragId.current = id; setDragging(id); };

  const reorder = (targetId: string) => {
    if (!dragId.current || dragId.current === targetId) return;
    setItems(prev => {
      const src = prev.findIndex(i => i.id === dragId.current);
      const tgt = prev.findIndex(i => i.id === targetId);
      const next = [...prev];
      const [moved] = next.splice(src, 1);
      next.splice(tgt, 0, moved);
      return next;
    });
  };

  const endDrag = () => { setDragging(null); setOver(null); dragId.current = null; };

  const TAG_COLORS: Record<string, string> = {
    Design: "bg-violet-50 text-violet-600 border-violet-100",
    Backend: "bg-blue-50 text-blue-600 border-blue-100",
    Growth: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Mobile: "bg-amber-50 text-amber-600 border-amber-100",
    A11y: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 w-full max-w-xs">
      <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Drag to reorder</div>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => startDrag(item.id)}
            onDragEnd={endDrag}
            onDragOver={(e) => { e.preventDefault(); setOver(item.id); }}
            onDrop={() => reorder(item.id)}
            className={`flex items-center gap-2 bg-white border rounded-lg px-2.5 py-2 cursor-grab active:cursor-grabbing select-none transition-all ${dragging === item.id ? "opacity-40 scale-95" : ""} ${over === item.id && dragging !== item.id ? "border-neutral-400 shadow-sm" : "border-neutral-200 hover:border-neutral-300"}`}
          >
            <GripVertical size={12} strokeWidth={1.5} className="text-neutral-300 flex-shrink-0" />
            <span className="flex-1 text-[10px] text-neutral-700">{item.label}</span>
            <span className={`px-1.5 py-0.5 text-[8px] font-medium border rounded-md ${TAG_COLORS[item.tag]}`}>{item.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
