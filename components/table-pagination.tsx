/**
 * Paginated Table
 * Category: Tables
 * Tags: table, pagination, pages, data, navigation
 * Description: Table with a fully-wired pagination footer — page count, previous/next buttons, and current page display. Self-contained with local state.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/table-pagination.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
const ALL = Array.from({ length: 18 }, (_, i) => ({ id: i + 1, name: `Component ${i + 1}`, views: Math.floor(Math.random() * 2000 + 100) }));
export default function PaginatedTable() {
  const [page, setPage] = useState(1);
  const per = 5;
  const total = Math.ceil(ALL.length / per);
  const rows = ALL.slice((page - 1) * per, page * per);
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden text-sm">
      <table className="w-full"><thead className="bg-neutral-50 border-b border-neutral-100"><tr>
        <th className="text-left px-4 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide">ID</th>
        <th className="text-left px-4 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide">Name</th>
        <th className="text-left px-4 py-2.5 text-xs font-medium text-neutral-400 uppercase tracking-wide">Views</th>
      </tr></thead>
      <tbody>{rows.map(r => (
        <tr key={r.id} className="border-b border-neutral-50 hover:bg-neutral-50">
          <td className="px-4 py-3 font-mono text-xs text-neutral-400">#{r.id}</td>
          <td className="px-4 py-3 text-neutral-700">{r.name}</td>
          <td className="px-4 py-3 text-neutral-500">{r.views.toLocaleString()}</td>
        </tr>
      ))}</tbody></table>
      <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-100 bg-neutral-50">
        <div className="text-xs text-neutral-400">Page {page} of {total}</div>
        <div className="flex gap-1">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 text-xs border border-neutral-200 rounded text-neutral-600 disabled:opacity-40 hover:bg-neutral-100">← Prev</button>
          <button onClick={() => setPage(p => Math.min(total, p + 1))} disabled={page === total} className="px-3 py-1.5 text-xs border border-neutral-200 rounded text-neutral-600 disabled:opacity-40 hover:bg-neutral-100">Next →</button>
        </div>
      </div>
    </div>
  );
}