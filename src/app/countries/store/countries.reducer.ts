import { createEntityAdapter } from '@ngrx/entity';
import { EntityState, EntityAdapter } from '@ngrx/entity/src/models';
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Country } from '../models/country.model';

import * as CountriesActions from './countries.actions';

export interface CountryState extends EntityState<Country> {
  selectedCountry: Country | undefined;
}

export const CountryAdapter: EntityAdapter<Country> =
  createEntityAdapter<Country>({
    selectId: (country: Country) => country._id,
  });

export const initialState = CountryAdapter.getInitialState({
  selectedCountry: undefined,
});

// Selectors
const CountrySelectors = CountryAdapter.getSelectors();

export const getCountriesFeatureState =
  createFeatureSelector<CountryState>('countries');

export const countriesSelector = createSelector(
  getCountriesFeatureState,
  CountrySelectors.selectAll
);

export const selectedCountrySelector = createSelector(
  getCountriesFeatureState,
  (state) => state.selectedCountry
);

// Reducer
export const countriesReducer = createReducer<CountryState>(
  initialState,
  on(CountriesActions.loadCountriesSuccess, (state, action): CountryState => {
    return CountryAdapter.setAll(action.countries, state);
  }),
  on(CountriesActions.addCountrySuccess, (state, action): CountryState => {
    return CountryAdapter.addOne(action.country, state);
  }),
  on(CountriesActions.selectCountry, (state, action): CountryState => {
    return {
      ...state,
      selectedCountry: action.country,
    };
  }),
  on(CountriesActions.editCountrySuccess, (state, action): CountryState => {
    return CountryAdapter.updateOne(action.updatedCountry, state);
  }),
  on(CountriesActions.deleteCountrySuccess, (state, action): CountryState => {
    return CountryAdapter.removeOne(action.id, state);
  })
);
