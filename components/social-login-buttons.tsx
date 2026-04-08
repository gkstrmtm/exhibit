/**
 * Social Login Buttons
 * Category: Authentication
 * Tags: social, login, OAuth, Google, GitHub, SSO, buttons
 * Description: A set of social login / OAuth provider buttons for authentication. Each button has the provider's recognizable mark and name, a hover state, and a loading spinner state triggered on click. An "or continue with email" divider separates social from email login. Demonstrates the social auth button group pattern.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/social-login-buttons.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */
"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

const PROVIDERS = [
  {
    id: "google", name: "Continue with Google",
    logo: (
      <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
        <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    id: "github", name: "Continue with GitHub",
    logo: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    id: "microsoft", name: "Continue with Microsoft",
    logo: (
      <svg width="14" height="14" viewBox="0 0 21 21" fill="none">
        <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
        <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
        <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
        <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
      </svg>
    ),
  },
];

export default function SocialLoginButtons() {
  const [loading, setLoading] = useState<string | null>(null);

  function handleClick(id: string) {
    setLoading(id);
    setTimeout(() => setLoading(null), 2000);
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 w-full max-w-xs space-y-3">
      <div className="text-center">
        <div className="text-sm font-semibold text-neutral-900 mb-0.5">Sign in</div>
        <div className="text-xs text-neutral-500">Choose a provider to continue</div>
      </div>

      <div className="space-y-2">
        {PROVIDERS.map(({ id, name, logo }) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-2.5 border border-neutral-200 rounded-lg px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 disabled:opacity-60 transition-colors"
          >
            {loading === id
              ? <Loader2 size={13} className="animate-spin text-neutral-400" />
              : logo}
            {name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-neutral-200" />
        <span className="text-[10px] text-neutral-400">or continue with email</span>
        <div className="flex-1 h-px bg-neutral-200" />
      </div>

      <input type="email" placeholder="you@example.com" className="w-full text-xs border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:border-neutral-500 transition-colors" />
      <button className="w-full text-xs font-medium bg-neutral-900 text-white rounded-lg py-2 hover:bg-neutral-700 transition-colors">Send magic link</button>
    </div>
  );
}
