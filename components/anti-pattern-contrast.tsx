/**
 * Anti-Pattern Contrast
 * Category: Foundations
 * Tags: foundations, anti-patterns, before-after, contrast, mistakes, reference, quality
 * Description: Side-by-side before/after showing the most common AI-generated UI mistakes vs their corrected versions. Left: raw browser-default styling, unstyled HTML, no typography hierarchy, missing semantic colors. Right: correct implementation following design foundations. A diagnostic reference for identifying and fixing low-quality output.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/anti-pattern-contrast.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function AntiPatternContrast() {
  const rows = [
    { name: "Sarah Chen", email: "sarah@example.com", role: "Admin", status: "Active" },
    { name: "Marcus Rivera", email: "m.rivera@example.com", role: "Editor", status: "Inactive" },
    { name: "Emily Park", email: "e.park@example.com", role: "Viewer", status: "Active" },
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-[700px] font-sans">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Anti-Pattern Contrast</h2>
        <p className="text-sm text-neutral-500">The same UI built wrong (left) vs right (right). Every difference is intentional.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* ── WRONG ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 text-xs font-bold">✗</span>
            </div>
            <span className="text-sm font-semibold text-red-700">Common Mistakes</span>
          </div>
          <div style={{ fontFamily: "Times New Roman, serif" }} className="border border-gray-400 bg-white p-4">
            <h1 style={{ fontSize: "2em" }}>User Management</h1>
            <p style={{ color: "gray" }}>manage your users here</p>
            <input type="text" placeholder="search..." style={{ border: "1px solid gray", padding: "2px", width: "100%", marginBottom: "8px" }} />
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
              <thead>
                <tr style={{ background: "gray", color: "white" }}>
                  <td style={{ border: "1px solid black", padding: "4px" }}>Name</td>
                  <td style={{ border: "1px solid black", padding: "4px" }}>Email</td>
                  <td style={{ border: "1px solid black", padding: "4px" }}>Role</td>
                  <td style={{ border: "1px solid black", padding: "4px" }}>Status</td>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#f9f9f9" : "white" }}>
                    <td style={{ border: "1px solid #ccc", padding: "4px" }}>{r.name}</td>
                    <td style={{ border: "1px solid #ccc", padding: "4px" }}>{r.email}</td>
                    <td style={{ border: "1px solid #ccc", padding: "4px" }}>{r.role}</td>
                    <td style={{ border: "1px solid #ccc", padding: "4px", color: r.status === "Active" ? "green" : "red" }}>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: "8px", display: "flex", gap: "4px" }}>
              <button style={{ border: "1px solid gray", padding: "4px 8px", background: "white" }}>Cancel</button>
              <button style={{ border: "none", padding: "4px 8px", background: "blue", color: "white" }}>SAVE CHANGES</button>
            </div>
          </div>
          <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-4 space-y-1.5">
            {[
              "Wrong font: Times New Roman (should be Inter)",
              "Unstyled h1 tag — no size/weight/color specification",
              "Input: no height, no border-radius, no focus state",
              "Table: raw border collapse with visible black borders",
              "Alternating gray rows — visual noise without purpose",
              "Status: color only, no semantic badge (color-blind failure)",
              "Button: raw blue (#0000ff), ALL CAPS label",
              "Content gap missing between title area and table",
            ].map(note => (
              <div key={note} className="flex items-start gap-2 text-xs text-red-700">
                <span className="mt-0.5 flex-shrink-0">✗</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CORRECT ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600 text-xs font-bold">✓</span>
            </div>
            <span className="text-sm font-semibold text-emerald-700">Correct Implementation</span>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-neutral-100">
              <h1 className="text-xl font-bold text-neutral-900">User Management</h1>
              <p className="text-sm text-neutral-400 mt-0.5">Manage access and roles for your team.</p>
            </div>
            <div className="px-6 py-3 border-b border-neutral-100">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full h-9 px-3 text-sm border border-neutral-200 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
              />
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Role</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-neutral-900">{r.name}</td>
                    <td className="px-6 py-3 text-neutral-500">{r.email}</td>
                    <td className="px-6 py-3 text-neutral-600">{r.role}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        r.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"
                      }`}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 border-t border-neutral-100 flex justify-end gap-3">
              <button className="h-9 px-4 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">Cancel</button>
              <button className="h-9 px-4 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-700 transition-colors">Save Changes</button>
            </div>
          </div>
          <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-1.5">
            {[
              "Font: Inter (system-ui fallback) — clean and consistent",
              "H1: text-xl font-bold text-neutral-900 — explicit hierarchy",
              "Input: h-9, rounded-lg, focus ring, transition",
              "Table: border-neutral-100 dividers only — no box borders",
              "Rows: hover state, last:border-0 — intentional detail",
              "Status: semantic badge (color + text) — accessible",
              "Button: neutral-900 primary, sentence case label",
              "Spacing: consistent 24px gutter throughout",
            ].map(note => (
              <div key={note} className="flex items-start gap-2 text-xs text-emerald-700">
                <span className="mt-0.5 flex-shrink-0">✓</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}