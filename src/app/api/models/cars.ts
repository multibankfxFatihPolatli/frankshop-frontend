/* tslint:disable */
import { BaseModel } from './base-model';
import { Vehicle } from './vehicle';
export interface Cars extends BaseModel{
  location?: string;
  vehicles?: Array<Vehicle>;
}
