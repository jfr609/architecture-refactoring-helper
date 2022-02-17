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

import { DomainArtifactInput } from '../models/domain-artifact-input';
import { ExecutableInput } from '../models/executable-input';
import { ModelArtifactInput } from '../models/model-artifact-input';
import { RuntimeArtifactInput } from '../models/runtime-artifact-input';

@Injectable({
  providedIn: 'root',
})
export class ApproachInputService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listDomainArtifacts
   */
  static readonly ListDomainArtifactsPath = '/api/v1/inputs/domain-artifacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listDomainArtifacts()` instead.
   *
   * This method doesn't expect any request body.
   */
  listDomainArtifacts$Response(params?: {
  }): Observable<StrictHttpResponse<Array<DomainArtifactInput>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachInputService.ListDomainArtifactsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DomainArtifactInput>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listDomainArtifacts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listDomainArtifacts(params?: {
  }): Observable<Array<DomainArtifactInput>> {

    return this.listDomainArtifacts$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DomainArtifactInput>>) => r.body as Array<DomainArtifactInput>)
    );
  }

  /**
   * Path part for operation addDomainArtifact
   */
  static readonly AddDomainArtifactPath = '/api/v1/inputs/domain-artifacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDomainArtifact()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addDomainArtifact$Response(params?: {
    body?: DomainArtifactInput
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachInputService.AddDomainArtifactPath, 'post');
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
   * To access the full response (for headers, for example), `addDomainArtifact$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addDomainArtifact(params?: {
    body?: DomainArtifactInput
  }): Observable<void> {

    return this.addDomainArtifact$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteDomainArtifact
   */
  static readonly DeleteDomainArtifactPath = '/api/v1/inputs/domain-artifacts/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDomainArtifact()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDomainArtifact$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachInputService.DeleteDomainArtifactPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteDomainArtifact$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDomainArtifact(params: {
    name: string;
  }): Observable<void> {

    return this.deleteDomainArtifact$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listRuntimeArtifact
   */
  static readonly ListRuntimeArtifactPath = '/api/v1/inputs/runtime-artifacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listRuntimeArtifact()` instead.
   *
   * This method doesn't expect any request body.
   */
  listRuntimeArtifact$Response(params?: {
  }): Observable<StrictHttpResponse<Array<RuntimeArtifactInput>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachInputService.ListRuntimeArtifactPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RuntimeArtifactInput>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listRuntimeArtifact$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listRuntimeArtifact(params?: {
  }): Observable<Array<RuntimeArtifactInput>> {

    return this.listRuntimeArtifact$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RuntimeArtifactInput>>) => r.body as Array<RuntimeArtifactInput>)
    );
  }

  /**
   * Path part for operation addRuntimeArtifact
   */
  static readonly AddRuntimeArtifactPath = '/api/v1/inputs/runtime-artifacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addRuntimeArtifact()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addRuntimeArtifact$Response(params?: {
    body?: RuntimeArtifactInput
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachInputService.AddRuntimeArtifactPath, 'post');
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
   * To access the full response (for headers, for example), `addRuntimeArtifact$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addRuntimeArtifact(params?: {
    body?: RuntimeArtifactInput
  }): Observable<void> {

    return this.addRuntimeArtifact$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteRuntimeArtifact
   */
  static readonly DeleteRuntimeArtifactPath = '/api/v1/inputs/runtime-artifacts/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRuntimeArtifact()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRuntimeArtifact$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachInputService.DeleteRuntimeArtifactPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteRuntimeArtifact$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRuntimeArtifact(params: {
    name: string;
  }): Observable<void> {

    return this.deleteRuntimeArtifact$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listModelArtifacts
   */
  static readonly ListModelArtifactsPath = '/api/v1/inputs/model-artifacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listModelArtifacts()` instead.
   *
   * This method doesn't expect any request body.
   */
  listModelArtifacts$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ModelArtifactInput>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachInputService.ListModelArtifactsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ModelArtifactInput>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listModelArtifacts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listModelArtifacts(params?: {
  }): Observable<Array<ModelArtifactInput>> {

    return this.listModelArtifacts$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ModelArtifactInput>>) => r.body as Array<ModelArtifactInput>)
    );
  }

  /**
   * Path part for operation addModelArtifact
   */
  static readonly AddModelArtifactPath = '/api/v1/inputs/model-artifacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addModelArtifact()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addModelArtifact$Response(params?: {
    body?: ModelArtifactInput
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachInputService.AddModelArtifactPath, 'post');
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
   * To access the full response (for headers, for example), `addModelArtifact$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addModelArtifact(params?: {
    body?: ModelArtifactInput
  }): Observable<void> {

    return this.addModelArtifact$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteModelArtifact
   */
  static readonly DeleteModelArtifactPath = '/api/v1/inputs/model-artifacts/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteModelArtifact()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteModelArtifact$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachInputService.DeleteModelArtifactPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteModelArtifact$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteModelArtifact(params: {
    name: string;
  }): Observable<void> {

    return this.deleteModelArtifact$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listExecutables
   */
  static readonly ListExecutablesPath = '/api/v1/inputs/executables';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listExecutables()` instead.
   *
   * This method doesn't expect any request body.
   */
  listExecutables$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ExecutableInput>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachInputService.ListExecutablesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ExecutableInput>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listExecutables$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listExecutables(params?: {
  }): Observable<Array<ExecutableInput>> {

    return this.listExecutables$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ExecutableInput>>) => r.body as Array<ExecutableInput>)
    );
  }

  /**
   * Path part for operation addExecutable
   */
  static readonly AddExecutablePath = '/api/v1/inputs/executables';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addExecutable()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addExecutable$Response(params?: {
    body?: ExecutableInput
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachInputService.AddExecutablePath, 'post');
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
   * To access the full response (for headers, for example), `addExecutable$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addExecutable(params?: {
    body?: ExecutableInput
  }): Observable<void> {

    return this.addExecutable$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteExecutable
   */
  static readonly DeleteExecutablePath = '/api/v1/inputs/executables/{name}/{language}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteExecutable()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteExecutable$Response(params: {
    name: string;
    language: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachInputService.DeleteExecutablePath, 'delete');
    if (params) {
      rb.path('name', params.name, {});
      rb.path('language', params.language, {});
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
   * To access the full response (for headers, for example), `deleteExecutable$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteExecutable(params: {
    name: string;
    language: string;
  }): Observable<void> {

    return this.deleteExecutable$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
