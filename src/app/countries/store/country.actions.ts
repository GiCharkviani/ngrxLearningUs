import { createAction, props } from "@ngrx/store";
import { CountryModel } from "../country.model";


//loading
export const StartedLoadingCountries = createAction(
  '[Countries] Started Loading Countries'
)
export const SuccessLoadingCountries = createAction(
  '[Countries] Loaded Countries',
  props<{countries: CountryModel[]}>()
)
export const FailedLoadingCountries = createAction(
  '[Countries] Failed Loading Countries',
  props<{error: string}>()
)


//adding
export const StartedAddingCountry = createAction(
  '[Countries] Started Adding Country',
  props<{country: CountryModel}>()
)
export const SuccessAddingCountry = createAction(
  '[Countries] Added Country',
  props<{country: CountryModel}>()
)
export const FailedaddingCountry = createAction(
  '[Countries] Failed Addding Country',
  props<{error: string}>()
)



//deleting
//adding
export const StartedDeletingCountry = createAction(
  '[Countries] Start Deleting Country',
  props<{countryId: string}>()
)
export const SuccessDeletingCountry = createAction(
  '[Countries] Deleted Country',
  props<{countryId: string}>()
)
export const FailedDeletingCountry = createAction(
  '[Countries] Failed Deleting Country',
  props<{error: string}>()
)
