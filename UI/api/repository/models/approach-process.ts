/* tslint:disable */
/* eslint-disable */
import { AnalysisType } from './analysis-type';
import { AutomationLevel } from './automation-level';
import { Direction } from './direction';
import { Quality } from './quality';
import { Technique } from './technique';
export interface ApproachProcess {
  analysisTypes?: null | Array<AnalysisType>;
  approachProcessId?: number;
  automationLevels?: null | Array<AutomationLevel>;
  directions?: null | Array<Direction>;
  qualities?: null | Array<Quality>;
  techniques?: null | Array<Technique>;
}
