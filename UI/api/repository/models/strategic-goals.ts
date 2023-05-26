/* tslint:disable */

import { Languages } from "./languages";
import { Patterns } from "./patterns";
import { Objectives } from "./objectives";

/* eslint-disable */
export interface StrategicGoals {
  strategicGoalsId?: number;
  method?: string;
  owner?: string;
  participants?: string;
  business_company_objectives?: Objectives;
  organizational_objectives?: Objectives;
  process_objectives?: Objectives;


}