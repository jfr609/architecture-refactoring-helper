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

import { Scenario } from '../models/scenario';

@Injectable({
  providedIn: 'root',
})
export class ScenarioService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listScenario
   */
  static readonly ListScenarioPath = '/api/v1/projects/scenarios';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listScenario()` instead.
   *
   * This method doesn't expect any request body.
   */
  listScenario$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Scenario>>> {

    const rb = new RequestBuilder(this.rootUrl, ScenarioService.ListScenarioPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Scenario>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listScenario$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listScenario(params?: {
  }): Observable<Array<Scenario>> {

    return this.listScenario$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Scenario>>) => r.body as Array<Scenario>)
    );
  }

  /**
   * Path part for operation addScenario
   */
  static readonly AddScenarioPath = '/api/v1/projects/scenarios';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addScenario()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addScenario$Response(params?: {
    body?: Scenario
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ScenarioService.AddScenarioPath, 'post');
    if (params) {
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addScenario$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addScenario(params?: {
    body?: Scenario
  }): Observable<void> {

    return this.addScenario$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getScenario
   */
  static readonly GetScenarioPath = '/api/v1/projects/scenarios/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getScenario()` instead.
   *
   * This method doesn't expect any request body.
   */
  getScenario$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Scenario>> {

    const rb = new RequestBuilder(this.rootUrl, ScenarioService.GetScenarioPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Scenario>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getScenario$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getScenario(params: {
    id: number;
  }): Observable<Scenario> {

    return this.getScenario$Response(params).pipe(
      map((r: StrictHttpResponse<Scenario>) => r.body as Scenario)
    );
  }

  /**
   * Path part for operation deleteScenario
   */
  static readonly DeleteScenarioPath = '/api/v1/projects/scenarios/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteScenario()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteScenario$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ScenarioService.DeleteScenarioPath, 'delete');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteScenario$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteScenario(params: {
    id: number;
  }): Observable<void> {

    return this.deleteScenario$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
