/* tslint:disable */
/* eslint-disable */
import { ApproachAttributeEvaluation } from './approach-attribute-evaluation';
import { ApproachSource } from './approach-source';
export interface ApproachRecommendation {
  approachSource: ApproachSource;
  attributeEvaluations: Array<ApproachAttributeEvaluation>;
  suitabilityScore: number;
}
