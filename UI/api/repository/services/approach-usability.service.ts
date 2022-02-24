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
import { ApproachUsability } from '../models/approach-usability';
import { ResultsQuality } from '../models/results-quality';
import { ToolSupport } from '../models/tool-support';
import { ValidationMethod } from '../models/validation-method';

@Injectable({
  providedIn: 'root',
})
export class ApproachUsabilityService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listApproachUsabilities
   */
  static readonly ListApproachUsabilitiesPath = '/api/v1/usabilities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listApproachUsabilities()` instead.
   *
   * This method doesn't expect any request body.
   */
  listApproachUsabilities$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ApproachUsability>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachUsabilityService.ListApproachUsabilitiesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ApproachUsability>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listApproachUsabilities$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listApproachUsabilities(params?: {
  }): Observable<Array<ApproachUsability>> {

    return this.listApproachUsabilities$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ApproachUsability>>) => r.body as Array<ApproachUsability>)
    );
  }

  /**
   * Path part for operation getApproachUsability
   */
  static readonly GetApproachUsabilityPath = '/api/v1/usabilities/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getApproachUsability()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApproachUsability$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<ApproachUsability>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachUsabilityService.GetApproachUsabilityPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApproachUsability>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getApproachUsability$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getApproachUsability(params: {
    id: number;
  }): Observable<ApproachUsability> {

    return this.getApproachUsability$Response(params).pipe(
      map((r: StrictHttpResponse<ApproachUsability>) => r.body as ApproachUsability)
    );
  }

  /**
   * Path part for operation listResultsQualities
   */
  static readonly ListResultsQualitiesPath = '/api/v1/usabilities/result-qualities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listResultsQualities()` instead.
   *
   * This method doesn't expect any request body.
   */
  listResultsQualities$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ResultsQuality>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachUsabilityService.ListResultsQualitiesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ResultsQuality>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listResultsQualities$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listResultsQualities(params?: {
  }): Observable<Array<ResultsQuality>> {

    return this.listResultsQualities$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ResultsQuality>>) => r.body as Array<ResultsQuality>)
    );
  }

  /**
   * Path part for operation addResultsQuality
   */
  static readonly AddResultsQualityPath = '/api/v1/usabilities/result-qualities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addResultsQuality()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addResultsQuality$Response(params?: {
    body?: ResultsQuality
  }): Observable<StrictHttpResponse<ResultsQuality>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachUsabilityService.AddResultsQualityPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ResultsQuality>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addResultsQuality$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addResultsQuality(params?: {
    body?: ResultsQuality
  }): Observable<ResultsQuality> {

    return this.addResultsQuality$Response(params).pipe(
      map((r: StrictHttpResponse<ResultsQuality>) => r.body as ResultsQuality)
    );
  }

  /**
   * Path part for operation deleteResultsQuality
   */
  static readonly DeleteResultsQualityPath = '/api/v1/usabilities/result-qualities/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteResultsQuality()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteResultsQuality$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachUsabilityService.DeleteResultsQualityPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteResultsQuality$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteResultsQuality(params: {
    name: string;
  }): Observable<void> {

    return this.deleteResultsQuality$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listToolSupports
   */
  static readonly ListToolSupportsPath = '/api/v1/usabilities/tool-supports';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listToolSupports()` instead.
   *
   * This method doesn't expect any request body.
   */
  listToolSupports$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ToolSupport>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachUsabilityService.ListToolSupportsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ToolSupport>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listToolSupports$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listToolSupports(params?: {
  }): Observable<Array<ToolSupport>> {

    return this.listToolSupports$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ToolSupport>>) => r.body as Array<ToolSupport>)
    );
  }

  /**
   * Path part for operation addToolSupport
   */
  static readonly AddToolSupportPath = '/api/v1/usabilities/tool-supports';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addToolSupport()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addToolSupport$Response(params?: {
    body?: ToolSupport
  }): Observable<StrictHttpResponse<ToolSupport>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachUsabilityService.AddToolSupportPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ToolSupport>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addToolSupport$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addToolSupport(params?: {
    body?: ToolSupport
  }): Observable<ToolSupport> {

    return this.addToolSupport$Response(params).pipe(
      map((r: StrictHttpResponse<ToolSupport>) => r.body as ToolSupport)
    );
  }

  /**
   * Path part for operation deleteToolSupport
   */
  static readonly DeleteToolSupportPath = '/api/v1/usabilities/tool-supports/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteToolSupport()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteToolSupport$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachUsabilityService.DeleteToolSupportPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteToolSupport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteToolSupport(params: {
    name: string;
  }): Observable<void> {

    return this.deleteToolSupport$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listAccuracyPrecisions
   */
  static readonly ListAccuracyPrecisionsPath = '/api/v1/usabilities/accuracy-precisions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAccuracyPrecisions()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAccuracyPrecisions$Response(params?: {
  }): Observable<StrictHttpResponse<Array<AccuracyPrecision>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachUsabilityService.ListAccuracyPrecisionsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AccuracyPrecision>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listAccuracyPrecisions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAccuracyPrecisions(params?: {
  }): Observable<Array<AccuracyPrecision>> {

    return this.listAccuracyPrecisions$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AccuracyPrecision>>) => r.body as Array<AccuracyPrecision>)
    );
  }

  /**
   * Path part for operation addAccuracyPrecision
   */
  static readonly AddAccuracyPrecisionPath = '/api/v1/usabilities/accuracy-precisions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addAccuracyPrecision()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addAccuracyPrecision$Response(params?: {
    body?: AccuracyPrecision
  }): Observable<StrictHttpResponse<AccuracyPrecision>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachUsabilityService.AddAccuracyPrecisionPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AccuracyPrecision>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addAccuracyPrecision$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addAccuracyPrecision(params?: {
    body?: AccuracyPrecision
  }): Observable<AccuracyPrecision> {

    return this.addAccuracyPrecision$Response(params).pipe(
      map((r: StrictHttpResponse<AccuracyPrecision>) => r.body as AccuracyPrecision)
    );
  }

  /**
   * Path part for operation deleteAccuracyPrecision
   */
  static readonly DeleteAccuracyPrecisionPath = '/api/v1/usabilities/accuracy-precisions/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAccuracyPrecision()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAccuracyPrecision$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachUsabilityService.DeleteAccuracyPrecisionPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteAccuracyPrecision$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAccuracyPrecision(params: {
    name: string;
  }): Observable<void> {

    return this.deleteAccuracyPrecision$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation listValidationMethods
   */
  static readonly ListValidationMethodsPath = '/api/v1/usabilities/validation-methods';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listValidationMethods()` instead.
   *
   * This method doesn't expect any request body.
   */
  listValidationMethods$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ValidationMethod>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachUsabilityService.ListValidationMethodsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ValidationMethod>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listValidationMethods$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listValidationMethods(params?: {
  }): Observable<Array<ValidationMethod>> {

    return this.listValidationMethods$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ValidationMethod>>) => r.body as Array<ValidationMethod>)
    );
  }

  /**
   * Path part for operation addValidationMethod
   */
  static readonly AddValidationMethodPath = '/api/v1/usabilities/validation-methods';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addValidationMethod()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addValidationMethod$Response(params?: {
    body?: ValidationMethod
  }): Observable<StrictHttpResponse<ValidationMethod>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachUsabilityService.AddValidationMethodPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ValidationMethod>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addValidationMethod$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addValidationMethod(params?: {
    body?: ValidationMethod
  }): Observable<ValidationMethod> {

    return this.addValidationMethod$Response(params).pipe(
      map((r: StrictHttpResponse<ValidationMethod>) => r.body as ValidationMethod)
    );
  }

  /**
   * Path part for operation deleteValidationMethod
   */
  static readonly DeleteValidationMethodPath = '/api/v1/usabilities/validation-methods/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteValidationMethod()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteValidationMethod$Response(params: {
    name: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachUsabilityService.DeleteValidationMethodPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteValidationMethod$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteValidationMethod(params: {
    name: string;
  }): Observable<void> {

    return this.deleteValidationMethod$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
