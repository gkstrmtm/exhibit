/**
 * Rating Stars
 * Category: Inputs
 * Tags: rating, stars, interactive, hover, review
 * Description: An interactive 5-star rating component. Stars fill yellow as the user hovers over them and lock in on click. The committed rating is shown with a label. A second read-only display variant shows a locked score with a half-star at 0.5 increments via CSS clip-path.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/rating-stars.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

function InteractiveStars() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const display = hover || rating;
  return (
    <div className="space-y-1.5">
      <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Interactive</div>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(n)}
            className="transition-transform hover:scale-110"
          >
            <Star
              size={20}
              strokeWidth={1.5}
              className={`transition-colors ${n <= display ? "fill-amber-400 stroke-amber-400" : "fill-none stroke-neutral-300"}`}
            />
          </button>
        ))}
        <span className="ml-1.5 text-[10px] font-medium text-neutral-600">{LABELS[display] || "—"}</span>
      </div>
    </div>
  );
}

function ReadOnlyStars({ value, count }: { value: number; count: number }) {
  return (
    <div className="space-y-1.5">
      <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Read-only</div>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(n => {
          const fill = Math.min(Math.max(value - (n - 1), 0), 1);
          return (
            <div key={n} className="relative w-5 h-5">
              <Star size={20} strokeWidth={1.5} className="fill-none stroke-neutral-200 absolute inset-0" />
              <div className="overflow-hidden absolute inset-0" style={{ width: fill * 100 + "%" }}>
                <Star size={20} strokeWidth={1.5} className="fill-amber-400 stroke-amber-400" />
              </div>
            </div>
          );
        })}
        <span className="ml-1 text-[11px] font-semibold text-neutral-700">{value.toFixed(1)}</span>
        <span className="text-[9px] text-neutral-400">({count.toLocaleString()} reviews)</span>
      </div>
    </div>
  );
}

export default function RatingStars() {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-5">
      <InteractiveStars />
      <ReadOnlyStars value={4.3} count={1248} />
      <ReadOnlyStars value={3.7} count={392} />
    </div>
  );
}
