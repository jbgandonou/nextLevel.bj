import { create } from 'zustand';
import {
  getCompletedLessons,
  markLessonComplete,
  markLessonIncomplete,
  saveQuizAttempt,
  getQuizAttempts,
  getCurrentStreak,
  recordStreak,
  getUserProfile,
  addXP,
  getEarnedBadges,
  awardBadge,
  getRecentXPTransactions,
} from './database';
import { badges } from '@/data/badges';
import { BadgeContext } from '@/data/types';
import { calculateLevel, calculateQuizXP, LESSON_XP } from '@/utils/gamification';

interface AppState {
  completedLessons: string[];
  quizAttempts: {
    id: number;
    phaseId: string;
    score: number;
    totalQuestions: number;
    date: string;
    answers: string;
  }[];
  streak: number;
  isLoaded: boolean;

  // Gamification
  totalXP: number;
  level: number;
  earnedBadgeIds: string[];
  /** Newly earned badge IDs from last action — UI should consume & clear */
  newBadgeIds: string[];
  /** XP earned from last action — UI should consume & clear */
  lastXPGain: number;
  /** Whether a level up happened on last action */
  didLevelUp: boolean;

  loadData: () => Promise<void>;
  toggleLesson: (lessonId: string) => Promise<void>;
  submitQuiz: (attempt: {
    phaseId: string;
    lessonId?: string;
    score: number;
    totalQuestions: number;
    answers: { questionId: string; selectedIndex: number; correct: boolean }[];
  }) => Promise<void>;
  refreshStreak: () => Promise<void>;
  clearNotifications: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  completedLessons: [],
  quizAttempts: [],
  streak: 0,
  isLoaded: false,
  totalXP: 0,
  level: 1,
  earnedBadgeIds: [],
  newBadgeIds: [],
  lastXPGain: 0,
  didLevelUp: false,

  loadData: async () => {
    const [completedLessons, quizAttempts, streak, profile, earnedBadgeIds] = await Promise.all([
      getCompletedLessons(),
      getQuizAttempts(),
      getCurrentStreak(),
      getUserProfile(),
      getEarnedBadges(),
    ]);
    const totalXP = profile?.totalXP || 0;
    set({
      completedLessons,
      quizAttempts,
      streak,
      isLoaded: true,
      totalXP,
      level: calculateLevel(totalXP),
      earnedBadgeIds,
    });
  },

  toggleLesson: async (lessonId: string) => {
    const { completedLessons, totalXP } = get();
    if (completedLessons.includes(lessonId)) {
      await markLessonIncomplete(lessonId);
      set({ completedLessons: completedLessons.filter((id) => id !== lessonId) });
    } else {
      await markLessonComplete(lessonId);
      await recordStreak();

      // Award XP
      const xp = LESSON_XP;
      await addXP(xp, 'lesson', lessonId);
      const newTotalXP = totalXP + xp;
      const oldLevel = calculateLevel(totalXP);
      const newLevel = calculateLevel(newTotalXP);

      const streak = await getCurrentStreak();
      const newCompleted = [...completedLessons, lessonId];

      set({
        completedLessons: newCompleted,
        streak,
        totalXP: newTotalXP,
        level: newLevel,
        lastXPGain: xp,
        didLevelUp: newLevel > oldLevel,
      });

      // Check badges
      await checkBadges(get, set);
    }
  },

  submitQuiz: async (attempt) => {
    await saveQuizAttempt(attempt);
    await recordStreak();

    // Award XP
    const xp = calculateQuizXP(attempt.score, attempt.totalQuestions);
    await addXP(xp, 'quiz', `${attempt.phaseId}-${Date.now()}`);

    const { totalXP } = get();
    const newTotalXP = totalXP + xp;
    const oldLevel = calculateLevel(totalXP);
    const newLevel = calculateLevel(newTotalXP);

    const [quizAttempts, streak] = await Promise.all([
      getQuizAttempts(),
      getCurrentStreak(),
    ]);

    set({
      quizAttempts,
      streak,
      totalXP: newTotalXP,
      level: newLevel,
      lastXPGain: xp,
      didLevelUp: newLevel > oldLevel,
    });

    // Check badges
    await checkBadges(get, set);
  },

  refreshStreak: async () => {
    const streak = await getCurrentStreak();
    set({ streak });
  },

  clearNotifications: () => {
    set({ newBadgeIds: [], lastXPGain: 0, didLevelUp: false });
  },
}));

async function checkBadges(
  get: () => AppState,
  set: (partial: Partial<AppState>) => void,
) {
  const state = get();
  const ctx: BadgeContext = {
    completedLessons: state.completedLessons,
    quizAttempts: state.quizAttempts.map((a) => ({
      phaseId: a.phaseId,
      score: a.score,
      totalQuestions: a.totalQuestions,
    })),
    totalXP: state.totalXP,
    level: state.level,
  };

  const newlyEarned: string[] = [];
  for (const badge of badges) {
    if (state.earnedBadgeIds.includes(badge.id)) continue;
    if (badge.condition(ctx)) {
      await awardBadge(badge.id);
      newlyEarned.push(badge.id);
    }
  }

  if (newlyEarned.length > 0) {
    set({
      earnedBadgeIds: [...state.earnedBadgeIds, ...newlyEarned],
      newBadgeIds: newlyEarned,
    });
  }
}
