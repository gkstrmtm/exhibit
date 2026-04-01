export const dataAdminExhibits = [
  {
    slug: "kpi-grid-tabular",
    title: "KPI Grid with Tabular Numbers",
    description: "Dense 2×3 KPI grid with tabular-nums alignment, trend indicators, and inline bar chart sparklines for at-a-glance metric comparison.",
    category: "Data Density",
    tags: ["kpi", "metrics", "dashboard", "tabular-nums", "data-density"],
    style: "",
    code: `export default function KpiGridTabular() {
  const metrics = [
    { label: "MRR", value: "$142.8k", trend: "+8.3%", up: true, bar: 83 },
    { label: "Churn", value: "2.1%", trend: "-0.4%", up: false, bar: 21 },
    { label: "NPS", value: "72", trend: "+5", up: true, bar: 72 },
    { label: "ARPU", value: "$48", trend: "+12%", up: true, bar: 60 },
    { label: "LTV", value: "$1,240", trend: "+3.2%", up: true, bar: 74 },
    { label: "CAC", value: "$89", trend: "-8.1%", up: false, bar: 35 },
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-[300px]">
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-lg border border-neutral-200 p-5 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{m.label}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>{m.value}</span>
              <span className={\`text-xs font-semibold \${m.up ? "text-emerald-600" : "text-rose-500"}\`}>
                {m.up ? "↑" : "↓"} {m.trend}
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
              <div className={\`h-full rounded-full \${m.up ? "bg-emerald-500" : "bg-rose-400"}\`} style={{ width: \`\${m.bar}%\` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#fafafa;min-height:300px;font-family:system-ui,-apple-system,sans-serif">
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem">
    <div style="background:white;border-radius:0.5rem;border:1px solid #e5e5e5;padding:1.25rem;display:flex;flex-direction:column;gap:0.75rem">
      <span style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">MRR</span>
      <div style="display:flex;align-items:baseline;gap:0.5rem"><span style="font-size:1.875rem;font-weight:700;letter-spacing:-0.025em;font-variant-numeric:tabular-nums">$142.8k</span><span style="font-size:0.7rem;font-weight:600;color:#059669">↑ +8.3%</span></div>
      <div style="width:100%;height:6px;background:#f5f5f5;border-radius:9999px;overflow:hidden"><div style="height:100%;width:83%;background:#10b981;border-radius:9999px"></div></div>
    </div>
    <div style="background:white;border-radius:0.5rem;border:1px solid #e5e5e5;padding:1.25rem;display:flex;flex-direction:column;gap:0.75rem">
      <span style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">Churn</span>
      <div style="display:flex;align-items:baseline;gap:0.5rem"><span style="font-size:1.875rem;font-weight:700;letter-spacing:-0.025em;font-variant-numeric:tabular-nums">2.1%</span><span style="font-size:0.7rem;font-weight:600;color:#f43f5e">↓ -0.4%</span></div>
      <div style="width:100%;height:6px;background:#f5f5f5;border-radius:9999px;overflow:hidden"><div style="height:100%;width:21%;background:#fb7185;border-radius:9999px"></div></div>
    </div>
    <div style="background:white;border-radius:0.5rem;border:1px solid #e5e5e5;padding:1.25rem;display:flex;flex-direction:column;gap:0.75rem">
      <span style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">NPS</span>
      <div style="display:flex;align-items:baseline;gap:0.5rem"><span style="font-size:1.875rem;font-weight:700;letter-spacing:-0.025em;font-variant-numeric:tabular-nums">72</span><span style="font-size:0.7rem;font-weight:600;color:#059669">↑ +5</span></div>
      <div style="width:100%;height:6px;background:#f5f5f5;border-radius:9999px;overflow:hidden"><div style="height:100%;width:72%;background:#10b981;border-radius:9999px"></div></div>
    </div>
    <div style="background:white;border-radius:0.5rem;border:1px solid #e5e5e5;padding:1.25rem;display:flex;flex-direction:column;gap:0.75rem">
      <span style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">ARPU</span>
      <div style="display:flex;align-items:baseline;gap:0.5rem"><span style="font-size:1.875rem;font-weight:700;letter-spacing:-0.025em;font-variant-numeric:tabular-nums">$48</span><span style="font-size:0.7rem;font-weight:600;color:#059669">↑ +12%</span></div>
      <div style="width:100%;height:6px;background:#f5f5f5;border-radius:9999px;overflow:hidden"><div style="height:100%;width:60%;background:#10b981;border-radius:9999px"></div></div>
    </div>
    <div style="background:white;border-radius:0.5rem;border:1px solid #e5e5e5;padding:1.25rem;display:flex;flex-direction:column;gap:0.75rem">
      <span style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">LTV</span>
      <div style="display:flex;align-items:baseline;gap:0.5rem"><span style="font-size:1.875rem;font-weight:700;letter-spacing:-0.025em;font-variant-numeric:tabular-nums">$1,240</span><span style="font-size:0.7rem;font-weight:600;color:#059669">↑ +3.2%</span></div>
      <div style="width:100%;height:6px;background:#f5f5f5;border-radius:9999px;overflow:hidden"><div style="height:100%;width:74%;background:#10b981;border-radius:9999px"></div></div>
    </div>
    <div style="background:white;border-radius:0.5rem;border:1px solid #e5e5e5;padding:1.25rem;display:flex;flex-direction:column;gap:0.75rem">
      <span style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#737373">CAC</span>
      <div style="display:flex;align-items:baseline;gap:0.5rem"><span style="font-size:1.875rem;font-weight:700;letter-spacing:-0.025em;font-variant-numeric:tabular-nums">$89</span><span style="font-size:0.7rem;font-weight:600;color:#f43f5e">↓ -8.1%</span></div>
      <div style="width:100%;height:6px;background:#f5f5f5;border-radius:9999px;overflow:hidden"><div style="height:100%;width:35%;background:#fb7185;border-radius:9999px"></div></div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "filter-bar-chips",
    title: "Filter Bar with Chips",
    description: "Dense filter bar combining search, removable filter chips, clear-all action, and saved views dropdown with live result count.",
    category: "Data Density",
    tags: ["filter", "chips", "search", "toolbar", "data-density"],
    style: "",
    code: `export default function FilterBarChips() {
  return (
    <div className="p-8 bg-neutral-50 min-h-[300px] flex flex-col gap-4">
      <div className="bg-white border border-neutral-200 rounded-lg p-4 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 border border-neutral-300 rounded-md px-3 py-1.5 bg-white min-w-[200px]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Search..." className="border-none outline-none text-sm flex-1 bg-transparent" />
        </div>
        <div className="flex items-center gap-2 flex-wrap flex-1">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-xs font-medium">Status: Active <button className="hover:text-blue-900">×</button></span>
          <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-3 py-1 text-xs font-medium">Type: Enterprise <button className="hover:text-purple-900">×</button></span>
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 text-xs font-medium">Region: US <button className="hover:text-amber-900">×</button></span>
          <button className="text-xs text-neutral-500 hover:text-neutral-700 ml-1">Clear all</button>
        </div>
        <button className="flex items-center gap-1.5 border border-neutral-300 rounded-md px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50">
          Saved Views ▾
        </button>
      </div>
      <div className="text-sm text-neutral-500 px-1">Showing <strong className="text-neutral-800">147</strong> of 2,841 results</div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#fafafa;min-height:300px;font-family:system-ui,-apple-system,sans-serif;display:flex;flex-direction:column;gap:1rem">
  <div style="background:white;border:1px solid #e5e5e5;border-radius:0.5rem;padding:1rem;display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap">
    <div style="display:flex;align-items:center;gap:0.5rem;border:1px solid #d4d4d4;border-radius:0.375rem;padding:0.375rem 0.75rem;background:white;min-width:200px">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" placeholder="Search..." style="border:none;outline:none;font-size:0.875rem;flex:1;background:transparent;font-family:inherit" />
    </div>
    <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;flex:1">
      <span style="display:inline-flex;align-items:center;gap:0.375rem;background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;border-radius:9999px;padding:0.25rem 0.75rem;font-size:0.7rem;font-weight:500">Status: Active <span style="cursor:pointer;font-size:0.8rem">×</span></span>
      <span style="display:inline-flex;align-items:center;gap:0.375rem;background:#faf5ff;color:#7e22ce;border:1px solid #e9d5ff;border-radius:9999px;padding:0.25rem 0.75rem;font-size:0.7rem;font-weight:500">Type: Enterprise <span style="cursor:pointer;font-size:0.8rem">×</span></span>
      <span style="display:inline-flex;align-items:center;gap:0.375rem;background:#fffbeb;color:#b45309;border:1px solid #fde68a;border-radius:9999px;padding:0.25rem 0.75rem;font-size:0.7rem;font-weight:500">Region: US <span style="cursor:pointer;font-size:0.8rem">×</span></span>
      <span style="font-size:0.7rem;color:#737373;cursor:pointer;margin-left:0.25rem">Clear all</span>
    </div>
    <button style="display:flex;align-items:center;gap:0.375rem;border:1px solid #d4d4d4;border-radius:0.375rem;padding:0.375rem 0.75rem;font-size:0.7rem;font-weight:500;color:#525252;background:white;cursor:pointer;font-family:inherit">Saved Views ▾</button>
  </div>
  <div style="font-size:0.875rem;color:#737373;padding-left:0.25rem">Showing <strong style="color:#262626">147</strong> of 2,841 results</div>
</div>`,
  },
  {
    slug: "activity-log-timeline",
    title: "Activity Log / Audit Trail",
    description: "Vertical timeline audit trail with timestamps, actor names, event types, and alternating row backgrounds for scanability.",
    category: "Data Density",
    tags: ["timeline", "audit", "log", "activity", "data-density"],
    style: "",
    code: `export default function ActivityLogTimeline() {
  const events = [
    { time: "2024-01-15 14:32", actor: "Sarah Chen", action: "created user account", type: "user" },
    { time: "2024-01-15 14:28", actor: "Admin Bot", action: "changed permissions for Editor role", type: "permission" },
    { time: "2024-01-15 13:55", actor: "James Miller", action: 'edited document "Q4 Report"', type: "document" },
    { time: "2024-01-15 12:10", actor: "DevOps Service", action: "generated new API key (prod-****-7f3a)", type: "api" },
    { time: "2024-01-15 11:45", actor: "Maria Garcia", action: "updated notification settings", type: "settings" },
  ];

  return (
    <div className="p-8 bg-white min-h-[300px]">
      <div className="max-w-2xl mx-auto">
        {events.map((e, i) => (
          <div key={i} className={\`flex gap-4 py-4 px-4 \${i % 2 === 0 ? "bg-neutral-50" : "bg-white"} rounded\`}>
            <span className="text-xs text-neutral-400 font-mono w-36 shrink-0 pt-0.5">{e.time}</span>
            <div className="flex flex-col items-center pt-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-blue-200" />
              {i < events.length - 1 && <div className="w-px flex-1 bg-neutral-200 mt-1" />}
            </div>
            <div className="text-sm text-neutral-700 pb-2">
              <strong className="text-neutral-900">{e.actor}</strong> {e.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:white;min-height:300px;font-family:system-ui,-apple-system,sans-serif">
  <div style="max-width:40rem;margin:0 auto">
    <div style="display:flex;gap:1rem;padding:1rem;background:#fafafa;border-radius:0.375rem">
      <span style="font-size:0.7rem;color:#a3a3a3;font-family:monospace;width:9rem;flex-shrink:0;padding-top:2px">2024-01-15 14:32</span>
      <div style="display:flex;flex-direction:column;align-items:center;padding-top:6px">
        <div style="width:10px;height:10px;border-radius:9999px;background:#3b82f6;border:2px solid #bfdbfe;flex-shrink:0"></div>
        <div style="width:1px;flex:1;background:#e5e5e5;margin-top:4px"></div>
      </div>
      <div style="font-size:0.875rem;color:#404040;padding-bottom:0.5rem"><strong style="color:#171717">Sarah Chen</strong> created user account</div>
    </div>
    <div style="display:flex;gap:1rem;padding:1rem;background:white;border-radius:0.375rem">
      <span style="font-size:0.7rem;color:#a3a3a3;font-family:monospace;width:9rem;flex-shrink:0;padding-top:2px">2024-01-15 14:28</span>
      <div style="display:flex;flex-direction:column;align-items:center;padding-top:6px">
        <div style="width:10px;height:10px;border-radius:9999px;background:#3b82f6;border:2px solid #bfdbfe;flex-shrink:0"></div>
        <div style="width:1px;flex:1;background:#e5e5e5;margin-top:4px"></div>
      </div>
      <div style="font-size:0.875rem;color:#404040;padding-bottom:0.5rem"><strong style="color:#171717">Admin Bot</strong> changed permissions for Editor role</div>
    </div>
    <div style="display:flex;gap:1rem;padding:1rem;background:#fafafa;border-radius:0.375rem">
      <span style="font-size:0.7rem;color:#a3a3a3;font-family:monospace;width:9rem;flex-shrink:0;padding-top:2px">2024-01-15 13:55</span>
      <div style="display:flex;flex-direction:column;align-items:center;padding-top:6px">
        <div style="width:10px;height:10px;border-radius:9999px;background:#3b82f6;border:2px solid #bfdbfe;flex-shrink:0"></div>
        <div style="width:1px;flex:1;background:#e5e5e5;margin-top:4px"></div>
      </div>
      <div style="font-size:0.875rem;color:#404040;padding-bottom:0.5rem"><strong style="color:#171717">James Miller</strong> edited document "Q4 Report"</div>
    </div>
    <div style="display:flex;gap:1rem;padding:1rem;background:white;border-radius:0.375rem">
      <span style="font-size:0.7rem;color:#a3a3a3;font-family:monospace;width:9rem;flex-shrink:0;padding-top:2px">2024-01-15 12:10</span>
      <div style="display:flex;flex-direction:column;align-items:center;padding-top:6px">
        <div style="width:10px;height:10px;border-radius:9999px;background:#3b82f6;border:2px solid #bfdbfe;flex-shrink:0"></div>
        <div style="width:1px;flex:1;background:#e5e5e5;margin-top:4px"></div>
      </div>
      <div style="font-size:0.875rem;color:#404040;padding-bottom:0.5rem"><strong style="color:#171717">DevOps Service</strong> generated new API key (prod-****-7f3a)</div>
    </div>
    <div style="display:flex;gap:1rem;padding:1rem;background:#fafafa;border-radius:0.375rem">
      <span style="font-size:0.7rem;color:#a3a3a3;font-family:monospace;width:9rem;flex-shrink:0;padding-top:2px">2024-01-15 11:45</span>
      <div style="display:flex;flex-direction:column;align-items:center;padding-top:6px">
        <div style="width:10px;height:10px;border-radius:9999px;background:#3b82f6;border:2px solid #bfdbfe;flex-shrink:0"></div>
      </div>
      <div style="font-size:0.875rem;color:#404040;padding-bottom:0.5rem"><strong style="color:#171717">Maria Garcia</strong> updated notification settings</div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "export-pattern-ui",
    title: "Export Pattern",
    description: "Complete data export UI with format selection, date range picker, column toggles, primary action, and recent exports history.",
    category: "Data Density",
    tags: ["export", "form", "data", "download", "data-density"],
    style: "",
    code: `export default function ExportPatternUI() {
  return (
    <div className="p-8 bg-neutral-100 min-h-[300px] flex items-start justify-center">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm w-full max-w-lg p-6 flex flex-col gap-5">
        <h3 className="text-lg font-semibold text-neutral-900">Export Data</h3>
        <div>
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2 block">Format</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="fmt" checked className="accent-blue-600" /> CSV</label>
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="fmt" /> JSON</label>
            <label className="flex items-center gap-2 text-sm"><input type="radio" name="fmt" /> PDF</label>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2 block">Date Range</label>
          <div className="flex items-center gap-2">
            <input type="date" value="2024-01-01" className="border rounded-md px-3 py-1.5 text-sm" />
            <span className="text-sm text-neutral-400">to</span>
            <input type="date" value="2024-01-31" className="border rounded-md px-3 py-1.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2 block">Columns</label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked /> Name</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked /> Email</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked /> Status</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked /> Created</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Phone</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Address</label>
          </div>
        </div>
        <button className="bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700">Export</button>
        <div className="border-t pt-4">
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-3">Recent Exports</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-700">users_export_Jan15.csv</span>
              <div className="flex items-center gap-3">
                <span className="text-neutral-400 text-xs">2.4 MB</span>
                <a href="#" className="text-blue-600 text-xs font-medium">Download</a>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-700">users_export_Jan08.csv</span>
              <div className="flex items-center gap-3">
                <span className="text-neutral-400 text-xs">1.8 MB</span>
                <a href="#" className="text-blue-600 text-xs font-medium">Download</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#f5f5f5;min-height:300px;display:flex;align-items:flex-start;justify-content:center;font-family:system-ui,-apple-system,sans-serif">
  <div style="background:white;border-radius:0.75rem;border:1px solid #e5e5e5;box-shadow:0 1px 3px rgba(0,0,0,0.05);width:100%;max-width:28rem;padding:1.5rem;display:flex;flex-direction:column;gap:1.25rem">
    <h3 style="font-size:1.125rem;font-weight:600;color:#171717;margin:0">Export Data</h3>
    <div>
      <div style="font-size:0.7rem;font-weight:500;color:#737373;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem">Format</div>
      <div style="display:flex;gap:1rem">
        <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;cursor:pointer"><input type="radio" name="fmt" checked style="accent-color:#2563eb" /> CSV</label>
        <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;cursor:pointer"><input type="radio" name="fmt" /> JSON</label>
        <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;cursor:pointer"><input type="radio" name="fmt" /> PDF</label>
      </div>
    </div>
    <div>
      <div style="font-size:0.7rem;font-weight:500;color:#737373;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem">Date Range</div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <input type="date" value="2024-01-01" style="border:1px solid #d4d4d4;border-radius:0.375rem;padding:0.375rem 0.75rem;font-size:0.875rem;font-family:inherit" />
        <span style="font-size:0.875rem;color:#a3a3a3">to</span>
        <input type="date" value="2024-01-31" style="border:1px solid #d4d4d4;border-radius:0.375rem;padding:0.375rem 0.75rem;font-size:0.875rem;font-family:inherit" />
      </div>
    </div>
    <div>
      <div style="font-size:0.7rem;font-weight:500;color:#737373;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem">Columns</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem">
        <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem"><input type="checkbox" checked /> Name</label>
        <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem"><input type="checkbox" checked /> Email</label>
        <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem"><input type="checkbox" checked /> Status</label>
        <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem"><input type="checkbox" checked /> Created</label>
        <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem"><input type="checkbox" /> Phone</label>
        <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.875rem"><input type="checkbox" /> Address</label>
      </div>
    </div>
    <button style="background:#2563eb;color:white;border-radius:0.5rem;padding:0.625rem;font-size:0.875rem;font-weight:500;border:none;cursor:pointer;font-family:inherit">Export</button>
    <div style="border-top:1px solid #e5e5e5;padding-top:1rem">
      <div style="font-size:0.7rem;font-weight:500;color:#737373;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem">Recent Exports</div>
      <div style="display:flex;flex-direction:column;gap:0.5rem">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.875rem">
          <span style="color:#404040">users_export_Jan15.csv</span>
          <div style="display:flex;align-items:center;gap:0.75rem"><span style="color:#a3a3a3;font-size:0.7rem">2.4 MB</span><a href="#" style="color:#2563eb;font-size:0.7rem;font-weight:500;text-decoration:none">Download</a></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.875rem">
          <span style="color:#404040">users_export_Jan08.csv</span>
          <div style="display:flex;align-items:center;gap:0.75rem"><span style="color:#a3a3a3;font-size:0.7rem">1.8 MB</span><a href="#" style="color:#2563eb;font-size:0.7rem;font-weight:500;text-decoration:none">Download</a></div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "review-queue-list",
    title: "Review Queue",
    description: "Content moderation review queue with pending/flagged counts, item cards with thumbnails, metadata, flag reasons, and approve/deny actions.",
    category: "Admin",
    tags: ["review", "moderation", "queue", "admin", "content"],
    style: "",
    code: `export default function ReviewQueueList() {
  const items = [
    { id: 1, title: "Summer Collection Banner", submitter: "Alex Rivera", date: "Jan 15, 2024", reason: "Copyright concern", selected: true },
    { id: 2, title: "Product Launch Video", submitter: "Jordan Lee", date: "Jan 14, 2024", reason: "Misleading content", selected: false },
    { id: 3, title: "User Testimonial Post", submitter: "Casey Kim", date: "Jan 14, 2024", reason: "Inappropriate language", selected: false },
    { id: 4, title: "Holiday Promo Graphic", submitter: "Morgan Chen", date: "Jan 13, 2024", reason: "Brand guideline violation", selected: false },
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-[300px]">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Content Review</h2>
          <div className="flex gap-3 text-sm">
            <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-medium">Pending: 12</span>
            <span className="bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full font-medium">Flagged: 3</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.id} className={\`bg-white rounded-lg border p-4 flex items-center gap-4 \${item.selected ? "border-l-4 border-l-blue-500 border-neutral-200" : "border-neutral-200"}\`}>
              <div className="w-12 h-12 rounded-lg bg-neutral-200 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{item.title}</div>
                <div className="text-xs text-neutral-500">{item.submitter} · {item.date}</div>
                <div className="text-xs text-red-600 mt-1">{item.reason}</div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md hover:bg-emerald-100">Approve</button>
                <button className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100">Deny</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#fafafa;min-height:300px;font-family:system-ui,-apple-system,sans-serif">
  <div style="max-width:40rem;margin:0 auto">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">
      <h2 style="font-size:1.25rem;font-weight:600;margin:0">Content Review</h2>
      <div style="display:flex;gap:0.75rem;font-size:0.875rem">
        <span style="background:#fef3c7;color:#92400e;padding:0.125rem 0.625rem;border-radius:9999px;font-weight:500;font-size:0.75rem">Pending: 12</span>
        <span style="background:#fee2e2;color:#991b1b;padding:0.125rem 0.625rem;border-radius:9999px;font-weight:500;font-size:0.75rem">Flagged: 3</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:0.5rem">
      <div style="background:white;border-radius:0.5rem;border:1px solid #e5e5e5;border-left:4px solid #3b82f6;padding:1rem;display:flex;align-items:center;gap:1rem">
        <div style="width:3rem;height:3rem;border-radius:0.5rem;background:#e5e5e5;flex-shrink:0"></div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:500;font-size:0.875rem;color:#171717">Summer Collection Banner</div>
          <div style="font-size:0.7rem;color:#737373">Alex Rivera · Jan 15, 2024</div>
          <div style="font-size:0.7rem;color:#dc2626;margin-top:0.25rem">Copyright concern</div>
        </div>
        <div style="display:flex;gap:0.5rem;flex-shrink:0">
          <button style="padding:0.375rem 0.75rem;font-size:0.7rem;font-weight:500;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;border-radius:0.375rem;cursor:pointer;font-family:inherit">Approve</button>
          <button style="padding:0.375rem 0.75rem;font-size:0.7rem;font-weight:500;background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;border-radius:0.375rem;cursor:pointer;font-family:inherit">Deny</button>
        </div>
      </div>
      <div style="background:white;border-radius:0.5rem;border:1px solid #e5e5e5;padding:1rem;display:flex;align-items:center;gap:1rem">
        <div style="width:3rem;height:3rem;border-radius:0.5rem;background:#e5e5e5;flex-shrink:0"></div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:500;font-size:0.875rem;color:#171717">Product Launch Video</div>
          <div style="font-size:0.7rem;color:#737373">Jordan Lee · Jan 14, 2024</div>
          <div style="font-size:0.7rem;color:#dc2626;margin-top:0.25rem">Misleading content</div>
        </div>
        <div style="display:flex;gap:0.5rem;flex-shrink:0">
          <button style="padding:0.375rem 0.75rem;font-size:0.7rem;font-weight:500;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;border-radius:0.375rem;cursor:pointer;font-family:inherit">Approve</button>
          <button style="padding:0.375rem 0.75rem;font-size:0.7rem;font-weight:500;background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;border-radius:0.375rem;cursor:pointer;font-family:inherit">Deny</button>
        </div>
      </div>
      <div style="background:white;border-radius:0.5rem;border:1px solid #e5e5e5;padding:1rem;display:flex;align-items:center;gap:1rem">
        <div style="width:3rem;height:3rem;border-radius:0.5rem;background:#e5e5e5;flex-shrink:0"></div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:500;font-size:0.875rem;color:#171717">User Testimonial Post</div>
          <div style="font-size:0.7rem;color:#737373">Casey Kim · Jan 14, 2024</div>
          <div style="font-size:0.7rem;color:#dc2626;margin-top:0.25rem">Inappropriate language</div>
        </div>
        <div style="display:flex;gap:0.5rem;flex-shrink:0">
          <button style="padding:0.375rem 0.75rem;font-size:0.7rem;font-weight:500;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;border-radius:0.375rem;cursor:pointer;font-family:inherit">Approve</button>
          <button style="padding:0.375rem 0.75rem;font-size:0.7rem;font-weight:500;background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;border-radius:0.375rem;cursor:pointer;font-family:inherit">Deny</button>
        </div>
      </div>
      <div style="background:white;border-radius:0.5rem;border:1px solid #e5e5e5;padding:1rem;display:flex;align-items:center;gap:1rem">
        <div style="width:3rem;height:3rem;border-radius:0.5rem;background:#e5e5e5;flex-shrink:0"></div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:500;font-size:0.875rem;color:#171717">Holiday Promo Graphic</div>
          <div style="font-size:0.7rem;color:#737373">Morgan Chen · Jan 13, 2024</div>
          <div style="font-size:0.7rem;color:#dc2626;margin-top:0.25rem">Brand guideline violation</div>
        </div>
        <div style="display:flex;gap:0.5rem;flex-shrink:0">
          <button style="padding:0.375rem 0.75rem;font-size:0.7rem;font-weight:500;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;border-radius:0.375rem;cursor:pointer;font-family:inherit">Approve</button>
          <button style="padding:0.375rem 0.75rem;font-size:0.7rem;font-weight:500;background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;border-radius:0.375rem;cursor:pointer;font-family:inherit">Deny</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "role-permissions-editor",
    title: "Role Permissions Editor",
    description: "RBAC permissions matrix with selectable role list and feature×action toggle grid for granular access control.",
    category: "Admin",
    tags: ["rbac", "permissions", "roles", "admin", "security"],
    style: "",
    code: `export default function RolePermissionsEditor() {
  const roles = ["Owner", "Admin", "Editor", "Viewer"];
  const features = ["Dashboard", "Users", "Content", "Billing", "Settings"];
  const actions = ["View", "Create", "Edit", "Delete"];
  const perms: Record<string, boolean[]> = {
    Dashboard: [true, true, true, false],
    Users: [true, true, true, true],
    Content: [true, true, true, false],
    Billing: [true, false, false, false],
    Settings: [true, false, true, false],
  };

  return (
    <div className="p-8 bg-neutral-50 min-h-[300px]">
      <div className="max-w-3xl mx-auto flex gap-6">
        <div className="w-48 shrink-0">
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Roles</div>
          <div className="flex flex-col gap-1">
            {roles.map((r) => (
              <div key={r} className={\`px-3 py-2 rounded-md text-sm font-medium cursor-pointer \${r === "Admin" ? "bg-blue-600 text-white" : "text-neutral-600 hover:bg-neutral-100"}\`}>{r}</div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-xs font-medium text-neutral-500 uppercase">Feature</th>
                {actions.map((a) => <th key={a} className="text-center py-2 text-xs font-medium text-neutral-500 uppercase">{a}</th>)}
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f} className="border-b border-neutral-100">
                  <td className="py-3 font-medium text-neutral-800">{f}</td>
                  {perms[f].map((on, i) => (
                    <td key={i} className="text-center py-3">
                      <div className={\`w-9 h-5 rounded-full mx-auto cursor-pointer \${on ? "bg-blue-600" : "bg-neutral-200"}\`} style={{ position: "relative" }}>
                        <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 shadow" style={{ left: on ? "1.1rem" : "0.15rem" }} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#fafafa;min-height:300px;font-family:system-ui,-apple-system,sans-serif">
  <div style="max-width:48rem;margin:0 auto;display:flex;gap:1.5rem">
    <div style="width:12rem;flex-shrink:0">
      <div style="font-size:0.7rem;font-weight:500;color:#737373;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem">Roles</div>
      <div style="display:flex;flex-direction:column;gap:0.25rem">
        <div style="padding:0.5rem 0.75rem;border-radius:0.375rem;font-size:0.875rem;font-weight:500;color:#525252;cursor:pointer">Owner</div>
        <div style="padding:0.5rem 0.75rem;border-radius:0.375rem;font-size:0.875rem;font-weight:500;background:#2563eb;color:white;cursor:pointer">Admin</div>
        <div style="padding:0.5rem 0.75rem;border-radius:0.375rem;font-size:0.875rem;font-weight:500;color:#525252;cursor:pointer">Editor</div>
        <div style="padding:0.5rem 0.75rem;border-radius:0.375rem;font-size:0.875rem;font-weight:500;color:#525252;cursor:pointer">Viewer</div>
      </div>
    </div>
    <div style="flex:1">
      <table style="width:100%;font-size:0.875rem;border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid #e5e5e5">
            <th style="text-align:left;padding:0.5rem 0;font-size:0.7rem;font-weight:500;color:#737373;text-transform:uppercase">Feature</th>
            <th style="text-align:center;padding:0.5rem 0;font-size:0.7rem;font-weight:500;color:#737373;text-transform:uppercase">View</th>
            <th style="text-align:center;padding:0.5rem 0;font-size:0.7rem;font-weight:500;color:#737373;text-transform:uppercase">Create</th>
            <th style="text-align:center;padding:0.5rem 0;font-size:0.7rem;font-weight:500;color:#737373;text-transform:uppercase">Edit</th>
            <th style="text-align:center;padding:0.5rem 0;font-size:0.7rem;font-weight:500;color:#737373;text-transform:uppercase">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid #f5f5f5">
            <td style="padding:0.75rem 0;font-weight:500;color:#262626">Dashboard</td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#2563eb;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:1.1rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#2563eb;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:1.1rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#2563eb;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:1.1rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#e5e5e5;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:0.15rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
          </tr>
          <tr style="border-bottom:1px solid #f5f5f5">
            <td style="padding:0.75rem 0;font-weight:500;color:#262626">Users</td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#2563eb;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:1.1rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#2563eb;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:1.1rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#2563eb;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:1.1rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#2563eb;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:1.1rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
          </tr>
          <tr style="border-bottom:1px solid #f5f5f5">
            <td style="padding:0.75rem 0;font-weight:500;color:#262626">Content</td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#2563eb;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:1.1rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#2563eb;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:1.1rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#2563eb;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:1.1rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#e5e5e5;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:0.15rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
          </tr>
          <tr style="border-bottom:1px solid #f5f5f5">
            <td style="padding:0.75rem 0;font-weight:500;color:#262626">Billing</td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#2563eb;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:1.1rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#e5e5e5;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:0.15rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#e5e5e5;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:0.15rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#e5e5e5;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:0.15rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
          </tr>
          <tr>
            <td style="padding:0.75rem 0;font-weight:500;color:#262626">Settings</td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#2563eb;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:1.1rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#e5e5e5;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:0.15rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#2563eb;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:1.1rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
            <td style="text-align:center;padding:0.75rem 0"><div style="width:2.25rem;height:1.25rem;border-radius:9999px;background:#e5e5e5;position:relative;margin:0 auto"><div style="width:1rem;height:1rem;border-radius:9999px;background:white;position:absolute;top:0.125rem;left:0.15rem;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`,
  },
  {
    slug: "user-admin-profile",
    title: "User Admin Profile View",
    description: "Administrative user profile with avatar, status/role badges, info grid, action buttons (suspend, ban, reset, impersonate), and notes section.",
    category: "Admin",
    tags: ["user", "profile", "admin", "moderation", "management"],
    style: "",
    code: `export default function UserAdminProfile() {
  return (
    <div className="p-8 bg-neutral-50 min-h-[300px]">
      <div className="max-w-2xl mx-auto bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">JD</div>
            <div>
              <h2 className="text-lg font-semibold">Jane Doe</h2>
              <p className="text-sm text-neutral-500">jane.doe@example.com</p>
              <div className="flex gap-2 mt-1">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-0.5 rounded-full">Active</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">Editor</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-b border-neutral-100 grid grid-cols-2 gap-4">
          <div><div className="text-xs text-neutral-500 mb-1">Join Date</div><div className="text-sm font-medium">March 12, 2023</div></div>
          <div><div className="text-xs text-neutral-500 mb-1">Last Login</div><div className="text-sm font-medium">Jan 15, 2024 at 2:34 PM</div></div>
          <div><div className="text-xs text-neutral-500 mb-1">IP Address</div><div className="text-sm font-mono">192.168.1.42</div></div>
          <div><div className="text-xs text-neutral-500 mb-1">Sessions</div><div className="text-sm font-medium">3 active</div></div>
        </div>
        <div className="p-6 border-b border-neutral-100 flex flex-wrap gap-2">
          <button className="px-4 py-2 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-lg">Suspend</button>
          <button className="px-4 py-2 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded-lg">Ban</button>
          <button className="px-4 py-2 text-xs font-medium bg-neutral-50 text-neutral-700 border border-neutral-200 rounded-lg">Reset Password</button>
          <button className="px-4 py-2 text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 rounded-lg">Impersonate</button>
        </div>
        <div className="p-6">
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Admin Notes</div>
          <textarea className="w-full border border-neutral-200 rounded-lg p-3 text-sm resize-none" rows={3} placeholder="Add a note about this user..." />
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg">Add Note</button>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#fafafa;min-height:300px;font-family:system-ui,-apple-system,sans-serif">
  <div style="max-width:40rem;margin:0 auto;background:white;border-radius:0.75rem;border:1px solid #e5e5e5;box-shadow:0 1px 3px rgba(0,0,0,0.05);overflow:hidden">
    <div style="padding:1.5rem;border-bottom:1px solid #f5f5f5">
      <div style="display:flex;align-items:center;gap:1rem">
        <div style="width:4rem;height:4rem;border-radius:9999px;background:linear-gradient(135deg,#60a5fa,#a855f7);display:flex;align-items:center;justify-content:center;color:white;font-size:1.25rem;font-weight:700;flex-shrink:0">JD</div>
        <div>
          <h2 style="font-size:1.125rem;font-weight:600;margin:0">Jane Doe</h2>
          <p style="font-size:0.875rem;color:#737373;margin:0.125rem 0 0.375rem">jane.doe@example.com</p>
          <div style="display:flex;gap:0.5rem">
            <span style="background:#ecfdf5;color:#065f46;font-size:0.7rem;font-weight:500;padding:0.125rem 0.5rem;border-radius:9999px">Active</span>
            <span style="background:#eff6ff;color:#1e40af;font-size:0.7rem;font-weight:500;padding:0.125rem 0.5rem;border-radius:9999px">Editor</span>
          </div>
        </div>
      </div>
    </div>
    <div style="padding:1.5rem;border-bottom:1px solid #f5f5f5;display:grid;grid-template-columns:1fr 1fr;gap:1rem">
      <div><div style="font-size:0.7rem;color:#737373;margin-bottom:0.25rem">Join Date</div><div style="font-size:0.875rem;font-weight:500">March 12, 2023</div></div>
      <div><div style="font-size:0.7rem;color:#737373;margin-bottom:0.25rem">Last Login</div><div style="font-size:0.875rem;font-weight:500">Jan 15, 2024 at 2:34 PM</div></div>
      <div><div style="font-size:0.7rem;color:#737373;margin-bottom:0.25rem">IP Address</div><div style="font-size:0.875rem;font-family:monospace">192.168.1.42</div></div>
      <div><div style="font-size:0.7rem;color:#737373;margin-bottom:0.25rem">Sessions</div><div style="font-size:0.875rem;font-weight:500">3 active</div></div>
    </div>
    <div style="padding:1.5rem;border-bottom:1px solid #f5f5f5;display:flex;flex-wrap:wrap;gap:0.5rem">
      <button style="padding:0.5rem 1rem;font-size:0.7rem;font-weight:500;background:#fffbeb;color:#b45309;border:1px solid #fde68a;border-radius:0.5rem;cursor:pointer;font-family:inherit">Suspend</button>
      <button style="padding:0.5rem 1rem;font-size:0.7rem;font-weight:500;background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;border-radius:0.5rem;cursor:pointer;font-family:inherit">Ban</button>
      <button style="padding:0.5rem 1rem;font-size:0.7rem;font-weight:500;background:#fafafa;color:#404040;border:1px solid #e5e5e5;border-radius:0.5rem;cursor:pointer;font-family:inherit">Reset Password</button>
      <button style="padding:0.5rem 1rem;font-size:0.7rem;font-weight:500;background:#faf5ff;color:#7e22ce;border:1px solid #e9d5ff;border-radius:0.5rem;cursor:pointer;font-family:inherit">Impersonate</button>
    </div>
    <div style="padding:1.5rem">
      <div style="font-size:0.7rem;font-weight:500;color:#737373;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem">Admin Notes</div>
      <textarea style="width:100%;border:1px solid #e5e5e5;border-radius:0.5rem;padding:0.75rem;font-size:0.875rem;resize:none;font-family:inherit;box-sizing:border-box" rows="3" placeholder="Add a note about this user..."></textarea>
      <button style="margin-top:0.5rem;padding:0.5rem 1rem;background:#2563eb;color:white;font-size:0.7rem;font-weight:500;border-radius:0.5rem;border:none;cursor:pointer;font-family:inherit">Add Note</button>
    </div>
  </div>
</div>`,
  },
  {
    slug: "report-detail-page",
    title: "Report Detail Page",
    description: "Moderation report detail with severity badge, reporter/reported info, evidence block, action timeline, and resolution buttons.",
    category: "Admin",
    tags: ["report", "moderation", "detail", "admin", "abuse"],
    style: "",
    code: `export default function ReportDetailPage() {
  return (
    <div className="p-8 bg-neutral-50 min-h-[300px]">
      <div className="max-w-2xl mx-auto bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">Report #1247</h2>
            <span className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-0.5 rounded-full">High</span>
          </div>
          <span className="text-xs text-neutral-400">Filed Jan 14, 2024</span>
        </div>
        <div className="p-6 border-b border-neutral-100 grid grid-cols-2 gap-6">
          <div>
            <div className="text-xs text-neutral-500 mb-2 font-medium uppercase tracking-wide">Reporter</div>
            <div className="text-sm font-medium">Alice Johnson</div>
            <div className="text-xs text-neutral-400">alice@example.com</div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 mb-2 font-medium uppercase tracking-wide">Reported User</div>
            <div className="text-sm font-medium">Bob Smith</div>
            <div className="text-xs text-neutral-400">bob.smith@example.com</div>
          </div>
        </div>
        <div className="p-6 border-b border-neutral-100">
          <div className="text-xs text-neutral-500 mb-2 font-medium uppercase tracking-wide">Reason</div>
          <p className="text-sm text-neutral-700">Harassment and threatening behavior in community forum</p>
          <div className="text-xs text-neutral-500 mt-4 mb-2 font-medium uppercase tracking-wide">Evidence</div>
          <blockquote className="border-l-4 border-red-200 bg-red-50 px-4 py-3 text-sm text-neutral-700 italic rounded-r-lg">
            "You better watch out, I know where you work and I'll make sure everyone knows what you really are..."
          </blockquote>
        </div>
        <div className="p-6 border-b border-neutral-100">
          <div className="text-xs text-neutral-500 mb-3 font-medium uppercase tracking-wide">Timeline</div>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 text-sm"><div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" /><div><span className="text-neutral-400 text-xs">Jan 14, 10:23 AM</span> — Report submitted by Alice Johnson</div></div>
            <div className="flex items-start gap-3 text-sm"><div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" /><div><span className="text-neutral-400 text-xs">Jan 14, 11:05 AM</span> — Assigned to moderator @admin_mike</div></div>
            <div className="flex items-start gap-3 text-sm"><div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" /><div><span className="text-neutral-400 text-xs">Jan 14, 2:15 PM</span> — Evidence reviewed, escalated to High severity</div></div>
          </div>
        </div>
        <div className="p-6 flex items-center gap-3">
          <span className="text-xs text-neutral-500 font-medium mr-2">Resolution:</span>
          <button className="px-4 py-2 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-lg">Warning</button>
          <button className="px-4 py-2 text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200 rounded-lg">Suspend 7d</button>
          <button className="px-4 py-2 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded-lg">Ban</button>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="padding:2rem;background:#fafafa;min-height:300px;font-family:system-ui,-apple-system,sans-serif">
  <div style="max-width:40rem;margin:0 auto;background:white;border-radius:0.75rem;border:1px solid #e5e5e5;box-shadow:0 1px 3px rgba(0,0,0,0.05);overflow:hidden">
    <div style="padding:1.5rem;border-bottom:1px solid #f5f5f5;display:flex;align-items:center;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:0.75rem">
        <h2 style="font-size:1.125rem;font-weight:600;margin:0">Report #1247</h2>
        <span style="background:#fee2e2;color:#991b1b;font-size:0.7rem;font-weight:700;padding:0.125rem 0.625rem;border-radius:9999px">High</span>
      </div>
      <span style="font-size:0.7rem;color:#a3a3a3">Filed Jan 14, 2024</span>
    </div>
    <div style="padding:1.5rem;border-bottom:1px solid #f5f5f5;display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
      <div>
        <div style="font-size:0.7rem;color:#737373;margin-bottom:0.5rem;font-weight:500;text-transform:uppercase;letter-spacing:0.05em">Reporter</div>
        <div style="font-size:0.875rem;font-weight:500">Alice Johnson</div>
        <div style="font-size:0.7rem;color:#a3a3a3">alice@example.com</div>
      </div>
      <div>
        <div style="font-size:0.7rem;color:#737373;margin-bottom:0.5rem;font-weight:500;text-transform:uppercase;letter-spacing:0.05em">Reported User</div>
        <div style="font-size:0.875rem;font-weight:500">Bob Smith</div>
        <div style="font-size:0.7rem;color:#a3a3a3">bob.smith@example.com</div>
      </div>
    </div>
    <div style="padding:1.5rem;border-bottom:1px solid #f5f5f5">
      <div style="font-size:0.7rem;color:#737373;margin-bottom:0.5rem;font-weight:500;text-transform:uppercase;letter-spacing:0.05em">Reason</div>
      <p style="font-size:0.875rem;color:#404040;margin:0">Harassment and threatening behavior in community forum</p>
      <div style="font-size:0.7rem;color:#737373;margin-top:1rem;margin-bottom:0.5rem;font-weight:500;text-transform:uppercase;letter-spacing:0.05em">Evidence</div>
      <blockquote style="border-left:4px solid #fecaca;background:#fef2f2;padding:0.75rem 1rem;font-size:0.875rem;color:#404040;font-style:italic;border-radius:0 0.5rem 0.5rem 0;margin:0">"You better watch out, I know where you work and I'll make sure everyone knows what you really are..."</blockquote>
    </div>
    <div style="padding:1.5rem;border-bottom:1px solid #f5f5f5">
      <div style="font-size:0.7rem;color:#737373;margin-bottom:0.75rem;font-weight:500;text-transform:uppercase;letter-spacing:0.05em">Timeline</div>
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        <div style="display:flex;align-items:flex-start;gap:0.75rem;font-size:0.875rem"><div style="width:8px;height:8px;border-radius:9999px;background:#3b82f6;margin-top:6px;flex-shrink:0"></div><div><span style="color:#a3a3a3;font-size:0.7rem">Jan 14, 10:23 AM</span> — Report submitted by Alice Johnson</div></div>
        <div style="display:flex;align-items:flex-start;gap:0.75rem;font-size:0.875rem"><div style="width:8px;height:8px;border-radius:9999px;background:#f59e0b;margin-top:6px;flex-shrink:0"></div><div><span style="color:#a3a3a3;font-size:0.7rem">Jan 14, 11:05 AM</span> — Assigned to moderator @admin_mike</div></div>
        <div style="display:flex;align-items:flex-start;gap:0.75rem;font-size:0.875rem"><div style="width:8px;height:8px;border-radius:9999px;background:#a855f7;margin-top:6px;flex-shrink:0"></div><div><span style="color:#a3a3a3;font-size:0.7rem">Jan 14, 2:15 PM</span> — Evidence reviewed, escalated to High severity</div></div>
      </div>
    </div>
    <div style="padding:1.5rem;display:flex;align-items:center;gap:0.75rem">
      <span style="font-size:0.7rem;color:#737373;font-weight:500;margin-right:0.5rem">Resolution:</span>
      <button style="padding:0.5rem 1rem;font-size:0.7rem;font-weight:500;background:#fffbeb;color:#b45309;border:1px solid #fde68a;border-radius:0.5rem;cursor:pointer;font-family:inherit">Warning</button>
      <button style="padding:0.5rem 1rem;font-size:0.7rem;font-weight:500;background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;border-radius:0.5rem;cursor:pointer;font-family:inherit">Suspend 7d</button>
      <button style="padding:0.5rem 1rem;font-size:0.7rem;font-weight:500;background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;border-radius:0.5rem;cursor:pointer;font-family:inherit">Ban</button>
    </div>
  </div>
</div>`,
  },
];
