/**
 * Breadcrumb Navigation
 * Category: Navigation
 * Tags: breadcrumbs, navigation, path, hierarchy, links
 * Description: Three-level breadcrumb trail with chevron separators. Active/inactive color distinction, hover state on links, and truncation at depth.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/breadcrumbs.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function Breadcrumbs() {
  const crumbs = [
    { label: "Settings", href: "#" },
    { label: "API Keys", href: "#" },
    { label: "Production", href: null },
  ];
  return (
    <nav className="flex items-center gap-1.5 text-sm">
      {crumbs.map((c, i) => (
        <div key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-neutral-300">›</span>}
          {c.href ? (
            <a href={c.href} className="text-neutral-500 hover:text-neutral-900 transition-colors">{c.label}</a>
          ) : (
            <span className="text-neutral-900 font-medium">{c.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}