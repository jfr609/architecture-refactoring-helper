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

import { ArchitecturalDesign } from '../models/architectural-design';
import { ArchitecturalDesignRecommendation } from '../models/architectural-design-recommendation';
import { ArchitecturalDesignRecommendationRequest } from '../models/architectural-design-recommendation-request';

@Injectable({
  providedIn: 'root',
})
export class ArchitecturalDesignService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listArchitecturalDesigns
   */
  static readonly ListArchitecturalDesignsPath = '/api/v1/architectural-designs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listArchitecturalDesigns()` instead.
   *
   * This method doesn't expect any request body.
   */
  listArchitecturalDesigns$Response(params?: {
    withDetails?: boolean;
  }): Observable<StrictHttpResponse<Array<ArchitecturalDesign>>> {

    const rb = new RequestBuilder(this.rootUrl, ArchitecturalDesignService.ListArchitecturalDesignsPath, 'get');
    if (params) {
      rb.query('withDetails', params.withDetails, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ArchitecturalDesign>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listArchitecturalDesigns$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listArchitecturalDesigns(params?: {
    withDetails?: boolean;
  }): Observable<Array<ArchitecturalDesign>> {

    return this.listArchitecturalDesigns$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ArchitecturalDesign>>) => r.body as Array<ArchitecturalDesign>)
    );
  }

  /**
   * Path part for operation getArchitecturalDesign
   */
  static readonly GetArchitecturalDesignPath = '/api/v1/architectural-designs/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArchitecturalDesign()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArchitecturalDesign$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<ArchitecturalDesign>> {

    const rb = new RequestBuilder(this.rootUrl, ArchitecturalDesignService.GetArchitecturalDesignPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ArchitecturalDesign>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getArchitecturalDesign$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArchitecturalDesign(params: {
    id: number;
  }): Observable<ArchitecturalDesign> {

    return this.getArchitecturalDesign$Response(params).pipe(
      map((r: StrictHttpResponse<ArchitecturalDesign>) => r.body as ArchitecturalDesign)
    );
  }

  /**
   * Path part for operation recommendArchitecturalDesigns
   */
  static readonly RecommendArchitecturalDesignsPath = '/api/v1/architectural-designs/recommendations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recommendArchitecturalDesigns()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  recommendArchitecturalDesigns$Response(params?: {
    count?: number;
    body?: ArchitecturalDesignRecommendationRequest
  }): Observable<StrictHttpResponse<Array<ArchitecturalDesignRecommendation>>> {

    const rb = new RequestBuilder(this.rootUrl, ArchitecturalDesignService.RecommendArchitecturalDesignsPath, 'post');
    if (params) {
      rb.query('count', params.count, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ArchitecturalDesignRecommendation>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `recommendArchitecturalDesigns$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  recommendArchitecturalDesigns(params?: {
    count?: number;
    body?: ArchitecturalDesignRecommendationRequest
  }): Observable<Array<ArchitecturalDesignRecommendation>> {

    return this.recommendArchitecturalDesigns$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ArchitecturalDesignRecommendation>>) => r.body as Array<ArchitecturalDesignRecommendation>)
    );
  }

}
