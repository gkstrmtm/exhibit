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
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />New component
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
          <Download className="w-4 h-4" />Export
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
          <Share2 className="w-4 h-4" />Share
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors">
          <Upload className="w-4 h-4" />Deploy
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
          <Copy className="w-4 h-4" />Duplicate
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
          <Trash2 className="w-4 h-4" />Delete
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
          <Edit2 className="w-4 h-4" />Edit
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          Get started<ArrowRight className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-amber-200 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />Starred
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <RefreshCw className="w-4 h-4" />Refresh
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
          <Settings className="w-4 h-4" />Settings
        </button>
      </div>
    </div>
  );
}