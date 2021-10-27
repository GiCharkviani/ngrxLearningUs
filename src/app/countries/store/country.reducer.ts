import { CountryModel } from "../country.model";
import * as CountryActions from './country.actions';

const initialState: {countries:CountryModel[]} = {
  countries: [
    {name: 'Georgia', capital: 'Tbilisi'},
    {name: 'France', capital: 'Paris'}
  ]
}

export function CountriesReducer<T>(state = initialState, action: CountryActions.CountryAction) {
  switch(action.type){
    case CountryActions.ADD_COUNTRY:
      return {
        ...state,
        countries: [...state.countries, action.payload]
      };
      default:
        return state
  }
}
