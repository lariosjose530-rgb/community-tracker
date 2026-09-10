/**
 * Bonos de racha (sección 5 del doc técnico): al alcanzar múltiplos de 7 días
 * consecutivos se otorga un bono porcentual de XP.
 */
const MILESTONE_INTERVAL = 7;

export function isStreakMilestone(streak: number): boolean {
  return streak > 0 && streak % MILESTONE_INTERVAL === 0;
}

export function nextMilestone(streak: number): number {
  return (Math.floor(streak / MILESTONE_INTERVAL) + 1) * MILESTONE_INTERVAL;
}
