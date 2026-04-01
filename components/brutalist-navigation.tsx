/**
 * Brutalist Navigation Bar
 * Category: Navigation
 * Tags: nav, brutalism, navigation, menu
 * Description: Tactile navigation with hard shadows, numbered entries, and bold hover states.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/brutalist-navigation.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function BrutalistNav() {
  const links = ["Index", "Work", "About", "Contact"];
  return (
    <nav className="bg-[#E0E0E0] p-4 font-mono text-sm">
      <ul className="flex flex-col md:flex-row border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {links.map((link, i) => (
          <li key={link} className="flex-1 text-center py-4 border-b-2 md:border-b-0 md:border-r-2 border-black last:border-0 hover:bg-[#FFD700] cursor-pointer transition-colors font-bold uppercase tracking-widest">
            <span className="mr-2 opacity-50">0{i + 1}.</span>{link}
          </li>
        ))}
      </ul>
    </nav>
  );
}