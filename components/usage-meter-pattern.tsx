/**
 * Usage Meter Pattern
 * Category: Billing
 * Tags: usage, meter, progress, api, billing
 * Description: API usage card with progress bar, endpoint breakdown table, and warning about approaching limits.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/usage-meter-pattern.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function UsageMeter() {
  const endpoints = [
    { name: "/api/users", requests: "3,120", pct: "42.7%" },
    { name: "/api/search", requests: "2,840", pct: "38.9%" },
    { name: "/api/exports", requests: "1,340", pct: "18.4%" },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-[400px] flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm max-w-lg w-full p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">API Usage</h3>
            <p className="text-sm text-slate-400 mt-0.5">Current billing period</p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">Jan 1 – Jan 31</span>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-slate-700">7,300 / 10,000 requests</span>
            <span className="text-slate-400">73%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div className="bg-blue-500 h-3 rounded-full" style={{ width: "73%" }} />
          </div>
        </div>
        <div className="mt-6 mb-4">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Breakdown by Endpoint</div>
          <div className="space-y-2">
            {endpoints.map((ep) => (
              <div key={ep.name} className="flex justify-between items-center text-sm py-2 border-b border-slate-50">
                <span className="font-mono text-slate-600">{ep.name}</span>
                <div className="flex gap-4">
                  <span className="text-slate-700 font-medium">{ep.requests}</span>
                  <span className="text-slate-400 w-12 text-right">{ep.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-4 flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">⚠</span>
          <p className="text-sm text-amber-700">You'll reach your limit in ~8 days at current usage.</p>
        </div>
      </div>
    </div>
  );
}