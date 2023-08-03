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
import { ProjectDescription } from '../models/project-description';
import { StrategicGoals } from '../models';
import { StrategicGoalsService } from './strategic-goals.service';
import { ProjectSession } from '../models/project-session';

@Injectable({
  providedIn: 'root',
})
export class ProjectSessionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient,
  ) {
    super(config, http);
  }

  static readonly ListProjectSessionPath = '/api/v1/projects/project-sessions';


  listProjectSessionResponse(params?:{
  }): Observable<StrictHttpResponse<Array<ProjectSession>>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectSessionService.ListProjectSessionPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {return r as StrictHttpResponse<Array<ProjectSession>>;
      })
    );
  }

  listProjectSessions(params?: {
  }): Observable<Array<ProjectSession>> {

      return this.listProjectSessionResponse(params).pipe(
        map((r: StrictHttpResponse<Array<ProjectSession>>) => r.body as Array<ProjectSession>)
      );
  }


  static readonly AddProjectSessionPath = '/api/v1/projects/project-sessions';
  /**
   * Path part for operation listScenario
   */
  //static readonly ListScenarioPath = '/api/v1/projects/projects/{projectId}/scenarios';
  //static readonly ListProjectDescriptionPath = '/api/v1/projects/projects/{projectId}/project-description';
 


  static readonly UpdateProjectSessionPath = '/api/v1/projects/project-sessions/{id}';

  updateProjectSession$Response(params: {
    id: number;
    body?: ProjectSession
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectSessionService.UpdateProjectSessionPath, 'put');
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



  updateProjectSession(params: {
    id: number;
    body?: ProjectSession
  }): Observable<void> {

    return this.updateProjectSession$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }


  addProjectSession$Response(params?: {
    body?: ProjectSession
  }): Observable<StrictHttpResponse<ProjectSession>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectSessionService.AddProjectSessionPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }
    return this.http.request(rb.build({
      responseType: "text",
      accept: "*/*"
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProjectSession>;
      })
    );  
  }


  addProjectSession(params?: {
    body?: ProjectSession
  }): Observable<ProjectSession> {
      
    return this.addProjectSession$Response(params).pipe(
      map((r: StrictHttpResponse<ProjectSession>) => r.body as ProjectSession)
    );
  }

}
