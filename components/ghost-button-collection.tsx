/**
 * Ghost Button Collection
 * Category: Buttons
 * Tags: ghost, outline, minimal, secondary, 60-30-10
 * Description: Transparent buttons with a visible border. The go-to secondary action style used by Linear, Vercel, and Notion. Light, readable, never competes with the primary CTA.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/ghost-button-collection.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function GhostButtonCollection() {
  return (
    <div className="p-8 bg-white flex flex-col gap-6 items-start">
      <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Ghost — Default Radius</div>
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 text-sm font-medium rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all active:scale-95">
          Secondary Action
        </button>
        <button className="px-4 py-2 text-sm font-medium rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all active:scale-95">
          Learn More
        </button>
        <button className="px-4 py-2 text-sm font-medium rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all active:scale-95">
          Delete
        </button>
        <button className="px-4 py-2 text-sm font-medium rounded-lg border border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition-all active:scale-95">
          Confirm
        </button>
      </div>
      <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-2">Ghost — Pill Radius</div>
      <div className="flex flex-wrap gap-3">
        <button className="px-5 py-2 text-sm font-medium rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all active:scale-95">
          Explore
        </button>
        <button className="px-5 py-2 text-sm font-medium rounded-full border border-violet-200 text-violet-600 hover:bg-violet-50 hover:border-violet-300 transition-all active:scale-95">
          Upgrade Plan
        </button>
        <button className="px-5 py-2 text-sm font-medium rounded-full border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all active:scale-95">
          Dark Ghost
        </button>
      </div>
    </div>
  );
}