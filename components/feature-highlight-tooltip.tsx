/**
 * Feature Highlight
 * Category: Onboarding
 * Tags: product tour, feature highlight, tooltip, onboarding, spotlight
 * Description: Product tour spotlight card that calls attention to a new feature. Pulsing indicator, label, description, and Got it / Next step actions.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/feature-highlight-tooltip.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function FeatureHighlight() {
  return (
    <div className="relative max-w-xs p-10">
      <div className="bg-white border border-neutral-100 rounded-xl p-4 text-sm text-neutral-600">
        Some feature UI here
      </div>
      <div className="absolute -top-1 -right-1 flex items-center justify-center">
        <div className="absolute w-6 h-6 rounded-full bg-blue-400/30 animate-ping" />
        <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white" />
      </div>
      <div className="mt-3 bg-neutral-950 text-white rounded-xl p-4 shadow-xl">
        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">New</div>
        <div className="text-sm font-semibold mb-1">AI prompt export</div>
        <div className="text-xs text-neutral-400 mb-4">Copy any component as a prompt your AI assistant can reproduce exactly.</div>
        <div className="flex gap-2">
          <button className="flex-1 py-1.5 bg-white text-neutral-900 text-xs font-medium rounded-lg">Got it</button>
          <button className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white">Next →</button>
        </div>
      </div>
    </div>
  );
}