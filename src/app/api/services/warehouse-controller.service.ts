/* tslint:disable */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { BaseService as __BaseService } from '../base-service';
import { Warehouse } from '../models/warehouse';
import { WarehouseResponseEntity } from '../models/warehouse-response-entity';


/**
 * Warehouse Controller
 */
@Injectable({
  providedIn: 'root',
})
class WarehouseControllerService extends __BaseService<Warehouse, WarehouseResponseEntity> {
  static readonly listUsingGETPath = '/api/warehouses';
  static readonly listAllByIdsUsingPOSTPath = '/api/warehouses/ids';
  static readonly findByIdUsingGETPath = '/api/warehouses/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }


  protected getListPath(): string {

    return WarehouseControllerService.listUsingGETPath;
  }

  protected getListByIdsPath(): string {

    return WarehouseControllerService.listAllByIdsUsingPOSTPath;
  }

  protected getFindByIdPath(): string {

    return WarehouseControllerService.findByIdUsingGETPath;
  }
}

module WarehouseControllerService {

  /**
   * Parameters for listUsingGET2
   */
  export interface ListUsingGET2Params {
    unpaged?: boolean;
    sortUnsorted?: boolean;
    sortSorted?: boolean;
    paged?: boolean;
    pageSize?: number;
    pageNumber?: number;
    offset?: number;
  }
}

export { WarehouseControllerService };

