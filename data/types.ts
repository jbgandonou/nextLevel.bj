export interface Phase {
  id: string;
  title: string;
  subtitle: string;
  months: string;
  tags: string[];
  deliverable: string;
  lessonIds: string[];
  color: string;
  icon: string;
}

export interface Lesson {
  id: string;
  phaseId: string;
  title: string;
  content: string;
  keyPoints: string[];
  resources: Resource[];
  estimatedMinutes: number;
}

export interface Resource {
  title: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'tool' | 'book';
}

export interface QuizQuestion {
  id: string;
  phaseId: string;
  lessonId?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserProgress {
  lessonId: string;
  completed: boolean;
  completedAt: string;
}

export interface QuizAttempt {
  id?: number;
  phaseId: string;
  lessonId?: string;
  score: number;
  totalQuestions: number;
  date: string;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
}

export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  condition: (ctx: BadgeContext) => boolean;
}

export interface BadgeContext {
  completedLessons: string[];
  quizAttempts: { phaseId: string; lessonId?: string; score: number; totalQuestions: number }[];
  totalXP: number;
  level: number;
}

export interface XPTransaction {
  id?: number;
  amount: number;
  source: 'lesson' | 'quiz' | 'bonus';
  sourceId: string;
  date: string;
}

export interface UserProfile {
  totalXP: number;
  level: number;
  displayName: string;
}
