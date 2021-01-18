/* tslint:disable */
import { BaseModel } from './base-model';
import { Cars } from './cars';
import { WarehouseLocation } from './warehouse-location';
export interface Warehouse extends BaseModel {
  cars?: Cars;
  id?: string;
  location?: WarehouseLocation;
  name?: string;
}
