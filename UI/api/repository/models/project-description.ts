/* tslint:disable */
/* eslint-disable */
import { Quality } from './quality';
import { QualitySublevel } from './quality-sublevel';
import { RatingLevel } from './rating-level';
export interface ProjectDescription {
  description?: null | string;
  difficulty?: RatingLevel;
  systemname?: string;
  ownership?: string;
  creationdate?: string;//sollte date sein
  systemsize?: string;//sollte int sein
  hosting?: string;
    teams?: string;
    developers?: string;
    processmodel?: string;
    architecturepattern?: string;
    languages?: string;
    persistence?: string;
    purpose?: string;
    functionality?: string;
    designdiagrams?: string;
  importance?: RatingLevel;
  qualities?: null | Array<Quality>;
  qualitySublevels?: null | Array<QualitySublevel>;
  projectDescriptionId?: number;
}