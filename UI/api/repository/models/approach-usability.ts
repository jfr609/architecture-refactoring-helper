/* tslint:disable */
/* eslint-disable */
import { AccuracyPrecision } from './accuracy-precision';
import { ResultsQuality } from './results-quality';
import { ToolSupport } from './tool-support';
import { ValidationMethod } from './validation-method';
export interface ApproachUsability {
  accuracyPrecision?: AccuracyPrecision;
  approachUsabilityId?: number;
  resultsQualitiy?: ResultsQuality;
  toolSupport?: ToolSupport;
  validationMethod?: ValidationMethod;
}
