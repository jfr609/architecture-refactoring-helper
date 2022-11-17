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
import { QualityScore } from './quality-score';
import { QualitySublevelApproachAttributeEvaluation } from './quality-sublevel-approach-attribute-evaluation';
import { ResultsQualityApproachAttributeEvaluation } from './results-quality-approach-attribute-evaluation';
import { RuntimeArtifactInputApproachAttributeEvaluation } from './runtime-artifact-input-approach-attribute-evaluation';
import { ServiceTypeApproachAttributeEvaluation } from './service-type-approach-attribute-evaluation';
import { SystemPropertiesScore } from './system-properties-score';
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
  qualityScore: QualityScore;
  qualitySublevelEvaluations?: null | Array<QualitySublevelApproachAttributeEvaluation>;
  refactoringApproachId: number;
  resultsQualityEvaluations?: null | Array<ResultsQualityApproachAttributeEvaluation>;
  runtimeArtifactInputEvaluations?: null | Array<RuntimeArtifactInputApproachAttributeEvaluation>;
  serviceTypeEvaluations?: null | Array<ServiceTypeApproachAttributeEvaluation>;
  suitabilityScore: number;
  systemPropertiesScore: SystemPropertiesScore;
  techniqueEvaluations?: null | Array<TechniqueApproachAttributeEvaluation>;
  toolSupportEvaluations?: null | Array<ToolSupportApproachAttributeEvaluation>;
  totalScore: number;
  validationMethodEvaluations?: null | Array<ValidationMethodApproachAttributeEvaluation>;
  weightedScore: number;
}
