/**
 * Comparison Table
 * Category: Data Display
 * Tags: comparison, table, features, pricing, check, cross, plans
 * Description: A feature comparison table with plans as columns and feature rows. Cells show checkmarks, crosses, or custom values. The recommended plan column is highlighted. Row categories group related features. Demonstrates the pricing/plan comparison table pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/comparison-table.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
import { Check, X } from "lucide-react";

type CellVal = boolean | string;

interface FeatureRow { label: string; free: CellVal; pro: CellVal; team: CellVal; }
interface RowGroup { heading: string; rows: FeatureRow[]; }

const GROUPS: RowGroup[] = [
  {
    heading: "Core",
    rows: [
      { label: "Projects", free: "3", pro: "Unlimited", team: "Unlimited" },
      { label: "Team members", free: "1", pro: "5", team: "Unlimited" },
      { label: "File storage", free: "1 GB", pro: "20 GB", team: "100 GB" },
    ],
  },
  {
    heading: "Collaboration",
    rows: [
      { label: "Comments", free: true, pro: true, team: true },
      { label: "Guest access", free: false, pro: true, team: true },
      { label: "Advanced permissions", free: false, pro: false, team: true },
    ],
  },
  {
    heading: "Integrations",
    rows: [
      { label: "Slack / Teams", free: false, pro: true, team: true },
      { label: "API access", free: false, pro: true, team: true },
      { label: "SSO / SAML", free: false, pro: false, team: true },
    ],
  },
];

function Cell({ val, highlight }: { val: CellVal; highlight?: boolean }) {
  const base = `flex items-center justify-center px-2 py-2.5 ${highlight ? "bg-blue-50" : ""}`;
  if (typeof val === "boolean") {
    return (
      <div className={base}>
        {val
          ? <Check size={14} className={highlight ? "text-blue-600" : "text-emerald-500"} strokeWidth={2.5} />
          : <X size={13} className="text-neutral-300" strokeWidth={2} />}
      </div>
    );
  }
  return (
    <div className={`${base} text-[11px] font-medium ${highlight ? "text-blue-700" : "text-neutral-600"}`}>
      {val}
    </div>
  );
}

export default function ComparisonTable() {
  return (
    <div className="bg-neutral-50 p-5 rounded-xl w-full max-w-lg overflow-x-auto">
      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">
        Plan comparison
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left text-[10px] text-neutral-400 uppercase tracking-wide pb-2 pr-2 w-[40%]">Feature</th>
            {["Free", "Pro", "Team"].map((plan) => (
              <th key={plan} className={`text-center pb-2 w-[20%] ${plan === "Pro" ? "bg-blue-50 rounded-t-lg" : ""}`}>
                <div className="text-xs font-semibold text-neutral-800">{plan}</div>
                {plan === "Pro" && <div className="text-[9px] font-semibold text-blue-600 uppercase tracking-wide mt-0.5">Recommended</div>}
              </th>
            ))}
          </tr>
        </thead>

        {GROUPS.map((group) => (
          <tbody key={group.heading}>
            <tr>
              <td colSpan={4} className="pt-3 pb-1">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{group.heading}</span>
              </td>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.label} className="border-t border-neutral-100">
                <td className="text-xs text-neutral-700 py-0.5 pr-2">{row.label}</td>
                <Cell val={row.free} />
                <Cell val={row.pro} highlight />
                <Cell val={row.team} />
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
