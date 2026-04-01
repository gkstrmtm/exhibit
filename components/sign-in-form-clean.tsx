/**
 * Sign In Form
 * Category: Authentication
 * Tags: auth, login, sign-in, form, social
 * Description: Clean, centered sign-in card with email/password fields, social login options, and forgot password link.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/sign-in-form-clean.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function SignInForm() {
  return (
    <div className="min-h-[600px] bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">A</div>
          </div>
          <h2 className="text-xl font-semibold text-center text-gray-900 mb-1">Welcome back</h2>
          <p className="text-sm text-gray-500 text-center mb-6">Sign in to your account to continue</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" placeholder="you@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm pr-16" />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">Show</button>
              </div>
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700">Sign In</button>
          </div>
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
              <span>G</span> Google
            </button>
            <button className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
              <span>⌘</span> GitHub
            </button>
          </div>
          <p className="text-sm text-gray-500 text-center mt-6">
            Don't have an account? <a href="#" className="text-blue-600 font-medium hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}