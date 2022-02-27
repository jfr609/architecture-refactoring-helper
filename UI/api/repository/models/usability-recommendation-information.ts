/* tslint:disable */
/* eslint-disable */
import { AccuracyPrecisionInformation } from './accuracy-precision-information';
import { ResultsQualityInformation } from './results-quality-information';
import { ToolSupportInformation } from './tool-support-information';
import { ValidationMethodInformation } from './validation-method-information';
export interface UsabilityRecommendationInformation {
  accuracyPrecisionInformation?: null | Array<AccuracyPrecisionInformation>;
  resultsQualityInformation?: null | Array<ResultsQualityInformation>;
  toolSupportInformation?: null | Array<ToolSupportInformation>;
  validationMethodInformation?: null | Array<ValidationMethodInformation>;
}
