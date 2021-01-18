import { BaseModel } from "./base-model";

/* tslint:disable */
export interface Vehicle extends BaseModel {
  _id?: string;
  dateAdded?: string;
  licensed?: boolean;
  locationId?: string;
  make?: string;
  model?: string;
  price?: number;
  year?: number;
}
