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
      mergeMap((action) =>
        this.countriesService
          .editCountry(
            action.country._id,
            action.country.country,
            action.country.capital
          )
          .pipe(
            tap((res) => console.log(res)),
            map((res) =>
              CountriesActions.addCountrySuccess({
                country: {
                  country: 'Geo',
                  capital: 'Tbi',
                  _id: 'asdasdasdasdasd',
                },
              })
            )
          )
      )
    )
  );

  // editCountry$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CountriesActions.editCountry),
  //     mergeMap((action) =>
  //       this.countriesService
  //         .editCountry(
  //           action.country._id,
  //           action.country.country,
  //           action.country.capital
  //         )
  //         .pipe(
  //           tap((res) => console.log),
  //           map((res) =>
  //             CountriesActions.addCountrySuccess({ country: res.country })
  //           )
  //         )
  //     )
  //   )
  // );

  // editCountry$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CountriesActions.editCountry),
  //     mergeMap((action) =>
  //       this.countriesService
  //         .editCountry(action._id, action.name, action.capital)
  //         .pipe((res) =>
  //           CountriesActions.editCountrySuccess({ country: res.country })
  //         )
  //     )
  //   )
  // );
}
