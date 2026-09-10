'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { HabitWithStatus } from '@/types/habit';

interface UseHabitsResult {
  habits: HabitWithStatus[];
  loading: boolean;
  error: string | null;
  completeHabit: (habitId: string) => Promise<void>;
}

export function useHabits(): UseHabitsResult {
  const [habits, setHabits] = useState<HabitWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHabits = useCallback(async () => {
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError('No hay una sesión activa.');
      setLoading(false);
      return;
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [{ data: habitRows, error: habitsError }, { data: logRows, error: logsError }] = await Promise.all([
      supabase.from('habits').select('*').eq('is_active', true).order('title'),
      supabase
        .from('habit_logs')
        .select('habit_id')
        .eq('user_id', user.id)
        .gte('completed_at', todayStart.toISOString()),
    ]);

    if (habitsError || logsError) {
      setError((habitsError ?? logsError)?.message ?? 'No se pudieron cargar los hábitos.');
      setLoading(false);
      return;
    }

    const completedIds = new Set((logRows ?? []).map((log) => log.habit_id));

    setHabits(
      (habitRows ?? []).map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        xpValue: row.xp_value,
        frequency: row.frequency,
        isActive: row.is_active,
        completedToday: completedIds.has(row.id),
      }))
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  const completeHabit = useCallback(async (habitId: string) => {
    // Actualización optimista: la validación real (duplicados, cálculo de XP
    // y bono de racha) ocurre en el servidor, en
    // app/api/habits/[id]/complete/route.ts, que es el único que puede
    // escribir en xp_transactions bajo las políticas RLS.
    setHabits((prev) => prev.map((habit) => (habit.id === habitId ? { ...habit, completedToday: true } : habit)));

    const response = await fetch(`/api/habits/${habitId}/complete`, { method: 'POST' });

    if (!response.ok) {
      setHabits((prev) =>
        prev.map((habit) => (habit.id === habitId ? { ...habit, completedToday: false } : habit))
      );
      setError('No se pudo registrar el hábito. Intenta de nuevo.');
    }
  }, []);

  return { habits, loading, error, completeHabit };
}
