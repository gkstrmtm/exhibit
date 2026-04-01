/**
 * Gradient Border Card
 * Category: Cards
 * Tags: gradient, border, card, premium, animated
 * Description: Card with an animated gradient border effect. Great for feature highlights and premium sections.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/gradient-border-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function GradientBorderCard() {
  return (
    <div className="p-12 bg-neutral-950 flex items-center justify-center min-h-[300px]">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500" />
        <div className="relative bg-neutral-900 rounded-xl p-8 space-y-4 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">⚡</div>
            <div>
              <h3 className="text-white font-semibold">Turbo Mode</h3>
              <p className="text-neutral-400 text-xs">10x faster builds</p>
            </div>
          </div>
          <p className="text-neutral-300 text-sm leading-relaxed">
            Enable turbo mode to dramatically speed up your build pipeline with intelligent caching and parallel compilation.
          </p>
          <button className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Learn more →
          </button>
        </div>
      </div>
    </div>
  );
}