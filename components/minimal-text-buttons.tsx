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
          <button className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-all active:scale-95">Cancel</button>
          <button className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-all active:scale-95">Skip for now</button>
          <button className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-all active:scale-95">Learn more →</button>
        </div>
      </div>
    </div>
  );
}