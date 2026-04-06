/**
 * OAuth Button Group
 * Category: Authentication
 * Tags: oauth, social login, Google, GitHub, Apple, authentication
 * Description: Continue with Google, GitHub, and Apple buttons in a clean stacked group. Icon + label layout, border style, no color pollution.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/oauth-button-group.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function OAuthButtons() {
  const providers = [
    { name: "Google", icon: "G" },
    { name: "GitHub", icon: "⌥" },
    { name: "Apple", icon: "⌘" },
  ];
  return (
    <div className="space-y-2.5 max-w-xs mx-auto py-8 px-6">
      <div className="text-sm font-semibold text-neutral-900 text-center mb-5">Continue with</div>
      {providers.map(p => (
        <button key={p.name} className="w-full flex items-center gap-3 px-4 py-2.5 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
          <span className="w-7 h-7 rounded-md bg-neutral-100 flex items-center justify-center text-sm font-bold">{p.icon}</span>
          Continue with {p.name}
        </button>
      ))}
    </div>
  );
}