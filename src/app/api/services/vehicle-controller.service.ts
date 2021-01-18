/* tslint:disable */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { BaseService as __BaseService } from '../base-service';
import { Vehicle } from '../models/vehicle';
import { VehicleResponseEntity } from '../models/vehicle-response-entity';


/**
 * Vehicle Controller
 */
@Injectable({
  providedIn: 'root',
})
class VehicleControllerService extends __BaseService<Vehicle, VehicleResponseEntity> {
  static readonly listUsingGETPath = '/api/vehicles';
  static readonly listAllByIdsUsingPOSTPath = '/api/vehicles/ids';
  static readonly findByIdUsingGETPath = '/api/vehicles/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  protected getListPath(): string {

    return VehicleControllerService.listUsingGETPath;
  }

  protected getListByIdsPath(): string {

    return VehicleControllerService.listAllByIdsUsingPOSTPath;
  }

  protected getFindByIdPath(): string {

    return VehicleControllerService.findByIdUsingGETPath;
  }


}

module VehicleControllerService {

  /**
   * Parameters for listUsingGET1
   */
  export interface ListUsingGET1Params {
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

export { VehicleControllerService };

