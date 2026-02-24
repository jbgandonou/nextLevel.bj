/** XP needed to reach a given level: 100 * level^1.5 */
export function getXPForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(100 * Math.pow(level, 1.5));
}

/** Calculate level from total XP */
export function calculateLevel(xp: number): number {
  let level = 1;
  while (getXPForLevel(level + 1) <= xp) {
    level++;
  }
  return level;
}

/** Progress within current level (0-1) */
export function getXPProgress(xp: number): number {
  const level = calculateLevel(xp);
  const currentLevelXP = getXPForLevel(level);
  const nextLevelXP = getXPForLevel(level + 1);
  const range = nextLevelXP - currentLevelXP;
  if (range <= 0) return 1;
  return (xp - currentLevelXP) / range;
}

/** Calculate XP earned from a quiz */
export function calculateQuizXP(score: number, total: number): number {
  const base = 20;
  const perCorrect = 5;
  const perfectBonus = score === total ? 50 : 0;
  return base + score * perCorrect + perfectBonus;
}

/** XP for completing a lesson */
export const LESSON_XP = 50;

/** Level titles */
export function getLevelTitle(level: number): string {
  if (level >= 50) return 'Legendaire';
  if (level >= 30) return 'Expert';
  if (level >= 20) return 'Avance';
  if (level >= 10) return 'Intermediaire';
  if (level >= 5) return 'Apprenti';
  return 'Debutant';
}
