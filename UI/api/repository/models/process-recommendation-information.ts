/* tslint:disable */
/* eslint-disable */
import { RecommendationSuitability } from './recommendation-suitability';
export interface ProcessRecommendationInformation {
  analysisTypeInformation?: null | {
[key: string]: RecommendationSuitability;
};
  automationLevelInformation?: null | {
[key: string]: RecommendationSuitability;
};
  directionInformation?: null | {
[key: string]: RecommendationSuitability;
};
  qualityInformation?: null | {
[key: string]: RecommendationSuitability;
};
  techniqueInformation?: null | {
[key: string]: RecommendationSuitability;
};
}
