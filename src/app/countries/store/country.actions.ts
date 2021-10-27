import { Action } from "@ngrx/store";
import { CountryModel } from "../country.model";

export const ADD_COUNTRY = 'ADD_COUNTRY';

export class AddCountry implements Action {
  readonly type = ADD_COUNTRY;
  constructor(public payload: CountryModel){}
}

export type CountryAction = AddCountry
