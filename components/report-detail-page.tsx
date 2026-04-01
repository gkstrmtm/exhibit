/**
 * Report Detail Page
 * Category: Admin
 * Tags: report, moderation, detail, admin, abuse
 * Description: Moderation report detail with severity badge, reporter/reported info, evidence block, action timeline, and resolution buttons.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/report-detail-page.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ReportDetailPage() {
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
}