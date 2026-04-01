/**
 * Bento Grid Layout
 * Category: Layout
 * Tags: bento, grid, apple, layout, features
 * Description: Apple-inspired bento box layout for feature showcases. Asymmetric grid with varying span sizes.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/bento-grid.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function BentoGrid() {
  return (
    <div className="p-8 bg-neutral-50 min-h-[500px]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {/* Large card */}
        <div className="col-span-2 row-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white flex flex-col justify-end min-h-[280px]">
          <div className="text-4xl mb-2">📱</div>
          <h3 className="text-xl font-bold mb-1">Cross-Platform</h3>
          <p className="text-blue-200 text-sm">Build once, deploy everywhere. iOS, Android, and Web from a single codebase.</p>
        </div>

        {/* Small cards */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200 flex flex-col justify-between min-h-[130px]">
          <div className="text-2xl">⚡</div>
          <div>
            <h4 className="font-semibold text-sm">Fast</h4>
            <p className="text-neutral-500 text-xs">60fps animations</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-neutral-200 flex flex-col justify-between min-h-[130px]">
          <div className="text-2xl">🔒</div>
          <div>
            <h4 className="font-semibold text-sm">Secure</h4>
            <p className="text-neutral-500 text-xs">E2E encrypted</p>
          </div>
        </div>

        {/* Medium card */}
        <div className="col-span-2 bg-neutral-900 rounded-3xl p-8 text-white flex items-center gap-6 min-h-[130px]">
          <div className="text-4xl">🎨</div>
          <div>
            <h3 className="font-bold mb-1">Design System</h3>
            <p className="text-neutral-400 text-sm">50+ components, fully customizable with your brand tokens.</p>
          </div>
        </div>
      </div>
    </div>
  );
}