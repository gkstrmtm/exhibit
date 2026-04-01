/**
 * Bold Editorial Style
 * Category: Style Families
 * Tags: editorial, bold, typography, magazine, hero, style
 * Description: Magazine-inspired editorial layout with massive typography (48px+ headline), strong spacing, and a bold black-and-white palette with one bright orange accent. Features a hero heading and a numbered feature grid.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/style-bold-editorial.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function BoldEditorialStyle() {
  const features = [
    { num: "01", title: "Lightning Fast", desc: "Sub-100ms response times globally" },
    { num: "02", title: "Infinitely Scalable", desc: "From zero to millions of users" },
    { num: "03", title: "Developer First", desc: "APIs designed for humans" },
  ];

  return (
    <div className="min-h-[400px] bg-white p-10 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl font-black tracking-tight leading-[1.05] text-black mb-3">
          Build the future<br/><span className="text-orange-500">without limits.</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-md">The platform that scales with your ambition. Ship faster, iterate smarter.</p>
        <div className="grid grid-cols-3 gap-0 border-t border-black">
          {features.map((f) => (
            <div key={f.num} className="border-r border-black last:border-0 pt-6 pr-6 pb-6">
              <span className="text-4xl font-black text-orange-500">{f.num}</span>
              <h3 className="text-lg font-bold text-black mt-2 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}