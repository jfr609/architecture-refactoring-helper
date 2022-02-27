/* tslint:disable */
/* eslint-disable */
import { RecommendationSuitability } from './recommendation-suitability';
export interface UsabilityRecommendationInformation {
  accuracyPrecisionInformation?: null | {
[key: string]: RecommendationSuitability;
};
  resultsQualityInformation?: null | {
[key: string]: RecommendationSuitability;
};
  toolSupportInformation?: null | {
[key: string]: RecommendationSuitability;
};
  validationMethodInformation?: null | {
[key: string]: RecommendationSuitability;
};
}
