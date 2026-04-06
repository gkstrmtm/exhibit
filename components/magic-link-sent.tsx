/**
 * Magic Link Sent
 * Category: Authentication
 * Tags: magic link, email, authentication, confirmation, passwordless
 * Description: Post-submit email confirmation state for magic link auth. Envelope icon, inbox instruction, resend link, and wrong-email escape hatch.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/magic-link-sent.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function MagicLinkSent() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-8 max-w-sm mx-auto">
      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-2xl mb-5">📬</div>
      <h2 className="text-base font-semibold text-neutral-900 mb-1.5">Check your inbox</h2>
      <p className="text-sm text-neutral-500 mb-5 leading-relaxed">We sent a sign-in link to <strong className="text-neutral-700">mia@acme.com</strong>. Click it to continue — it expires in 10 minutes.</p>
      <button className="text-sm text-blue-600 hover:underline mb-2">Resend link</button>
      <button className="text-sm text-neutral-400 hover:text-neutral-600">Use a different email →</button>
    </div>
  );
}