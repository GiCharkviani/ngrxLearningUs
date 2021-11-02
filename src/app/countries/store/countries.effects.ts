import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { exhaustMap, map, mergeMap } from 'rxjs/operators';

import { CountriesService } from '../countries.service';
import { Country } from '../models/country.model';
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
          .addCountry(action.country, action.capital)
          .pipe(
            map((res) =>
              CountriesActions.addCountrySuccess({ country: res.country })
            )
          )
      )
    )
  );

  editCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountriesActions.editCountry),
      exhaustMap((action) =>
        this.countriesService
          .editCountry(
            action.country._id,
            action.country.country,
            action.country.capital
          )
          .pipe(
            map((res) => {
              const updatedCountry: Update<Country> = {
                id: res._id,
                changes: {
                  ...res,
                },
              };

              return CountriesActions.editCountrySuccess({ updatedCountry });
            })
          )
      )
    )
  );

  deleteCountry$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountriesActions.deleteCountry),
      mergeMap((action) => {
        return this.countriesService.deleteCountry(action.id).pipe(
          map((res) => {
            return CountriesActions.deleteCountrySuccess({ id: res });
          })
        );
      })
    );
  });
}
