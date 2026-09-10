import { getLevelProgress } from '@/lib/gamification/levels';

interface XPProgressBarProps {
  currentXp: number;
}

export function XPProgressBar({ currentXp }: XPProgressBarProps) {
  const { xpIntoLevel, xpForNextLevel, xpRemaining, percent } = getLevelProgress(currentXp);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-['Space_Grotesk'] text-2xl font-semibold text-[#14171F]">
          {xpIntoLevel.toLocaleString('es')}
          <span className="ml-1 text-sm font-normal text-[#6B7280]">/ {xpForNextLevel.toLocaleString('es')} XP</span>
        </span>
        <span className="text-sm text-[#6B7280]">{xpRemaining.toLocaleString('es')} para subir de nivel</span>
      </div>
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-[#EDEEF2]"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso hacia el siguiente nivel"
      >
        <div
          className="h-full rounded-full bg-[#E8A33D] transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
