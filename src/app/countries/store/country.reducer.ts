import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { CountryModel } from "../country.model";
import * as CountryActions from './country.actions';
import * as AppState from '../../state/app.state';


//globally used state
export interface State extends AppState.State{
  countries: CountryState
}

//local state
export interface CountryState {
  countries: CountryModel[],
  error: string
}

//local initial state
const initialState: CountryState = {
  countries: [],
  error:''
}

//selector
const getCountriesState = createFeatureSelector<CountryState>('countries');
export const getCountries = createSelector(getCountriesState, state => state.countries);
export const getError = createSelector(getCountriesState, state => state.error);

//reducer
export const CountriesReducer = createReducer<CountryState>(
  initialState,
  on(CountryActions.SuccessLoadingCountries, (state, action):CountryState => {
    return {
      ...state,
      countries: action.countries
    }
  }),
  on(CountryActions.FailedLoadingCountries, (state, action) => {
    return {
      ...state,
      countries: [],
      error: action.error
    }
  }),
  on(CountryActions.SuccessAddingCountry, (state, action):CountryState => {
    return {
      ...state,
      countries: [...state.countries, action.country]
    }
  }),
  on(CountryActions.FailedaddingCountry, (state, action):CountryState => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(CountryActions.SuccessDeletingCountry, (state, action):CountryState => {
    return {
      ...state,
      countries: [...state.countries.filter(country => country._id !== action.countryId)]
    }
  }),
  on(CountryActions.FailedDeletingCountry, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  })
)









//******************* */




//getting exact data:
//ეს მიდგომა ბევრად უკეთესია.
// export const getCountryById = createSelector(
//   getCountriesState,
//   state => state.ids
// )
// export const getCurrentCountry = createSelector(
//   getCountriesState,
//   getCountryById,
//   (state, countryId) => state.countries.find(country => country.id === countryId)
// )
