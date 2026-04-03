/**
 * Minimal Text Buttons
 * Category: Buttons
 * Tags: text, minimal, ghost, tertiary, clean, apple
 * Description: No background, no border — just intentional text. The quietest action on screen. Used by Apple, Figma, and Linear for tertiary actions and inline links that don't need visual weight.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/minimal-text-buttons.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function MinimalTextButtons() {
  return (
    <div className="p-8 bg-white flex flex-col gap-8 items-start">
      <div>
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4">Text Only — Neutral</div>
        <div className="flex flex-wrap gap-1">
          <button className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-all">Cancel</button>
          <button className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-all">Skip for now</button>
          <button className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-all">Learn more →</button>
        </div>
      </div>
      <div>
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4">Text Only — Branded</div>
        <div className="flex flex-wrap gap-1">
          <button className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-all">View docs</button>
          <button className="px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-all">See all →</button>
          <button className="px-3 py-2 text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-all">Remove</button>
          <button className="px-3 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-all">Restore</button>
        </div>
      </div>
      <div>
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4">Underline Style</div>
        <div className="flex flex-wrap gap-4">
          <button className="text-sm font-medium text-neutral-700 underline underline-offset-2 hover:text-neutral-900 transition-colors">Privacy Policy</button>
          <button className="text-sm font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800 transition-colors">View all results</button>
          <button className="text-sm font-medium text-neutral-400 hover:text-neutral-700 transition-colors">Dismiss</button>
        </div>
      </div>
    </div>
  );
}