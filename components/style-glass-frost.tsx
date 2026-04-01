/**
 * Glass Frost Style
 * Category: Style Families
 * Tags: glass, glassmorphism, frost, blur, gradient, style
 * Description: Glassmorphism-styled hero card and modal overlay on a purple/blue gradient background. Features backdrop-filter blur, semi-transparent white backgrounds, and subtle white borders for a frosted glass effect.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/style-glass-frost.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function GlassFrostStyle() {
  return (
    <div className="min-h-[400px] bg-gradient-to-br from-violet-600 via-purple-600 to-blue-700 p-10 flex items-center justify-center gap-6">
      <div className="w-72 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 text-white">
        <p className="text-xs uppercase tracking-widest opacity-70 mb-1">Total Users</p>
        <p className="text-4xl font-bold tracking-tight">12,847</p>
        <p className="text-sm opacity-80 mt-3 leading-relaxed">Active users across all platforms with 98.2% uptime this month.</p>
      </div>
      <div className="w-80 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-1">Confirm Action</h3>
        <p className="text-sm opacity-70 mb-5">Are you sure you want to deploy to production?</p>
        <div className="flex gap-3">
          <button className="flex-1 py-2.5 bg-white/20 rounded-xl text-sm font-medium border border-white/10">Cancel</button>
          <button className="flex-1 py-2.5 bg-white text-purple-700 rounded-xl text-sm font-semibold">Deploy</button>
        </div>
      </div>
    </div>
  );
}