import { Lesson } from '../types';
import { phase01Lessons } from './phase-01';
import { phase02Lessons } from './phase-02';
import { phase03Lessons } from './phase-03';
import phase04Lessons from './phase-04';
import phase05Lessons from './phase-05';
import phase06Lessons from './phase-06';

const allPhaseLessons: Record<string, Lesson[]> = {
  'phase-01': phase01Lessons,
  'phase-02': phase02Lessons,
  'phase-03': phase03Lessons,
  'phase-04': phase04Lessons,
  'phase-05': phase05Lessons,
  'phase-06': phase06Lessons,
};

export function getLessonsByPhase(phaseId: string): Lesson[] {
  return allPhaseLessons[phaseId] || [];
}

export function getLessonById(lessonId: string): Lesson | undefined {
  for (const lessons of Object.values(allPhaseLessons)) {
    const found = lessons.find((l) => l.id === lessonId);
    if (found) return found;
  }
  return undefined;
}

export function getAllLessons(): Lesson[] {
  return Object.values(allPhaseLessons).flat();
}
