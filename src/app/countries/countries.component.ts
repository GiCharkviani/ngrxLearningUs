import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Country } from './models/country.model';
import {
  countriesSelector,
  CountriesState,
  selectedCountrySelector,
} from './store/countries.reducer';

import * as CountriesActions from './store/countries.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  // Reactive Forms
  countriesForm!: FormGroup;
  editCountryForm!: FormGroup;

  // Countries Observable
  countries$!: Observable<Country[]>;
  editClicked$!: Observable<boolean>;
  selectedCountry$!: Observable<Country | undefined>;
  selectedCountryName$!: Observable<string | undefined | null>;
  changedCountry!: string;
  changedCapital!: string;
  _id!: string;

  constructor(private store: Store<CountriesState>) {
    this.countries$ = this.store.select(countriesSelector);
    this.selectedCountry$ = this.store.select(selectedCountrySelector).pipe(
      tap((country) => {
        this.editCountryForm.get('country')?.setValue(country?.country);
        this.editCountryForm.get('capital')?.setValue(country?.capital);
        this.editCountryForm.get('_id')?.setValue(country?._id);
      })
    );
  }

  ngOnInit() {
    // Add Country Form
    this.countriesForm = new FormGroup({
      country: new FormControl(null, Validators.required),
      capital: new FormControl(null, Validators.required),
    });

    // Edit Country Form
    this.editCountryForm = new FormGroup({
      country: new FormControl(null, Validators.required),
      capital: new FormControl(null, Validators.required),
      _id: new FormControl(),
    });

    // Subscribe Edit Country Form On Changes
    this.editCountryForm.valueChanges
      .pipe(
        tap(() => {
          this.changedCountry = this.editCountryForm.get('country')?.value;
          this.changedCapital = this.editCountryForm.get('capital')?.value;
          this._id = this.editCountryForm.get('_id')?.value;
        })
      )
      .subscribe();

    // Load Countries
    this.store.dispatch(CountriesActions.loadCountries());
  }

  addCountry() {
    const country = {
      country: this.countriesForm.value.country,
      capital: this.countriesForm.value.capital,
    };

    this.store.dispatch(CountriesActions.addCountry(country));
  }

  editCountry(country: Country) {
    this.store.dispatch(CountriesActions.toggleEditForm({ editClicked: true }));
    this.store.dispatch(CountriesActions.selectCountry({ country }));
  }

  saveChanges() {
    // this.selectedCountry$
    //   .pipe(
    //     tap((res) => {
    //       country = res?.country;
    //       capital = res?.capital;
    //       _id = res?._id;
    //     })
    //   )
    //   .subscribe();

    this.store.dispatch(
      CountriesActions.editCountry({
        country: {
          country: this.changedCountry,
          capital: this.changedCapital,
          _id: this._id,
        },
      })
    );
    // this.store.dispatch(CountriesActions.editCountry({ _id, name, capital }));
  }

  discardChanges() {
    this.store.dispatch(CountriesActions.selectCountry({ country: undefined }));
  }

  deleteCountry(id: number) {
    this.store.dispatch(CountriesActions.deleteCountry({ id }));
  }
}
