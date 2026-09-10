export type HabitFrequency = 'diario' | 'semanal';

export interface Habit {
  id: string;
  title: string;
  description: string | null;
  xpValue: number;
  frequency: HabitFrequency;
  isActive: boolean;
}

export interface HabitWithStatus extends Habit {
  /** true si el usuario ya completó este hábito en el día calendario actual */
  completedToday: boolean;
}
