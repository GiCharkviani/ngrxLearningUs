import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Country } from '../models/country.model';

// Load Countries
export const loadCountries = createAction('[Countries Page] Load Countries');

export const loadCountriesSuccess = createAction(
  '[Countries Page] Load Countries Success',
  props<{ countries: Country[] }>()
);

// Add Country
export const addCountry = createAction(
  '[Countries Page] Add New Country',
  props<Country>()
);

export const addCountrySuccess = createAction(
  '[Countries Page] Add New Country Success',
  props<{ country: Country }>()
);

// Select
export const selectCountry = createAction(
  '[Countries Page] Select Country',
  props<{ country: Country | undefined }>()
);

// Toggle edit form
export const toggleEditForm = createAction(
  '[Countries Page] Toggle Edit Form',
  props<{ editClicked: boolean }>()
);

// Edit Country
export const editCountry = createAction(
  '[Countries Page] Edit Country',
  props<{ country: Country }>()
);

export const editCountrySuccess = createAction(
  '[Countries Page] Edit Country Success',
  props<{ updatedCountry: Update<Country> }>()
);

// Delete Country
export const deleteCountry = createAction(
  '[Countries Page] Delete Country',
  props<{ id: string }>()
);

export const deleteCountrySuccess = createAction(
  '[Countries Page] Delete Country Success',
  props<{ id: string }>()
);
