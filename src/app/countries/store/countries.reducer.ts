import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Country } from '../models/country.model';

import * as CountriesActions from './countries.actions';

export interface CountriesState {
  countries: Country[];
}

const initialState: CountriesState = {
  countries: [],
};

// Selectors
export const getCountriesFeatureState =
  createFeatureSelector<CountriesState>('countries');

export const countriesSelector = createSelector(
  getCountriesFeatureState,
  (state) => state.countries
);

// Reducer
export const countriesReducer = createReducer<CountriesState>(
  initialState,
  on(CountriesActions.loadCountriesSuccess, (state, action): CountriesState => {
    return {
      ...state,
      countries: action.countries,
    };
  }),
  on(CountriesActions.addCountrySuccess, (state, action): CountriesState => {
    return {
      ...state,
      countries: [...state.countries, action.country],
    };
  }),
  on(CountriesActions.deleteCountry, (state, action): CountriesState => {
    return {
      ...state,
      countries: [
        ...state.countries.filter((country) => country.id !== action.id),
      ],
    };
  })
);
