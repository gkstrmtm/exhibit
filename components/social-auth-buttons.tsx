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
      <div className="text-center mb-2">
        <div className="text-base font-semibold text-neutral-900">Welcome back</div>
        <div className="text-sm text-neutral-500 mt-0.5">Sign in to continue</div>
      </div>
      <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
        Continue with GitHub
      </button>
      <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
        <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continue with Google
      </button>
      <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors">
        <svg className="w-4 h-4 fill-white" viewBox="0 0 814 1000"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-149.3-99.8l-17.1-26.1v-0.5c-80.6-117.8-143.2-294.7-143.2-464.6 0-218.2 141.1-333.7 279.8-333.7 72.3 0 131.4 47.9 176.1 47.9 42.3 0 109.2-50.7 190.5-50.7 34.2 0 130.6 3 192.4 101.3z"/></svg>
        Continue with Apple
      </button>
      <div className="flex items-center gap-3 my-1">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs text-neutral-400 font-medium">or</span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>
      <button className="w-full py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">Continue with email →</button>
    </div>
  );
}