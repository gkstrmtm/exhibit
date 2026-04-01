/**
 * Testimonial Card
 * Category: Cards
 * Tags: testimonial, quote, social, review, trust
 * Description: Social proof testimonial with avatar, quote, and company attribution. Clean and trustworthy.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/testimonial-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function TestimonialCard() {
  return (
    <div className="p-12 bg-neutral-50 flex items-center justify-center min-h-[300px]">
      <div className="max-w-lg bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-amber-400 text-lg">★</span>
          ))}
        </div>
        <blockquote className="text-neutral-800 leading-relaxed mb-6">
          "This tool completely transformed our workflow. We shipped 3x faster and our team morale went through the roof. Can't imagine going back."
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">SR</div>
          <div>
            <div className="text-sm font-semibold text-neutral-900">Sarah Rodriguez</div>
            <div className="text-xs text-neutral-500">VP of Engineering, TechCo</div>
          </div>
        </div>
      </div>
    </div>
  );
}