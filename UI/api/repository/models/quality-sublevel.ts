/* tslint:disable */
/* eslint-disable */
import { CalculationMetric } from './calculation-metric';
import { Quality } from './quality';
export interface QualitySublevel {
  calculationMetrics?: null | Array<CalculationMetric>;
  description?: null | string;
  name: string;
  qualityName?: null | string;
  qualityTradeOffs?: null | Array<Quality>;
}
