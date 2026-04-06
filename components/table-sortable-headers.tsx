/**
 * Sortable Column Table
 * Category: Tables
 * Tags: table, sortable, sort, columns, data
 * Description: Table with clickable sort-arrow headers. Active column shows filled arrow, others show paired up/down arrows. Clean column sort pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/table-sortable-headers.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

import { useState } from "react";
export default function SortableTable() {
  const [sort, setSort] = useState<{ col: string; dir: "asc" | "desc" }>({ col: "name", dir: "asc" });
  const cols = ["Name","Revenue","Signups","Date"];
  const Arrow = ({ col }: { col: string }) => {
    const active = sort.col === col.toLowerCase();
    return <span className="ml-1 text-neutral-300 text-xs">{active ? (sort.dir === "asc" ? "↑" : "↓") : "↕"}</span>;
  };
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden text-sm">
      <table className="w-full"><thead className="bg-neutral-50 border-b border-neutral-100"><tr>
        {cols.map(c => (
          <th key={c} onClick={() => setSort(s => ({ col: c.toLowerCase(), dir: s.col === c.toLowerCase() && s.dir === "asc" ? "desc" : "asc" }))} className="text-left px-4 py-2.5 text-xs font-medium text-neutral-500 uppercase tracking-wide cursor-pointer select-none hover:text-neutral-800">
            {c}<Arrow col={c} />
          </th>
        ))}
      </tr></thead>
      <tbody>
        {[["Acme Corp","$12,400","341","Apr 2"],["Globex Inc","$8,900","218","Apr 1"],["Initech","$5,200","99","Mar 30"]].map((r, i) => (
          <tr key={i} className="border-b border-neutral-50 hover:bg-neutral-50">
            {r.map((cell, j) => <td key={j} className="px-4 py-3 text-neutral-700">{cell}</td>)}
          </tr>
        ))}
      </tbody></table>
    </div>
  );
}