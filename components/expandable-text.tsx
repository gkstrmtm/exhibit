/**
 * Expandable Text
 * Category: Data Display
 * Tags: read-more, truncate, expand, collapse, text, clamp
 * Description: Long text blocks that truncate to 3 lines with a "Read more" link. Clicking expands the full text with an animated height transition. A "Read less" link collapses it back. Three independent text blocks are shown to demonstrate isolated expand state.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/expandable-text.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const TEXTS = [
  {
    title: "Design systems",
    text: "A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications. It serves as both a product and a process — a living document that bridges design and engineering, reduces inconsistency, and accelerates development velocity. Unlike a style guide, a design system includes working code, usage documentation, the rationale behind design decisions, and a governance model for how changes are made over time.",
  },
  {
    title: "Performance optimization",
    text: "Frontend performance optimization involves minimizing the time between a user initiating a request and seeing the fully interactive page. Techniques span multiple layers: server-side rendering for fast first paint, code splitting to reduce initial bundle size, image optimization with lazy loading and next-gen formats, preloading critical assets, and leveraging browser caches effectively. The goal is not just fast initial load but consistently smooth interactions throughout the session.",
  },
  {
    title: "Accessibility standards",
    text: "Accessible design ensures that digital products can be used by people with a wide range of abilities, including those who rely on assistive technologies. The Web Content Accessibility Guidelines (WCAG) provide a framework for measuring accessibility across four principles: perceivable, operable, understandable, and robust. Meeting WCAG 2.1 AA is the industry baseline, but truly inclusive design goes further — involving people with disabilities in user research, testing with real assistive tools, and fostering a culture where accessibility is a shared team responsibility.",
  },
];

function ExpandableBlock({ title, text }: { title: string; text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-neutral-100 last:border-0 pb-3 last:pb-0">
      <div className="text-[10px] font-semibold text-neutral-700 mb-1.5">{title}</div>
      <div className={`text-[10px] text-neutral-500 leading-relaxed overflow-hidden transition-all duration-200 ${expanded ? "line-clamp-none" : "line-clamp-3"}`}>
        {text}
      </div>
      <button
        onClick={() => setExpanded(v => !v)}
        className="mt-1 flex items-center gap-0.5 text-[9px] font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
      >
        {expanded ? <><ChevronUp size={9} strokeWidth={2} />Read less</> : <><ChevronDown size={9} strokeWidth={2} />Read more</>}
      </button>
    </div>
  );
}

export default function ExpandableText() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 w-full max-w-xs space-y-3">
      {TEXTS.map(t => <ExpandableBlock key={t.title} {...t} />)}
    </div>
  );
}
