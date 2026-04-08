/**
 * Media Card
 * Category: Cards
 * Tags: media, card, thumbnail, image, title, play, video
 * Description: A media preview card with a simulated colored thumbnail area, a play button overlay, title, duration badge, and metadata row (author, views, date). Three cards are shown in a column for different content types. Hovering each card lifts it slightly.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/media-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { Play, Eye, Clock } from "lucide-react";

const MEDIA = [
  { id: 1, title: "Building a scalable design system", author: "Aria Chen", duration: "18:32", views: "12.4k", date: "3 days ago", thumb: "from-violet-400 to-indigo-500" },
  { id: 2, title: "Next.js performance deep-dive", author: "Marcus Webb", duration: "31:05", views: "8.7k", date: "1 week ago", thumb: "from-blue-400 to-cyan-500" },
  { id: 3, title: "Designing for accessibility first", author: "Selin Y.", duration: "24:18", views: "5.2k", date: "2 weeks ago", thumb: "from-emerald-400 to-teal-500" },
];

export default function MediaCard() {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 w-full max-w-xs space-y-2">
      {MEDIA.map(m => (
        <div key={m.id} className="group bg-white border border-neutral-200 rounded-xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer">
          {/* Thumbnail */}
          <div className={`relative h-24 bg-gradient-to-br ${m.thumb} flex items-center justify-center`}>
            <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Play size={12} strokeWidth={0} fill="white" />
            </div>
            <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/60 text-white text-[8px] font-mono rounded">
              {m.duration}
            </div>
          </div>

          {/* Info */}
          <div className="px-2.5 py-2 space-y-1">
            <div className="text-[10px] font-semibold text-neutral-800 line-clamp-1">{m.title}</div>
            <div className="flex items-center gap-2 text-[8px] text-neutral-400">
              <span className="font-medium text-neutral-500">{m.author}</span>
              <span className="flex items-center gap-0.5"><Eye size={8} strokeWidth={1.5} />{m.views}</span>
              <span className="flex items-center gap-0.5"><Clock size={8} strokeWidth={1.5} />{m.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
