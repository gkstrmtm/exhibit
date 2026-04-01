/**
 * Magic Link Flow
 * Category: Authentication
 * Tags: auth, magic-link, email, passwordless, login
 * Description: Two-state magic link authentication flow showing the email input and success confirmation side by side.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/magic-link-flow.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function MagicLinkFlow() {
  return (
    <div className="min-h-[400px] bg-gray-50 flex items-center justify-center p-8 gap-8">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Sign in with email</h2>
        <p className="text-sm text-gray-500 mb-6">We'll send you a magic link to sign in instantly.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input type="email" placeholder="you@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
          </div>
          <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm">Send magic link</button>
        </div>
      </div>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✉️</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Check your inbox</h2>
        <p className="text-sm text-gray-500 mb-6">We sent a link to <strong>user@example.com</strong></p>
        <button className="text-sm text-blue-600 font-medium hover:underline">Resend link</button>
      </div>
    </div>
  );
}