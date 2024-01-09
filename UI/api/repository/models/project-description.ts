/* tslint:disable */

import { Languages } from "./languages";
import { Patterns } from "./patterns";

/* eslint-disable */
export interface ProjectDescription {
  projectDescriptionId?: number;
  systemname?: string;
  ownership?: string;
  creation_date?: string;
  systemsize_LOC?: number;
  hosting_model?: string;
  number_of_teams?: number;
  number_of_developers?: number;
  processmodel?: string;
  architecturepattern?: Patterns;
  languages?: string;//Array<Languages>
  data_persistence?: string;
  purpose?: string;
  functionality?: string;
  designdiagrams?: string;

}