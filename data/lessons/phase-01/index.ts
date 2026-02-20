import { cryptographie } from './01-cryptographie';
import { iam } from './02-iam';
import { networkSecurity } from './03-network-security';
import { threatAnalysis } from './04-threat-analysis';
import { riskManagement } from './05-risk-management';
import { incidentResponse } from './06-incident-response';
import { secureArchitecture } from './07-secure-architecture';
import { applicationSecurity } from './08-application-security';
import { cloudSecurity } from './09-cloud-security';
import { physicalIotSecurity } from './10-physical-iot-security';
import { Lesson } from '../../types';

export const phase01Lessons: Lesson[] = [
  cryptographie,
  iam,
  networkSecurity,
  threatAnalysis,
  riskManagement,
  incidentResponse,
  secureArchitecture,
  applicationSecurity,
  cloudSecurity,
  physicalIotSecurity,
];

export {
  cryptographie,
  iam,
  networkSecurity,
  threatAnalysis,
  riskManagement,
  incidentResponse,
  secureArchitecture,
  applicationSecurity,
  cloudSecurity,
  physicalIotSecurity,
};
