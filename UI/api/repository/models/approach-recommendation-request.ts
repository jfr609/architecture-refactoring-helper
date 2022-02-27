/* tslint:disable */
/* eslint-disable */
import { InputRecommendationInformation } from './input-recommendation-information';
import { OutputRecommendationInformation } from './output-recommendation-information';
import { ProcessRecommendationInformation } from './process-recommendation-information';
import { UsabilityRecommendationInformation } from './usability-recommendation-information';
export interface ApproachRecommendationRequest {
  inputRecommendationInformation: InputRecommendationInformation;
  outputRecommendationInformation: OutputRecommendationInformation;
  processRecommendationInformation: ProcessRecommendationInformation;
  usabilityRecommendationInformation: UsabilityRecommendationInformation;
}
