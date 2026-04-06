/**
 * 60-30-10 Button Hierarchy
 * Category: Buttons
 * Tags: 60-30-10, hierarchy, system, primary, secondary, tertiary, design-rule
 * Description: A complete button system built on the 60-30-10 rule: 60% dominant neutral (text + ghost), 30% secondary (outlined, tinted), 10% accent (solid filled CTAs). One primary button per view — everything else recedes.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/60-30-10-button-system.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ButtonHierarchySystem() {
  return (
    <div className="p-8 bg-white">
      <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4">The 60-30-10 button rule</div>
      <p className="text-sm text-neutral-500">60% tertiary text, 30% ghost/tinted, 10% solid CTA</p>
    </div>
  );
}