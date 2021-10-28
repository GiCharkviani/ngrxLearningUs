import { Country } from './country.model';

export interface Response {
  message: string;
  countries: Country[];
}
