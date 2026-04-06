/**
 * Icon + Label Buttons
 * Category: Buttons
 * Tags: icon, label, buttons, interactive, figma, linear
 * Description: Buttons that pair a small icon with a label. The icon provides instant recognition, the label confirms intent. Used everywhere in pro tools — Figma, Linear, GitHub, VS Code.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/icon-label-buttons.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { Plus, Download, Upload, Share2, Copy, Trash2, Edit2, Settings, Star, ArrowRight, RefreshCw } from "lucide-react";

export default function IconLabelButtons() {
  return (
    <div className="p-8 bg-white flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all">
          <Plus className="w-4 h-4" />New component
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 active:scale-95 transition-all">
          <Download className="w-4 h-4" />Export
        </button>
      </div>
    </div>
  );
}