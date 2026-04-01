/**
 * Error Pages Set
 * Category: Feedback
 * Tags: error, 404, 500, 403, page, status
 * Description: Three essential error page designs — 403 Forbidden, 404 Not Found, and 500 Server Error — displayed side by side with distinct icons, headings, descriptions, and action buttons.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/error-pages-set.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ErrorPagesSet() {
  const errors = [
    { code: "403", icon: "🔒", title: "Access Denied", desc: "You don't have permission to view this resource." },
    { code: "404", icon: "🔍", title: "Page Not Found", desc: "The page you're looking for doesn't exist." },
    { code: "500", icon: "⚠️", title: "Something Went Wrong", desc: "We're working on fixing this. Please try again later." },
  ];

  return (
    <div className="min-h-[400px] bg-gray-50 p-8 flex items-center justify-center gap-6">
      {errors.map((e) => (
        <div key={e.code} className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 w-64">
          <div className="text-4xl mb-3">{e.icon}</div>
          <div className="text-5xl font-bold text-gray-200 mb-2">{e.code}</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{e.title}</h3>
          <p className="text-sm text-gray-500 mb-6">{e.desc}</p>
          <button className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">Go Home</button>
        </div>
      ))}
    </div>
  );
}