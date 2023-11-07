/* tslint:disable */
/* eslint-disable */
import { AnalysisType } from './analysis-type';
import { AtomarUnit } from './atomar-unit';
import { AutomationLevel } from './automation-level';
import { Direction } from './direction';
import { ProcessStrategy } from './process-strategy';
import { Quality } from './quality';
import { QualitySublevel } from './quality-sublevel';
import { Representation } from './representation';
import { Technique } from './technique';
export interface ApproachProcess {
  analysisTypes?: null | Array<AnalysisType>;
  approachProcessId?: number;
  automationLevels?: null | Array<AutomationLevel>;
  directions?: null | Array<Direction>;
  qualities?: null | Array<Quality>;
  qualitySublevels?: null | Array<QualitySublevel>;
  techniques?: null | Array<Technique>;
  processStrategies?: null | Array<ProcessStrategy>;
  atomarUnits?: null | Array<AtomarUnit>;
}
