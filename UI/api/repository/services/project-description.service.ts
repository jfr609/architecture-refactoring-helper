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

@Injectable({
  providedIn: 'root',
})
export class ProjectDescriptionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient,
  ) {
    super(config, http);
  }

  static readonly ListProjectDescriptionPath = '/api/v1/projects/project-descriptions';


  listProjectDescriptionResponse(params?:{
  }): Observable<StrictHttpResponse<Array<ProjectDescription>>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectDescriptionService.ListProjectDescriptionPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {return r as StrictHttpResponse<Array<ProjectDescription>>;
      })
    );
  }

  listProjectDescription(params?: {
  }): Observable<Array<ProjectDescription>> {

      return this.listProjectDescriptionResponse(params).pipe(
        map((r: StrictHttpResponse<Array<ProjectDescription>>) => r.body as Array<ProjectDescription>)
      );
  }


  static readonly AddProjectDescriptionPath = '/api/v1/projects/project-descriptions';
  /**
   * Path part for operation listScenario
   */
  //static readonly ListScenarioPath = '/api/v1/projects/projects/{projectId}/scenarios';
  //static readonly ListProjectDescriptionPath = '/api/v1/projects/projects/{projectId}/project-description';
 


  static readonly UpdateProjectDescriptionPath = '/api/v1/projects/project-descriptions/{id}';

  updateProjectDescription$Response(params: {
    id: number;
    body?: ProjectDescription
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectDescriptionService.UpdateProjectDescriptionPath, 'put');
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



  updateProjectDescription(params: {
    id: number;
    body?: ProjectDescription
  }): Observable<void> {

    return this.updateProjectDescription$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }


  addProjectDescription$Response(params?: {
    body?: ProjectDescription
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectDescriptionService.AddProjectDescriptionPath, 'post');
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


  addProjectDescription(params?: {
    body?: ProjectDescription
  }): Observable<void> {
      
    return this.addProjectDescription$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }


  static readonly DeleteProjectDescriptionPath = '/api/v1/projects/projectdescription/{id}';

  deleteProjectDescription$Response(params?: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProjectDescriptionService.DeleteProjectDescriptionPath, 'delete');
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

  deleteProjectDescription(params: {
    id: number;
  }): Observable<void> {

    return this.deleteProjectDescription$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }


}
