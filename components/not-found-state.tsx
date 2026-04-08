/**
 * 404 Not Found State
 * Category: Empty States
 * Tags: 404, not-found, error, page, empty-state
 * Description: A full-section not-found (404) state with a large number, message, and navigation options. Offers a Go home button and a Go back link. Demonstrates the 404 / not-found page skeleton pattern used when a resource is missing or a URL is invalid.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/not-found-state.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { House, ArrowLeft } from "lucide-react";

export default function NotFoundState() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl flex flex-col items-center justify-center py-10 px-6 w-full max-w-xs text-center space-y-4">
      {/* Giant 404 */}
      <div
        className="text-8xl font-black tracking-tighter leading-none select-none"
        style={{ color: "transparent", WebkitTextStroke: "2px #e5e7eb" }}
      >
        404
      </div>

      <div className="space-y-1">
        <div className="text-sm font-semibold text-neutral-900">Page not found</div>
        <p className="text-xs text-neutral-500 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <button className="flex items-center justify-center gap-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg py-2 hover:bg-neutral-700 transition-colors">
          <House size={12} strokeWidth={1.5} />
          Go to homepage
        </button>
        <button className="flex items-center justify-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
          <ArrowLeft size={12} strokeWidth={1.5} />
          Go back
        </button>
      </div>
    </div>
  );
}
