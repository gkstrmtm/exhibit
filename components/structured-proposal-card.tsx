/**
 * Structured Proposal Card
 * Category: Communication
 * Tags: communication, proposal, offer, contract, negotiation
 * Description: A proposal card with project details, timeline, budget, deliverables checklist, and Accept/Decline/Counter action buttons, styled with a blue accent border.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/structured-proposal-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function StructuredProposalCard() {
  const deliverables = [
    "Responsive landing page with animations",
    "Dashboard with 5 interactive widgets",
    "User authentication & settings flow",
  ];
  return (
    <div className="p-8 bg-neutral-100 min-h-[300px] flex items-center justify-center">
      <div className="bg-white rounded-xl border-2 border-blue-200 shadow-sm max-w-md w-full overflow-hidden">
        <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
          <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Project Proposal</div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-1">E-Commerce Redesign</h3>
          <p className="text-sm text-neutral-600 mb-4 leading-relaxed">Complete UI/UX overhaul of the existing storefront, including mobile-first responsive design and performance optimization.</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-neutral-50 rounded-lg p-3">
              <div className="text-xs text-neutral-500 mb-0.5">Timeline</div>
              <div className="text-sm font-semibold">2-3 weeks</div>
            </div>
            <div className="bg-neutral-50 rounded-lg p-3">
              <div className="text-xs text-neutral-500 mb-0.5">Budget</div>
              <div className="text-sm font-semibold">$2,400</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Deliverables</div>
            <div className="flex flex-col gap-2">
              {deliverables.map(d => (
                <div key={d} className="flex items-start gap-2 text-sm">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span className="text-neutral-700">{d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-4 border-t border-neutral-100">
            <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">Accept</button>
            <button className="flex-1 py-2 border border-neutral-200 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors text-neutral-700">Decline</button>
            <button className="flex-1 py-2 border border-indigo-200 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors">Counter</button>
          </div>
        </div>
      </div>
    </div>
  );
}