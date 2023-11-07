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

import { AnalysisType } from '../models/analysis-type';
import { ApproachProcess } from '../models/approach-process';
import { AutomationLevel } from '../models/automation-level';
import { Direction } from '../models/direction';
import { Quality } from '../models/quality';
import { QualitySublevel } from '../models/quality-sublevel';
import { Technique } from '../models/technique';
import { ProcessStrategy } from '../models/process-strategy';
import { AtomarUnit } from '../models/atomar-unit';

@Injectable({
  providedIn: 'root',
})
export class ApproachProcessService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listApproachProcess
   */
  static readonly ListApproachProcessPath = '/api/v1/processes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listApproachProcess()` instead.
   *
   * This method doesn't expect any request body.
   */
  listApproachProcess$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ApproachProcess>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.ListApproachProcessPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ApproachProcess>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listApproachProcess$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listApproachProcess(params?: {
  }): Observable<Array<ApproachProcess>> {

    return this.listApproachProcess$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ApproachProcess>>) => r.body as Array<ApproachProcess>)
    );
  }

  /**
   * Path part for operation getApproachProcess
   */
  static readonly GetApproachProcessPath = '/api/v1/processes/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApproachProcess()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApproachProcess$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<ApproachProcess>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.GetApproachProcessPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApproachProcess>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApproachProcess$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApproachProcess(params: {
    id: number;
  }): Observable<ApproachProcess> {

    return this.getApproachProcess$Response(params).pipe(
      map((r: StrictHttpResponse<ApproachProcess>) => r.body as ApproachProcess)
    );
  }

  /**
   * Path part for operation listQualities
   */
  static readonly ListQualitiesPath = '/api/v1/processes/qualities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listQualities()` instead.
   *
   * This method doesn't expect any request body.
   */
  listQualities$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Quality>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.ListQualitiesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Quality>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listQualities$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listQualities(params?: {
  }): Observable<Array<Quality>> {

    return this.listQualities$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Quality>>) => r.body as Array<Quality>)
    );
  }

  /**
   * Path part for operation addQuality
   */
  static readonly AddQualityPath = '/api/v1/processes/qualities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addQuality()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addQuality$Response(params?: {
    body?: Quality
  }): Observable<StrictHttpResponse<Quality>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.AddQualityPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Quality>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addQuality$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addQuality(params?: {
    body?: Quality
  }): Observable<Quality> {

    return this.addQuality$Response(params).pipe(
      map((r: StrictHttpResponse<Quality>) => r.body as Quality)
    );
  }

  /**
   * Path part for operation deleteQuality
   */
  static readonly DeleteQualityPath = '/api/v1/processes/qualities/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteQuality()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteQuality$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.DeleteQualityPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteQuality$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteQuality(params: {
    name: string;
  }): Observable<void> {

    return this.deleteQuality$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listQualitySublevels
   */
  static readonly ListQualitySublevelsPath = '/api/v1/processes/quality-sublevels';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listQualitySublevels()` instead.
   *
   * This method doesn't expect any request body.
   */
  listQualitySublevels$Response(params?: {
  }): Observable<StrictHttpResponse<Array<QualitySublevel>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.ListQualitySublevelsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<QualitySublevel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listQualitySublevels$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listQualitySublevels(params?: {
  }): Observable<Array<QualitySublevel>> {

    return this.listQualitySublevels$Response(params).pipe(
      map((r: StrictHttpResponse<Array<QualitySublevel>>) => r.body as Array<QualitySublevel>)
    );
  }

  /**
   * Path part for operation addQualitySublevel
   */
  static readonly AddQualitySublevelPath = '/api/v1/processes/quality-sublevels';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addQualitySublevel()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addQualitySublevel$Response(params?: {
    body?: QualitySublevel
  }): Observable<StrictHttpResponse<QualitySublevel>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.AddQualitySublevelPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<QualitySublevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addQualitySublevel$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addQualitySublevel(params?: {
    body?: QualitySublevel
  }): Observable<QualitySublevel> {

    return this.addQualitySublevel$Response(params).pipe(
      map((r: StrictHttpResponse<QualitySublevel>) => r.body as QualitySublevel)
    );
  }

  /**
   * Path part for operation deleteQualitySublevel
   */
  static readonly DeleteQualitySublevelPath = '/api/v1/processes/quality-sublevels/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteQualitySublevel()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteQualitySublevel$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.DeleteQualitySublevelPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteQualitySublevel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteQualitySublevel(params: {
    name: string;
  }): Observable<void> {

    return this.deleteQualitySublevel$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listDirections
   */
  static readonly ListDirectionsPath = '/api/v1/processes/directions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listDirections()` instead.
   *
   * This method doesn't expect any request body.
   */
  listDirections$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Direction>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.ListDirectionsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Direction>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listDirections$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listDirections(params?: {
  }): Observable<Array<Direction>> {

    return this.listDirections$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Direction>>) => r.body as Array<Direction>)
    );
  }

  /**
   * Path part for operation addDirection
   */
  static readonly AddDirectionPath = '/api/v1/processes/directions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDirection()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addDirection$Response(params?: {
    body?: Direction
  }): Observable<StrictHttpResponse<Direction>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.AddDirectionPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Direction>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addDirection$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addDirection(params?: {
    body?: Direction
  }): Observable<Direction> {

    return this.addDirection$Response(params).pipe(
      map((r: StrictHttpResponse<Direction>) => r.body as Direction)
    );
  }

  /**
   * Path part for operation deleteDirection
   */
  static readonly DeleteDirectionPath = '/api/v1/processes/directions/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDirection()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDirection$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.DeleteDirectionPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteDirection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDirection(params: {
    name: string;
  }): Observable<void> {

    return this.deleteDirection$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listAutomationLevels
   */
  static readonly ListAutomationLevelsPath = '/api/v1/processes/automation-levels';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAutomationLevels()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAutomationLevels$Response(params?: {
  }): Observable<StrictHttpResponse<Array<AutomationLevel>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.ListAutomationLevelsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AutomationLevel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listAutomationLevels$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAutomationLevels(params?: {
  }): Observable<Array<AutomationLevel>> {

    return this.listAutomationLevels$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AutomationLevel>>) => r.body as Array<AutomationLevel>)
    );
  }

  /**
   * Path part for operation addAutomationLevel
   */
  static readonly AddAutomationLevelPath = '/api/v1/processes/automation-levels';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addAutomationLevel()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addAutomationLevel$Response(params?: {
    body?: AutomationLevel
  }): Observable<StrictHttpResponse<AutomationLevel>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.AddAutomationLevelPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AutomationLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addAutomationLevel$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addAutomationLevel(params?: {
    body?: AutomationLevel
  }): Observable<AutomationLevel> {

    return this.addAutomationLevel$Response(params).pipe(
      map((r: StrictHttpResponse<AutomationLevel>) => r.body as AutomationLevel)
    );
  }

  /**
   * Path part for operation deleteAutomationLevel
   */
  static readonly DeleteAutomationLevelPath = '/api/v1/processes/automation-levels/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAutomationLevel()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAutomationLevel$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.DeleteAutomationLevelPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteAutomationLevel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAutomationLevel(params: {
    name: string;
  }): Observable<void> {

    return this.deleteAutomationLevel$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listAnalysisTypes
   */
  static readonly ListAnalysisTypesPath = '/api/v1/processes/analysis-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAnalysisTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAnalysisTypes$Response(params?: {
  }): Observable<StrictHttpResponse<Array<AnalysisType>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.ListAnalysisTypesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AnalysisType>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listAnalysisTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAnalysisTypes(params?: {
  }): Observable<Array<AnalysisType>> {

    return this.listAnalysisTypes$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AnalysisType>>) => r.body as Array<AnalysisType>)
    );
  }

  /**
   * Path part for operation addAnalysisType
   */
  static readonly AddAnalysisTypePath = '/api/v1/processes/analysis-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addAnalysisType()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addAnalysisType$Response(params?: {
    body?: AnalysisType
  }): Observable<StrictHttpResponse<AnalysisType>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.AddAnalysisTypePath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AnalysisType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addAnalysisType$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addAnalysisType(params?: {
    body?: AnalysisType
  }): Observable<AnalysisType> {

    return this.addAnalysisType$Response(params).pipe(
      map((r: StrictHttpResponse<AnalysisType>) => r.body as AnalysisType)
    );
  }

  /**
   * Path part for operation deleteAnalysisType
   */
  static readonly DeleteAnalysisTypePath = '/api/v1/processes/analysis-types/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAnalysisType()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAnalysisType$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.DeleteAnalysisTypePath, 'delete');
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
   * To access the full response (for headers, for example), `deleteAnalysisType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAnalysisType(params: {
    name: string;
  }): Observable<void> {

    return this.deleteAnalysisType$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listTechniques
   */
  static readonly ListTechniquesPath = '/api/v1/processes/techniques';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listTechniques()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTechniques$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Quality>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.ListTechniquesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Quality>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listTechniques$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listTechniques(params?: {
  }): Observable<Array<Quality>> {

    return this.listTechniques$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Quality>>) => r.body as Array<Quality>)
    );
  }

  /**
   * Path part for operation addTechnique
   */
  static readonly AddTechniquePath = '/api/v1/processes/techniques';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addTechnique()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addTechnique$Response(params?: {
    body?: Technique
  }): Observable<StrictHttpResponse<Technique>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.AddTechniquePath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Technique>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addTechnique$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addTechnique(params?: {
    body?: Technique
  }): Observable<Technique> {

    return this.addTechnique$Response(params).pipe(
      map((r: StrictHttpResponse<Technique>) => r.body as Technique)
    );
  }

  /**
   * Path part for operation deleteTechnique
   */
  static readonly DeleteTechniquePath = '/api/v1/processes/techniques/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTechnique()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTechnique$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.DeleteTechniquePath, 'delete');
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
   * To access the full response (for headers, for example), `deleteTechnique$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTechnique(params: {
    name: string;
  }): Observable<void> {

    return this.deleteTechnique$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listProcessStrategy
   */
  static readonly ListProcessStrategiesPath = '/api/v1/processes/process-strategies';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listProcessStrategys()` instead.
   *
   * This method doesn't expect any request body.
   */
  listProcessStrategies$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ProcessStrategy>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.ListProcessStrategiesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProcessStrategy>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listProcessStrategys$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listProcessStrategies(params?: {
  }): Observable<Array<ProcessStrategy>> {

    return this.listProcessStrategies$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ProcessStrategy>>) => r.body as Array<ProcessStrategy>)
    );
  }

  /**
   * Path part for operation addProcessStrategy
   */
  static readonly AddProcessStrategyPath = '/api/v1/processes/process-strategies';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addProcessStrategy()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addProcessStrategy$Response(params?: {
    body?: ProcessStrategy
  }): Observable<StrictHttpResponse<ProcessStrategy>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.AddProcessStrategyPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProcessStrategy>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addProcessStrategy$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addProcessStrategy(params?: {
    body?: ProcessStrategy
  }): Observable<ProcessStrategy> {

    return this.addProcessStrategy$Response(params).pipe(
      map((r: StrictHttpResponse<ProcessStrategy>) => r.body as ProcessStrategy)
    );
  }

  /**
   * Path part for operation deleteProcessStrategy
   */
  static readonly DeleteProcessStrategyPath = '/api/v1/processes/process-strategies/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProcessStrategy()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProcessStrategy$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.DeleteProcessStrategyPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteProcessStrategy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProcessStrategy(params: {
    name: string;
  }): Observable<void> {

    return this.deleteProcessStrategy$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listAtomarUnit
   */
  static readonly ListAtomarUnitsPath = '/api/v1/processes/atomar-units';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAtomarUnits()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAtomarUnits$Response(params?: {
  }): Observable<StrictHttpResponse<Array<AtomarUnit>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.ListAtomarUnitsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AtomarUnit>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listAtomarUnits$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAtomarUnits(params?: {
  }): Observable<Array<AtomarUnit>> {

    return this.listAtomarUnits$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AtomarUnit>>) => r.body as Array<AtomarUnit>)
    );
  }

  /**
   * Path part for operation addAtomarUnit
   */
  static readonly AddAtomarUnitPath = '/api/v1/processes/atomar-units';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addAtomarUnit()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addAtomarUnit$Response(params?: {
    body?: AtomarUnit
  }): Observable<StrictHttpResponse<AtomarUnit>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.AddAtomarUnitPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AtomarUnit>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addAtomarUnit$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addAtomarUnit(params?: {
    body?: AtomarUnit
  }): Observable<AtomarUnit> {

    return this.addAtomarUnit$Response(params).pipe(
      map((r: StrictHttpResponse<AtomarUnit>) => r.body as AtomarUnit)
    );
  }

  /**
   * Path part for operation deleteAtomarUnit
   */
  static readonly DeleteAtomarUnitPath = '/api/v1/processes/atomar-units/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAtomarUnit()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAtomarUnit$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachProcessService.DeleteAtomarUnitPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteAtomarUnit$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAtomarUnit(params: {
    name: string;
  }): Observable<void> {

    return this.deleteAtomarUnit$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
