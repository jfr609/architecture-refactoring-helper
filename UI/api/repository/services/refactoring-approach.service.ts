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

import { AccuracyPrecision } from '../models/accuracy-precision';
import { AnalysisType } from '../models/analysis-type';
import { ApproachOutput } from '../models/approach-output';
import { ApproachRecommendation } from '../models/approach-recommendation';
import { ApproachRecommendationRequest } from '../models/approach-recommendation-request';
import { AutomationLevel } from '../models/automation-level';
import { Direction } from '../models/direction';
import { DomainArtifactInput } from '../models/domain-artifact-input';
import { ExecutableInput } from '../models/executable-input';
import { ModelArtifactInput } from '../models/model-artifact-input';
import { Quality } from '../models/quality';
import { RecommendationPreset } from '../models/recommendation-preset';
import { RefactoringApproach } from '../models/refactoring-approach';
import { ResultsQuality } from '../models/results-quality';
import { RuntimeArtifactInput } from '../models/runtime-artifact-input';
import { Technique } from '../models/technique';
import { ToolSupport } from '../models/tool-support';
import { ValidationMethod } from '../models/validation-method';

@Injectable({
  providedIn: 'root',
})
export class RefactoringApproachService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listRefactoringApproaches
   */
  static readonly ListRefactoringApproachesPath = '/api/v1/approaches';

  /**
   * Receives a complete list of all RefactoringApproach items.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listRefactoringApproaches()` instead.
   *
   * This method doesn't expect any request body.
   */
  listRefactoringApproaches$Response(params?: {

    /**
     * Decides whether the approaches are returned with all details or not
     */
    withDetails?: boolean;
  }): Observable<StrictHttpResponse<Array<RefactoringApproach>>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.ListRefactoringApproachesPath, 'get');
    if (params) {
      rb.query('withDetails', params.withDetails, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RefactoringApproach>>;
      })
    );
  }

  /**
   * Receives a complete list of all RefactoringApproach items.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listRefactoringApproaches$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listRefactoringApproaches(params?: {

    /**
     * Decides whether the approaches are returned with all details or not
     */
    withDetails?: boolean;
  }): Observable<Array<RefactoringApproach>> {

    return this.listRefactoringApproaches$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RefactoringApproach>>) => r.body as Array<RefactoringApproach>)
    );
  }

  /**
   * Path part for operation addRefactoringApproach
   */
  static readonly AddRefactoringApproachPath = '/api/v1/approaches';

  /**
   * Creates a new RefactoringApproach.
   * Inputs, process attributes, outputs or usability attributes that don't exist will be created in the process.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addRefactoringApproach()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addRefactoringApproach$Response(params?: {

    /**
     * The RefactoringApproach we want to add
     */
    body?: RefactoringApproach
  }): Observable<StrictHttpResponse<RefactoringApproach>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.AddRefactoringApproachPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RefactoringApproach>;
      })
    );
  }

  /**
   * Creates a new RefactoringApproach.
   * Inputs, process attributes, outputs or usability attributes that don't exist will be created in the process.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addRefactoringApproach$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addRefactoringApproach(params?: {

    /**
     * The RefactoringApproach we want to add
     */
    body?: RefactoringApproach
  }): Observable<RefactoringApproach> {

    return this.addRefactoringApproach$Response(params).pipe(
      map((r: StrictHttpResponse<RefactoringApproach>) => r.body as RefactoringApproach)
    );
  }

  /**
   * Path part for operation getRefactoringApproach
   */
  static readonly GetRefactoringApproachPath = '/api/v1/approaches/{id}';

  /**
   * Receives a RefactoringApproach.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRefactoringApproach()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRefactoringApproach$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RefactoringApproach>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.GetRefactoringApproachPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RefactoringApproach>;
      })
    );
  }

  /**
   * Receives a RefactoringApproach.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRefactoringApproach$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRefactoringApproach(params: {
    id: number;
  }): Observable<RefactoringApproach> {

    return this.getRefactoringApproach$Response(params).pipe(
      map((r: StrictHttpResponse<RefactoringApproach>) => r.body as RefactoringApproach)
    );
  }

  /**
   * Path part for operation deleteRefactoringApproach
   */
  static readonly DeleteRefactoringApproachPath = '/api/v1/approaches/{id}';

  /**
   * Deletes a RefactoringApproach.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRefactoringApproach()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRefactoringApproach$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.DeleteRefactoringApproachPath, 'delete');
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
   * Deletes a RefactoringApproach.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteRefactoringApproach$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRefactoringApproach(params: {
    id: number;
  }): Observable<void> {

    return this.deleteRefactoringApproach$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation recommendRefactoringApproaches
   */
  static readonly RecommendRefactoringApproachesPath = '/api/v1/approaches/recommendations';

  /**
   * Returns a list of recommendation with their suitability evaluation based on either the request body or a selected
   * recommendation preset.
   * If a preset is given it will always be prioritised over the recommendation request body.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recommendRefactoringApproaches()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  recommendRefactoringApproaches$Response(params?: {

    /**
     * The recommendation preset the recommendation algorithm is running against
     */
    preset?: RecommendationPreset;

    /**
     * The number of recommendations returned. If the number is negative all elements are returned
     */
    count?: number;

    /**
     * The recommendation information the recommendation algorithm is running against
     */
    body?: ApproachRecommendationRequest
  }): Observable<StrictHttpResponse<Array<ApproachRecommendation>>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.RecommendRefactoringApproachesPath, 'post');
    if (params) {
      rb.query('preset', params.preset, {});
      rb.query('count', params.count, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ApproachRecommendation>>;
      })
    );
  }

  /**
   * Returns a list of recommendation with their suitability evaluation based on either the request body or a selected
   * recommendation preset.
   * If a preset is given it will always be prioritised over the recommendation request body.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `recommendRefactoringApproaches$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  recommendRefactoringApproaches(params?: {

    /**
     * The recommendation preset the recommendation algorithm is running against
     */
    preset?: RecommendationPreset;

    /**
     * The number of recommendations returned. If the number is negative all elements are returned
     */
    count?: number;

    /**
     * The recommendation information the recommendation algorithm is running against
     */
    body?: ApproachRecommendationRequest
  }): Observable<Array<ApproachRecommendation>> {

    return this.recommendRefactoringApproaches$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ApproachRecommendation>>) => r.body as Array<ApproachRecommendation>)
    );
  }

  /**
   * Path part for operation addDomainArtifactAsInput
   */
  static readonly AddDomainArtifactAsInputPath = '/api/v1/approaches/{id}/inputs/domain-artifacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDomainArtifactAsInput()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addDomainArtifactAsInput$Response(params: {
    id: number;
    body?: DomainArtifactInput
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.AddDomainArtifactAsInputPath, 'post');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addDomainArtifactAsInput$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addDomainArtifactAsInput(params: {
    id: number;
    body?: DomainArtifactInput
  }): Observable<void> {

    return this.addDomainArtifactAsInput$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeDomainArtifactFromInputs
   */
  static readonly RemoveDomainArtifactFromInputsPath = '/api/v1/approaches/{id}/inputs/domain-artifacts/{inputName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeDomainArtifactFromInputs()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeDomainArtifactFromInputs$Response(params: {
    id: number;
    inputName: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.RemoveDomainArtifactFromInputsPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('inputName', params.inputName, {});
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
   * To access the full response (for headers, for example), `removeDomainArtifactFromInputs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeDomainArtifactFromInputs(params: {
    id: number;
    inputName: string;
  }): Observable<void> {

    return this.removeDomainArtifactFromInputs$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addRuntimeArtifactAsInput
   */
  static readonly AddRuntimeArtifactAsInputPath = '/api/v1/approaches/{id}/inputs/runtime-artifacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addRuntimeArtifactAsInput()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addRuntimeArtifactAsInput$Response(params: {
    id: number;
    body?: RuntimeArtifactInput
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.AddRuntimeArtifactAsInputPath, 'post');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addRuntimeArtifactAsInput$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addRuntimeArtifactAsInput(params: {
    id: number;
    body?: RuntimeArtifactInput
  }): Observable<void> {

    return this.addRuntimeArtifactAsInput$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeRuntimeArtifactFromInputs
   */
  static readonly RemoveRuntimeArtifactFromInputsPath = '/api/v1/approaches/{id}/inputs/runtime-artifacts/{inputName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeRuntimeArtifactFromInputs()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeRuntimeArtifactFromInputs$Response(params: {
    id: number;
    inputName: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.RemoveRuntimeArtifactFromInputsPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('inputName', params.inputName, {});
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
   * To access the full response (for headers, for example), `removeRuntimeArtifactFromInputs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeRuntimeArtifactFromInputs(params: {
    id: number;
    inputName: string;
  }): Observable<void> {

    return this.removeRuntimeArtifactFromInputs$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addModelArtifactAsInput
   */
  static readonly AddModelArtifactAsInputPath = '/api/v1/approaches/{id}/inputs/model-artifacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addModelArtifactAsInput()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addModelArtifactAsInput$Response(params: {
    id: number;
    body?: ModelArtifactInput
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.AddModelArtifactAsInputPath, 'post');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addModelArtifactAsInput$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addModelArtifactAsInput(params: {
    id: number;
    body?: ModelArtifactInput
  }): Observable<void> {

    return this.addModelArtifactAsInput$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeModelArtifactFromInputs
   */
  static readonly RemoveModelArtifactFromInputsPath = '/api/v1/approaches/{id}/inputs/model-artifacts/{inputName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeModelArtifactFromInputs()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeModelArtifactFromInputs$Response(params: {
    id: number;
    inputName: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.RemoveModelArtifactFromInputsPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('inputName', params.inputName, {});
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
   * To access the full response (for headers, for example), `removeModelArtifactFromInputs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeModelArtifactFromInputs(params: {
    id: number;
    inputName: string;
  }): Observable<void> {

    return this.removeModelArtifactFromInputs$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addExecutableAsInput
   */
  static readonly AddExecutableAsInputPath = '/api/v1/approaches/{id}/inputs/executables';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addExecutableAsInput()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addExecutableAsInput$Response(params: {
    id: number;
    body?: ExecutableInput
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.AddExecutableAsInputPath, 'post');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addExecutableAsInput$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addExecutableAsInput(params: {
    id: number;
    body?: ExecutableInput
  }): Observable<void> {

    return this.addExecutableAsInput$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeExecutableFromInputs
   */
  static readonly RemoveExecutableFromInputsPath = '/api/v1/approaches/{id}/inputs/executables/{inputName}/{language}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeExecutableFromInputs()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeExecutableFromInputs$Response(params: {
    id: number;
    inputName: string;
    language: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.RemoveExecutableFromInputsPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('inputName', params.inputName, {});
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
   * To access the full response (for headers, for example), `removeExecutableFromInputs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeExecutableFromInputs(params: {
    id: number;
    inputName: string;
    language: string;
  }): Observable<void> {

    return this.removeExecutableFromInputs$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addQualityToProcess
   */
  static readonly AddQualityToProcessPath = '/api/v1/approaches/{id}/processes/qualities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addQualityToProcess()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addQualityToProcess$Response(params: {
    id: number;
    body?: Quality
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.AddQualityToProcessPath, 'post');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addQualityToProcess$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addQualityToProcess(params: {
    id: number;
    body?: Quality
  }): Observable<void> {

    return this.addQualityToProcess$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeQualityFromProcess
   */
  static readonly RemoveQualityFromProcessPath = '/api/v1/approaches/{id}/processes/qualities/{qualityName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeQualityFromProcess()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeQualityFromProcess$Response(params: {
    id: number;
    qualityName: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.RemoveQualityFromProcessPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('qualityName', params.qualityName, {});
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
   * To access the full response (for headers, for example), `removeQualityFromProcess$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeQualityFromProcess(params: {
    id: number;
    qualityName: string;
  }): Observable<void> {

    return this.removeQualityFromProcess$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addDirectionToProcess
   */
  static readonly AddDirectionToProcessPath = '/api/v1/approaches/{id}/processes/directions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDirectionToProcess()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addDirectionToProcess$Response(params: {
    id: number;
    body?: Direction
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.AddDirectionToProcessPath, 'post');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addDirectionToProcess$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addDirectionToProcess(params: {
    id: number;
    body?: Direction
  }): Observable<void> {

    return this.addDirectionToProcess$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeDirectionFromProcess
   */
  static readonly RemoveDirectionFromProcessPath = '/api/v1/approaches/{id}/processes/directions/{directionName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeDirectionFromProcess()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeDirectionFromProcess$Response(params: {
    id: number;
    directionName: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.RemoveDirectionFromProcessPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('directionName', params.directionName, {});
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
   * To access the full response (for headers, for example), `removeDirectionFromProcess$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeDirectionFromProcess(params: {
    id: number;
    directionName: string;
  }): Observable<void> {

    return this.removeDirectionFromProcess$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addAutomationLevelToProcess
   */
  static readonly AddAutomationLevelToProcessPath = '/api/v1/approaches/{id}/processes/automation-levels';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addAutomationLevelToProcess()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addAutomationLevelToProcess$Response(params: {
    id: number;
    body?: AutomationLevel
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.AddAutomationLevelToProcessPath, 'post');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addAutomationLevelToProcess$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addAutomationLevelToProcess(params: {
    id: number;
    body?: AutomationLevel
  }): Observable<void> {

    return this.addAutomationLevelToProcess$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeAutomationLevelFromProcess
   */
  static readonly RemoveAutomationLevelFromProcessPath = '/api/v1/approaches/{id}/processes/automation-levels/{automationLevelName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeAutomationLevelFromProcess()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeAutomationLevelFromProcess$Response(params: {
    id: number;
    automationLevelName: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.RemoveAutomationLevelFromProcessPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('automationLevelName', params.automationLevelName, {});
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
   * To access the full response (for headers, for example), `removeAutomationLevelFromProcess$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeAutomationLevelFromProcess(params: {
    id: number;
    automationLevelName: string;
  }): Observable<void> {

    return this.removeAutomationLevelFromProcess$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addAnalysisTypeToProcess
   */
  static readonly AddAnalysisTypeToProcessPath = '/api/v1/approaches/{id}/processes/analysis-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addAnalysisTypeToProcess()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addAnalysisTypeToProcess$Response(params: {
    id: number;
    body?: AnalysisType
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.AddAnalysisTypeToProcessPath, 'post');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addAnalysisTypeToProcess$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addAnalysisTypeToProcess(params: {
    id: number;
    body?: AnalysisType
  }): Observable<void> {

    return this.addAnalysisTypeToProcess$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeAnalysisTypeFromProcess
   */
  static readonly RemoveAnalysisTypeFromProcessPath = '/api/v1/approaches/{id}/processes/analysis-types/{analysisTypeName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeAnalysisTypeFromProcess()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeAnalysisTypeFromProcess$Response(params: {
    id: number;
    analysisTypeName: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.RemoveAnalysisTypeFromProcessPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('analysisTypeName', params.analysisTypeName, {});
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
   * To access the full response (for headers, for example), `removeAnalysisTypeFromProcess$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeAnalysisTypeFromProcess(params: {
    id: number;
    analysisTypeName: string;
  }): Observable<void> {

    return this.removeAnalysisTypeFromProcess$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addTechniqueToProcess
   */
  static readonly AddTechniqueToProcessPath = '/api/v1/approaches/{id}/processes/techniques';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addTechniqueToProcess()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addTechniqueToProcess$Response(params: {
    id: number;
    body?: Technique
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.AddTechniqueToProcessPath, 'post');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addTechniqueToProcess$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addTechniqueToProcess(params: {
    id: number;
    body?: Technique
  }): Observable<void> {

    return this.addTechniqueToProcess$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeTechniqueFromProcess
   */
  static readonly RemoveTechniqueFromProcessPath = '/api/v1/approaches/{id}/processes/techniques/{techniqueName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeTechniqueFromProcess()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeTechniqueFromProcess$Response(params: {
    id: number;
    techniqueName: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.RemoveTechniqueFromProcessPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('techniqueName', params.techniqueName, {});
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
   * To access the full response (for headers, for example), `removeTechniqueFromProcess$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeTechniqueFromProcess(params: {
    id: number;
    techniqueName: string;
  }): Observable<void> {

    return this.removeTechniqueFromProcess$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addOutput
   */
  static readonly AddOutputPath = '/api/v1/approaches/{id}/outputs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addOutput()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addOutput$Response(params: {
    id: number;
    body?: ApproachOutput
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.AddOutputPath, 'post');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addOutput$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addOutput(params: {
    id: number;
    body?: ApproachOutput
  }): Observable<void> {

    return this.addOutput$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation removeOutput
   */
  static readonly RemoveOutputPath = '/api/v1/approaches/{id}/outputs/{outputId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeOutput()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeOutput$Response(params: {
    id: number;
    outputId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.RemoveOutputPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('outputId', params.outputId, {});
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
   * To access the full response (for headers, for example), `removeOutput$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeOutput(params: {
    id: number;
    outputId: number;
  }): Observable<void> {

    return this.removeOutput$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateResultsQuality
   */
  static readonly UpdateResultsQualityPath = '/api/v1/approaches/{id}/usabilities/result-qualities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateResultsQuality()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateResultsQuality$Response(params: {
    id: number;
    body?: ResultsQuality
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.UpdateResultsQualityPath, 'post');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateResultsQuality$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateResultsQuality(params: {
    id: number;
    body?: ResultsQuality
  }): Observable<void> {

    return this.updateResultsQuality$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateToolSupport
   */
  static readonly UpdateToolSupportPath = '/api/v1/approaches/{id}/usabilities/tool-supports';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateToolSupport()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateToolSupport$Response(params: {
    id: number;
    body?: ToolSupport
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.UpdateToolSupportPath, 'post');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateToolSupport$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateToolSupport(params: {
    id: number;
    body?: ToolSupport
  }): Observable<void> {

    return this.updateToolSupport$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateAccuracyPrecision
   */
  static readonly UpdateAccuracyPrecisionPath = '/api/v1/approaches/{id}/usabilities/accuracy-precisions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAccuracyPrecision()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateAccuracyPrecision$Response(params: {
    id: number;
    body?: AccuracyPrecision
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.UpdateAccuracyPrecisionPath, 'post');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAccuracyPrecision$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateAccuracyPrecision(params: {
    id: number;
    body?: AccuracyPrecision
  }): Observable<void> {

    return this.updateAccuracyPrecision$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation updateValidationMethod
   */
  static readonly UpdateValidationMethodPath = '/api/v1/approaches/{id}/usabilities/validation-methods';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateValidationMethod()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateValidationMethod$Response(params: {
    id: number;
    body?: ValidationMethod
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.UpdateValidationMethodPath, 'post');
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

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateValidationMethod$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateValidationMethod(params: {
    id: number;
    body?: ValidationMethod
  }): Observable<void> {

    return this.updateValidationMethod$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
