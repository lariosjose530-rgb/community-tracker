import { Flame } from 'lucide-react';
import { isStreakMilestone, nextMilestone } from '@/lib/gamification/streaks';

interface StreakIndicatorProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakIndicator({ currentStreak, longestStreak }: StreakIndicatorProps) {
  const milestone = isStreakMilestone(currentStreak);

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
          milestone ? 'bg-[#DB5A42]' : 'bg-[#FBEAE6]'
        }`}
      >
        <Flame className={`h-5 w-5 ${milestone ? 'text-white' : 'text-[#DB5A42]'}`} strokeWidth={2.25} />
      </div>
      <div>
        <p className="font-['Space_Grotesk'] text-lg font-semibold text-[#14171F]">
          {currentStreak} {currentStreak === 1 ? 'día seguido' : 'días seguidos'}
        </p>
        <p className="text-sm text-[#6B7280]">
          {currentStreak > 0
            ? `Bono en ${nextMilestone(currentStreak) - currentStreak} días · récord: ${longestStreak}`
            : `Tu récord es de ${longestStreak} días`}
        </p>
      </div>
    </div>
  );
}
