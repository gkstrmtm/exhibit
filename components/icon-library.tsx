/**
 * Icon System
 * Category: Foundations
 * Tags: icons, lucide, icon-family, icon-system, subcategories, stroke-weight, sizing, usage-rules
 * Description: Icon system reference covering icon families, subcategory groupings, stroke weight variants, size-in-context rules, and mixing anti-patterns. Demonstrates why you pick one family and stay in it.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/icon-library.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import {
  Home, Search, Settings, Bell, ArrowLeft, ChevronRight, Menu, ExternalLink,
  Pencil, Trash2, Copy, Download, Share2, Plus, Check, X, RefreshCw, Upload,
  AlertTriangle, AlertCircle, Info, CheckCircle, Loader2, Clock, Lock, ShieldCheck,
  Mail, MessageCircle, MessageSquare, Phone, AtSign, Send, Video, Mic,
  BarChart2, Table2, Filter, ArrowUpDown, Database, FileText, Folder, Layers,
  User, Users, UserPlus, Building2, Star, Heart, Bookmark, Award,
} from "lucide-react";

const STROKE_WEIGHTS = [
  { label: "Thin",    sw: 1,   note: "Light surfaces, whitespace-heavy" },
  { label: "Regular", sw: 1.5, note: "Default — Lucide baseline", current: true },
  { label: "Medium",  sw: 2,   note: "Standard product UI" },
  { label: "Bold",    sw: 2.5, note: "High contrast, accessible" },
  { label: "Heavy",   sw: 3,   note: "Strong callout, maximum weight" },
];

const SAMPLE_ICONS = [Home, Search, Bell, Settings, Mail, Pencil, Download, Share2];

const SUBCATEGORIES = [
  { label: "Navigation",       dot: "bg-blue-500",   icons: [Home, Search, Menu, ArrowLeft, ChevronRight, ExternalLink, Settings, Filter] },
  { label: "Actions",          dot: "bg-violet-500", icons: [Pencil, Trash2, Copy, Download, Upload, Share2, Plus, RefreshCw] },
  { label: "Status & Feedback",dot: "bg-amber-500",  icons: [Check, X, AlertTriangle, AlertCircle, Info, CheckCircle, Loader2, Clock] },
  { label: "Communication",    dot: "bg-teal-500",   icons: [Mail, MessageCircle, MessageSquare, Phone, Bell, AtSign, Send, Video] },
  { label: "Data & Files",     dot: "bg-orange-500", icons: [BarChart2, Table2, Filter, ArrowUpDown, Database, FileText, Folder, Layers] },
  { label: "People & Objects", dot: "bg-rose-500",   icons: [User, Users, UserPlus, Building2, Star, Heart, Bookmark, Award] },
];

const SIZE_RULES = [
  { context: "Inline with body text", size: 14, desc: "14px — sits on the text baseline" },
  { context: "Button / input",         size: 16, desc: "16px — pairs with text-sm/base labels" },
  { context: "Section header",         size: 20, desc: "20px — anchors a heading row" },
  { context: "Empty state / hero",     size: 32, desc: "32px — commanding, not decorative clusters" },
];

type TabId = "family" | "categories" | "guidelines";

export default function IconSystem() {
  const [tab, setTab] = useState<TabId>("family");
  const [sw, setSw] = useState(1.5);

  const TABS: { id: TabId; label: string }[] = [
    { id: "family", label: "Icon Families" },
    { id: "categories", label: "Subcategories" },
    { id: "guidelines", label: "Usage Rules" },
  ];

  return (
    <div className="bg-white rounded-xl border border-neutral-200 font-sans w-full overflow-hidden">
      {/* Header + tabs */}
      <div className="px-5 pt-5 pb-0 border-b border-neutral-100">
        <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1">Foundations</p>
        <h2 className="text-sm font-semibold text-neutral-900 mb-4">Icon System</h2>
        <div className="flex">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-xs font-medium border-b-2 -mb-px transition-colors ${
                tab === t.id
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-neutral-400 hover:text-neutral-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-6 max-h-130 overflow-y-auto">
        {/* FAMILY TAB */}
        {tab === "family" && (
          <>
            {/* Selected family card */}
            <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <div className="flex gap-2.5">
                {SAMPLE_ICONS.slice(0, 4).map((Icon, i) => (
                  <div key={i} className="w-9 h-9 flex items-center justify-center bg-white rounded-lg border border-neutral-200 shadow-sm">
                    <Icon size={18} strokeWidth={1.5} className="text-neutral-700" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-900">Lucide — Selected Family</p>
                <p className="text-[11px] text-neutral-500 mt-0.5 mb-2">Outline · 24 × 24 grid · Rounded joins · ISC license</p>
                <div className="flex gap-5">
                  {[["Style", "Stroke / Outline"], ["Grid", "24 × 24 px"], ["Corners", "Rounded"], ["Fills", "None"]].map(([k, v]) => (
                    <div key={k}>
                      <span className="text-[9px] text-neutral-400 block uppercase tracking-wide">{k}</span>
                      <span className="text-[11px] font-medium text-neutral-700">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stroke weight scale — pick one */}
            <div>
              <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-2.5">Stroke Weight — Same Family, Different Weight</p>
              <div className="space-y-1.5">
                {STROKE_WEIGHTS.map((row) => (
                  <button
                    key={row.sw}
                    onClick={() => setSw(row.sw)}
                    className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg border text-left transition-all ${
                      sw === row.sw ? "border-neutral-900 bg-neutral-50" : "border-neutral-100 hover:border-neutral-200 bg-white"
                    }`}
                  >
                    <div className="w-20 shrink-0 flex items-center gap-1.5">
                      <span className={`text-xs font-semibold ${sw === row.sw ? "text-neutral-900" : "text-neutral-500"}`}>{row.label}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">{row.sw}</span>
                    </div>
                    <div className="flex gap-3.5 flex-1">
                      {SAMPLE_ICONS.map((Icon, i) => (
                        <Icon key={i} size={18} strokeWidth={row.sw} className="text-neutral-700 shrink-0" />
                      ))}
                    </div>
                    {row.current ? (
                      <span className="text-[10px] bg-neutral-900 text-white px-2 py-0.5 rounded-full font-medium shrink-0">default</span>
                    ) : (
                      <span className="text-[10px] text-neutral-400 shrink-0">{row.note}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size scale */}
            <div>
              <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-2.5">Size Scale — Keep strokeWidth consistent across sizes</p>
              <div className="flex items-end gap-8 px-5 py-5 bg-neutral-50 rounded-xl border border-neutral-100">
                {[12, 16, 20, 24, 32].map((sz) => (
                  <div key={sz} className="flex flex-col items-center gap-2.5">
                    <Home size={sz} strokeWidth={sw} className="text-neutral-700" />
                    <span className="text-[10px] text-neutral-400 font-mono">{sz}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SUBCATEGORIES TAB */}
        {tab === "categories" && (
          <>
            <p className="text-xs text-neutral-500 -mt-1">Six functional subcategories — all icons share the same Lucide stroke, grid, and optical weight.</p>
            <div className="grid grid-cols-2 gap-3">
              {SUBCATEGORIES.map((cat) => (
                <div key={cat.label} className="border border-neutral-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-2 h-2 rounded-full ${cat.dot} shrink-0`} />
                    <span className="text-xs font-semibold text-neutral-700">{cat.label}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-y-3">
                    {cat.icons.map((Icon, i) => (
                      <div key={i} className="flex items-center justify-center h-8">
                        <Icon size={18} strokeWidth={1.5} className="text-neutral-600" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Subcategories reflect <em>semantic intent</em>, not visual style. All icons share the same Lucide treatment — you never need to leave the family to cover a context.
            </p>
          </>
        )}

        {/* GUIDELINES TAB */}
        {tab === "guidelines" && (
          <>
            {/* Mixing anti-pattern */}
            <div>
              <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-2.5">Don't Mix Families or Weights</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-red-200 rounded-xl p-4 bg-red-50/30">
                  <div className="flex items-center gap-1.5 mb-3">
                    <X size={11} strokeWidth={2.5} className="text-red-500" />
                    <span className="text-[11px] font-semibold text-red-600 uppercase tracking-wide">Avoid</span>
                  </div>
                  <div className="flex gap-3.5 items-center px-3 py-3 bg-white rounded-lg border border-red-100">
                    <Home size={20} strokeWidth={1} className="text-neutral-700" />
                    <Search size={16} strokeWidth={2.5} className="text-neutral-700" />
                    <Bell size={22} strokeWidth={1.5} className="text-neutral-700" />
                    <Settings size={18} strokeWidth={2} className="text-neutral-700" />
                    <Mail size={20} strokeWidth={3} className="text-neutral-700" />
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-2">Mixed sizes + mixed weights — visually incoherent</p>
                </div>
                <div className="border border-emerald-200 rounded-xl p-4 bg-emerald-50/30">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Check size={11} strokeWidth={2.5} className="text-emerald-600" />
                    <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide">Consistent</span>
                  </div>
                  <div className="flex gap-3.5 items-center px-3 py-3 bg-white rounded-lg border border-emerald-100">
                    <Home size={20} strokeWidth={1.5} className="text-neutral-700" />
                    <Search size={20} strokeWidth={1.5} className="text-neutral-700" />
                    <Bell size={20} strokeWidth={1.5} className="text-neutral-700" />
                    <Settings size={20} strokeWidth={1.5} className="text-neutral-700" />
                    <Mail size={20} strokeWidth={1.5} className="text-neutral-700" />
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-2">One family · one size · one strokeWidth</p>
                </div>
              </div>
            </div>

            {/* Size in context */}
            <div>
              <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-2.5">Size in Context</p>
              <div className="space-y-1.5">
                {SIZE_RULES.map((row) => (
                  <div key={row.size} className="flex items-center gap-4 px-3 py-2.5 rounded-lg border border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <div className="w-36 shrink-0">
                      <span className="text-xs text-neutral-700">{row.context}</span>
                    </div>
                    <Bell size={row.size} strokeWidth={1.5} className="text-neutral-600 shrink-0" />
                    <code className="text-[10px] font-mono text-neutral-400">{row.desc}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Principle block */}
            <div className="p-4 bg-neutral-950 rounded-xl">
              <p className="text-xs font-semibold text-white mb-1.5">One Family Per Surface</p>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Icon families are defined by stroke weight, corner treatment, optical grid, and density. You can use weight variants within one family to create hierarchy — but never cross into a different visual family. Mixing Lucide with Heroicons or Phosphor creates visual noise even when individual icons look similar in isolation.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
