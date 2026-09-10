'use client';

import { useState } from 'react';
import { useHabits } from '@/hooks/useHabits';
import { levelFromXp } from '@/lib/gamification/levels';
import { LevelBadge } from './LevelBadge';
import { XPProgressBar } from './XPProgressBar';
import { StreakIndicator } from './StreakIndicator';
import { HabitChecklist } from './HabitChecklist';

interface DashboardViewProps {
  username: string;
  initialXp: number;
  initialStreak: number;
  longestStreak: number;
}

export function DashboardView({ username, initialXp, initialStreak, longestStreak }: DashboardViewProps) {
  const { habits, loading, error, completeHabit } = useHabits();
  const [xp, setXp] = useState(initialXp);
  const [streak, setStreak] = useState(initialStreak);

  const handleComplete = async (habitId: string) => {
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return;

    // Reflejo optimista en la UI; el servidor confirma o corrige el valor
    // real (incluyendo el bono de racha) en la siguiente carga de perfil.
    setXp((prev) => prev + habit.xpValue);
    setStreak((prev) => (prev === 0 ? 1 : prev));

    await completeHabit(habitId);
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-10">
      <header>
        <p className="text-sm text-[#6B7280]">Hola de nuevo</p>
        <h1 className="font-['Space_Grotesk'] text-3xl font-semibold text-[#14171F]">{username}</h1>
      </header>

      <section className="flex flex-col gap-6 border border-[#E5E7EB] bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <LevelBadge level={levelFromXp(xp)} />
          <StreakIndicator currentStreak={streak} longestStreak={longestStreak} />
        </div>
        <XPProgressBar currentXp={xp} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-['Space_Grotesk'] text-xl font-semibold text-[#14171F]">Hábitos de hoy</h2>
        {loading && <p className="text-sm text-[#6B7280]">Cargando hábitos…</p>}
        {error && <p className="text-sm text-[#DB5A42]">{error}</p>}
        {!loading && !error && <HabitChecklist habits={habits} onComplete={handleComplete} />}
      </section>
    </div>
  );
}
