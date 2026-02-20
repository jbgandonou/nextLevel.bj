import { zeroTrustLesson } from './01-zero-trust';
import { llmSecurityLesson } from './02-llm-security';
import { euAiActLesson } from './03-eu-ai-act';
import { threatModelingLesson } from './04-threat-modeling';
import { resilienceLesson } from './05-resilience';
import { Lesson } from '../../types';

const phase05Lessons: Lesson[] = [
  zeroTrustLesson,
  llmSecurityLesson,
  euAiActLesson,
  threatModelingLesson,
  resilienceLesson,
];

export default phase05Lessons;
