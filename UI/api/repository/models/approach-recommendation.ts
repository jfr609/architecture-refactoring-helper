/* tslint:disable */
/* eslint-disable */
import { AccuracyPrecisionApproachAttributeEvaluation } from './accuracy-precision-approach-attribute-evaluation';
import { AnalysisTypeApproachAttributeEvaluation } from './analysis-type-approach-attribute-evaluation';
import { ApproachSource } from './approach-source';
import { ArchitectureApproachAttributeEvaluation } from './architecture-approach-attribute-evaluation';
import { AutomationLevelApproachAttributeEvaluation } from './automation-level-approach-attribute-evaluation';
import { DirectionApproachAttributeEvaluation } from './direction-approach-attribute-evaluation';
import { DomainArtifactInputApproachAttributeEvaluation } from './domain-artifact-input-approach-attribute-evaluation';
import { ExecutableInputApproachAttributeEvaluation } from './executable-input-approach-attribute-evaluation';
import { ModelArtifactInputApproachAttributeEvaluation } from './model-artifact-input-approach-attribute-evaluation';
import { QualityApproachAttributeEvaluation } from './quality-approach-attribute-evaluation';
import { ResultsQualityApproachAttributeEvaluation } from './results-quality-approach-attribute-evaluation';
import { RuntimeArtifactInputApproachAttributeEvaluation } from './runtime-artifact-input-approach-attribute-evaluation';
import { ServiceTypeApproachAttributeEvaluation } from './service-type-approach-attribute-evaluation';
import { TechniqueApproachAttributeEvaluation } from './technique-approach-attribute-evaluation';
import { ToolSupportApproachAttributeEvaluation } from './tool-support-approach-attribute-evaluation';
import { ValidationMethodApproachAttributeEvaluation } from './validation-method-approach-attribute-evaluation';
export interface ApproachRecommendation {
  accuracyPrecisionEvaluations?: null | Array<AccuracyPrecisionApproachAttributeEvaluation>;
  analysisTypeEvaluations?: null | Array<AnalysisTypeApproachAttributeEvaluation>;
  approachSource: ApproachSource;
  architectureEvaluations?: null | Array<ArchitectureApproachAttributeEvaluation>;
  automationLevelEvaluations?: null | Array<AutomationLevelApproachAttributeEvaluation>;
  directionEvaluations?: null | Array<DirectionApproachAttributeEvaluation>;
  domainArtifactInputEvaluations?: null | Array<DomainArtifactInputApproachAttributeEvaluation>;
  executableInputEvaluations?: null | Array<ExecutableInputApproachAttributeEvaluation>;
  identifier: string;
  modelArtifactInputEvaluations?: null | Array<ModelArtifactInputApproachAttributeEvaluation>;
  qualityEvaluations?: null | Array<QualityApproachAttributeEvaluation>;
  refactoringApproachId: number;
  resultsQualityEvaluations?: null | Array<ResultsQualityApproachAttributeEvaluation>;
  runtimeArtifactInputEvaluations?: null | Array<RuntimeArtifactInputApproachAttributeEvaluation>;
  serviceTypeEvaluations?: null | Array<ServiceTypeApproachAttributeEvaluation>;
  suitabilityScore: number;
  techniqueEvaluations?: null | Array<TechniqueApproachAttributeEvaluation>;
  toolSupportEvaluations?: null | Array<ToolSupportApproachAttributeEvaluation>;
  validationMethodEvaluations?: null | Array<ValidationMethodApproachAttributeEvaluation>;
}
