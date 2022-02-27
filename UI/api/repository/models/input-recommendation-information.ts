/* tslint:disable */
/* eslint-disable */
import { DomainArtifactInformation } from './domain-artifact-information';
import { ExecutableInformation } from './executable-information';
import { ModelArtifactInformation } from './model-artifact-information';
import { RuntimeArtifactInformation } from './runtime-artifact-information';
export interface InputRecommendationInformation {
  domainArtifactInformation?: null | Array<DomainArtifactInformation>;
  executableInformation?: null | Array<ExecutableInformation>;
  modelArtifactInformation?: null | Array<ModelArtifactInformation>;
  runtimeArtifactInformation?: null | Array<RuntimeArtifactInformation>;
}
