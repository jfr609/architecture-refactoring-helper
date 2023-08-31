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
export class ObjectivesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient,
  ) {
    super(config, http);
  }

  static readonly ListObjectivesPath = '/api/v1/projects/objectives';


  listObjectivesResponse(params?:{
  }): Observable<StrictHttpResponse<Array<Objectives>>> {

    const rb = new RequestBuilder(this.rootUrl, ObjectivesService.ListObjectivesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {return r as StrictHttpResponse<Array<Objectives>>;
      })
    );
  }

  listObjectives(params?: {
  }): Observable<Array<Objectives>> {

      return this.listObjectivesResponse(params).pipe(
        map((r: StrictHttpResponse<Array<Objectives>>) => r.body as Array<Objectives>)
      );
  }


  static readonly AddObjectivesPath = '/api/v1/projects/objectives';
  /**
   * Path part for operation listScenario
   */
  //static readonly ListScenarioPath = '/api/v1/projects/projects/{projectId}/scenarios';
  //static readonly ListStrategicGoalsPath = '/api/v1/projects/projects/{projectId}/project-description';
 


  static readonly UpdateObjectivesPath = '/api/v1/projects/objectives/{id}';

  updateObjectives$Response(params: {
    id: number;
    body?: Objectives
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ObjectivesService.UpdateObjectivesPath, 'put');
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



  updateObjectives(params: {
    id: number;
    body?: Objectives
  }): Observable<void> {

    return this.updateObjectives$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }


  addObjectives$Response(params?: {
    body?: Objectives
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ObjectivesService.AddObjectivesPath, 'post');
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


  addObjectives(params?: {
    body?: Objectives
  }): Observable<void> {
      
    return this.addObjectives$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }


  static readonly DeleteObjectivesPath = '/api/v1/projects/objectives/{id}';

  deleteObjectives$Response(params?: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ObjectivesService.DeleteObjectivesPath, 'delete');
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

  deleteObjectives(params: {
    id: number;
  }): Observable<void> {

    return this.deleteObjectives$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
