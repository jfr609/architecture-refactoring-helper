/* tslint:disable */
/* eslint-disable */
import { CalculationMetric } from './calculation-metric';
import { QualityCategory } from './quality-category';
import { QualitySublevel } from './quality-sublevel';
export interface Quality {
  calculationMetrics?: null | Array<CalculationMetric>;
  category: QualityCategory;
  description?: null | string;
  name: string;
  qualitySublevels?: null | Array<QualitySublevel>;
  qualityTradeOffs?: null | Array<Quality>;
}
