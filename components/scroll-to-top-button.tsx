/**
 * Scroll To Top Button
 * Category: Navigation
 * Tags: scroll, back-to-top, fab, floating, button
 * Description: A floating "scroll to top" button that appears after scrolling 80px in a contained scroll area. The button fades in and slides up. Clicking it smoothly scrolls the container back to the top. Works in the bounded preview container without affecting the page scroll.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/scroll-to-top-button.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState, useRef, useCallback } from "react";
import { ArrowUp } from "lucide-react";

const LOREM = Array.from({ length: 18 }, (_, i) => `Item ${i + 1} — Scroll down to reveal the "back to top" button floating in the bottom-right corner.`);

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setVisible(el.scrollTop > 80);
  }, []);

  const scrollTop = () => { containerRef.current?.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl w-full max-w-xs overflow-hidden relative">
      <div
        ref={containerRef}
        onScroll={onScroll}
        className="overflow-y-auto h-64 px-4 py-3 space-y-2"
      >
        {LOREM.map((t, i) => (
          <div key={i} className="py-2 border-b border-neutral-100 last:border-0">
            <div className="text-[10px] text-neutral-600">{t}</div>
          </div>
        ))}
      </div>

      <button
        onClick={scrollTop}
        aria-label="Scroll to top"
        className={`absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center shadow-md transition-all duration-200 hover:bg-neutral-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
      >
        <ArrowUp size={13} strokeWidth={2} />
      </button>
    </div>
  );
}
