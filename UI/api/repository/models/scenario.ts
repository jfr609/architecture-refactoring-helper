/* tslint:disable */
/* eslint-disable */
import { Quality } from './quality';
import { QualitySublevel } from './quality-sublevel';
import { RatingLevel } from './rating-level';
export interface Scenario {
  description?: null | string;
  difficulty?: RatingLevel;
  importance?: RatingLevel;
  name: string;
  qualities?: null | Array<Quality>;
  qualitySublevels?: null | Array<QualitySublevel>;
  scenarioId?: number;
}
