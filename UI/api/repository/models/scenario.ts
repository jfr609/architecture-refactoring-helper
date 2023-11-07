/* tslint:disable */
/* eslint-disable */
import { Patterns } from './patterns';
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
  implementedPattern?: string | null;// Array<Patterns> | null
  preferredPattern?: string | null;
  explanation?: string | null;
}
