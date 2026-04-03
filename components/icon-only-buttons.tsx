/**
 * Icon-Only Buttons
 * Category: Buttons
 * Tags: icon, toolbar, compact, tooltip, action, table
 * Description: Pure icon buttons for toolbars, table row actions, and compact UI. Always include a tooltip for accessibility. Three styles: ghost, soft, and borderless — matched to density of the surrounding UI.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/icon-only-buttons.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { Copy, Trash2, Edit2, Star, Share2, MoreHorizontal, Heart, Bookmark, Download, ExternalLink, Settings } from "lucide-react";

export default function IconOnlyButtons() {
  return (
    <div className="p-8 bg-white flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Ghost (border)</div>
        <div className="flex gap-2">
          {[Copy, Edit2, Star, Share2, Trash2].map((Icon, i) => (
            <button key={i} className="p-2 rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-800 hover:border-neutral-300 hover:bg-neutral-50 transition-all">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Soft (tinted bg)</div>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"><Edit2 className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"><Star className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"><Heart className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"><Bookmark className="w-4 h-4" /></button>
          <button className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Borderless (inline)</div>
        <div className="flex gap-0">
          {[Download, ExternalLink, Copy, Settings, MoreHorizontal].map((Icon, i) => (
            <button key={i} className="p-2 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-all">
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Row actions — table context</div>
        <div className="border border-neutral-200 rounded-xl overflow-hidden">
          {["Alex Morrison", "Jamie Chen", "Sam Taylor"].map((name, i) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3 ${i < 2 ? "border-b border-neutral-100" : ""} hover:bg-neutral-50 transition-colors group`}>
              <div className="text-sm font-medium text-neutral-800">{name}</div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-md text-neutral-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-all"><MoreHorizontal className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}