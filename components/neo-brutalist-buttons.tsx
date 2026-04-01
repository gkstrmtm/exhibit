/**
 * Neo-Brutalist Buttons
 * Category: Buttons
 * Tags: brutalism, buttons, interactive, bold
 * Description: High contrast, hard shadows, and bold borders. Perfect for calls to action that demand attention.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/neo-brutalist-buttons.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function NeoBrutalistButtons() {
  return (
    <div className="p-8 flex gap-4 items-center justify-center bg-[#FFDEE2]">
      <button className="px-6 py-3 font-bold bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black">
        CONFIRM ACTION
      </button>
      <button className="px-6 py-3 font-bold bg-[#A3E635] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2 text-black">
        NEXT STEP →
      </button>
    </div>
  );
}