/**
 * Loading Dots
 * Category: Loading
 * Tags: loading, dots, spinner, animation, inline
 * Description: Three animated dots for inline loading states — button loading, content placeholders, or async feedback. Minimal, no library dependencies.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/loading-dots-spinner.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function LoadingDots() {
  return (
    <div className="flex flex-col items-center gap-8 p-10">
      <div className="flex gap-1.5 items-center">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-neutral-900 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg">
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        Saving...
      </button>
    </div>
  );
}