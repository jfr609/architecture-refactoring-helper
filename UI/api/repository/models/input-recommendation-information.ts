/* tslint:disable */
/* eslint-disable */
import { RecommendationSuitability } from './recommendation-suitability';
export interface InputRecommendationInformation {
  domainArtifactInformation?: null | {
[key: string]: RecommendationSuitability;
};
  executableInformation?: null | {
[key: string]: RecommendationSuitability;
};
  modelArtifactInformation?: null | {
[key: string]: RecommendationSuitability;
};
  runtimeArtifactInformation?: null | {
[key: string]: RecommendationSuitability;
};
}
