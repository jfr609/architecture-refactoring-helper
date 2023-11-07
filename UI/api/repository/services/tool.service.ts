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

import { ApproachRecommendation } from '../models/approach-recommendation';
import { ApproachRecommendationRequest } from '../models/approach-recommendation-request';
import { DomainArtifactInput } from '../models/domain-artifact-input';
import { ExecutableInput } from '../models/executable-input';
import { ModelArtifactInput } from '../models/model-artifact-input';
import { Quality } from '../models/quality';
import { RecommendationPreset } from '../models/recommendation-preset';
import { RefactoringApproach } from '../models/refactoring-approach';
import { RuntimeArtifactInput } from '../models/runtime-artifact-input';
import { Tool } from '../models/tool';
import { ToolType } from '../models/tool-type';

@Injectable({
  providedIn: 'root',
})
export class ToolService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listTools
   */
  static readonly ListToolsPath = '/api/v1/tools';

  /**
   * Receives a complete list of all Tool items.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listTools()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTools$Response(params?: {

    /**
     * Decides whether the tools are returned with all details or not
     */
    withDetails?: boolean;
  }): Observable<StrictHttpResponse<Array<Tool>>> {

    const rb = new RequestBuilder(this.rootUrl, ToolService.ListToolsPath, 'get');
    if (params) {
      rb.query('withDetails', params.withDetails, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Tool>>;
      })
    );
  }

  /**
   * Receives a complete list of all Tool items.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listTools$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTools(params?: {

    /**
     * Decides whether the tools are returned with all details or not
     */
    withDetails?: boolean;
  }): Observable<Array<Tool>> {

    return this.listTools$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Tool>>) => r.body as Array<Tool>)
    );
  }

  /**
   * Path part for operation addTool
   */
  static readonly AddToolPath = '/api/v1/tools';

  /**
   * Creates a new Tool.
   * Inputs, process attributes, outputs or usability attributes that don't exist will be created in the process.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addTool()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addTool$Response(params?: {

    /**
     * The Tool we want to add
     */
    body?: Tool
  }): Observable<StrictHttpResponse<Tool>> {

    const rb = new RequestBuilder(this.rootUrl, ToolService.AddToolPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Tool>;
      })
    );
  }

  /**
   * Creates a new Tool.
   * Inputs, process attributes, outputs or usability attributes that don't exist will be created in the process.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addTool$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addTool(params?: {

    /**
     * The Tool we want to add
     */
    body?: Tool
  }): Observable<Tool> {

    return this.addTool$Response(params).pipe(
      map((r: StrictHttpResponse<Tool>) => r.body as Tool)
    );
  }

  /**
   * Path part for operation getTool
   */
  static readonly GetToolPath = '/api/v1/tools/{id}';

  /**
   * Receives a Tool.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTool()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTool$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Tool>> {

    const rb = new RequestBuilder(this.rootUrl, ToolService.GetToolPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Tool>;
      })
    );
  }

  /**
   * Receives a Tool.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTool$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTool(params: {
    id: number;
  }): Observable<Tool> {

    return this.getTool$Response(params).pipe(
      map((r: StrictHttpResponse<Tool>) => r.body as Tool)
    );
  }

  /**
   * Path part for operation deleteTool
   */
  static readonly DeleteToolPath = '/api/v1/tools/{id}';

  /**
   * Deletes a Tool.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTool()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTool$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ToolService.DeleteToolPath, 'delete');
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
   * Deletes a Tool.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteTool$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTool(params: {
    id: number;
  }): Observable<void> {

    return this.deleteTool$Response(params).pipe(
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

    const rb = new RequestBuilder(this.rootUrl, ToolService.RecommendRefactoringApproachesPath, 'post');
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

    const rb = new RequestBuilder(this.rootUrl, ToolService.AddDomainArtifactAsInputPath, 'post');
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

    const rb = new RequestBuilder(this.rootUrl, ToolService.RemoveDomainArtifactFromInputsPath, 'delete');
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

    const rb = new RequestBuilder(this.rootUrl, ToolService.AddRuntimeArtifactAsInputPath, 'post');
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

    const rb = new RequestBuilder(this.rootUrl, ToolService.RemoveRuntimeArtifactFromInputsPath, 'delete');
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

    const rb = new RequestBuilder(this.rootUrl, ToolService.AddModelArtifactAsInputPath, 'post');
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

    const rb = new RequestBuilder(this.rootUrl, ToolService.RemoveModelArtifactFromInputsPath, 'delete');
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

    const rb = new RequestBuilder(this.rootUrl, ToolService.AddExecutableAsInputPath, 'post');
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

    const rb = new RequestBuilder(this.rootUrl, ToolService.RemoveExecutableFromInputsPath, 'delete');
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

    const rb = new RequestBuilder(this.rootUrl, ToolService.AddQualityToProcessPath, 'post');
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

    const rb = new RequestBuilder(this.rootUrl, ToolService.RemoveQualityFromProcessPath, 'delete');
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
   * Path part for operation removeToolExistingCards
   */
  static readonly RemoveToolExistingCardsPath = '/api/v1/tools/{id}/existing-cards';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeToolExistingCards()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeToolExistingCards$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ToolService.RemoveToolExistingCardsPath, 'delete');
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
   * To access the full response (for headers, for example), `removeToolExistingCards$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeToolExistingCards(params: {
    id: number;
  }): Observable<void> {

    return this.removeToolExistingCards$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listToolTypes
   */
  static readonly ListToolTypesPath = '/api/v1/tools/tool-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listToolTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  listToolTypes$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ToolType>>> {

    const rb = new RequestBuilder(this.rootUrl, ToolService.ListToolTypesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ToolType>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listToolTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listToolTypes(params?: {
  }): Observable<Array<ToolType>> {

    return this.listToolTypes$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ToolType>>) => r.body as Array<ToolType>)
    );
  }

  /**
   * Path part for operation addToolType
   */
  static readonly AddToolTypePath = '/api/v1/tools/tool-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addToolType()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addToolType$Response(params?: {
    body?: ToolType
  }): Observable<StrictHttpResponse<ToolType>> {

    const rb = new RequestBuilder(this.rootUrl, ToolService.AddToolTypePath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ToolType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addToolType$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addToolType(params?: {
    body?: ToolType
  }): Observable<ToolType> {

    return this.addToolType$Response(params).pipe(
      map((r: StrictHttpResponse<ToolType>) => r.body as ToolType)
    );
  }

  /**
   * Path part for operation deleteToolType
   */
  static readonly DeleteToolTypePath = '/api/v1/tools/tool-types/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteToolType()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteToolType$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ToolService.DeleteToolTypePath, 'delete');
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
   * To access the full response (for headers, for example), `deleteToolType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteToolType(params: {
    name: string;
  }): Observable<void> {

    return this.deleteToolType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation addToolTypeToTool
   */
  static readonly AddToolTypeToToolPath = '/api/v1/tools/{id}/tool-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addToolTypeToTool()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addToolTypeToTool$Response(params: {
    id: number;
    body?: ToolType
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ToolService.AddToolTypeToToolPath, 'post');
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
   * To access the full response (for headers, for example), `addToolTypeToTool$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addToolTypeToTool(params: {
    id: number;
    body?: ToolType
  }): Observable<void> {

    return this.addToolTypeToTool$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }
}
