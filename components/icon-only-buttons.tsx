/**
 * Icon-Only Buttons
 * Category: Buttons
 * Tags: icon, toolbar, compact, tooltip, action, table
 * Description: Pure icon buttons for toolbars, table row actions, and compact UI. Always include a tooltip for accessibility. Three styles: ghost, soft, and borderless — matched to density of the surrounding UI.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/icon-only-buttons.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { Copy, Trash2, Edit2, Star, Share2, MoreHorizontal } from "lucide-react";

export default function IconOnlyButtons() {
  return (
    <div className="p-8 bg-white flex flex-col gap-8">
      <div className="flex gap-2">
        {[Copy, Edit2, Star, Share2, Trash2].map((Icon, i) => (
          <button key={i} className="p-2 rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-800 hover:border-neutral-300 hover:bg-neutral-50 transition-all">
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
}