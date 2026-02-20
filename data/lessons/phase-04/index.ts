import { evasionLesson } from './01-evasion';
import { extractionLesson } from './02-extraction';
import { defensesLesson } from './03-defenses';
import { driftLesson } from './04-drift';
import { monitoringLesson } from './05-monitoring';
import { Lesson } from '../../types';

const phase04Lessons: Lesson[] = [
  evasionLesson,
  extractionLesson,
  defensesLesson,
  driftLesson,
  monitoringLesson,
];

export default phase04Lessons;
