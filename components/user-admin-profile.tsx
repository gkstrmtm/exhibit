/**
 * User Admin Profile View
 * Category: Admin
 * Tags: user, profile, admin, moderation, management
 * Description: Administrative user profile with avatar, status/role badges, info grid, action buttons (suspend, ban, reset, impersonate), and notes section.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/user-admin-profile.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function UserAdminProfile() {
  return (
    <div className="p-8 bg-neutral-50 min-h-[300px]">
      <div className="max-w-2xl mx-auto bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">JD</div>
            <div>
              <h2 className="text-lg font-semibold">Jane Doe</h2>
              <p className="text-sm text-neutral-500">jane.doe@example.com</p>
              <div className="flex gap-2 mt-1">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-0.5 rounded-full">Active</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">Editor</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-b border-neutral-100 grid grid-cols-2 gap-4">
          <div><div className="text-xs text-neutral-500 mb-1">Join Date</div><div className="text-sm font-medium">March 12, 2023</div></div>
          <div><div className="text-xs text-neutral-500 mb-1">Last Login</div><div className="text-sm font-medium">Jan 15, 2024 at 2:34 PM</div></div>
          <div><div className="text-xs text-neutral-500 mb-1">IP Address</div><div className="text-sm font-mono">192.168.1.42</div></div>
          <div><div className="text-xs text-neutral-500 mb-1">Sessions</div><div className="text-sm font-medium">3 active</div></div>
        </div>
        <div className="p-6 border-b border-neutral-100 flex flex-wrap gap-2">
          <button className="px-4 py-2 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-lg">Suspend</button>
          <button className="px-4 py-2 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded-lg">Ban</button>
          <button className="px-4 py-2 text-xs font-medium bg-neutral-50 text-neutral-700 border border-neutral-200 rounded-lg">Reset Password</button>
          <button className="px-4 py-2 text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 rounded-lg">Impersonate</button>
        </div>
        <div className="p-6">
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Admin Notes</div>
          <textarea className="w-full border border-neutral-200 rounded-lg p-3 text-sm resize-none" rows={3} placeholder="Add a note about this user..." />
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg">Add Note</button>
        </div>
      </div>
    </div>
  );
}