/**
 * Curva de niveles (sección 5 del doc técnico): progresión no lineal,
 * xp_requerido = 100 * nivel^1.5, ajustable por el admin.
 *
 * totalXpForLevel(n) devuelve el XP TOTAL acumulado necesario para alcanzar
 * el nivel n. El nivel 1 siempre empieza en 0 XP.
 */
const BASE_XP = 100;
const CURVE_EXPONENT = 1.5;

export function totalXpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.round(BASE_XP * Math.pow(level - 1, CURVE_EXPONENT));
}

export function levelFromXp(xp: number): number {
  let level = 1;
  while (totalXpForLevel(level + 1) <= xp) {
    level += 1;
  }
  return level;
}

export interface LevelProgress {
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  xpRemaining: number;
  /** porcentaje de avance dentro del nivel actual, 0-100 */
  percent: number;
}

export function getLevelProgress(currentXp: number): LevelProgress {
  const level = levelFromXp(currentXp);
  const floor = totalXpForLevel(level);
  const ceiling = totalXpForLevel(level + 1);
  const xpIntoLevel = currentXp - floor;
  const xpForNextLevel = ceiling - floor;
  const percent = xpForNextLevel === 0 ? 100 : Math.min(100, Math.round((xpIntoLevel / xpForNextLevel) * 100));

  return {
    level,
    xpIntoLevel,
    xpForNextLevel,
    xpRemaining: Math.max(0, ceiling - currentXp),
    percent,
  };
}
