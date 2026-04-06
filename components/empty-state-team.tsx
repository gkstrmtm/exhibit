/**
 * Empty Team Members
 * Category: Empty States
 * Tags: empty state, team, invite, members, zero state
 * Description: Zero-state for a team management page. Avatar placeholder ring, headline, description, and a solid 'Invite member' CTA.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/empty-state-team.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function EmptyTeamMembers() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="flex -space-x-2 mb-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-10 h-10 rounded-full bg-neutral-100 border-2 border-white flex items-center justify-center text-neutral-300 text-lg">+</div>
        ))}
      </div>
      <h3 className="text-sm font-semibold text-neutral-900 mb-1">No team members yet</h3>
      <p className="text-xs text-neutral-500 max-w-[240px] mb-5">Invite your teammates to collaborate. They'll get an email with a sign-in link.</p>
      <button className="px-4 py-2 text-sm bg-neutral-900 text-white rounded-lg hover:bg-neutral-800">Invite member</button>
    </div>
  );
}