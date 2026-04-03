/**
 * Density & Layout Guide
 * Category: Foundations
 * Tags: foundations, density, layout, compact, comfortable, tables, reference
 * Description: Side-by-side comparison of compact, default, and comfortable density modes applied to the same user table. Shows how row height, font size, padding, and spacing change between modes. Use to decide which density is right for your context before building.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/density-and-layout-guide.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function DensityAndLayoutGuide() {
  const users = [
    { name: "Sarah Chen", role: "Admin", status: "Active" },
    { name: "Marcus Rivera", role: "Editor", status: "Active" },
    { name: "Emily Park", role: "Viewer", status: "Trial" },
    { name: "David Kim", role: "Editor", status: "Churned" },
  ];

  const statusStyles: Record<string, string> = {
    Active:  "bg-emerald-50 text-emerald-700",
    Trial:   "bg-blue-50 text-blue-700",
    Churned: "bg-neutral-100 text-neutral-500",
  };

  const modes = [
    {
      name: "Compact",
      desc: "Data-heavy admin, log viewers, dense analytics",
      rowH: "h-8",
      cellPad: "px-4 py-1.5",
      headPad: "px-4 py-2",
      textSize: "text-xs",
      nameSize: "text-xs",
    },
    {
      name: "Default",
      desc: "Standard dashboards, CRM, settings pages",
      rowH: "h-11",
      cellPad: "px-5 py-3",
      headPad: "px-5 py-2.5",
      textSize: "text-sm",
      nameSize: "text-sm",
    },
    {
      name: "Comfortable",
      desc: "Consumer apps, onboarding, marketing dashboards",
      rowH: "h-14",
      cellPad: "px-6 py-4",
      headPad: "px-6 py-3",
      textSize: "text-sm",
      nameSize: "text-base",
    },
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-[600px] space-y-8 font-sans">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Density Modes</h2>
        <p className="text-sm text-neutral-500">Pick one density per layout and use it consistently. Never mix compact and comfortable in the same view.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {modes.map(mode => (
          <div key={mode.name} className="flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold text-neutral-900">{mode.name}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{mode.desc}</div>
              </div>
              <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                mode.name === "Compact" ? "bg-violet-50 text-violet-700" :
                mode.name === "Default" ? "bg-blue-50 text-blue-700" :
                "bg-amber-50 text-amber-700"
              }`}>{mode.name}</div>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50">
                    <th className={`text-left ${mode.headPad} text-xs font-semibold uppercase tracking-wider text-neutral-500`}>Name</th>
                    <th className={`text-left ${mode.headPad} text-xs font-semibold uppercase tracking-wider text-neutral-500`}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i} className={`${mode.rowH} border-b border-neutral-100 last:border-0`}>
                      <td className={`${mode.cellPad}`}>
                        <div className={`${mode.nameSize} font-medium text-neutral-900`}>{u.name}</div>
                        <div className="text-xs text-neutral-400">{u.role}</div>
                      </td>
                      <td className={`${mode.cellPad}`}>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[u.status]}`}>{u.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-3 text-xs font-mono text-neutral-400 space-y-0.5">
              <div>row: <span className="text-blue-500">{mode.rowH.replace("h-", "") + " × 4px"}</span></div>
              <div>cell: <span className="text-blue-500">{mode.cellPad}</span></div>
              <div>text: <span className="text-blue-500">{mode.nameSize}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Spacing reminder */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h3 className="text-sm font-semibold mb-4">Spacing Rules</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="space-y-2">
            <div className="font-medium text-neutral-700">All spacing is 4px grid</div>
            <div className="text-neutral-400">p-1=4px · p-2=8px · p-3=12px · p-4=16px · p-6=24px · p-8=32px</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-neutral-700">Page padding</div>
            <div className="text-neutral-400">Mobile: 24px · Tablet: 32px · Desktop: 48px</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-neutral-700">Card padding</div>
            <div className="text-neutral-400">Compact: p-4 (16px) · Default: p-5–p-6 · Spacious: p-8 (32px)</div>
          </div>
        </div>
      </div>
    </div>
  );
}