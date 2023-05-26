/* tslint:disable */

import { Languages } from "./languages";
import { Patterns } from "./patterns";

/* eslint-disable */
export interface ProjectDescription {
  projectDescriptionId?: number;
  systemname?: string;
  ownership?: string;
  creationdate?: string;//sollte date sein
  systemsize?: string;//sollte int sein
  hosting?: string;
  teams?: string;
  developers?: string;
  processmodel?: string;
  architecturepattern?: Patterns;
  languages?: Languages;//enum languages
  persistence?: string;
  purpose?: string;
  functionality?: string;
  designdiagrams?: string;

}