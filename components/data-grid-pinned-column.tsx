/**
 * Data Grid Pinned Column
 * Category: Data Density
 * Tags: table, pinned, sticky, column, scroll, freeze
 * Description: A data table where the first column (row name) is sticky/pinned while all other columns scroll horizontally. A shadow appears on the pinned column edge to indicate more content to the right. Demonstrates the freeze-first-column pattern used in large analytics and finance data grids.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/data-grid-pinned-column.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

const HEADERS = ["Campaign", "Impressions", "Clicks", "CTR", "Conversions", "Conv. Rate", "Cost", "CPC", "ROAS"];

const ROWS = [
  { name: "Brand Awareness Q4", data: ["2.4M", "48,200", "2.01%", "1,840", "3.82%", "$8,200", "$0.17", "4.2x"] },
  { name: "Retargeting – Cart", data: ["860K", "31,500", "3.66%", "2,100", "6.67%", "$4,100", "$0.13", "7.8x"] },
  { name: "Competitor Keywords", data: ["1.1M", "22,000", "2.00%", "660", "3.00%", "$5,500", "$0.25", "3.1x"] },
  { name: "Email Lookalike", data: ["640K", "14,800", "2.31%", "520", "3.51%", "$2,900", "$0.20", "5.4x"] },
  { name: "YouTube Pre-roll", data: ["4.2M", "38,000", "0.90%", "950", "2.50%", "$9,800", "$0.26", "2.8x"] },
];

export default function DataGridPinnedColumn() {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden w-full max-w-lg">
      <div className="px-4 py-2.5 border-b border-neutral-100">
        <span className="text-xs font-semibold text-neutral-700">Ad Performance</span>
        <span className="text-[9px] text-neutral-400 ml-2">← scroll right</span>
      </div>

      <div className="overflow-x-auto relative">
        <table className="text-xs border-collapse w-max min-w-full">
          <thead>
            <tr className="bg-neutral-50">
              {HEADERS.map((h, i) => (
                <th
                  key={h}
                  className={`text-[9px] font-bold text-neutral-400 uppercase tracking-wide whitespace-nowrap border-b border-neutral-200 px-3 py-2 text-left
                    ${i === 0 ? "sticky left-0 bg-neutral-50 z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.08)]" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(({ name, data }) => (
              <tr key={name} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                <td className="sticky left-0 bg-white z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.06)] px-3 py-2 whitespace-nowrap font-medium text-neutral-800 max-w-[140px] truncate">
                  {name}
                </td>
                {data.map((val, i) => (
                  <td key={i} className="px-3 py-2 whitespace-nowrap text-neutral-600 text-right">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
