/**
 * Search Input with Clear
 * Category: Inputs
 * Tags: search, input, clear, text field, form
 * Description: Search field with leading magnifier icon, clear × button that appears on input, and live character count. Focus ring on active state.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/search-with-clear.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
export default function SearchWithClear() {
  const [v, setV] = useState("");
  return (
    <div className="max-w-sm p-6">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">🔍</span>
        <input
          value={v}
          onChange={e => setV(e.target.value)}
          placeholder="Search components..."
          className="w-full pl-9 pr-9 py-2.5 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-neutral-900 placeholder:text-neutral-400"
        />
        {v && (
          <button onClick={() => setV("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs">✕</button>
        )}
      </div>
    </div>
  );
}