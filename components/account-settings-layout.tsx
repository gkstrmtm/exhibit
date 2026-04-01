/**
 * Account Settings Layout
 * Category: Account
 * Tags: settings, profile, account, form, navigation
 * Description: Settings page with left rail navigation and a profile editing form with avatar, inputs, and save action.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/account-settings-layout.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function AccountSettings() {
  const navItems = ["Profile", "Security", "Notifications", "Billing", "Team"];

  return (
    <div className="min-h-[500px] bg-gray-50 flex">
      <div className="w-56 bg-white border-r border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Settings</h3>
        <nav className="space-y-1">
          {navItems.map(item => (
            <a key={item} href="#" className={`block px-3 py-2 rounded-lg text-sm ${
              item === "Profile" ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"
            }`}>{item}</a>
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
}