import { cryptographie } from './01-cryptographie';
import { iam } from './02-iam';
import { networkSecurity } from './03-network-security';
import { threatAnalysis } from './04-threat-analysis';
import { riskManagement } from './05-risk-management';
import { incidentResponse } from './06-incident-response';
import { Lesson } from '../../types';

export const phase01Lessons: Lesson[] = [
  cryptographie,
  iam,
  networkSecurity,
  threatAnalysis,
  riskManagement,
  incidentResponse,
];

export {
  cryptographie,
  iam,
  networkSecurity,
  threatAnalysis,
  riskManagement,
  incidentResponse,
};
