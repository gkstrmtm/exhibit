/**
 * Determinate Progress Bar
 * Category: Loading
 * Tags: progress, loading, bar, upload, steps
 * Description: Labeled progress bar with percentage, step count, and smooth fill animation. Useful for multi-step flows, file uploads, and onboarding sequences.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/loading-progress-bar.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function DeterminateProgressBar() {
  const steps = [
    { label: "Uploading files", pct: 100 },
    { label: "Processing images", pct: 67 },
    { label: "Generating previews", pct: 0 },
  ];
  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-100 space-y-5 max-w-sm">
      <div className="text-sm font-semibold text-neutral-900">Importing project...</div>
      {steps.map((s, i) => (
        <div key={i}>
          <div className="flex justify-between text-xs text-neutral-500 mb-1.5">
            <span>{s.label}</span>
            <span>{s.pct}%</span>
          </div>
          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div className="h-full bg-neutral-900 rounded-full transition-all" style={{ width: `${s.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}