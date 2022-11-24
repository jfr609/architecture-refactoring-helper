/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { ApproachInputService } from './services/approach-input.service';
import { ApproachOutputService } from './services/approach-output.service';
import { ApproachProcessService } from './services/approach-process.service';
import { ApproachUsabilityService } from './services/approach-usability.service';
import { ArchitecturalDesignService } from './services/architectural-design.service';
import { RefactoringApproachService } from './services/refactoring-approach.service';
import { ScenarioService } from './services/scenario.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ApproachInputService,
    ApproachOutputService,
    ApproachProcessService,
    ApproachUsabilityService,
    ArchitecturalDesignService,
    RefactoringApproachService,
    ScenarioService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
