/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { UtilService } from 'src/app/services/util.service';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { StrategicGoals } from '../models/strategic-goals';
import { Objectives } from '../models/objectives';
@Injectable({
  providedIn: 'root',
})
export class AssessmentService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient,
  ) {
    super(config, http);
  }
  cumulatedimplementedPattern1: number = 0;
  cumulatedimplementedPattern2: number = 0;
  cumulatedimplementedPattern3: number = 0;
  cumulatedpreferredPattern1: number = 0;
  cumulatedpreferredPattern2: number = 0;
  cumulatedpreferredPattern3: number = 0;
  //newValue1: number = 2;
  //newValue2: number = 2;
  //newValue3: number = 1;
  //newValue4: number = 1;
  //newValue5: number = 1;
  //newValue6: number = 0;
  public scenarioList: any = [];

  increaseCumulatedImplementedPattern1() {
    this.cumulatedimplementedPattern1++;
  }
  increaseCumulatedImplementedPattern2() {
    this.cumulatedimplementedPattern2++;
  }
  increaseCumulatedImplementedPattern3() {
    this.cumulatedimplementedPattern3++;
  }
  increaseCumulatedPreferredPattern1() {
    this.cumulatedpreferredPattern1++;
  }
  increaseCumulatedPreferredPattern2() {
    this.cumulatedpreferredPattern2++;
  }
  increaseCumulatedPreferredPattern3() {
    this.cumulatedpreferredPattern3++;
  }

  updateValueOccurrencesImplementedPattern() {
    //reset to 0 before new count
    this.cumulatedimplementedPattern1 = 0;
    this.cumulatedimplementedPattern2 = 0;
    this.cumulatedimplementedPattern3 = 0;
    for (let patternsOfscenariolist of this.scenarioList) {
      if(patternsOfscenariolist.implementedPattern != null){
        if(patternsOfscenariolist.implementedPattern.includes('Monolith')){
          this.increaseCumulatedImplementedPattern1();
        } if(patternsOfscenariolist.implementedPattern.includes('Microservices')){
          this.increaseCumulatedImplementedPattern2();
        } if(patternsOfscenariolist.implementedPattern.includes('Model-View-Controller')){
          this.increaseCumulatedImplementedPattern3();
        } if(patternsOfscenariolist.implementedPattern.includes('Pipe-Filter')){
          this.increaseCumulatedImplementedPattern3();
        }
      } 
    }
  }

  updateValueOccurrencesPreferredPattern() {
    this.cumulatedpreferredPattern1 = 0;
    this.cumulatedpreferredPattern2 = 0;
    this.cumulatedpreferredPattern3 = 0;
    for (let patternsOfscenariolist of this.scenarioList) {
      if(patternsOfscenariolist.preferredPattern != null){
        if( patternsOfscenariolist.preferredPattern == 'Monolith'){
          this.increaseCumulatedPreferredPattern1();
        } else if( patternsOfscenariolist.preferredPattern == 'Microservices'){
          this.increaseCumulatedPreferredPattern2();
        } else if(patternsOfscenariolist.preferredPattern == 'Model-View-Controller'){
          this.increaseCumulatedPreferredPattern3();
        } else if(patternsOfscenariolist.preferredPattern =='Pipe-Filter'){
          this.increaseCumulatedPreferredPattern3();
        }
      } 
    }
  }
  updateValueOccurrencesImplementedPattern3(scenarioList: any[]) {
    // Reset counters to 0 before new count
    this.cumulatedimplementedPattern1 = 0;
    this.cumulatedimplementedPattern2 = 0;
    this.cumulatedimplementedPattern3 = 0;
  
    // Iterate over the provided scenario list
    for (let patternsOfscenariolist of scenarioList) {
      if (patternsOfscenariolist.implementedPattern != null) {
        if (patternsOfscenariolist.implementedPattern.includes('Monolith')) {
          this.increaseCumulatedImplementedPattern1();
        }
        if (patternsOfscenariolist.implementedPattern.includes('Microservices')) {
          this.increaseCumulatedImplementedPattern2();
        }
        if (patternsOfscenariolist.implementedPattern.includes('Model-View-Controller') || 
            patternsOfscenariolist.implementedPattern.includes('Pipe-Filter')) {
          this.increaseCumulatedImplementedPattern3();
        }
      }
    }
  }
  updateValueOccurrencesPreferredPattern4(scenarioList: any[]) {
    // Reset counters to 0 before new count
    this.cumulatedpreferredPattern1 = 0;
    this.cumulatedpreferredPattern2 = 0;
    this.cumulatedpreferredPattern3 = 0;
  
    // Iterate over the provided scenario list
    for (let patternsOfscenariolist of scenarioList) {
      if (patternsOfscenariolist.preferredPattern != null) {
        if (patternsOfscenariolist.preferredPattern === 'Monolith') {
          this.increaseCumulatedPreferredPattern1();
        } else if (patternsOfscenariolist.preferredPattern === 'Microservices') {
          this.increaseCumulatedPreferredPattern2();
        } else if (patternsOfscenariolist.preferredPattern === 'Model-View-Controller' || 
                   patternsOfscenariolist.preferredPattern === 'Pipe-Filter') {
          this.increaseCumulatedPreferredPattern3();
        }
      }
    }
  }
}
