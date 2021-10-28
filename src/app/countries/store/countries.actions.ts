import { createAction, props } from '@ngrx/store';
import { Country } from '../models/country.model';

export const getCountries = createAction('[Countries Page] Get All Countries');

export const addCountry = createAction(
  '[Countries Page] Add New Country',
  props<{ country: Country }>()
);

export const deleteCountry = createAction(
  '[Countries Page] Delete Country',
  props<{ id: number }>()
);
