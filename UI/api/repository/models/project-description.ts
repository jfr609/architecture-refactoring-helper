/* tslint:disable */

import { Languages } from "./languages";
import { Patterns } from "./patterns";

/* eslint-disable */
export interface ProjectDescription {
  projectDescriptionId?: number;
  systemname?: string;
  ownership?: string;
  creation_date?: string;//sollte date sein
  systemsize_LOC?: number;//sollte int sein
  hosting_model?: string;
  number_of_teams?: number;
  number_of_developers?: number;
  processmodel?: string;
  architecturepattern?: Patterns;
  languages?: Languages;//enum languages
  data_persistence?: string;
  purpose?: string;
  functionality?: string;
  designdiagrams?: string;

}