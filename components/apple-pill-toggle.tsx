/**
 * Apple-Style Pill Toggle
 * Category: Buttons
 * Tags: apple, toggle, pill, segmented, ios
 * Description: Smooth segmented control inspired by iOS. Perfect for switching between views or filters.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/apple-pill-toggle.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";

export default function PillToggle() {
  const [active, setActive] = useState(0);
  const options = ["All", "Active", "Completed"];

  return (
    <div className="p-12 bg-neutral-100 flex items-center justify-center min-h-[200px]">
      <div className="relative bg-neutral-200/80 rounded-full p-1 flex gap-0.5">
        <div
          className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm transition-all duration-300 ease-out"
          style={{
            width: `calc(${100 / options.length}% - 4px)`,
            left: `calc(${(active * 100) / options.length}% + 2px)`,
          }}
        />
        {options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => setActive(i)}
            className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors ${
              active === i ? "text-black" : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}