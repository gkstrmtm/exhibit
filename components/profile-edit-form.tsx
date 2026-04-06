/**
 * Profile Edit Form
 * Category: Account
 * Tags: profile, edit, form, account, settings
 * Description: Edit profile form with avatar upload area, name, handle, bio, and website fields. Persistent labels, clear CTA hierarchy.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/profile-edit-form.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ProfileEditForm() {
  return (
    <div className="bg-white border border-neutral-100 rounded-xl p-6 max-w-md space-y-5">
      <h2 className="text-sm font-semibold text-neutral-900">Edit Profile</h2>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center text-2xl font-bold text-white">M</div>
        <button className="text-sm text-blue-600 hover:underline">Change photo</button>
      </div>
      {[{label:"Display name",val:"Mia Chen"},{label:"Username",val:"@mia",pre:"@"},{label:"Website",val:"mia.design"}].map(f => (
        <div key={f.label}>
          <label className="block text-xs font-medium text-neutral-600 mb-1.5">{f.label}</label>
          <input defaultValue={f.val} className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:border-blue-400" />
        </div>
      ))}
      <div>
        <label className="block text-xs font-medium text-neutral-600 mb-1.5">Bio</label>
        <textarea rows={3} defaultValue="Product designer & developer." className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg text-neutral-900 resize-none focus:outline-none focus:border-blue-400" />
      </div>
      <div className="flex gap-2 pt-1">
        <button className="flex-1 py-2 text-sm bg-neutral-900 text-white rounded-lg hover:bg-neutral-800">Save changes</button>
        <button className="px-4 py-2 text-sm border border-neutral-200 text-neutral-600 rounded-lg hover:bg-neutral-50">Cancel</button>
      </div>
    </div>
  );
}