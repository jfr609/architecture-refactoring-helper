/* tslint:disable */
/* eslint-disable */
import { ArchitectureInformation } from './architecture-information';
import { ServiceTypeInformation } from './service-type-information';
export interface OutputRecommendationInformation {
  architectureInformation?: null | Array<ArchitectureInformation>;
  serviceTypeInformation?: null | Array<ServiceTypeInformation>;
}
