/**
 * Skeleton Threshold Surface
 * Category: Feedback
 * Tags: skeleton, loading, threshold, table, inspector, thread, structure
 * Description: Demonstrates the correct skeleton depth for three different surface types: compact table rows (thin bars), inspector panel (label+value pairs), and message thread (avatar+paragraph blocks). Shows that skeleton structure must match real content anatomy.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/skeleton-threshold-surface.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";
import { useState, useRef, useEffect } from "react";
import { RefreshCw } from "lucide-react";

/* ── Table skeleton ── */
function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-neutral-100 last:border-0">
      <div className="h-3 bg-neutral-200 rounded animate-pulse" style={{ width: "28%" }} />
      <div className="h-3 bg-neutral-200 rounded animate-pulse" style={{ width: "18%" }} />
      <div className="h-3 bg-neutral-200 rounded animate-pulse ml-auto" style={{ width: "12%" }} />
    </div>
  );
}
function TableRowReal({ name, date, amount }: { name: string; date: string; amount: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-neutral-100 last:border-0 text-xs">
      <span className="text-neutral-800 w-[28%] truncate">{name}</span>
      <span className="text-neutral-500 w-[18%]">{date}</span>
      <span className="text-neutral-700 font-medium ml-auto">{amount}</span>
    </div>
  );
}

/* ── Inspector skeleton ── */
function InspectorFieldSkeleton() {
  return (
    <div className="flex flex-col gap-1 py-2 border-b border-neutral-100 last:border-0">
      <div className="h-2 bg-neutral-200 rounded animate-pulse" style={{ width: "32%" }} />
      <div className="h-3 bg-neutral-200 rounded animate-pulse" style={{ width: "64%" }} />
    </div>
  );
}
function InspectorFieldReal({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-2 border-b border-neutral-100 last:border-0">
      <span className="text-[9px] text-neutral-400 uppercase tracking-wide">{label}</span>
      <span className="text-xs text-neutral-800">{value}</span>
    </div>
  );
}

/* ── Thread skeleton ── */
function ThreadMessageSkeleton() {
  return (
    <div className="flex gap-2 py-2">
      <div className="h-7 w-7 rounded-full bg-neutral-200 animate-pulse shrink-0" />
      <div className="flex flex-col gap-1 flex-1">
        <div className="h-2.5 bg-neutral-200 rounded animate-pulse" style={{ width: "30%" }} />
        <div className="h-3 bg-neutral-200 rounded animate-pulse" style={{ width: "100%" }} />
        <div className="h-3 bg-neutral-200 rounded animate-pulse" style={{ width: "75%" }} />
      </div>
    </div>
  );
}
function ThreadMessageReal({ author, text }: { author: string; text: string }) {
  return (
    <div className="flex gap-2 py-2">
      <div className="h-7 w-7 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] font-bold text-neutral-500 shrink-0">
        {author[0]}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-semibold text-neutral-700">{author}</span>
        <span className="text-xs text-neutral-600 leading-5">{text}</span>
      </div>
    </div>
  );
}

interface SurfaceConfig {
  label: string;
  skeletonRows: number;
  note: string;
}

const TABLE_DATA = [
  { name: "Acme Corp renewal", date: "Mar 12", amount: "$4,200" },
  { name: "Stripe integration", date: "Mar 14", amount: "$800" },
  { name: "Design audit", date: "Mar 18", amount: "$2,100" },
];
const INSPECTOR_DATA = [
  { label: "Owner", value: "Sarah Chen" },
  { label: "Stage", value: "Proposal sent" },
  { label: "Close date", value: "April 30, 2025" },
  { label: "Deal value", value: "$12,000" },
];
const THREAD_DATA = [
  { author: "Jordan", text: "Just followed up with the client on the pricing question." },
  { author: "Mia", text: "They want a 10% discount if we can ship before April 1st." },
];

function Surface({ label, note, skeleton, real, loading, onLoad }: {
  label: string; note: string;
  skeleton: React.ReactNode; real: React.ReactNode;
  loading: boolean; onLoad: () => void;
}) {
  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
      <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-100">
        <span className="text-xs font-semibold text-neutral-700">{label}</span>
        <button
          onClick={onLoad}
          disabled={loading}
          className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-600 disabled:opacity-40"
        >
          <RefreshCw size={10} className={loading ? "animate-spin" : ""} />
          Load
        </button>
      </div>
      <div className="px-3 py-1 min-h-[110px]">
        {loading ? skeleton : real}
      </div>
      <div className="px-3 py-1.5 border-t border-neutral-100 bg-neutral-50 text-[10px] text-neutral-500">
        {note}
      </div>
    </div>
  );
}

export default function SkeletonThresholdSurface() {
  const [tableLoading, setTableLoading] = useState(true);
  const [inspectorLoading, setInspectorLoading] = useState(true);
  const [threadLoading, setThreadLoading] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function loadAfter(ms: number, setter: (v: boolean) => void) {
    const t = setTimeout(() => setter(false), ms);
    timers.current.push(t);
  }

  useEffect(() => {
    loadAfter(600, setTableLoading);
    loadAfter(800, setInspectorLoading);
    loadAfter(1000, setThreadLoading);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  function reload(setter: (v: boolean) => void, ms: number) {
    setter(true);
    loadAfter(ms, setter);
  }

  function resetAll() {
    [setTableLoading, setInspectorLoading, setThreadLoading].forEach((s) => s(true));
    loadAfter(600, setTableLoading);
    loadAfter(800, setInspectorLoading);
    loadAfter(1000, setThreadLoading);
  }

  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          Skeleton depth by surface type
        </div>
        <button onClick={resetAll} className="flex items-center gap-1 text-[10px] px-2 py-1 bg-white border border-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-50">
          <RefreshCw size={10} /> Reset all
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Surface
          label="Table"
          note="Row: icon placeholder + 2 text bars matching column widths"
          loading={tableLoading}
          onLoad={() => reload(setTableLoading, 700)}
          skeleton={<>{[0,1,2].map(i => <TableRowSkeleton key={i} />)}</>}
          real={<>{TABLE_DATA.map(r => <TableRowReal key={r.name} {...r} />)}</>}
        />
        <Surface
          label="Inspector / detail"
          note="Field: narrow label bar above longer value bar — 2 lines each"
          loading={inspectorLoading}
          onLoad={() => reload(setInspectorLoading, 700)}
          skeleton={<>{[0,1,2,3].map(i => <InspectorFieldSkeleton key={i} />)}</>}
          real={<>{INSPECTOR_DATA.map(f => <InspectorFieldReal key={f.label} {...f} />)}</>}
        />
        <Surface
          label="Thread / messages"
          note="Avatar circle + name bar + 2 paragraph bars — matches message anatomy"
          loading={threadLoading}
          onLoad={() => reload(setThreadLoading, 700)}
          skeleton={<>{[0,1].map(i => <ThreadMessageSkeleton key={i} />)}</>}
          real={<>{THREAD_DATA.map(m => <ThreadMessageReal key={m.author} {...m} />)}</>}
        />
      </div>

      <div className="mt-4 text-[11px] text-neutral-400">
        Rule: Skeleton bars must match the column count, line count, and approximate proportions of real content. Generic grey bars fail to hold layout and break the transition.
      </div>
    </div>
  );
}
