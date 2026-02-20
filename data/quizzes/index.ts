import { phase01Questions } from './phase-01';
import { phase02Questions } from './phase-02';
import { phase03Questions } from './phase-03';
import { phase04Questions } from './phase-04';
import { phase05Questions } from './phase-05';
import { phase06Questions } from './phase-06';
import { QuizQuestion } from '../types';

export const allQuizzes: Record<string, QuizQuestion[]> = {
  'phase-01': phase01Questions,
  'phase-02': phase02Questions,
  'phase-03': phase03Questions,
  'phase-04': phase04Questions,
  'phase-05': phase05Questions,
  'phase-06': phase06Questions,
};

export function getQuizByPhase(phaseId: string): QuizQuestion[] {
  return allQuizzes[phaseId] || [];
}

export function getRandomQuestions(phaseId: string, count: number = 10): QuizQuestion[] {
  const questions = getQuizByPhase(phaseId);
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
