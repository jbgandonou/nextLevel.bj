import { Badge } from './types';
import { phases } from './phases';

export const badges: Badge[] = [
  // --- Common ---
  {
    id: 'first-quiz',
    name: 'Premier QCM',
    description: 'Completer votre premier quiz',
    icon: 'question-circle',
    rarity: 'common',
    condition: (ctx) => ctx.quizAttempts.length >= 1,
  },
  {
    id: 'first-lesson',
    name: 'Premiere Lecon',
    description: 'Terminer votre premiere lecon',
    icon: 'book',
    rarity: 'common',
    condition: (ctx) => ctx.completedLessons.length >= 1,
  },
  {
    id: '5-lessons',
    name: '5 Lecons',
    description: 'Terminer 5 lecons',
    icon: 'graduation-cap',
    rarity: 'common',
    condition: (ctx) => ctx.completedLessons.length >= 5,
  },
  {
    id: '10-lessons',
    name: '10 Lecons',
    description: 'Terminer 10 lecons',
    icon: 'star-half-o',
    rarity: 'common',
    condition: (ctx) => ctx.completedLessons.length >= 10,
  },
  {
    id: '5-quizzes',
    name: '5 QCM',
    description: 'Completer 5 quiz',
    icon: 'pencil',
    rarity: 'common',
    condition: (ctx) => ctx.quizAttempts.length >= 5,
  },

  // --- Rare ---
  {
    id: 'perfect-score',
    name: 'Score Parfait',
    description: 'Obtenir 100% a un quiz',
    icon: 'diamond',
    rarity: 'rare',
    condition: (ctx) => ctx.quizAttempts.some((a) => a.score === a.totalQuestions),
  },
  {
    id: 'phase-completed',
    name: 'Phase Terminee',
    description: 'Completer toutes les lecons d\'une phase',
    icon: 'flag-checkered',
    rarity: 'rare',
    condition: (ctx) =>
      phases.some((p) => p.lessonIds.length > 0 && p.lessonIds.every((id) => ctx.completedLessons.includes(id))),
  },
  {
    id: '20-lessons',
    name: '20 Lecons',
    description: 'Terminer 20 lecons',
    icon: 'bookmark',
    rarity: 'rare',
    condition: (ctx) => ctx.completedLessons.length >= 20,
  },
  {
    id: '25-quizzes',
    name: '25 QCM',
    description: 'Completer 25 quiz',
    icon: 'tasks',
    rarity: 'rare',
    condition: (ctx) => ctx.quizAttempts.length >= 25,
  },
  {
    id: 'xp-1000',
    name: '1000 XP',
    description: 'Accumuler 1000 XP',
    icon: 'bolt',
    rarity: 'rare',
    condition: (ctx) => ctx.totalXP >= 1000,
  },

  // --- Epic ---
  {
    id: 'phase1-complete',
    name: 'Security+ Master',
    description: 'Terminer toutes les lecons Phase 1',
    icon: 'shield',
    rarity: 'epic',
    condition: (ctx) => {
      const p = phases.find((ph) => ph.id === 'phase-01');
      return !!p && p.lessonIds.every((id) => ctx.completedLessons.includes(id));
    },
  },
  {
    id: '100-quizzes',
    name: 'Quiz Machine',
    description: 'Completer 100 quiz',
    icon: 'rocket',
    rarity: 'epic',
    condition: (ctx) => ctx.quizAttempts.length >= 100,
  },
  {
    id: 'xp-5000',
    name: '5000 XP',
    description: 'Accumuler 5000 XP',
    icon: 'fire',
    rarity: 'epic',
    condition: (ctx) => ctx.totalXP >= 5000,
  },

  // --- Legendary ---
  {
    id: 'all-phases',
    name: 'Toutes Phases',
    description: 'Completer les 6 phases',
    icon: 'trophy',
    rarity: 'legendary',
    condition: (ctx) =>
      phases.every((p) => p.lessonIds.length > 0 && p.lessonIds.every((id) => ctx.completedLessons.includes(id))),
  },
  {
    id: 'master',
    name: 'Maitre Security+',
    description: 'Tout terminer avec un score moyen > 85%',
    icon: 'star',
    rarity: 'legendary',
    condition: (ctx) => {
      if (ctx.quizAttempts.length < 10) return false;
      const avg = ctx.quizAttempts.reduce((s, a) => s + (a.score / a.totalQuestions) * 100, 0) / ctx.quizAttempts.length;
      return avg >= 85 && phases.every((p) => p.lessonIds.every((id) => ctx.completedLessons.includes(id)));
    },
  },
];
