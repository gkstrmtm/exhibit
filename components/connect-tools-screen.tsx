/**
 * Connect Your Tools
 * Category: Onboarding
 * Tags: integrations, tools, connect, onboarding, services
 * Description: Integration grid showing connected and available third-party services with status indicators and connect actions.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/connect-tools-screen.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ConnectTools() {
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
}