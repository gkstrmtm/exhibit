/**
 * Review Queue
 * Category: Admin
 * Tags: review, moderation, queue, admin, content
 * Description: Content moderation review queue with pending/flagged counts, item cards with thumbnails, metadata, flag reasons, and approve/deny actions.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/review-queue-list.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ReviewQueueList() {
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
            <div key={item.id} className={`bg-white rounded-lg border p-4 flex items-center gap-4 ${item.selected ? "border-l-4 border-l-blue-500 border-neutral-200" : "border-neutral-200"}`}>
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
}