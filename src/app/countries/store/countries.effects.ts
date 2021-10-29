import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

import { CountriesService } from '../countries.service';
import * as CountriesActions from './countries.actions';

@Injectable()
export class CountriesEffects {
  constructor(
    private actions$: Actions,
    private countriesService: CountriesService
  ) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.loadCountries),
      mergeMap(() =>
        this.countriesService
          .getCountries()
          .pipe(
            map((countries) =>
              CountriesActions.loadCountriesSuccess({ countries })
            )
          )
      )
    )
  );

  addCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.addCountry),
      mergeMap((action) =>
        this.countriesService
          .addCountry(action.name, action.capital, action.id)
          .pipe(
            map((res) =>
              CountriesActions.addCountrySuccess({ country: res.country })
            )
          )
      )
    )
  );
}
