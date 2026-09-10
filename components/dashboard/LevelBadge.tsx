interface LevelBadgeProps {
  level: number;
}

export function LevelBadge({ level }: LevelBadgeProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#14171F] text-white"
        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        aria-hidden="true"
      >
        <span className="font-['Space_Grotesk'] text-xl font-semibold">{level}</span>
      </div>
      <div>
        <p className="text-sm text-[#6B7280]">Nivel actual</p>
        <p className="font-['Space_Grotesk'] text-lg font-semibold text-[#14171F]">Nivel {level}</p>
      </div>
    </div>
  );
}
