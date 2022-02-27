/* tslint:disable */
/* eslint-disable */
import { AnalysisTypeInformation } from './analysis-type-information';
import { AutomationLevelInformation } from './automation-level-information';
import { DirectionInformation } from './direction-information';
import { QualityInformation } from './quality-information';
import { TechniqueInformation } from './technique-information';
export interface ProcessRecommendationInformation {
  analysisTypeInformation?: null | Array<AnalysisTypeInformation>;
  automationLevelInformation?: null | Array<AutomationLevelInformation>;
  directionInformation?: null | Array<DirectionInformation>;
  qualityInformation?: null | Array<QualityInformation>;
  techniqueInformation?: null | Array<TechniqueInformation>;
}
