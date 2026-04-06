/**
 * Review Card
 * Category: Commerce
 * Tags: review, testimonial, rating, commerce, feedback
 * Description: Individual customer review with star rating, review text, reviewer name, avatar, and verified purchase badge.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/review-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ReviewCard() {
  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-4 max-w-xs space-y-3">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
      </div>
      <p className="text-sm text-neutral-700 leading-relaxed">"Exactly what I needed. Clean code, great documentation, saved me hours."</p>
      <div className="flex items-center gap-2.5 pt-1">
        <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600">M</div>
        <div>
          <div className="text-xs font-medium text-neutral-900">Mia Chen</div>
          <div className="text-xs text-neutral-400">Verified purchase · Apr 2026</div>
        </div>
      </div>
    </div>
  );
}