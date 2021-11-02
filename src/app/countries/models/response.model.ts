import { Country } from './country.model';

export interface GetResponse {
  message: string;
  countries: Country[];
}

export interface PatchResponse {
  country: string;
  capital: string;
  _id: string;
}
