/* tslint:disable */
/* eslint-disable */
import { AccuracyPrecision } from './accuracy-precision';
import { RefactoringApproach } from './refactoring-approach';
import { ResultsQuality } from './results-quality';
import { Tool } from './tool';
import { ToolSupport } from './tool-support';
import { ValidationMethod } from './validation-method';
export interface ApproachUsability {
  accuracyPrecision: AccuracyPrecision;
  approachUsabilityId?: number;
  resultsQuality: ResultsQuality;
  toolSupport: ToolSupport;
  validationMethod: ValidationMethod;
  noToolSupport?: null | boolean;
  refactoringApproach?: null | RefactoringApproach;
  tools?: null | Array<Tool>;
}
