/**
 * Challenge Submission Card
 * Category: Gamification
 * Tags: gamification, challenge, submission, voting, competition
 * Description: A card displaying a challenge entry with gradient preview, submitter info, vote count with upvote button, comment count, and rank badge.
 *
 * Source: https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components/challenge-submission-card.tsx
 * Index:  https://raw.githubusercontent.com/gkstrmtm/exhibit/main/components.json
 */

export default function ChallengeSubmissionCard() {
  return (
    <div className="p-8 bg-neutral-50 min-h-[300px] flex items-center justify-center">
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden max-w-sm w-full">
        <div className="h-40 bg-gradient-to-br from-violet-400 via-fuchsia-400 to-pink-400" />
        <div className="p-4">
          <h3 className="font-bold text-base mb-2">Animated Dashboard Concept</h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">RK</div>
            <span className="text-sm text-neutral-600">Rachel Kim</span>
            <span className="text-xs text-neutral-400 ml-auto">Mar 12, 2025</span>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 rounded-lg border border-neutral-200 text-sm font-medium hover:bg-neutral-100 transition-colors">
              <span className="text-indigo-500">▲</span> 47
            </button>
            <span className="text-sm text-neutral-500">💬 12 comments</span>
          </div>
          <div className="pt-3 border-t border-neutral-100">
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">#3 of 128 entries</span>
          </div>
        </div>
      </div>
    </div>
  );
}