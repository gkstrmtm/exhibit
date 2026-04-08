/**
 * Skeleton Loader
 * Category: Loading
 * Tags: skeleton, placeholder, loading, shimmer, content
 * Description: Content loading skeleton placeholders with a shimmer animation. Shows three layout variants: a card skeleton, a list item skeleton, and a profile header skeleton. A toggle switches between the skeleton state and the actual content state to demonstrate the reveal.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/skeleton-loader.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useEffect } from "react";

function Bone({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-neutral-200 rounded-md overflow-hidden relative ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-3.5 space-y-2.5">
      <div className="flex items-center gap-2">
        <Bone className="w-8 h-8 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-1.5">
          <Bone className="h-2.5 w-3/4" />
          <Bone className="h-2 w-1/2" />
        </div>
      </div>
      <Bone className="h-2 w-full" />
      <Bone className="h-2 w-5/6" />
      <Bone className="h-2 w-2/3" />
      <div className="flex gap-2 pt-1">
        <Bone className="h-6 flex-1 rounded-lg" />
        <Bone className="h-6 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

function CardContent() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-3.5 space-y-2.5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-[9px] font-bold flex-shrink-0">AC</div>
        <div>
          <div className="text-[11px] font-semibold text-neutral-800">Aria Chen</div>
          <div className="text-[9px] text-neutral-400">Design Lead</div>
        </div>
      </div>
      <p className="text-[10px] text-neutral-500 leading-relaxed">Designing systems at the intersection of clarity and craft. Focused on tokens and scalable patterns.</p>
      <div className="flex gap-2 pt-1">
        <button className="flex-1 py-1 bg-neutral-900 text-white text-[10px] font-medium rounded-lg">Follow</button>
        <button className="flex-1 py-1 border border-neutral-200 text-neutral-700 text-[10px] font-medium rounded-lg">Message</button>
      </div>
    </div>
  );
}

export default function SkeletonLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 w-full max-w-xs space-y-3">
      <style>{`@keyframes shimmer { to { transform: translateX(200%); } }`}</style>
      <div className="flex items-center justify-between mb-1">
        <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{loaded ? "Content loaded" : "Loading…"}</div>
        <button
          onClick={() => setLoaded(false)}
          disabled={!loaded}
          className="text-[9px] text-neutral-400 hover:text-neutral-600 disabled:opacity-40 underline transition-colors"
        >
          Reset
        </button>
      </div>

      {loaded ? <CardContent /> : <CardSkeleton />}

      <div className="space-y-1.5">
        {[...Array(3)].map((_, i) => (
          loaded
            ? <div key={i} className="flex items-center gap-2 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <div className="text-[10px] text-neutral-600">List item {i + 1} — real content</div>
              </div>
            : <div key={i} className="flex items-center gap-2 py-1">
                <Bone className="w-1.5 h-1.5 rounded-full flex-shrink-0" />
                <Bone className="h-2 flex-1" style={{ width: `${60 + i * 10}%` }} />
              </div>
        ))}
      </div>
    </div>
  );
}
