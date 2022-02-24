/* tslint:disable */
/* eslint-disable */
import { ApproachOutput } from './approach-output';
import { ApproachProcess } from './approach-process';
import { ApproachSource } from './approach-source';
import { ApproachUsability } from './approach-usability';
import { DomainArtifactInput } from './domain-artifact-input';
import { ExecutableInput } from './executable-input';
import { ModelArtifactInput } from './model-artifact-input';
import { RuntimeArtifactInput } from './runtime-artifact-input';
export interface RefactoringApproach {
  approachOutputs?: null | Array<ApproachOutput>;
  approachProcess?: ApproachProcess;
  approachSource?: ApproachSource;
  approachUsability?: ApproachUsability;
  domainArtifactInputs?: null | Array<DomainArtifactInput>;
  executableInputs?: null | Array<ExecutableInput>;
  modelArtifactInputs?: null | Array<ModelArtifactInput>;
  refactoringApproachId?: number;
  runtimeArtifactInputs?: null | Array<RuntimeArtifactInput>;
}
