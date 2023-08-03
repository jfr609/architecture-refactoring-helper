/* tslint:disable */

import { Languages } from "./languages";
import { Patterns } from "./patterns";
import { Objectives } from "./objectives";
import { GoalsType } from "./goals-type";

/* eslint-disable */
export interface Assessment {
    assessmentID?: number;
    implementedPattern?: Patterns;
    preferredPattern?: Patterns;
    explanation?: string;


}