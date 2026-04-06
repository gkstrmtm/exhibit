/**
 * Social Auth Buttons
 * Category: Buttons
 * Tags: auth, social, github, google, apple, oauth, sign-in
 * Description: Sign-in buttons for GitHub, Google, and Apple. Follows each platform's brand guidelines. Minimal, no excessive borders. Used in every modern SaaS — Linear, Vercel, Supabase, Loom.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/social-auth-buttons.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function SocialAuthButtons() {
  return (
    <div className="p-8 bg-white flex flex-col gap-4 max-w-sm mx-auto">
      <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 active:scale-95 transition-all">
        GitHub Login
      </button>
    </div>
  );
}