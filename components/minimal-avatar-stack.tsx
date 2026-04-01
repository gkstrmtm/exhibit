/**
 * Overlapping Avatar Stack
 * Category: Data Display
 * Tags: avatar, stack, users, collaboration, social
 * Description: Stacked avatar group with overflow counter. Common in collaboration tools and dashboards.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/minimal-avatar-stack.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function AvatarStack() {
  const colors = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"];
  const initials = ["JD", "AK", "SM", "RB", "LW"];

  return (
    <div className="p-12 bg-white flex items-center justify-center min-h-[150px]">
      <div className="flex items-center">
        <div className="flex -space-x-3">
          {colors.map((c, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm"
              style={{ backgroundColor: c, zIndex: colors.length - i }}
            >
              {initials[i]}
            </div>
          ))}
        </div>
        <div className="ml-1 w-10 h-10 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-neutral-500 text-xs font-medium">
          +8
        </div>
      </div>
    </div>
  );
}