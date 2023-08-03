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

@Injectable({
  providedIn: 'root',
})
export class StrategicGoalsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient,
  ) {
    super(config, http);
  }

  static readonly ListStrategicGoalsPath = '/api/v1/projects/strategic-goals';


  listStrategicGoalsResponse(params?:{
  }): Observable<StrictHttpResponse<Array<StrategicGoals>>> {

    const rb = new RequestBuilder(this.rootUrl, StrategicGoalsService.ListStrategicGoalsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {return r as StrictHttpResponse<Array<StrategicGoals>>;
      })
    );
  }

  listStrategicGoals(params?: {
  }): Observable<Array<StrategicGoals>> {

      return this.listStrategicGoalsResponse(params).pipe(
        map((r: StrictHttpResponse<Array<StrategicGoals>>) => r.body as Array<StrategicGoals>)
      );
  }


  static readonly AddStrategicGoalsPath = '/api/v1/projects/strategic-goals';
  /**
   * Path part for operation listScenario
   */
  //static readonly ListScenarioPath = '/api/v1/projects/projects/{projectId}/scenarios';
  //static readonly ListStrategicGoalsPath = '/api/v1/projects/projects/{projectId}/project-description';
 


  static readonly UpdateStrategicGoalsPath = '/api/v1/projects/strategic-goals/{id}';

  updateStrategicGoals$Response(params: {
    id: number;
    body?: StrategicGoals
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, StrategicGoalsService.UpdateStrategicGoalsPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }



  updateStrategicGoals(params: {
    id: number;
    body?: StrategicGoals
  }): Observable<void> {

    return this.updateStrategicGoals$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }


  addStrategicGoals$Response(params?: {
    body?: StrategicGoals
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, StrategicGoalsService.AddStrategicGoalsPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: "text",
      accept: "*/*"
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as StrictHttpResponse<any>).clone({body: undefined }) as StrictHttpResponse<void>;
      })
    );  
  }


  addStrategicGoals(params?: {
    body?: StrategicGoals
  }): Observable<void> {
      
    return this.addStrategicGoals$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }


  static readonly DeleteStrategicGoalsPath = '/api/v1/projects/strategic-goals/{id}';

  deleteStrategicGoals$Response(params?: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, StrategicGoalsService.DeleteStrategicGoalsPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  deleteStrategicGoals(params: {
    id: number;
  }): Observable<void> {

    return this.deleteStrategicGoals$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }


}
