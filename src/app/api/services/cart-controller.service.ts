/* tslint:disable */
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable as __Observable } from 'rxjs';
import { filter as __filter, map as __map } from 'rxjs/operators';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { BaseService as __BaseService } from '../base-service';
import { Cart } from '../models/cart';
import { CartResponseEntity } from '../models/cart-response-entity';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';


/**
 * Cart Controller
 */
@Injectable({
  providedIn: 'root',
})
class CartControllerService extends __BaseService<Cart, CartResponseEntity> {
  static readonly listUsingGETPath = '/api/carts';
  static readonly addToCartUsingGETPath = '/api/carts/add/vehicle/{vehicleId}';
  static readonly listAllByIdsUsingPOSTPath = '/api/carts/ids';
  static readonly removeFromCartUsingGETPath = '/api/carts/remove/vehicle/{vehicleId}';
  static readonly findByIdUsingGETPath = '/api/carts/';

  public static USER_CART: Cart;

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  public static isExistInCart(vehicleId: string): boolean {
    try {
      if (this.USER_CART != null && this.USER_CART.vehicles != null) {
        return this.USER_CART.vehicles.indexOf(vehicleId) != -1;
      }
    } catch (e) {
      console.error(e);

    }
    return false;
  }

  protected getListPath(): string {

    return CartControllerService.listUsingGETPath;
  }

  protected getListByIdsPath(): string {

    return CartControllerService.listAllByIdsUsingPOSTPath;
  }

  protected getFindByIdPath(): string {

    return CartControllerService.findByIdUsingGETPath;
  }

  public getCart(): void {

    this.getUserCart().subscribe(response => {
      CartControllerService.USER_CART = response['data'];
      console.log("cart", CartControllerService.USER_CART);
    });
  }

  /**
   * addToCart
   * @param vehicleId vehicleId
   * @return OK
   */
  addToCartUsingGETResponse(vehicleId: string): __Observable<__StrictHttpResponse<CartResponseEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/carts/add/vehicle/${encodeURIComponent(vehicleId)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CartResponseEntity>;
      })
    );
  }
  /**
   * addToCart
   * @param vehicleId vehicleId
   * @return OK
   */
  addToCart(vehicleId: string): __Observable<CartResponseEntity> {
    return this.addToCartUsingGETResponse(vehicleId).pipe(
      __map(_r => _r.body as CartResponseEntity)
    );
  }



  /**
   * removeFromCart
   * @param vehicleId vehicleId
   * @return OK
   */
  removeFromCartUsingGETResponse(vehicleId: string): __Observable<__StrictHttpResponse<CartResponseEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/carts/remove/vehicle/${encodeURIComponent(vehicleId)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CartResponseEntity>;
      })
    );
  }
  /**
   * removeFromCart
   * @param vehicleId vehicleId
   * @return OK
   */
  removeFromCart(vehicleId: string): __Observable<CartResponseEntity> {
    return this.removeFromCartUsingGETResponse(vehicleId).pipe(
      __map(_r => _r.body as CartResponseEntity)
    );
  }

  getUserCartUsingGETResponse(): __Observable<__StrictHttpResponse<CartResponseEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/carts/user`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CartResponseEntity>;
      })
    );
  }
  /**
   * removeFromCart
   * @param vehicleId vehicleId
   * @return OK
   */
  getUserCart(): __Observable<CartResponseEntity> {
    return this.getUserCartUsingGETResponse().pipe(
      __map(_r => _r.body as CartResponseEntity)
    );
  }


}

module CartControllerService {

  /**
   * Parameters for listUsingGET
   */
  export interface ListUsingGETParams {
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
}

export { CartControllerService };

