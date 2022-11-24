/* tslint:disable */
/* eslint-disable */
import { ApproachProcess } from './approach-process';
import { ArchitecturalCategory } from './architectural-category';
import { ArchitecturalDesignSource } from './architectural-design-source';
export interface ArchitecturalDesign {
  approachProcess?: ApproachProcess;
  architecturalDesignId?: number;
  architecturalDesignSource?: ArchitecturalDesignSource;
  category: ArchitecturalCategory;
  identifier: string;
}
