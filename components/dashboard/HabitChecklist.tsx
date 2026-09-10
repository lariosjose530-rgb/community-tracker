'use client';

import { Check } from 'lucide-react';
import type { HabitWithStatus } from '@/types/habit';

interface HabitChecklistProps {
  habits: HabitWithStatus[];
  onComplete: (habitId: string) => void;
}

export function HabitChecklist({ habits, onComplete }: HabitChecklistProps) {
  if (habits.length === 0) {
    return <p className="text-sm text-[#6B7280]">Todavía no hay hábitos configurados para hoy.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {habits.map((habit) => (
        <li key={habit.id}>
          <button
            type="button"
            onClick={() => !habit.completedToday && onComplete(habit.id)}
            disabled={habit.completedToday}
            className={`flex w-full items-center gap-3 border px-4 py-3 text-left transition-colors ${
              habit.completedToday
                ? 'border-[#E8A33D]/40 bg-[#FDF5E8]'
                : 'border-[#E5E7EB] bg-white hover:border-[#14171F]/30'
            }`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center border-2 ${
                habit.completedToday ? 'border-[#E8A33D] bg-[#E8A33D]' : 'border-[#D1D5DB]'
              }`}
              aria-hidden="true"
            >
              {habit.completedToday && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
            </span>
            <span className="flex-1">
              <span
                className={`block font-medium ${
                  habit.completedToday ? 'text-[#8A6A2F] line-through decoration-1' : 'text-[#14171F]'
                }`}
              >
                {habit.title}
              </span>
              {habit.description && <span className="block text-sm text-[#6B7280]">{habit.description}</span>}
            </span>
            <span className="shrink-0 text-sm font-semibold text-[#E8A33D]">+{habit.xpValue} XP</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
