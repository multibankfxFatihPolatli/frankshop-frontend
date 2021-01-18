/* tslint:disable */
import { HttpClient, HttpHeaders, HttpParameterCodec, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable as __Observable } from 'rxjs';
import { filter as __filter, map as __map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ApiConfiguration } from './api-configuration';
import { BaseModel } from './models/base-model';
import { BaseResponseEntity } from './models/base-response-entity';
import { StrictHttpResponse } from './strict-http-response';

/**
 * Custom parameter codec to correctly handle the plus sign in parameter
 * values. See https://github.com/angular/angular/issues/18261
 */
class ParameterCodec implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
const PARAMETER_CODEC = new ParameterCodec();

/**
 * Base class for API services
 */
export abstract class BaseService<K extends BaseModel, T extends BaseResponseEntity<K>> {
  constructor(
    protected config: ApiConfiguration,
    protected http: HttpClient
  ) {
  }

  private _rootUrl: string = environment.apiUrl;

  /**
   * Returns the root url for API operations. If not set directly in this
   * service, will fallback to ApiConfiguration.rootUrl.
   */
  get rootUrl(): string {
    return this._rootUrl || this.config.rootUrl;
  }

  /**
   * Sets the root URL for API operations in this service.
   */
  set rootUrl(rootUrl: string) {
    this._rootUrl = rootUrl;
  }

  /**
   * Creates a new `HttpParams` with the correct codec
   */
  protected newParams(): HttpParams {
    return new HttpParams({
      encoder: PARAMETER_CODEC
    });
  }

  protected abstract getListPath(): string;

  protected abstract getListByIdsPath(): string;

  protected abstract getFindByIdPath(): string;


  private listUsingGET1Response(params: RequestParams): __Observable<StrictHttpResponse<T>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.unpaged != null) __params = __params.set('unpaged', params.unpaged.toString());
    if (params.sortUnsorted != null) __params = __params.set('sort.unsorted', params.sortUnsorted.toString());
    if (params.sortSorted != null) __params = __params.set('sort.sorted', params.sortSorted.toString());
    if (params.paged != null) __params = __params.set('paged', params.paged.toString());
    if (params.pageSize != null) __params = __params.set('pageSize', params.pageSize.toString());
    if (params.pageNumber != null) __params = __params.set('pageNumber', params.pageNumber.toString());
    if (params.offset != null) __params = __params.set('offset', params.offset.toString());
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + this.getListPath(),
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<T>;
      })
    );
  }

  list(params: RequestParams): __Observable<T> {
    return this.listUsingGET1Response(params).pipe(
      __map(_r => _r.body as T)
    );
  }

  /**
   * listAllByIds
   * @param data undefined
   * @return OK
   */
  private listAllByIdsUsingPOST1Response(data?: Array<string>): __Observable<StrictHttpResponse<T>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (data || []).forEach(val => { if (val != null) __params = __params.append('data', val.toString()) });
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + this.getListByIdsPath(),
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<T>;
      })
    );
  }
  /**
   * listAllByIds
   * @param data undefined
   * @return OK
   */
  listAllByIds(data?: Array<string>): __Observable<T> {
    return this.listAllByIdsUsingPOST1Response(data).pipe(
      __map(_r => _r.body as T)
    );
  }

  /**
   * findById
   * @param id id
   * @return OK
   */
  private findByIdUsingGET1Response(id: string): __Observable<StrictHttpResponse<T>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + this.getFindByIdPath() + encodeURIComponent(id),
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<T>;
      })
    );
  }
  /**
   * findById
   * @param id id
   * @return OK
   */
  findById(id: string): __Observable<T> {
    return this.findByIdUsingGET1Response(id).pipe(
      __map(_r => _r.body as T)
    );
  }
}


export interface RequestParams {
  unpaged?: boolean;
  sortUnsorted?: boolean;
  sortSorted?: boolean;
  paged?: boolean;
  pageSize?: number;
  pageNumber?: number;
  offset?: number;
  sort?: string;
  size?: number;
}

