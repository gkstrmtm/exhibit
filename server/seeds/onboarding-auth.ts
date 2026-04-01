export const onboardingAuthExhibits = [
  {
    slug: "stepper-onboarding-flow",
    title: "Stepper Onboarding Flow",
    description: "A 5-step horizontal stepper with visual progress indicators, connecting lines, and an active form section for the current step.",
    category: "Onboarding",
    tags: ["onboarding", "stepper", "wizard", "progress", "flow"],
    style: "",
    code: `export default function StepperOnboarding() {
  const steps = [
    { num: 1, label: "Account" },
    { num: 2, label: "Profile" },
    { num: 3, label: "Workspace" },
    { num: 4, label: "Integrations" },
    { num: 5, label: "Review" },
  ];

  return (
    <div className="min-h-[400px] bg-gray-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-10">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={\`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 \${
                  step.num <= 2
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : step.num === 3
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }\`}>
                  {step.num <= 2 ? "✓" : step.num}
                </div>
                <span className={\`mt-2 text-xs font-medium \${
                  step.num <= 2 ? "text-emerald-600" : step.num === 3 ? "text-blue-600" : "text-gray-400"
                }\`}>{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={\`flex-1 h-0.5 mx-3 mt-[-1rem] \${
                  step.num < 3 ? "bg-emerald-500" : "bg-gray-300"
                }\`} />
              )}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Connect Your Workspace</h2>
          <p className="text-sm text-gray-500 mb-6">Link your workspace to get started with collaboration.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Workspace Name</label>
              <input type="text" placeholder="My Workspace" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Workspace URL</label>
              <input type="text" placeholder="https://workspace.example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:300px;background:#f9fafb;padding:2rem;display:flex;flex-direction:column;align-items:center;font-family:system-ui,-apple-system,sans-serif">
  <div style="width:100%;max-width:40rem">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:2.5rem;position:relative">
      <div style="position:absolute;top:20px;left:40px;right:40px;height:2px;background:#e5e7eb;z-index:0"></div>
      <div style="position:absolute;top:20px;left:40px;width:30%;height:2px;background:#10b981;z-index:1"></div>
      <div style="display:flex;flex-direction:column;align-items:center;z-index:2;flex:0 0 auto">
        <div style="width:40px;height:40px;border-radius:50%;background:#10b981;border:2px solid #10b981;color:white;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600">✓</div>
        <span style="margin-top:8px;font-size:12px;font-weight:500;color:#059669">Account</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;z-index:2;flex:0 0 auto">
        <div style="width:40px;height:40px;border-radius:50%;background:#10b981;border:2px solid #10b981;color:white;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600">✓</div>
        <span style="margin-top:8px;font-size:12px;font-weight:500;color:#059669">Profile</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;z-index:2;flex:0 0 auto">
        <div style="width:40px;height:40px;border-radius:50%;background:#2563eb;border:2px solid #2563eb;color:white;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600">3</div>
        <span style="margin-top:8px;font-size:12px;font-weight:500;color:#2563eb">Workspace</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;z-index:2;flex:0 0 auto">
        <div style="width:40px;height:40px;border-radius:50%;background:white;border:2px solid #d1d5db;color:#9ca3af;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600">4</div>
        <span style="margin-top:8px;font-size:12px;font-weight:500;color:#9ca3af">Integrations</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;z-index:2;flex:0 0 auto">
        <div style="width:40px;height:40px;border-radius:50%;background:white;border:2px solid #d1d5db;color:#9ca3af;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600">5</div>
        <span style="margin-top:8px;font-size:12px;font-weight:500;color:#9ca3af">Review</span>
      </div>
    </div>
    <div style="background:white;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.1);border:1px solid #e5e7eb;padding:2rem">
      <h2 style="font-size:1.25rem;font-weight:600;color:#111827;margin:0 0 4px 0">Connect Your Workspace</h2>
      <p style="font-size:0.875rem;color:#6b7280;margin:0 0 1.5rem 0">Link your workspace to get started with collaboration.</p>
      <div style="margin-bottom:1rem">
        <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:4px">Workspace Name</label>
        <input type="text" placeholder="My Workspace" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:10px 16px;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit" />
      </div>
      <div>
        <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:4px">Workspace URL</label>
        <input type="text" placeholder="https://workspace.example.com" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:10px 16px;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit" />
      </div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "multi-step-wizard",
    title: "Multi-Step Wizard",
    description: "Modal-style wizard with a left sidebar showing step progress, a main content area for the current step, and navigation controls.",
    category: "Onboarding",
    tags: ["wizard", "modal", "multi-step", "form", "onboarding"],
    style: "",
    code: `export default function MultiStepWizard() {
  const steps = [
    { label: "Personal Info", done: true },
    { label: "Company Details", done: false },
    { label: "Preferences", done: false },
    { label: "Confirmation", done: false },
  ];

  return (
    <div className="min-h-[500px] bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-3xl overflow-hidden flex min-h-[420px]">
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-6 flex flex-col">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Setup Steps</h3>
          <div className="space-y-4 flex-1">
            {steps.map((step, i) => (
              <div key={i} className={\`flex items-center gap-3 text-sm \${i === 1 ? "font-semibold text-blue-600" : step.done ? "text-emerald-600" : "text-gray-400"}\`}>
                <div className={\`w-6 h-6 rounded-full flex items-center justify-center text-xs \${
                  step.done ? "bg-emerald-100 text-emerald-600" : i === 1 ? "bg-blue-100 text-blue-600 font-bold" : "bg-gray-100 text-gray-400"
                }\`}>
                  {step.done ? "✓" : i + 1}
                </div>
                {step.label}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Company Details</h2>
            <p className="text-sm text-gray-500 mb-6">Tell us about your organization.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" placeholder="Acme Inc." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm">
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                <input type="text" placeholder="1-10" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-8 py-4 flex items-center justify-between bg-gray-50">
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">← Back</button>
            <span className="text-sm text-gray-400">Step 2 of 4</span>
            <button className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:300px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;padding:2rem;font-family:system-ui,-apple-system,sans-serif">
  <div style="background:white;border-radius:16px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.15);border:1px solid #e5e7eb;width:100%;max-width:48rem;overflow:hidden;display:flex;min-height:420px">
    <div style="width:220px;background:#f9fafb;border-right:1px solid #e5e7eb;padding:1.5rem;display:flex;flex-direction:column;flex-shrink:0">
      <h3 style="font-size:0.7rem;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 1.5rem 0">Setup Steps</h3>
      <div style="display:flex;flex-direction:column;gap:1rem">
        <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.875rem;color:#059669">
          <div style="width:24px;height:24px;border-radius:50%;background:#d1fae5;color:#059669;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0">✓</div>
          Personal Info
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.875rem;color:#2563eb;font-weight:600">
          <div style="width:24px;height:24px;border-radius:50%;background:#dbeafe;color:#2563eb;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0">2</div>
          Company Details
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.875rem;color:#9ca3af">
          <div style="width:24px;height:24px;border-radius:50%;background:#f3f4f6;color:#9ca3af;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0">3</div>
          Preferences
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.875rem;color:#9ca3af">
          <div style="width:24px;height:24px;border-radius:50%;background:#f3f4f6;color:#9ca3af;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0">4</div>
          Confirmation
        </div>
      </div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column">
      <div style="flex:1;padding:2rem">
        <h2 style="font-size:1.25rem;font-weight:600;color:#111827;margin:0 0 4px 0">Company Details</h2>
        <p style="font-size:0.875rem;color:#6b7280;margin:0 0 1.5rem 0">Tell us about your organization.</p>
        <div style="display:flex;flex-direction:column;gap:1rem">
          <div>
            <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:4px">Company Name</label>
            <input type="text" placeholder="Acme Inc." style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:10px 16px;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit" />
          </div>
          <div>
            <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:4px">Industry</label>
            <select style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:10px 16px;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit;background:white">
              <option>Technology</option><option>Finance</option><option>Healthcare</option>
            </select>
          </div>
          <div>
            <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:4px">Team Size</label>
            <input type="text" placeholder="1-10" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:10px 16px;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit" />
          </div>
        </div>
      </div>
      <div style="border-top:1px solid #e5e7eb;padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;background:#f9fafb">
        <button style="padding:8px 16px;font-size:0.875rem;color:#4b5563;background:none;border:none;cursor:pointer;font-family:inherit">← Back</button>
        <span style="font-size:0.875rem;color:#9ca3af">Step 2 of 4</span>
        <button style="padding:8px 24px;background:#2563eb;color:white;font-size:0.875rem;font-weight:500;border-radius:8px;border:none;cursor:pointer;font-family:inherit">Continue</button>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "connect-tools-screen",
    title: "Connect Your Tools",
    description: "Integration grid showing connected and available third-party services with status indicators and connect actions.",
    category: "Onboarding",
    tags: ["integrations", "tools", "connect", "onboarding", "services"],
    style: "",
    code: `export default function ConnectTools() {
  const tools = [
    { name: "Slack", icon: "💬", desc: "Get notified in your channels", connected: true },
    { name: "GitHub", icon: "🐙", desc: "Sync repos and pull requests", connected: false },
    { name: "Figma", icon: "🎨", desc: "Import designs and assets", connected: false },
    { name: "Notion", icon: "📝", desc: "Sync docs and wikis", connected: true },
  ];

  return (
    <div className="min-h-[400px] bg-gray-50 p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Connect Your Tools</h2>
        <p className="text-gray-500 text-center mb-8">Integrate with the tools you already use.</p>
        <div className="grid grid-cols-2 gap-4">
          {tools.map(tool => (
            <div key={tool.name} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
              <div className="text-3xl">{tool.icon}</div>
              <div>
                <div className="font-semibold text-gray-900">{tool.name}</div>
                <div className="text-sm text-gray-500">{tool.desc}</div>
              </div>
              {tool.connected ? (
                <div className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
                  <span>●</span> Connected
                </div>
              ) : (
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Connect</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:300px;background:#f9fafb;padding:2rem;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif">
  <div style="width:100%;max-width:40rem">
    <h2 style="font-size:1.5rem;font-weight:700;color:#111827;margin:0 0 8px 0;text-align:center">Connect Your Tools</h2>
    <p style="color:#6b7280;text-align:center;margin:0 0 2rem 0;font-size:0.95rem">Integrate with the tools you already use.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
      <div style="background:white;border-radius:12px;border:1px solid #e5e7eb;padding:1.25rem;display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:1.75rem">💬</div>
        <div>
          <div style="font-weight:600;color:#111827;font-size:0.95rem">Slack</div>
          <div style="font-size:0.8rem;color:#6b7280">Get notified in your channels</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;font-size:0.8rem;color:#059669;font-weight:500">
          <span>●</span> Connected
        </div>
      </div>
      <div style="background:white;border-radius:12px;border:1px solid #e5e7eb;padding:1.25rem;display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:1.75rem">🐙</div>
        <div>
          <div style="font-weight:600;color:#111827;font-size:0.95rem">GitHub</div>
          <div style="font-size:0.8rem;color:#6b7280">Sync repos and pull requests</div>
        </div>
        <button style="padding:8px 16px;border:1px solid #d1d5db;border-radius:8px;font-size:0.8rem;font-weight:500;color:#374151;background:white;cursor:pointer;font-family:inherit;align-self:flex-start">Connect</button>
      </div>
      <div style="background:white;border-radius:12px;border:1px solid #e5e7eb;padding:1.25rem;display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:1.75rem">🎨</div>
        <div>
          <div style="font-weight:600;color:#111827;font-size:0.95rem">Figma</div>
          <div style="font-size:0.8rem;color:#6b7280">Import designs and assets</div>
        </div>
        <button style="padding:8px 16px;border:1px solid #d1d5db;border-radius:8px;font-size:0.8rem;font-weight:500;color:#374151;background:white;cursor:pointer;font-family:inherit;align-self:flex-start">Connect</button>
      </div>
      <div style="background:white;border-radius:12px;border:1px solid #e5e7eb;padding:1.25rem;display:flex;flex-direction:column;gap:0.75rem">
        <div style="font-size:1.75rem">📝</div>
        <div>
          <div style="font-weight:600;color:#111827;font-size:0.95rem">Notion</div>
          <div style="font-size:0.8rem;color:#6b7280">Sync docs and wikis</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;font-size:0.8rem;color:#059669;font-weight:500">
          <span>●</span> Connected
        </div>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "sign-in-form-clean",
    title: "Sign In Form",
    description: "Clean, centered sign-in card with email/password fields, social login options, and forgot password link.",
    category: "Authentication",
    tags: ["auth", "login", "sign-in", "form", "social"],
    style: "",
    code: `export default function SignInForm() {
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
}`,
    htmlPreview: `<div style="min-height:300px;background:#f9fafb;display:flex;align-items:center;justify-content:center;padding:2rem;font-family:system-ui,-apple-system,sans-serif">
  <div style="width:100%;max-width:24rem">
    <div style="background:white;border-radius:16px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.1);border:1px solid #e5e7eb;padding:2rem">
      <div style="display:flex;justify-content:center;margin-bottom:1.5rem">
        <div style="width:40px;height:40px;background:#2563eb;border-radius:10px;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:1.1rem">A</div>
      </div>
      <h2 style="font-size:1.25rem;font-weight:600;text-align:center;color:#111827;margin:0 0 4px 0">Welcome back</h2>
      <p style="font-size:0.875rem;color:#6b7280;text-align:center;margin:0 0 1.5rem 0">Sign in to your account to continue</p>
      <div style="display:flex;flex-direction:column;gap:1rem">
        <div>
          <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:4px">Email</label>
          <input type="email" placeholder="you@example.com" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:10px 16px;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit" />
        </div>
        <div>
          <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:4px">Password</label>
          <div style="position:relative">
            <input type="password" placeholder="••••••••" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:10px 16px;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit;padding-right:60px" />
            <span style="position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:0.75rem;color:#6b7280;cursor:pointer">Show</span>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end">
          <a style="font-size:0.875rem;color:#2563eb;text-decoration:none;cursor:pointer">Forgot password?</a>
        </div>
        <button style="width:100%;padding:10px;background:#2563eb;color:white;border-radius:8px;font-weight:500;font-size:0.875rem;border:none;cursor:pointer;font-family:inherit">Sign In</button>
      </div>
      <div style="margin:1.5rem 0;display:flex;align-items:center;gap:0.75rem">
        <div style="flex:1;height:1px;background:#e5e7eb"></div>
        <span style="font-size:0.75rem;color:#9ca3af;white-space:nowrap">or continue with</span>
        <div style="flex:1;height:1px;background:#e5e7eb"></div>
      </div>
      <div style="display:flex;gap:0.75rem">
        <button style="flex:1;padding:10px;border:1px solid #d1d5db;border-radius:8px;font-size:0.875rem;font-weight:500;color:#374151;background:white;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px"><span style="font-weight:700;color:#4285f4">G</span> Google</button>
        <button style="flex:1;padding:10px;border:1px solid #d1d5db;border-radius:8px;font-size:0.875rem;font-weight:500;color:#374151;background:white;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:6px"><span>⌘</span> GitHub</button>
      </div>
      <p style="font-size:0.875rem;color:#6b7280;text-align:center;margin:1.5rem 0 0 0">Don't have an account? <a style="color:#2563eb;font-weight:500;text-decoration:none;cursor:pointer">Sign up</a></p>
    </div>
  </div>
</div>`,
  },
  {
    slug: "magic-link-flow",
    title: "Magic Link Flow",
    description: "Two-state magic link authentication flow showing the email input and success confirmation side by side.",
    category: "Authentication",
    tags: ["auth", "magic-link", "email", "passwordless", "login"],
    style: "",
    code: `export default function MagicLinkFlow() {
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
}`,
    htmlPreview: `<div style="min-height:300px;background:#f9fafb;display:flex;align-items:center;justify-content:center;padding:2rem;gap:2rem;font-family:system-ui,-apple-system,sans-serif;flex-wrap:wrap">
  <div style="width:100%;max-width:22rem;background:white;border-radius:16px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.1);border:1px solid #e5e7eb;padding:2rem">
    <h2 style="font-size:1.25rem;font-weight:600;color:#111827;margin:0 0 4px 0">Sign in with email</h2>
    <p style="font-size:0.875rem;color:#6b7280;margin:0 0 1.5rem 0">We'll send you a magic link to sign in instantly.</p>
    <div style="display:flex;flex-direction:column;gap:1rem">
      <div>
        <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:4px">Email address</label>
        <input type="email" placeholder="you@example.com" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:10px 16px;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit" />
      </div>
      <button style="width:100%;padding:10px;background:#2563eb;color:white;border-radius:8px;font-weight:500;font-size:0.875rem;border:none;cursor:pointer;font-family:inherit">Send magic link</button>
    </div>
  </div>
  <div style="width:100%;max-width:22rem;background:white;border-radius:16px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.1);border:1px solid #e5e7eb;padding:2rem;text-align:center">
    <div style="width:64px;height:64px;background:#eff6ff;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-size:1.75rem">✉️</div>
    <h2 style="font-size:1.25rem;font-weight:600;color:#111827;margin:0 0 4px 0">Check your inbox</h2>
    <p style="font-size:0.875rem;color:#6b7280;margin:0 0 1.5rem 0">We sent a link to <strong style="color:#111827">user@example.com</strong></p>
    <button style="font-size:0.875rem;color:#2563eb;font-weight:500;background:none;border:none;cursor:pointer;font-family:inherit">Resend link</button>
  </div>
</div>`,
  },
  {
    slug: "two-factor-setup",
    title: "2FA Setup Screen",
    description: "Two-factor authentication setup with QR code, manual entry code, verification input, and downloadable backup codes.",
    category: "Authentication",
    tags: ["auth", "2fa", "security", "totp", "backup-codes"],
    style: "",
    code: `export default function TwoFactorSetup() {
  const backupCodes = ["a1b2-c3d4", "e5f6-g7h8", "i9j0-k1l2", "m3n4-o5p6", "q7r8-s9t0", "u1v2-w3x4", "y5z6-a7b8", "c9d0-e1f2"];

  return (
    <div className="min-h-[600px] bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Two-Factor Authentication</h2>
        <p className="text-sm text-gray-500 mb-6">Scan the QR code with your authenticator app.</p>
        <div className="flex justify-center mb-4">
          <div className="w-40 h-40 grid grid-cols-8 grid-rows-8 gap-0 border border-gray-200 p-2">
            {/* Fake QR pattern */}
          </div>
        </div>
        <div className="text-center mb-6">
          <p className="text-xs text-gray-400 mb-1">Or enter this code manually:</p>
          <code className="text-sm font-mono font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded">ABCD-EFGH-IJKL-MNOP</code>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
          <input type="text" placeholder="000000" maxLength={6} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-center tracking-widest font-mono" />
        </div>
        <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm mb-6">Verify & Enable</button>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Backup Codes</h3>
          <p className="text-xs text-gray-500 mb-3">Save these codes in a secure place.</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {backupCodes.map(code => (
              <div key={code} className="text-xs font-mono bg-gray-50 text-gray-700 px-3 py-2 rounded text-center">{code}</div>
            ))}
          </div>
          <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">Download</button>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:300px;background:#f9fafb;display:flex;align-items:center;justify-content:center;padding:2rem;font-family:system-ui,-apple-system,sans-serif">
  <div style="width:100%;max-width:28rem;background:white;border-radius:16px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.1);border:1px solid #e5e7eb;padding:2rem">
    <h2 style="font-size:1.25rem;font-weight:600;color:#111827;margin:0 0 4px 0">Two-Factor Authentication</h2>
    <p style="font-size:0.875rem;color:#6b7280;margin:0 0 1.5rem 0">Scan the QR code with your authenticator app.</p>
    <div style="display:flex;justify-content:center;margin-bottom:1rem">
      <div style="width:140px;height:140px;display:grid;grid-template-columns:repeat(10,1fr);grid-template-rows:repeat(10,1fr);gap:0;border:1px solid #e5e7eb;padding:4px;box-sizing:border-box">
        <div style="background:#111"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div>
        <div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div>
        <div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div>
        <div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#fff"></div>
        <div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div>
        <div style="background:#fff"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div>
        <div style="background:#111"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div>
        <div style="background:#fff"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#fff"></div><div style="background:#111"></div>
        <div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div>
        <div style="background:#fff"></div><div style="background:#111"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div><div style="background:#fff"></div><div style="background:#111"></div>
      </div>
    </div>
    <div style="text-align:center;margin-bottom:1.5rem">
      <p style="font-size:0.75rem;color:#9ca3af;margin:0 0 6px 0">Or enter this code manually:</p>
      <code style="font-size:0.875rem;font-family:monospace;font-weight:600;color:#1f2937;background:#f3f4f6;padding:4px 12px;border-radius:6px">ABCD-EFGH-IJKL-MNOP</code>
    </div>
    <div style="margin-bottom:1.5rem">
      <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:4px">Verification Code</label>
      <input type="text" placeholder="000000" maxlength="6" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:10px 16px;font-size:0.875rem;outline:none;box-sizing:border-box;text-align:center;letter-spacing:0.15em;font-family:monospace" />
    </div>
    <button style="width:100%;padding:10px;background:#2563eb;color:white;border-radius:8px;font-weight:500;font-size:0.875rem;border:none;cursor:pointer;font-family:inherit;margin-bottom:1.5rem">Verify &amp; Enable</button>
    <div style="border-top:1px solid #e5e7eb;padding-top:1rem">
      <h3 style="font-size:0.875rem;font-weight:600;color:#374151;margin:0 0 0.75rem 0">Backup Codes</h3>
      <p style="font-size:0.75rem;color:#6b7280;margin:0 0 0.75rem 0">Save these codes in a secure place.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:1rem">
        <div style="font-size:0.75rem;font-family:monospace;background:#f9fafb;color:#374151;padding:8px 12px;border-radius:6px;text-align:center">a1b2-c3d4</div>
        <div style="font-size:0.75rem;font-family:monospace;background:#f9fafb;color:#374151;padding:8px 12px;border-radius:6px;text-align:center">e5f6-g7h8</div>
        <div style="font-size:0.75rem;font-family:monospace;background:#f9fafb;color:#374151;padding:8px 12px;border-radius:6px;text-align:center">i9j0-k1l2</div>
        <div style="font-size:0.75rem;font-family:monospace;background:#f9fafb;color:#374151;padding:8px 12px;border-radius:6px;text-align:center">m3n4-o5p6</div>
        <div style="font-size:0.75rem;font-family:monospace;background:#f9fafb;color:#374151;padding:8px 12px;border-radius:6px;text-align:center">q7r8-s9t0</div>
        <div style="font-size:0.75rem;font-family:monospace;background:#f9fafb;color:#374151;padding:8px 12px;border-radius:6px;text-align:center">u1v2-w3x4</div>
        <div style="font-size:0.75rem;font-family:monospace;background:#f9fafb;color:#374151;padding:8px 12px;border-radius:6px;text-align:center">y5z6-a7b8</div>
        <div style="font-size:0.75rem;font-family:monospace;background:#f9fafb;color:#374151;padding:8px 12px;border-radius:6px;text-align:center">c9d0-e1f2</div>
      </div>
      <button style="width:100%;padding:8px;border:1px solid #d1d5db;border-radius:8px;font-size:0.875rem;font-weight:500;color:#374151;background:white;cursor:pointer;font-family:inherit">Download</button>
    </div>
  </div>
</div>`,
  },
  {
    slug: "account-settings-layout",
    title: "Account Settings Layout",
    description: "Settings page with left rail navigation and a profile editing form with avatar, inputs, and save action.",
    category: "Account",
    tags: ["settings", "profile", "account", "form", "navigation"],
    style: "",
    code: `export default function AccountSettings() {
  const navItems = ["Profile", "Security", "Notifications", "Billing", "Team"];

  return (
    <div className="min-h-[500px] bg-gray-50 flex">
      <div className="w-56 bg-white border-r border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Settings</h3>
        <nav className="space-y-1">
          {navItems.map(item => (
            <a key={item} href="#" className={\`block px-3 py-2 rounded-lg text-sm \${
              item === "Profile" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"
            }\`}>{item}</a>
          ))}
        </nav>
      </div>
      <div className="flex-1 p-8 max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile</h2>
        <div className="flex items-center gap-4 mb-8">
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            JD
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-white text-xs font-medium">Change</span>
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-900">John Doe</div>
            <div className="text-sm text-gray-500">john@example.com</div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
            <input type="text" value="John Doe" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value="john@example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea rows={3} placeholder="Write a short bio..." className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm resize-none"></textarea>
          </div>
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm">Save Changes</button>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:300px;background:#f9fafb;display:flex;font-family:system-ui,-apple-system,sans-serif">
  <div style="width:200px;background:white;border-right:1px solid #e5e7eb;padding:1.5rem;flex-shrink:0">
    <h3 style="font-size:0.7rem;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 1rem 0">Settings</h3>
    <nav style="display:flex;flex-direction:column;gap:2px">
      <a style="display:block;padding:8px 12px;border-radius:8px;font-size:0.875rem;background:#eff6ff;color:#1d4ed8;font-weight:500;text-decoration:none;cursor:pointer">Profile</a>
      <a style="display:block;padding:8px 12px;border-radius:8px;font-size:0.875rem;color:#4b5563;text-decoration:none;cursor:pointer">Security</a>
      <a style="display:block;padding:8px 12px;border-radius:8px;font-size:0.875rem;color:#4b5563;text-decoration:none;cursor:pointer">Notifications</a>
      <a style="display:block;padding:8px 12px;border-radius:8px;font-size:0.875rem;color:#4b5563;text-decoration:none;cursor:pointer">Billing</a>
      <a style="display:block;padding:8px 12px;border-radius:8px;font-size:0.875rem;color:#4b5563;text-decoration:none;cursor:pointer">Team</a>
    </nav>
  </div>
  <div style="flex:1;padding:2rem;max-width:40rem">
    <h2 style="font-size:1.25rem;font-weight:600;color:#111827;margin:0 0 1.5rem 0">Profile</h2>
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem">
      <div style="position:relative;width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#60a5fa,#a855f7);display:flex;align-items:center;justify-content:center;color:white;font-size:1.5rem;font-weight:700;flex-shrink:0;overflow:hidden">
        JD
        <div style="position:absolute;inset:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;border-radius:50%;opacity:0.7">
          <span style="color:white;font-size:0.7rem;font-weight:500">Change</span>
        </div>
      </div>
      <div>
        <div style="font-weight:500;color:#111827;font-size:0.95rem">John Doe</div>
        <div style="font-size:0.8rem;color:#6b7280">john@example.com</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1rem">
      <div>
        <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:4px">Display Name</label>
        <input type="text" value="John Doe" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:10px 16px;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit" />
      </div>
      <div>
        <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:4px">Email</label>
        <input type="email" value="john@example.com" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:10px 16px;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit" />
      </div>
      <div>
        <label style="display:block;font-size:0.875rem;font-weight:500;color:#374151;margin-bottom:4px">Bio</label>
        <textarea rows="3" placeholder="Write a short bio..." style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:10px 16px;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit;resize:none"></textarea>
      </div>
      <div>
        <button style="padding:10px 24px;background:#2563eb;color:white;border-radius:8px;font-weight:500;font-size:0.875rem;border:none;cursor:pointer;font-family:inherit">Save Changes</button>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    slug: "team-members-list",
    title: "Team Members List",
    description: "Team management table with member info, role dropdowns, status badges, and action controls.",
    category: "Account",
    tags: ["team", "members", "table", "roles", "management"],
    style: "",
    code: `export default function TeamMembersList() {
  const members = [
    { name: "Sarah Chen", email: "sarah@example.com", role: "Owner", status: "Active", initials: "SC", color: "bg-purple-500" },
    { name: "Alex Rivera", email: "alex@example.com", role: "Admin", status: "Active", initials: "AR", color: "bg-blue-500" },
    { name: "Jordan Lee", email: "jordan@example.com", role: "Member", status: "Active", initials: "JL", color: "bg-emerald-500" },
    { name: "Taylor Kim", email: "taylor@example.com", role: "Member", status: "Pending", initials: "TK", color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-[400px] bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Invite</button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Member</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.email} className="border-b border-gray-100 last:border-0">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className={\`w-8 h-8 rounded-full \${m.color} text-white text-xs font-medium flex items-center justify-center\`}>{m.initials}</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{m.name}</div>
                      <div className="text-xs text-gray-500">{m.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                      <option selected={m.role === "Owner"}>Owner</option>
                      <option selected={m.role === "Admin"}>Admin</option>
                      <option selected={m.role === "Member"}>Member</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className={\`inline-block px-2 py-0.5 rounded-full text-xs font-medium \${
                      m.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }\`}>{m.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm text-red-500 hover:text-red-700">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}`,
    htmlPreview: `<div style="min-height:300px;background:#f9fafb;padding:2rem;font-family:system-ui,-apple-system,sans-serif">
  <div style="max-width:56rem;margin:0 auto">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
      <h2 style="font-size:1.25rem;font-weight:600;color:#111827;margin:0">Team Members</h2>
      <button style="padding:8px 16px;background:#2563eb;color:white;border-radius:8px;font-size:0.875rem;font-weight:500;border:none;cursor:pointer;font-family:inherit">Invite</button>
    </div>
    <div style="background:white;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid #e5e7eb;background:#f9fafb">
            <th style="text-align:left;padding:12px 24px;font-size:0.7rem;font-weight:500;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em">Member</th>
            <th style="text-align:left;padding:12px 24px;font-size:0.7rem;font-weight:500;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em">Role</th>
            <th style="text-align:left;padding:12px 24px;font-size:0.7rem;font-weight:500;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em">Status</th>
            <th style="text-align:right;padding:12px 24px;font-size:0.7rem;font-weight:500;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid #f3f4f6">
            <td style="padding:16px 24px">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:32px;height:32px;border-radius:50%;background:#a855f7;color:white;font-size:0.7rem;font-weight:500;display:flex;align-items:center;justify-content:center;flex-shrink:0">SC</div>
                <div>
                  <div style="font-size:0.875rem;font-weight:500;color:#111827">Sarah Chen</div>
                  <div style="font-size:0.75rem;color:#6b7280">sarah@example.com</div>
                </div>
              </div>
            </td>
            <td style="padding:16px 24px">
              <select style="border:1px solid #d1d5db;border-radius:4px;padding:4px 8px;font-size:0.8rem;font-family:inherit;background:white">
                <option selected>Owner</option><option>Admin</option><option>Member</option>
              </select>
            </td>
            <td style="padding:16px 24px">
              <span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#d1fae5;color:#047857">Active</span>
            </td>
            <td style="padding:16px 24px;text-align:right">
              <button style="font-size:0.8rem;color:#ef4444;background:none;border:none;cursor:pointer;font-family:inherit">Remove</button>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6">
            <td style="padding:16px 24px">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:32px;height:32px;border-radius:50%;background:#3b82f6;color:white;font-size:0.7rem;font-weight:500;display:flex;align-items:center;justify-content:center;flex-shrink:0">AR</div>
                <div>
                  <div style="font-size:0.875rem;font-weight:500;color:#111827">Alex Rivera</div>
                  <div style="font-size:0.75rem;color:#6b7280">alex@example.com</div>
                </div>
              </div>
            </td>
            <td style="padding:16px 24px">
              <select style="border:1px solid #d1d5db;border-radius:4px;padding:4px 8px;font-size:0.8rem;font-family:inherit;background:white">
                <option>Owner</option><option selected>Admin</option><option>Member</option>
              </select>
            </td>
            <td style="padding:16px 24px">
              <span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#d1fae5;color:#047857">Active</span>
            </td>
            <td style="padding:16px 24px;text-align:right">
              <button style="font-size:0.8rem;color:#ef4444;background:none;border:none;cursor:pointer;font-family:inherit">Remove</button>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6">
            <td style="padding:16px 24px">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:32px;height:32px;border-radius:50%;background:#10b981;color:white;font-size:0.7rem;font-weight:500;display:flex;align-items:center;justify-content:center;flex-shrink:0">JL</div>
                <div>
                  <div style="font-size:0.875rem;font-weight:500;color:#111827">Jordan Lee</div>
                  <div style="font-size:0.75rem;color:#6b7280">jordan@example.com</div>
                </div>
              </div>
            </td>
            <td style="padding:16px 24px">
              <select style="border:1px solid #d1d5db;border-radius:4px;padding:4px 8px;font-size:0.8rem;font-family:inherit;background:white">
                <option>Owner</option><option>Admin</option><option selected>Member</option>
              </select>
            </td>
            <td style="padding:16px 24px">
              <span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#d1fae5;color:#047857">Active</span>
            </td>
            <td style="padding:16px 24px;text-align:right">
              <button style="font-size:0.8rem;color:#ef4444;background:none;border:none;cursor:pointer;font-family:inherit">Remove</button>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:32px;height:32px;border-radius:50%;background:#f97316;color:white;font-size:0.7rem;font-weight:500;display:flex;align-items:center;justify-content:center;flex-shrink:0">TK</div>
                <div>
                  <div style="font-size:0.875rem;font-weight:500;color:#111827">Taylor Kim</div>
                  <div style="font-size:0.75rem;color:#6b7280">taylor@example.com</div>
                </div>
              </div>
            </td>
            <td style="padding:16px 24px">
              <select style="border:1px solid #d1d5db;border-radius:4px;padding:4px 8px;font-size:0.8rem;font-family:inherit;background:white">
                <option>Owner</option><option>Admin</option><option selected>Member</option>
              </select>
            </td>
            <td style="padding:16px 24px">
              <span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:0.75rem;font-weight:500;background:#fef3c7;color:#b45309">Pending</span>
            </td>
            <td style="padding:16px 24px;text-align:right">
              <button style="font-size:0.8rem;color:#ef4444;background:none;border:none;cursor:pointer;font-family:inherit">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`,
  },
];
