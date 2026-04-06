/**
 * Security Settings
 * Category: Account
 * Tags: security, password, 2fa, account, settings
 * Description: Password change section with current/new/confirm fields, and a two-factor authentication enable row. Clean section dividers.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/security-settings.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function SecuritySettings() {
  return (
    <div className="bg-white border border-neutral-100 rounded-xl divide-y divide-neutral-100 max-w-md">
      <div className="p-5 space-y-4">
        <h3 className="text-sm font-semibold text-neutral-900">Change password</h3>
        {["Current password","New password","Confirm new password"].map(l => (
          <div key={l}>
            <label className="block text-xs font-medium text-neutral-600 mb-1.5">{l}</label>
            <input type="password" defaultValue="••••••••" className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-blue-400" />
          </div>
        ))}
        <button className="px-4 py-2 text-sm bg-neutral-900 text-white rounded-lg">Update password</button>
      </div>
      <div className="p-5 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-neutral-900">Two-factor authentication</div>
          <div className="text-xs text-neutral-400 mt-0.5">Add an extra layer of security to your account</div>
        </div>
        <button className="px-3 py-1.5 text-xs border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50">Enable</button>
      </div>
    </div>
  );
}