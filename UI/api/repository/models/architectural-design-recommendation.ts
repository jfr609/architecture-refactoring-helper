/* tslint:disable */
/* eslint-disable */
import { ArchitecturalCategory } from './architectural-category';
import { ArchitecturalDesignSource } from './architectural-design-source';
import { QualityApproachAttributeEvaluation } from './quality-approach-attribute-evaluation';
import { QualityScore } from './quality-score';
import { QualitySublevelApproachAttributeEvaluation } from './quality-sublevel-approach-attribute-evaluation';
import { SystemPropertiesScore } from './system-properties-score';
export interface ArchitecturalDesignRecommendation {
  architecturalDesignId: number;
  architecturalDesignSource: ArchitecturalDesignSource;
  category: ArchitecturalCategory;
  identifier: string;
  matchesCount: number;
  qualityEvaluations?: null | Array<QualityApproachAttributeEvaluation>;
  qualityScore: QualityScore;
  qualitySublevelEvaluations?: null | Array<QualitySublevelApproachAttributeEvaluation>;
  suitabilityScore: number;
  systemPropertiesScore: SystemPropertiesScore;
  totalIncludeCount: number;
  totalScore: number;
  weightedScore: number;
}
