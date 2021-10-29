import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Country } from './models/country.model';
import { countriesSelector } from './store/countries.reducer';

import * as CountriesActions from './store/countries.actions';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  countries$!: Observable<Country[]>;
  countriesForm!: FormGroup;

  constructor(private store: Store<any>) {
    this.countries$ = this.store.select(countriesSelector);
  }

  ngOnInit() {
    // Load Countries
    this.store.dispatch(CountriesActions.loadCountries());

    // Form
    this.countriesForm = new FormGroup({
      country: new FormControl(null, Validators.required),
      capital: new FormControl(null, Validators.required),
      id: new FormControl(null, Validators.required),
    });
  }

  addCountry() {
    const country = {
      name: this.countriesForm.value.country,
      capital: this.countriesForm.value.capital,
      id: this.countriesForm.value.id,
    };
    this.store.dispatch(CountriesActions.addCountry(country));
  }

  deleteCountry(id: number) {
    this.store.dispatch(CountriesActions.deleteCountry({ id }));
  }
}
