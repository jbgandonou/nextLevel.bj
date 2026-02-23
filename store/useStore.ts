import { create } from 'zustand';
import {
  getCompletedLessons,
  markLessonComplete,
  markLessonIncomplete,
  saveQuizAttempt,
  getQuizAttempts,
  getCurrentStreak,
  recordStreak,
} from './database';

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
}

export const useStore = create<AppState>((set, get) => ({
  completedLessons: [],
  quizAttempts: [],
  streak: 0,
  isLoaded: false,

  loadData: async () => {
    const [completedLessons, quizAttempts, streak] = await Promise.all([
      getCompletedLessons(),
      getQuizAttempts(),
      getCurrentStreak(),
    ]);
    set({ completedLessons, quizAttempts, streak, isLoaded: true });
  },

  toggleLesson: async (lessonId: string) => {
    const { completedLessons } = get();
    if (completedLessons.includes(lessonId)) {
      await markLessonIncomplete(lessonId);
      set({ completedLessons: completedLessons.filter((id) => id !== lessonId) });
    } else {
      await markLessonComplete(lessonId);
      await recordStreak();
      const streak = await getCurrentStreak();
      set({ completedLessons: [...completedLessons, lessonId], streak });
    }
  },

  submitQuiz: async (attempt) => {
    await saveQuizAttempt(attempt);
    await recordStreak();
    const [quizAttempts, streak] = await Promise.all([
      getQuizAttempts(),
      getCurrentStreak(),
    ]);
    set({ quizAttempts, streak });
  },

  refreshStreak: async () => {
    const streak = await getCurrentStreak();
    set({ streak });
  },
}));
