/* tslint:disable */
/* eslint-disable */
import { QualityAttributeRecommendationInformation } from './quality-attribute-recommendation-information';
import { QualitySublevelAttributeRecommendationInformation } from './quality-sublevel-attribute-recommendation-information';
export interface ArchitecturalDesignRecommendationRequest {
  qualityInformation: Array<QualityAttributeRecommendationInformation>;
  qualitySublevelInformation: Array<QualitySublevelAttributeRecommendationInformation>;
}
