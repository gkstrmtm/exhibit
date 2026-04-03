/**
 * Button Size Spectrum
 * Category: Buttons
 * Tags: size, scale, system, design-system, specs
 * Description: xs through 2xl — every size step laid out with consistent proportions. Pick the right size for the context: xs for dense data tables, xl for empty states and hero CTAs.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/button-size-spectrum.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ButtonSizeSpectrum() {
  const sizes = [
    { label: "2xl", cls: "px-8 py-4 text-lg font-semibold rounded-xl" },
    { label: "xl", cls: "px-6 py-3.5 text-base font-semibold rounded-xl" },
    { label: "lg", cls: "px-5 py-3 text-sm font-semibold rounded-lg" },
    { label: "md", cls: "px-4 py-2 text-sm font-medium rounded-lg" },
    { label: "sm", cls: "px-3 py-1.5 text-xs font-medium rounded-md" },
    { label: "xs", cls: "px-2.5 py-1 text-[11px] font-medium rounded" },
  ];
  return (
    <div className="p-8 bg-white flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Solid</div>
        <div className="flex flex-wrap items-end gap-3">
          {sizes.map(s => (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <button className={`${s.cls} bg-blue-600 text-white hover:bg-blue-700 transition-colors`}>Button</button>
              <span className="text-[10px] font-mono text-neutral-400">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Ghost</div>
        <div className="flex flex-wrap items-end gap-3">
          {sizes.map(s => (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <button className={`${s.cls} border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors`}>Button</button>
              <span className="text-[10px] font-mono text-neutral-400">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}