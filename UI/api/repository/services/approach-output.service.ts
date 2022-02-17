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

import { ApproachOutput } from '../models/approach-output';
import { Architecture } from '../models/architecture';
import { ServiceType } from '../models/service-type';

@Injectable({
  providedIn: 'root',
})
export class ApproachOutputService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listApproachOutputs
   */
  static readonly ListApproachOutputsPath = '/api/v1/outputs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listApproachOutputs()` instead.
   *
   * This method doesn't expect any request body.
   */
  listApproachOutputs$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ApproachOutput>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachOutputService.ListApproachOutputsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ApproachOutput>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listApproachOutputs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listApproachOutputs(params?: {
  }): Observable<Array<ApproachOutput>> {

    return this.listApproachOutputs$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ApproachOutput>>) => r.body as Array<ApproachOutput>)
    );
  }

  /**
   * Path part for operation getApproachOutput
   */
  static readonly GetApproachOutputPath = '/api/v1/outputs/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApproachOutput()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApproachOutput$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<ApproachOutput>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachOutputService.GetApproachOutputPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApproachOutput>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApproachOutput$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApproachOutput(params: {
    id: number;
  }): Observable<ApproachOutput> {

    return this.getApproachOutput$Response(params).pipe(
      map((r: StrictHttpResponse<ApproachOutput>) => r.body as ApproachOutput)
    );
  }

  /**
   * Path part for operation listArchitectures
   */
  static readonly ListArchitecturesPath = '/api/v1/outputs/architectures';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listArchitectures()` instead.
   *
   * This method doesn't expect any request body.
   */
  listArchitectures$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Architecture>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachOutputService.ListArchitecturesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Architecture>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listArchitectures$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listArchitectures(params?: {
  }): Observable<Array<Architecture>> {

    return this.listArchitectures$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Architecture>>) => r.body as Array<Architecture>)
    );
  }

  /**
   * Path part for operation addArchitecture
   */
  static readonly AddArchitecturePath = '/api/v1/outputs/architectures';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addArchitecture()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addArchitecture$Response(params?: {
    body?: Architecture
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachOutputService.AddArchitecturePath, 'post');
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
   * To access the full response (for headers, for example), `addArchitecture$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addArchitecture(params?: {
    body?: Architecture
  }): Observable<void> {

    return this.addArchitecture$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteArchitecture
   */
  static readonly DeleteArchitecturePath = '/api/v1/outputs/architectures/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteArchitecture()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArchitecture$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachOutputService.DeleteArchitecturePath, 'delete');
    if (params) {
      rb.path('name', params.name, {});
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
   * To access the full response (for headers, for example), `deleteArchitecture$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArchitecture(params: {
    name: string;
  }): Observable<void> {

    return this.deleteArchitecture$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listServiceTypes
   */
  static readonly ListServiceTypesPath = '/api/v1/outputs/service-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listServiceTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  listServiceTypes$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ServiceType>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachOutputService.ListServiceTypesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ServiceType>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listServiceTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listServiceTypes(params?: {
  }): Observable<Array<ServiceType>> {

    return this.listServiceTypes$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ServiceType>>) => r.body as Array<ServiceType>)
    );
  }

  /**
   * Path part for operation addServiceType
   */
  static readonly AddServiceTypePath = '/api/v1/outputs/service-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addServiceType()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addServiceType$Response(params?: {
    body?: ServiceType
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachOutputService.AddServiceTypePath, 'post');
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
   * To access the full response (for headers, for example), `addServiceType$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addServiceType(params?: {
    body?: ServiceType
  }): Observable<void> {

    return this.addServiceType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteServiceType
   */
  static readonly DeleteServiceTypePath = '/api/v1/outputs/service-types/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteServiceType()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceType$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachOutputService.DeleteServiceTypePath, 'delete');
    if (params) {
      rb.path('name', params.name, {});
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
   * To access the full response (for headers, for example), `deleteServiceType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteServiceType(params: {
    name: string;
  }): Observable<void> {

    return this.deleteServiceType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
