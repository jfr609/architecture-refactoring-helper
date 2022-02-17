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

import { RefactoringApproach } from '../models/refactoring-approach';

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
  }): Observable<StrictHttpResponse<Array<RefactoringApproach>>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.ListRefactoringApproachesPath, 'get');
    if (params) {
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
   * Creates a RefactoringApproach.
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
   * Creates a RefactoringApproach.
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
   * Path part for operation updateRefactoringApproach
   */
  static readonly UpdateRefactoringApproachPath = '/api/v1/approaches/{id}';

  /**
   * Updated an existing RefactoringApproach.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRefactoringApproach()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateRefactoringApproach$Response(params: {
    id: number;
    body?: RefactoringApproach
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RefactoringApproachService.UpdateRefactoringApproachPath, 'put');
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
   * Updated an existing RefactoringApproach.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateRefactoringApproach$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateRefactoringApproach(params: {
    id: number;
    body?: RefactoringApproach
  }): Observable<void> {

    return this.updateRefactoringApproach$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
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

}
