/* tslint:disable */
/* eslint-disable */
import { AccuracyPrecisionAttributeRecommendationInformation } from './accuracy-precision-attribute-recommendation-information';
import { AnalysisTypeAttributeRecommendationInformation } from './analysis-type-attribute-recommendation-information';
import { ArchitectureAttributeRecommendationInformation } from './architecture-attribute-recommendation-information';
import { AutomationLevelAttributeRecommendationInformation } from './automation-level-attribute-recommendation-information';
import { DirectionAttributeRecommendationInformation } from './direction-attribute-recommendation-information';
import { DomainArtifactInputAttributeRecommendationInformation } from './domain-artifact-input-attribute-recommendation-information';
import { ExecutableInputAttributeRecommendationInformation } from './executable-input-attribute-recommendation-information';
import { ModelArtifactInputAttributeRecommendationInformation } from './model-artifact-input-attribute-recommendation-information';
import { QualityAttributeRecommendationInformation } from './quality-attribute-recommendation-information';
import { QualitySublevelAttributeRecommendationInformation } from './quality-sublevel-attribute-recommendation-information';
import { ResultsQualityAttributeRecommendationInformation } from './results-quality-attribute-recommendation-information';
import { RuntimeArtifactInputAttributeRecommendationInformation } from './runtime-artifact-input-attribute-recommendation-information';
import { ServiceTypeAttributeRecommendationInformation } from './service-type-attribute-recommendation-information';
import { TechniqueAttributeRecommendationInformation } from './technique-attribute-recommendation-information';
import { ToolSupportAttributeRecommendationInformation } from './tool-support-attribute-recommendation-information';
import { ValidationMethodAttributeRecommendationInformation } from './validation-method-attribute-recommendation-information';
export interface ApproachRecommendationRequest {
  accuracyPrecisionInformation: Array<AccuracyPrecisionAttributeRecommendationInformation>;
  analysisTypeInformation: Array<AnalysisTypeAttributeRecommendationInformation>;
  architectureInformation: Array<ArchitectureAttributeRecommendationInformation>;
  automationLevelInformation: Array<AutomationLevelAttributeRecommendationInformation>;
  directionInformation: Array<DirectionAttributeRecommendationInformation>;
  domainArtifactInformation: Array<DomainArtifactInputAttributeRecommendationInformation>;
  executableInformation: Array<ExecutableInputAttributeRecommendationInformation>;
  modelArtifactInformation: Array<ModelArtifactInputAttributeRecommendationInformation>;
  qualityInformation: Array<QualityAttributeRecommendationInformation>;
  qualitySublevelInformation: Array<QualitySublevelAttributeRecommendationInformation>;
  resultsQualityInformation: Array<ResultsQualityAttributeRecommendationInformation>;
  runtimeArtifactInformation: Array<RuntimeArtifactInputAttributeRecommendationInformation>;
  serviceTypeInformation: Array<ServiceTypeAttributeRecommendationInformation>;
  techniqueInformation: Array<TechniqueAttributeRecommendationInformation>;
  toolSupportInformation: Array<ToolSupportAttributeRecommendationInformation>;
  validationMethodInformation: Array<ValidationMethodAttributeRecommendationInformation>;
}
