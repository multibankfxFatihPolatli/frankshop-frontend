import { BaseModel } from "./base-model";

/* tslint:disable */
export interface Cart extends BaseModel {
  id?: string;
  userId?: string;
  vehicles?: Array<string>;
}
