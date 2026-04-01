export const feedbackStyleExhibits = [
  {
    slug: "toast-system-variants",
    title: "Toast System Variants",
    description: "A complete toast notification system with four severity levels: success, error, warning, and info. Each toast features a colored left border, icon, message, and dismiss button in a top-right stacked layout.",
    category: "Feedback",
    tags: ["toast", "notification", "feedback", "alert", "status"],
    style: "",
    code: `export default function ToastSystemVariants() {
  const toasts = [
    { type: "success", icon: "✓", message: "Changes saved successfully", border: "#22c55e", bg: "#f0fdf4" },
    { type: "error", icon: "×", message: "Failed to save changes", border: "#ef4444", bg: "#fef2f2" },
    { type: "warning", icon: "⚠", message: "API rate limit approaching", border: "#f59e0b", bg: "#fffbeb" },
    { type: "info", icon: "ℹ", message: "New version available", border: "#3b82f6", bg: "#eff6ff" },
  ];

  return (
    <div className="relative min-h-[400px] bg-slate-100 p-8">
      <div className="absolute top-6 right-6 flex flex-col gap-3 w-96">
        {toasts.map((t) => (
          <div
            key={t.type}
            className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg bg-white"
            style={{ borderLeft: \`4px solid \${t.border}\` }}
          >
            <span style={{ color: t.border, fontWeight: 700, fontSize: "1.1rem" }}>{t.icon}</span>
            <span className="flex-1 text-sm text-gray-800 font-medium">{t.message}</span>
            <button className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="position:relative;min-height:400px;background:#f1f5f9;padding:2rem;font-family:system-ui,-apple-system,sans-serif">
  <div style="position:absolute;top:1.5rem;right:1.5rem;display:flex;flex-direction:column;gap:0.75rem;width:22rem">
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;border-radius:0.5rem;background:white;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -4px rgba(0,0,0,0.1);border-left:4px solid #22c55e">
      <span style="color:#22c55e;font-weight:700;font-size:1.1rem">✓</span>
      <span style="flex:1;font-size:0.875rem;color:#1f2937;font-weight:500">Changes saved successfully</span>
      <span style="color:#9ca3af;font-size:1.125rem;cursor:pointer;line-height:1">×</span>
    </div>
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;border-radius:0.5rem;background:white;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -4px rgba(0,0,0,0.1);border-left:4px solid #ef4444">
      <span style="color:#ef4444;font-weight:700;font-size:1.1rem">×</span>
      <span style="flex:1;font-size:0.875rem;color:#1f2937;font-weight:500">Failed to save changes</span>
      <span style="color:#9ca3af;font-size:1.125rem;cursor:pointer;line-height:1">×</span>
    </div>
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;border-radius:0.5rem;background:white;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -4px rgba(0,0,0,0.1);border-left:4px solid #f59e0b">
      <span style="color:#f59e0b;font-weight:700;font-size:1.1rem">⚠</span>
      <span style="flex:1;font-size:0.875rem;color:#1f2937;font-weight:500">API rate limit approaching</span>
      <span style="color:#9ca3af;font-size:1.125rem;cursor:pointer;line-height:1">×</span>
    </div>
    <div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;border-radius:0.5rem;background:white;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -4px rgba(0,0,0,0.1);border-left:4px solid #3b82f6">
      <span style="color:#3b82f6;font-weight:700;font-size:1.1rem">ℹ</span>
      <span style="flex:1;font-size:0.875rem;color:#1f2937;font-weight:500">New version available</span>
      <span style="color:#9ca3af;font-size:1.125rem;cursor:pointer;line-height:1">×</span>
    </div>
  </div>
</div>`,
  },
  {
    slug: "inline-validation-patterns",
    title: "Inline Validation Patterns",
    description: "A form demonstrating four validation states: valid (green check), error (red border with message), warning (amber strength meter), and neutral (no validation yet). Essential UX patterns for form design.",
    category: "Feedback",
    tags: ["form", "validation", "input", "feedback", "error"],
    style: "",
    code: `export default function InlineValidationPatterns() {
  return (
    <div className="min-h-[400px] bg-white p-10 flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <div className="relative">
            <input value="designpro" readOnly className="w-full border-2 border-green-400 rounded-lg px-3 py-2.5 text-sm bg-green-50/50 pr-10" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 font-bold">✓</span>
          </div>
          <p className="text-xs text-green-600 mt-1">Available</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input value="user@invalid" readOnly className="w-full border-2 border-red-400 rounded-lg px-3 py-2.5 text-sm bg-red-50/50" />
          <p className="text-xs text-red-600 mt-1">Invalid email format</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" value="abc" readOnly className="w-full border-2 border-amber-400 rounded-lg px-3 py-2.5 text-sm" />
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-1 flex-1">
              {[1,2,3,4,5].map(i => (
                <div key={i} className={\`h-1.5 flex-1 rounded-full \${i <= 2 ? "bg-amber-400" : "bg-gray-200"}\`} />
              ))}
            </div>
            <span className="text-xs text-amber-600 font-medium">Weak</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input type="password" placeholder="Re-enter password" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:400px;background:white;padding:2.5rem;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif">
  <div style="width:100%;max-width:28rem;display:flex;flex-direction:column;gap:1.5rem">
    <div>
      <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:0.25rem">Username</label>
      <div style="position:relative">
        <input value="designpro" readonly style="width:100%;border:2px solid #4ade80;border-radius:0.5rem;padding:0.625rem 2.5rem 0.625rem 0.75rem;font-size:0.875rem;background:rgba(240,253,244,0.5);outline:none;box-sizing:border-box;font-family:inherit" />
        <span style="position:absolute;right:0.75rem;top:50%;transform:translateY(-50%);color:#22c55e;font-weight:700">✓</span>
      </div>
      <p style="font-size:0.75rem;color:#16a34a;margin:0.25rem 0 0 0">Available</p>
    </div>
    <div>
      <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:0.25rem">Email</label>
      <input value="user@invalid" readonly style="width:100%;border:2px solid #f87171;border-radius:0.5rem;padding:0.625rem 0.75rem;font-size:0.875rem;background:rgba(254,242,242,0.5);outline:none;box-sizing:border-box;font-family:inherit" />
      <p style="font-size:0.75rem;color:#dc2626;margin:0.25rem 0 0 0">Invalid email format</p>
    </div>
    <div>
      <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:0.25rem">Password</label>
      <input type="password" value="abc" readonly style="width:100%;border:2px solid #fbbf24;border-radius:0.5rem;padding:0.625rem 0.75rem;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit" />
      <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.5rem">
        <div style="display:flex;gap:0.25rem;flex:1">
          <div style="height:6px;flex:1;border-radius:9999px;background:#fbbf24"></div>
          <div style="height:6px;flex:1;border-radius:9999px;background:#fbbf24"></div>
          <div style="height:6px;flex:1;border-radius:9999px;background:#e5e7eb"></div>
          <div style="height:6px;flex:1;border-radius:9999px;background:#e5e7eb"></div>
          <div style="height:6px;flex:1;border-radius:9999px;background:#e5e7eb"></div>
        </div>
        <span style="font-size:0.75rem;color:#d97706;font-weight:500">Weak</span>
      </div>
    </div>
    <div>
      <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:0.25rem">Confirm Password</label>
      <input type="password" placeholder="Re-enter password" style="width:100%;border:2px solid #e5e7eb;border-radius:0.5rem;padding:0.625rem 0.75rem;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit" />
    </div>
  </div>
</div>`,
  },
  {
    slug: "error-pages-set",
    title: "Error Pages Set",
    description: "Three essential error page designs — 403 Forbidden, 404 Not Found, and 500 Server Error — displayed side by side with distinct icons, headings, descriptions, and action buttons.",
    category: "Feedback",
    tags: ["error", "404", "500", "403", "page", "status"],
    style: "",
    code: `export default function ErrorPagesSet() {
  const errors = [
    { code: "403", icon: "🔒", title: "Access Denied", desc: "You don't have permission to view this resource." },
    { code: "404", icon: "🔍", title: "Page Not Found", desc: "The page you're looking for doesn't exist." },
    { code: "500", icon: "⚠️", title: "Something Went Wrong", desc: "We're working on fixing this. Please try again later." },
  ];

  return (
    <div className="min-h-[400px] bg-gray-50 p-8 flex items-center justify-center gap-6">
      {errors.map((e) => (
        <div key={e.code} className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 w-64">
          <div className="text-4xl mb-3">{e.icon}</div>
          <div className="text-5xl font-bold text-gray-200 mb-2">{e.code}</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{e.title}</h3>
          <p className="text-sm text-gray-500 mb-6">{e.desc}</p>
          <button className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">Go Home</button>
        </div>
      ))}
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:400px;background:#f9fafb;padding:2rem;display:flex;align-items:center;justify-content:center;gap:1.5rem;font-family:system-ui,-apple-system,sans-serif">
  <div style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:2rem;background:white;border-radius:1rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);border:1px solid #f3f4f6;width:14rem">
    <div style="font-size:2.5rem;margin-bottom:0.75rem">🔒</div>
    <div style="font-size:3rem;font-weight:700;color:#e5e7eb;margin-bottom:0.5rem">403</div>
    <h3 style="font-size:1.125rem;font-weight:600;color:#111827;margin:0 0 0.25rem 0">Access Denied</h3>
    <p style="font-size:0.875rem;color:#6b7280;margin:0 0 1.5rem 0">You don't have permission to view this resource.</p>
    <button style="padding:0.5rem 1.25rem;background:#111827;color:white;font-size:0.875rem;font-weight:500;border-radius:0.5rem;border:none;cursor:pointer;font-family:inherit">Go Home</button>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:2rem;background:white;border-radius:1rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);border:1px solid #f3f4f6;width:14rem">
    <div style="font-size:2.5rem;margin-bottom:0.75rem">🔍</div>
    <div style="font-size:3rem;font-weight:700;color:#e5e7eb;margin-bottom:0.5rem">404</div>
    <h3 style="font-size:1.125rem;font-weight:600;color:#111827;margin:0 0 0.25rem 0">Page Not Found</h3>
    <p style="font-size:0.875rem;color:#6b7280;margin:0 0 1.5rem 0">The page you're looking for doesn't exist.</p>
    <button style="padding:0.5rem 1.25rem;background:#111827;color:white;font-size:0.875rem;font-weight:500;border-radius:0.5rem;border:none;cursor:pointer;font-family:inherit">Go Home</button>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:2rem;background:white;border-radius:1rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);border:1px solid #f3f4f6;width:14rem">
    <div style="font-size:2.5rem;margin-bottom:0.75rem">⚠️</div>
    <div style="font-size:3rem;font-weight:700;color:#e5e7eb;margin-bottom:0.5rem">500</div>
    <h3 style="font-size:1.125rem;font-weight:600;color:#111827;margin:0 0 0.25rem 0">Something Went Wrong</h3>
    <p style="font-size:0.875rem;color:#6b7280;margin:0 0 1.5rem 0">We're working on fixing this. Please try again later.</p>
    <button style="padding:0.5rem 1.25rem;background:#111827;color:white;font-size:0.875rem;font-weight:500;border-radius:0.5rem;border:none;cursor:pointer;font-family:inherit">Go Home</button>
  </div>
</div>`,
  },
  {
    slug: "permission-gated-states",
    title: "Permission-Gated UI States",
    description: "Side-by-side comparison of unlocked and locked UI states. The left card shows a fully functional settings panel with toggles, while the right card is blurred with a lock overlay and upgrade prompt.",
    category: "Feedback",
    tags: ["permission", "access", "gated", "upgrade", "lock", "pro"],
    style: "",
    code: `export default function PermissionGatedStates() {
  return (
    <div className="min-h-[400px] bg-gray-100 p-8 flex items-center justify-center gap-8">
      <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Settings</h3>
          <p className="text-xs text-gray-500 mt-0.5">Manage your preferences</p>
        </div>
        <div className="p-5 flex flex-col gap-4">
          {["Email notifications", "Dark mode", "Auto-save"].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{item}</span>
              <div className="w-10 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-80">
        <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden filter blur-[2px] opacity-60">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Settings</h3>
            <p className="text-xs text-gray-500 mt-0.5">Manage your preferences</p>
          </div>
          <div className="p-5 flex flex-col gap-4">
            {["Email notifications", "Dark mode", "Auto-save"].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item}</span>
                <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm rounded-xl">
          <div className="text-3xl mb-2">🔒</div>
          <p className="text-sm font-semibold text-gray-800 mb-1">Upgrade to Pro to unlock</p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg">Upgrade Now</button>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:400px;background:#f3f4f6;padding:2rem;display:flex;align-items:center;justify-content:center;gap:2rem;font-family:system-ui,-apple-system,sans-serif">
  <div style="width:20rem;background:white;border-radius:0.75rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);border:1px solid #e5e7eb;overflow:hidden">
    <div style="padding:1rem 1.25rem;border-bottom:1px solid #f3f4f6">
      <h3 style="font-weight:600;color:#111827;margin:0;font-size:0.95rem">Settings</h3>
      <p style="font-size:0.75rem;color:#6b7280;margin:0.125rem 0 0 0">Manage your preferences</p>
    </div>
    <div style="padding:1.25rem;display:flex;flex-direction:column;gap:1rem">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:0.875rem;color:#374151">Email notifications</span>
        <div style="width:2.5rem;height:1.5rem;background:#3b82f6;border-radius:9999px;position:relative;cursor:pointer"><div style="position:absolute;right:2px;top:2px;width:1.25rem;height:1.25rem;background:white;border-radius:9999px;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:0.875rem;color:#374151">Dark mode</span>
        <div style="width:2.5rem;height:1.5rem;background:#3b82f6;border-radius:9999px;position:relative;cursor:pointer"><div style="position:absolute;right:2px;top:2px;width:1.25rem;height:1.25rem;background:white;border-radius:9999px;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:0.875rem;color:#374151">Auto-save</span>
        <div style="width:2.5rem;height:1.5rem;background:#3b82f6;border-radius:9999px;position:relative;cursor:pointer"><div style="position:absolute;right:2px;top:2px;width:1.25rem;height:1.25rem;background:white;border-radius:9999px;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div>
      </div>
    </div>
  </div>
  <div style="position:relative;width:20rem">
    <div style="width:100%;background:white;border-radius:0.75rem;box-shadow:0 1px 3px rgba(0,0,0,0.05);border:1px solid #e5e7eb;overflow:hidden;filter:blur(2px);opacity:0.6">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid #f3f4f6">
        <h3 style="font-weight:600;color:#111827;margin:0;font-size:0.95rem">Settings</h3>
        <p style="font-size:0.75rem;color:#6b7280;margin:0.125rem 0 0 0">Manage your preferences</p>
      </div>
      <div style="padding:1.25rem;display:flex;flex-direction:column;gap:1rem">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:0.875rem;color:#374151">Email notifications</span>
          <div style="width:2.5rem;height:1.5rem;background:#d1d5db;border-radius:9999px;position:relative"><div style="position:absolute;left:2px;top:2px;width:1.25rem;height:1.25rem;background:white;border-radius:9999px;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:0.875rem;color:#374151">Dark mode</span>
          <div style="width:2.5rem;height:1.5rem;background:#d1d5db;border-radius:9999px;position:relative"><div style="position:absolute;left:2px;top:2px;width:1.25rem;height:1.25rem;background:white;border-radius:9999px;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:0.875rem;color:#374151">Auto-save</span>
          <div style="width:2.5rem;height:1.5rem;background:#d1d5db;border-radius:9999px;position:relative"><div style="position:absolute;left:2px;top:2px;width:1.25rem;height:1.25rem;background:white;border-radius:9999px;box-shadow:0 1px 2px rgba(0,0,0,0.1)"></div></div>
        </div>
      </div>
    </div>
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(255,255,255,0.4);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);border-radius:0.75rem">
      <div style="font-size:2rem;margin-bottom:0.5rem">🔒</div>
      <p style="font-size:0.875rem;font-weight:600;color:#1f2937;margin:0 0 0.25rem 0">Upgrade to Pro to unlock</p>
      <button style="margin-top:0.5rem;padding:0.5rem 1rem;background:#2563eb;color:white;font-size:0.75rem;font-weight:500;border-radius:0.5rem;border:none;cursor:pointer;font-family:inherit">Upgrade Now</button>
    </div>
  </div>
</div>`,
  },
  {
    slug: "retry-pattern-ui",
    title: "Retry Pattern UI",
    description: "A connection failure card with retry functionality. Features a red error icon, descriptive message, primary retry button with refresh icon, auto-retry countdown timer, and attempt counter.",
    category: "Feedback",
    tags: ["retry", "error", "connection", "failure", "loading"],
    style: "",
    code: `export default function RetryPatternUI() {
  return (
    <div className="min-h-[400px] bg-gray-50 flex items-center justify-center p-8">
      <div className="w-96 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-5">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Failed</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">Unable to reach the server. Please check your connection and try again.</p>
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium text-sm rounded-xl hover:bg-gray-800 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
          Retry
        </button>
        <p className="text-xs text-gray-400 mt-4">Retry in 12s</p>
        <p className="text-xs text-gray-300 mt-1">3 of 5 attempts</p>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:400px;background:#f9fafb;display:flex;align-items:center;justify-content:center;padding:2rem;font-family:system-ui,-apple-system,sans-serif">
  <div style="width:24rem;background:white;border-radius:1rem;box-shadow:0 10px 25px -5px rgba(0,0,0,0.08);border:1px solid #f3f4f6;padding:2rem;display:flex;flex-direction:column;align-items:center;text-align:center">
    <div style="width:4rem;height:4rem;border-radius:9999px;background:#fef2f2;display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
    </div>
    <h2 style="font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 0.5rem 0">Connection Failed</h2>
    <p style="font-size:0.875rem;color:#6b7280;margin:0 0 1.5rem 0;line-height:1.6">Unable to reach the server. Please check your connection and try again.</p>
    <button style="display:flex;align-items:center;gap:0.5rem;padding:0.75rem 1.5rem;background:#111827;color:white;font-weight:500;font-size:0.875rem;border-radius:0.75rem;border:none;cursor:pointer;font-family:inherit">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
      Retry
    </button>
    <p style="font-size:0.75rem;color:#9ca3af;margin:1rem 0 0 0">Retry in 12s</p>
    <p style="font-size:0.75rem;color:#d1d5db;margin:0.25rem 0 0 0">3 of 5 attempts</p>
  </div>
</div>`,
  },
  {
    slug: "style-clean-minimal",
    title: "Clean Minimal Style",
    description: "A complete mini-dashboard in Apple-inspired clean style. White background, subtle gray borders, generous whitespace, and Inter-style typography. Features a stat card, list, and button group with one subtle blue accent.",
    category: "Style Families",
    tags: ["clean", "minimal", "apple", "whitespace", "dashboard", "style"],
    style: "",
    code: `export default function CleanMinimalStyle() {
  return (
    <div className="min-h-[400px] bg-white p-10 font-sans">
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        <div className="border border-gray-200 rounded-2xl p-6">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Monthly Revenue</p>
          <p className="text-3xl font-semibold text-gray-900 tracking-tight">$48,250</p>
          <p className="text-sm text-green-500 mt-1">↑ 12% from last month</p>
        </div>
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          {["Design System v2.0", "API Integration", "Mobile App Beta"].map((item, i) => (
            <div key={item} className={\`flex items-center justify-between px-5 py-3.5 \${i < 2 ? "border-b border-gray-100" : ""}\`}>
              <span className="text-sm text-gray-800">{item}</span>
              <span className="text-xs text-gray-400">In Progress</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-xl">Create New</button>
          <button className="px-5 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-xl border border-gray-200">Export</button>
          <button className="px-5 py-2.5 bg-white text-gray-400 text-sm font-medium rounded-xl border border-gray-200">Archive</button>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:400px;background:white;padding:2.5rem;font-family:system-ui,-apple-system,'Segoe UI',sans-serif">
  <div style="max-width:32rem;margin:0 auto;display:flex;flex-direction:column;gap:1.5rem">
    <div style="border:1px solid #e5e7eb;border-radius:1rem;padding:1.5rem">
      <p style="font-size:0.75rem;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 0.25rem 0">Monthly Revenue</p>
      <p style="font-size:1.875rem;font-weight:600;color:#111827;letter-spacing:-0.025em;margin:0">$48,250</p>
      <p style="font-size:0.875rem;color:#22c55e;margin:0.25rem 0 0 0">↑ 12% from last month</p>
    </div>
    <div style="border:1px solid #e5e7eb;border-radius:1rem;overflow:hidden">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0.875rem 1.25rem;border-bottom:1px solid #f3f4f6">
        <span style="font-size:0.875rem;color:#1f2937">Design System v2.0</span>
        <span style="font-size:0.75rem;color:#9ca3af">In Progress</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0.875rem 1.25rem;border-bottom:1px solid #f3f4f6">
        <span style="font-size:0.875rem;color:#1f2937">API Integration</span>
        <span style="font-size:0.75rem;color:#9ca3af">In Progress</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0.875rem 1.25rem">
        <span style="font-size:0.875rem;color:#1f2937">Mobile App Beta</span>
        <span style="font-size:0.75rem;color:#9ca3af">In Progress</span>
      </div>
    </div>
    <div style="display:flex;gap:0.75rem">
      <button style="padding:0.625rem 1.25rem;background:#3b82f6;color:white;font-size:0.875rem;font-weight:500;border-radius:0.75rem;border:none;cursor:pointer;font-family:inherit">Create New</button>
      <button style="padding:0.625rem 1.25rem;background:white;color:#374151;font-size:0.875rem;font-weight:500;border-radius:0.75rem;border:1px solid #e5e7eb;cursor:pointer;font-family:inherit">Export</button>
      <button style="padding:0.625rem 1.25rem;background:white;color:#9ca3af;font-size:0.875rem;font-weight:500;border-radius:0.75rem;border:1px solid #e5e7eb;cursor:pointer;font-family:inherit">Archive</button>
    </div>
  </div>
</div>`,
  },
  {
    slug: "style-dark-premium",
    title: "Dark Premium Style",
    description: "A mini-dashboard in a true dark premium theme. Deep black background (#0a0a0a), subtle borders, white/gray text with proper contrast, and a purple/blue accent for CTAs. Features stat card, list, and button group.",
    category: "Style Families",
    tags: ["dark", "premium", "theme", "dashboard", "style", "pro"],
    style: "",
    code: `export default function DarkPremiumStyle() {
  return (
    <div className="min-h-[400px] bg-[#0a0a0a] p-10 font-sans">
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.03]">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Monthly Revenue</p>
          <p className="text-3xl font-semibold text-white tracking-tight">$48,250</p>
          <p className="text-sm text-emerald-400 mt-1">↑ 12% from last month</p>
        </div>
        <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.03]">
          {["Design System v2.0", "API Integration", "Mobile App Beta"].map((item, i) => (
            <div key={item} className={\`flex items-center justify-between px-5 py-3.5 \${i < 2 ? "border-b border-white/5" : ""}\`}>
              <span className="text-sm text-gray-200">{item}</span>
              <span className="text-xs text-gray-600">In Progress</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-xl hover:bg-purple-500">Create New</button>
          <button className="px-5 py-2.5 bg-white/5 text-gray-300 text-sm font-medium rounded-xl border border-white/10">Export</button>
          <button className="px-5 py-2.5 bg-white/5 text-gray-500 text-sm font-medium rounded-xl border border-white/10">Archive</button>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:400px;background:#0a0a0a;padding:2.5rem;font-family:system-ui,-apple-system,'Segoe UI',sans-serif">
  <div style="max-width:32rem;margin:0 auto;display:flex;flex-direction:column;gap:1.5rem">
    <div style="border:1px solid rgba(255,255,255,0.1);border-radius:1rem;padding:1.5rem;background:rgba(255,255,255,0.03)">
      <p style="font-size:0.75rem;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 0.25rem 0">Monthly Revenue</p>
      <p style="font-size:1.875rem;font-weight:600;color:#ffffff;letter-spacing:-0.025em;margin:0">$48,250</p>
      <p style="font-size:0.875rem;color:#34d399;margin:0.25rem 0 0 0">↑ 12% from last month</p>
    </div>
    <div style="border:1px solid rgba(255,255,255,0.1);border-radius:1rem;overflow:hidden;background:rgba(255,255,255,0.03)">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0.875rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.05)">
        <span style="font-size:0.875rem;color:#e5e7eb">Design System v2.0</span>
        <span style="font-size:0.75rem;color:#4b5563">In Progress</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0.875rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.05)">
        <span style="font-size:0.875rem;color:#e5e7eb">API Integration</span>
        <span style="font-size:0.75rem;color:#4b5563">In Progress</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0.875rem 1.25rem">
        <span style="font-size:0.875rem;color:#e5e7eb">Mobile App Beta</span>
        <span style="font-size:0.75rem;color:#4b5563">In Progress</span>
      </div>
    </div>
    <div style="display:flex;gap:0.75rem">
      <button style="padding:0.625rem 1.25rem;background:#9333ea;color:white;font-size:0.875rem;font-weight:500;border-radius:0.75rem;border:none;cursor:pointer;font-family:inherit">Create New</button>
      <button style="padding:0.625rem 1.25rem;background:rgba(255,255,255,0.05);color:#d1d5db;font-size:0.875rem;font-weight:500;border-radius:0.75rem;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-family:inherit">Export</button>
      <button style="padding:0.625rem 1.25rem;background:rgba(255,255,255,0.05);color:#6b7280;font-size:0.875rem;font-weight:500;border-radius:0.75rem;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-family:inherit">Archive</button>
    </div>
  </div>
</div>`,
  },
  {
    slug: "style-glass-frost",
    title: "Glass Frost Style",
    description: "Glassmorphism-styled hero card and modal overlay on a purple/blue gradient background. Features backdrop-filter blur, semi-transparent white backgrounds, and subtle white borders for a frosted glass effect.",
    category: "Style Families",
    tags: ["glass", "glassmorphism", "frost", "blur", "gradient", "style"],
    style: "",
    code: `export default function GlassFrostStyle() {
  return (
    <div className="min-h-[400px] bg-gradient-to-br from-violet-600 via-purple-600 to-blue-700 p-10 flex items-center justify-center gap-6">
      <div className="w-72 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 text-white">
        <p className="text-xs uppercase tracking-widest opacity-70 mb-1">Total Users</p>
        <p className="text-4xl font-bold tracking-tight">12,847</p>
        <p className="text-sm opacity-80 mt-3 leading-relaxed">Active users across all platforms with 98.2% uptime this month.</p>
      </div>
      <div className="w-80 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-1">Confirm Action</h3>
        <p className="text-sm opacity-70 mb-5">Are you sure you want to deploy to production?</p>
        <div className="flex gap-3">
          <button className="flex-1 py-2.5 bg-white/20 rounded-xl text-sm font-medium border border-white/10">Cancel</button>
          <button className="flex-1 py-2.5 bg-white text-purple-700 rounded-xl text-sm font-semibold">Deploy</button>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:400px;background:linear-gradient(135deg,#7c3aed,#9333ea,#1d4ed8);padding:2.5rem;display:flex;align-items:center;justify-content:center;gap:1.5rem;font-family:system-ui,-apple-system,'Segoe UI',sans-serif">
  <div style="width:18rem;border-radius:1rem;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);padding:1.5rem;color:white">
    <p style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;opacity:0.7;margin:0 0 0.25rem 0">Total Users</p>
    <p style="font-size:2.25rem;font-weight:700;letter-spacing:-0.025em;margin:0">12,847</p>
    <p style="font-size:0.875rem;opacity:0.8;margin:0.75rem 0 0 0;line-height:1.6">Active users across all platforms with 98.2% uptime this month.</p>
  </div>
  <div style="width:20rem;border-radius:1rem;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);padding:1.5rem;color:white">
    <h3 style="font-size:1.125rem;font-weight:600;margin:0 0 0.25rem 0">Confirm Action</h3>
    <p style="font-size:0.875rem;opacity:0.7;margin:0 0 1.25rem 0">Are you sure you want to deploy to production?</p>
    <div style="display:flex;gap:0.75rem">
      <button style="flex:1;padding:0.625rem;background:rgba(255,255,255,0.2);border-radius:0.75rem;font-size:0.875rem;font-weight:500;border:1px solid rgba(255,255,255,0.1);color:white;cursor:pointer;font-family:inherit">Cancel</button>
      <button style="flex:1;padding:0.625rem;background:white;color:#7c3aed;border-radius:0.75rem;font-size:0.875rem;font-weight:600;border:none;cursor:pointer;font-family:inherit">Deploy</button>
    </div>
  </div>
</div>`,
  },
  {
    slug: "style-bold-editorial",
    title: "Bold Editorial Style",
    description: "Magazine-inspired editorial layout with massive typography (48px+ headline), strong spacing, and a bold black-and-white palette with one bright orange accent. Features a hero heading and a numbered feature grid.",
    category: "Style Families",
    tags: ["editorial", "bold", "typography", "magazine", "hero", "style"],
    style: "",
    code: `export default function BoldEditorialStyle() {
  const features = [
    { num: "01", title: "Lightning Fast", desc: "Sub-100ms response times globally" },
    { num: "02", title: "Infinitely Scalable", desc: "From zero to millions of users" },
    { num: "03", title: "Developer First", desc: "APIs designed for humans" },
  ];

  return (
    <div className="min-h-[400px] bg-white p-10 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl font-black tracking-tight leading-[1.05] text-black mb-3">
          Build the future<br/><span className="text-orange-500">without limits.</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-md">The platform that scales with your ambition. Ship faster, iterate smarter.</p>
        <div className="grid grid-cols-3 gap-0 border-t border-black">
          {features.map((f) => (
            <div key={f.num} className="border-r border-black last:border-0 pt-6 pr-6 pb-6">
              <span className="text-4xl font-black text-orange-500">{f.num}</span>
              <h3 className="text-lg font-bold text-black mt-2 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:400px;background:white;padding:2.5rem;font-family:system-ui,-apple-system,'Segoe UI',sans-serif">
  <div style="max-width:40rem;margin:0 auto">
    <h1 style="font-size:3.75rem;font-weight:900;letter-spacing:-0.025em;line-height:1.05;color:black;margin:0 0 0.75rem 0">Build the future<br/><span style="color:#f97316">without limits.</span></h1>
    <p style="font-size:1.125rem;color:#6b7280;margin:0 0 2.5rem 0;max-width:28rem">The platform that scales with your ambition. Ship faster, iterate smarter.</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);border-top:2px solid black">
      <div style="border-right:1px solid black;padding:1.5rem 1.5rem 1.5rem 0">
        <span style="font-size:2.25rem;font-weight:900;color:#f97316">01</span>
        <h3 style="font-size:1.125rem;font-weight:700;color:black;margin:0.5rem 0 0.25rem 0">Lightning Fast</h3>
        <p style="font-size:0.875rem;color:#6b7280;margin:0">Sub-100ms response times globally</p>
      </div>
      <div style="border-right:1px solid black;padding:1.5rem">
        <span style="font-size:2.25rem;font-weight:900;color:#f97316">02</span>
        <h3 style="font-size:1.125rem;font-weight:700;color:black;margin:0.5rem 0 0.25rem 0">Infinitely Scalable</h3>
        <p style="font-size:0.875rem;color:#6b7280;margin:0">From zero to millions of users</p>
      </div>
      <div style="padding:1.5rem 0 1.5rem 1.5rem">
        <span style="font-size:2.25rem;font-weight:900;color:#f97316">03</span>
        <h3 style="font-size:1.125rem;font-weight:700;color:black;margin:0.5rem 0 0.25rem 0">Developer First</h3>
        <p style="font-size:0.875rem;color:#6b7280;margin:0">APIs designed for humans</p>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "style-dense-pro-ui",
    title: "Dense Pro UI Style",
    description: "A data-heavy admin panel snippet with a compact table, small text (12-13px), dense padding, toolbar with small buttons, and status indicators. Gray/blue color scheme optimized for information density.",
    category: "Style Families",
    tags: ["dense", "admin", "table", "data", "pro", "dashboard", "style"],
    style: "",
    code: `export default function DenseProUIStyle() {
  const rows = [
    { id: "USR-001", name: "Alice Chen", role: "Admin", status: "Active", last: "2 min ago" },
    { id: "USR-002", name: "Bob Smith", role: "Editor", status: "Active", last: "1 hr ago" },
    { id: "USR-003", name: "Carol Wu", role: "Viewer", status: "Inactive", last: "3 days ago" },
    { id: "USR-004", name: "Dan Jones", role: "Editor", status: "Active", last: "5 min ago" },
    { id: "USR-005", name: "Eve Park", role: "Admin", status: "Pending", last: "Just now" },
  ];

  return (
    <div className="min-h-[400px] bg-[#f0f2f5] p-6 font-sans text-[13px]">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
          <div className="flex gap-2">
            <button className="px-2.5 py-1 text-xs font-medium bg-white border border-gray-300 rounded">Filter</button>
            <button className="px-2.5 py-1 text-xs font-medium bg-white border border-gray-300 rounded">Sort</button>
            <select className="px-2 py-1 text-xs border border-gray-300 rounded bg-white">
              <option>All Roles</option>
            </select>
          </div>
          <button className="px-2.5 py-1 text-xs font-medium bg-blue-600 text-white rounded">+ Add User</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
              <th className="text-left px-3 py-2 font-medium">ID</th>
              <th className="text-left px-3 py-2 font-medium">Name</th>
              <th className="text-left px-3 py-2 font-medium">Role</th>
              <th className="text-left px-3 py-2 font-medium">Status</th>
              <th className="text-left px-3 py-2 font-medium">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-gray-100 hover:bg-blue-50/50">
                <td className="px-3 py-2 text-gray-400 font-mono">{r.id}</td>
                <td className="px-3 py-2 text-gray-800 font-medium">{r.name}</td>
                <td className="px-3 py-2 text-gray-600">{r.role}</td>
                <td className="px-3 py-2">
                  <span className={\`inline-flex px-1.5 py-0.5 rounded text-[11px] font-medium \${
                    r.status === "Active" ? "bg-green-100 text-green-700" :
                    r.status === "Pending" ? "bg-amber-100 text-amber-700" :
                    "bg-gray-100 text-gray-500"
                  }\`}>{r.status}</span>
                </td>
                <td className="px-3 py-2 text-gray-400">{r.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:400px;background:#f0f2f5;padding:1.5rem;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:13px">
  <div style="background:white;border:1px solid #e5e7eb;border-radius:0.5rem;overflow:hidden">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0.75rem;border-bottom:1px solid #e5e7eb;background:#f9fafb">
      <div style="display:flex;gap:0.5rem">
        <button style="padding:0.25rem 0.625rem;font-size:0.75rem;font-weight:500;background:white;border:1px solid #d1d5db;border-radius:0.25rem;cursor:pointer;font-family:inherit">Filter</button>
        <button style="padding:0.25rem 0.625rem;font-size:0.75rem;font-weight:500;background:white;border:1px solid #d1d5db;border-radius:0.25rem;cursor:pointer;font-family:inherit">Sort</button>
        <select style="padding:0.25rem 0.5rem;font-size:0.75rem;border:1px solid #d1d5db;border-radius:0.25rem;background:white;font-family:inherit"><option>All Roles</option></select>
      </div>
      <button style="padding:0.25rem 0.625rem;font-size:0.75rem;font-weight:500;background:#2563eb;color:white;border:none;border-radius:0.25rem;cursor:pointer;font-family:inherit">+ Add User</button>
    </div>
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#f9fafb">
          <th style="text-align:left;padding:0.5rem 0.75rem;font-size:0.7rem;font-weight:500;color:#6b7280;text-transform:uppercase;letter-spacing:0.025em">ID</th>
          <th style="text-align:left;padding:0.5rem 0.75rem;font-size:0.7rem;font-weight:500;color:#6b7280;text-transform:uppercase;letter-spacing:0.025em">Name</th>
          <th style="text-align:left;padding:0.5rem 0.75rem;font-size:0.7rem;font-weight:500;color:#6b7280;text-transform:uppercase;letter-spacing:0.025em">Role</th>
          <th style="text-align:left;padding:0.5rem 0.75rem;font-size:0.7rem;font-weight:500;color:#6b7280;text-transform:uppercase;letter-spacing:0.025em">Status</th>
          <th style="text-align:left;padding:0.5rem 0.75rem;font-size:0.7rem;font-weight:500;color:#6b7280;text-transform:uppercase;letter-spacing:0.025em">Last Active</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-top:1px solid #f3f4f6">
          <td style="padding:0.5rem 0.75rem;color:#9ca3af;font-family:monospace;font-size:12px">USR-001</td>
          <td style="padding:0.5rem 0.75rem;color:#1f2937;font-weight:500">Alice Chen</td>
          <td style="padding:0.5rem 0.75rem;color:#4b5563">Admin</td>
          <td style="padding:0.5rem 0.75rem"><span style="display:inline-flex;padding:0.125rem 0.375rem;border-radius:0.25rem;font-size:11px;font-weight:500;background:#dcfce7;color:#15803d">Active</span></td>
          <td style="padding:0.5rem 0.75rem;color:#9ca3af">2 min ago</td>
        </tr>
        <tr style="border-top:1px solid #f3f4f6">
          <td style="padding:0.5rem 0.75rem;color:#9ca3af;font-family:monospace;font-size:12px">USR-002</td>
          <td style="padding:0.5rem 0.75rem;color:#1f2937;font-weight:500">Bob Smith</td>
          <td style="padding:0.5rem 0.75rem;color:#4b5563">Editor</td>
          <td style="padding:0.5rem 0.75rem"><span style="display:inline-flex;padding:0.125rem 0.375rem;border-radius:0.25rem;font-size:11px;font-weight:500;background:#dcfce7;color:#15803d">Active</span></td>
          <td style="padding:0.5rem 0.75rem;color:#9ca3af">1 hr ago</td>
        </tr>
        <tr style="border-top:1px solid #f3f4f6">
          <td style="padding:0.5rem 0.75rem;color:#9ca3af;font-family:monospace;font-size:12px">USR-003</td>
          <td style="padding:0.5rem 0.75rem;color:#1f2937;font-weight:500">Carol Wu</td>
          <td style="padding:0.5rem 0.75rem;color:#4b5563">Viewer</td>
          <td style="padding:0.5rem 0.75rem"><span style="display:inline-flex;padding:0.125rem 0.375rem;border-radius:0.25rem;font-size:11px;font-weight:500;background:#f3f4f6;color:#6b7280">Inactive</span></td>
          <td style="padding:0.5rem 0.75rem;color:#9ca3af">3 days ago</td>
        </tr>
        <tr style="border-top:1px solid #f3f4f6">
          <td style="padding:0.5rem 0.75rem;color:#9ca3af;font-family:monospace;font-size:12px">USR-004</td>
          <td style="padding:0.5rem 0.75rem;color:#1f2937;font-weight:500">Dan Jones</td>
          <td style="padding:0.5rem 0.75rem;color:#4b5563">Editor</td>
          <td style="padding:0.5rem 0.75rem"><span style="display:inline-flex;padding:0.125rem 0.375rem;border-radius:0.25rem;font-size:11px;font-weight:500;background:#dcfce7;color:#15803d">Active</span></td>
          <td style="padding:0.5rem 0.75rem;color:#9ca3af">5 min ago</td>
        </tr>
        <tr style="border-top:1px solid #f3f4f6">
          <td style="padding:0.5rem 0.75rem;color:#9ca3af;font-family:monospace;font-size:12px">USR-005</td>
          <td style="padding:0.5rem 0.75rem;color:#1f2937;font-weight:500">Eve Park</td>
          <td style="padding:0.5rem 0.75rem;color:#4b5563">Admin</td>
          <td style="padding:0.5rem 0.75rem"><span style="display:inline-flex;padding:0.125rem 0.375rem;border-radius:0.25rem;font-size:11px;font-weight:500;background:#fef3c7;color:#b45309">Pending</span></td>
          <td style="padding:0.5rem 0.75rem;color:#9ca3af">Just now</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
  },
];
