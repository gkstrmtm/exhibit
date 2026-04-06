/**
 * Image Preview Card
 * Category: Cards
 * Tags: card, image, preview, blog, content
 * Description: Media card with an image placeholder, category tag, title, description excerpt, and read-more arrow. Common blog and content listing pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/image-preview-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ImagePreviewCard() {
  return (
    <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden max-w-xs hover:shadow-md transition-shadow">
      <div className="h-36 bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center text-neutral-400 text-3xl">🖼</div>
      <div className="p-4">
        <div className="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full font-medium mb-2">Tutorial</div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-1 leading-snug">Building a design system from scratch</h3>
        <p className="text-xs text-neutral-500 leading-relaxed mb-3">Learn the principles behind scalable component architecture and token-based theming.</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-neutral-200 text-xs flex items-center justify-center font-bold text-neutral-600">M</div>
            <span className="text-xs text-neutral-400">Mia Chen</span>
          </div>
          <button className="text-xs text-neutral-400 hover:text-neutral-700">Read →</button>
        </div>
      </div>
    </div>
  );
}