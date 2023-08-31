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




  

}
