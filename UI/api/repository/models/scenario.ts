/* tslint:disable */
/* eslint-disable */
import { Quality } from './quality';
import { RatingLevel } from './rating-level';
export interface Scenario {
  description?: null | string;
  difficutly?: RatingLevel;
  importance?: RatingLevel;
  name: string;
  qualities?: null | Array<Quality>;
  scenarioId?: number;
}
