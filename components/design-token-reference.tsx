/**
 * Design Token Reference
 * Category: Foundations
 * Tags: foundations, tokens, colors, typography, spacing, reference, design-system
 * Description: Visual showcase of every design token in the system: color palette (neutral, semantic, interactive), typography scale (all sizes and weights), spacing ramp, border-radius steps, and elevation levels. Use as a quick-look reference when building any component.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/design-token-reference.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function DesignTokenReference() {
  const neutrals = [
    { name: "950", hex: "#0a0a0a" }, { name: "900", hex: "#171717" },
    { name: "800", hex: "#262626" }, { name: "700", hex: "#404040" },
    { name: "600", hex: "#525252" }, { name: "500", hex: "#737373" },
    { name: "400", hex: "#a3a3a3" }, { name: "300", hex: "#d4d4d4" },
    { name: "200", hex: "#e5e5e5" }, { name: "100", hex: "#f5f5f5" },
    { name: "50",  hex: "#fafafa" },
  ];
  const semantics = [
    { name: "Success", bg: "#ecfdf5", text: "#047857", border: "#a7f3d0" },
    { name: "Warning", bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
    { name: "Error",   bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
    { name: "Info",    bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
    { name: "Neutral", bg: "#f5f5f5", text: "#525252", border: "#e5e5e5" },
  ];
  const typeScale = [
    { name: "xs",  px: 11, weight: 500, sample: "Table header / badge" },
    { name: "sm",  px: 13, weight: 400, sample: "Body text / nav links" },
    { name: "base",px: 14, weight: 400, sample: "Primary body / inputs" },
    { name: "lg",  px: 18, weight: 600, sample: "Card title / dialog heading" },
    { name: "xl",  px: 20, weight: 700, sample: "Section heading / KPI value" },
    { name: "2xl", px: 24, weight: 700, sample: "Page H2 / large KPI" },
    { name: "3xl", px: 30, weight: 700, sample: "Page title H1" },
  ];
  const radii = [
    { name: "rounded",    px: 4  },
    { name: "rounded-md", px: 6  },
    { name: "rounded-lg", px: 8  },
    { name: "rounded-xl", px: 12 },
    { name: "rounded-2xl",px: 16 },
    { name: "rounded-full",px: 99 },
  ];
  const shadows = [
    { name: "none",      css: "none" },
    { name: "shadow-sm", css: "0 1px 3px rgba(0,0,0,0.08)" },
    { name: "shadow-md", css: "0 4px 12px rgba(0,0,0,0.10)" },
    { name: "shadow-lg", css: "0 10px 30px rgba(0,0,0,0.12)" },
    { name: "shadow-2xl",css: "0 20px 60px rgba(0,0,0,0.18)" },
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-[600px] space-y-10 font-sans text-neutral-900">
      {/* Neutral palette */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Neutral Palette</h2>
        <div className="flex gap-2 flex-wrap">
          {neutrals.map(c => (
            <div key={c.name} className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-lg border border-neutral-200" style={{ background: c.hex }} />
              <span className="text-[10px] text-neutral-500 font-mono">{c.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Semantic colors */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Semantic States</h2>
        <div className="flex gap-3 flex-wrap">
          {semantics.map(s => (
            <div key={s.name} className="px-4 py-2.5 rounded-lg border text-sm font-medium"
              style={{ background: s.bg, color: s.text, borderColor: s.border }}>
              {s.name}
            </div>
          ))}
        </div>
      </section>

      {/* Type scale */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Type Scale</h2>
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          {typeScale.map((t, i) => (
            <div key={t.name} className={`flex items-center gap-4 px-5 py-3 ${i < typeScale.length - 1 ? "border-b border-neutral-100" : ""}`}>
              <span className="text-xs text-neutral-400 font-mono w-10">{t.name}</span>
              <span className="text-xs text-neutral-300 font-mono w-10">{t.px}px</span>
              <span style={{ fontSize: t.px, fontWeight: t.weight }} className="text-neutral-900 flex-1">{t.sample}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Border radius */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Border Radius</h2>
        <div className="flex gap-4 flex-wrap items-end">
          {radii.map(r => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-neutral-200 border border-neutral-300"
                style={{ borderRadius: r.px >= 99 ? "9999px" : r.px }} />
              <span className="text-[10px] text-neutral-500 font-mono whitespace-nowrap">{r.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Elevation */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Elevation</h2>
        <div className="flex gap-4 flex-wrap">
          {shadows.map(s => (
            <div key={s.name} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-xl bg-white border border-neutral-100"
                style={{ boxShadow: s.css }} />
              <span className="text-[10px] text-neutral-500 font-mono">{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Spacing Scale (4px grid)</h2>
        <div className="flex gap-2 flex-wrap items-end">
          {[1,2,3,4,5,6,8,10,12].map(s => (
            <div key={s} className="flex flex-col items-center gap-1">
              <div className="bg-blue-200 rounded" style={{ width: s * 4, height: s * 4 }} />
              <span className="text-[10px] text-neutral-500 font-mono">{s * 4}px</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}