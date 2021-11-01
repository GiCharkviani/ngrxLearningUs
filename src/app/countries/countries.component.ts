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
  editCountryForm!: FormGroup;
  editClicked = false;

  constructor(private store: Store<any>) {
    this.countries$ = this.store.select(countriesSelector);
  }

  ngOnInit() {
    // Load Countries
    this.store.dispatch(CountriesActions.loadCountries());

    // Add Country Form
    this.countriesForm = new FormGroup({
      country: new FormControl(null, Validators.required),
      capital: new FormControl(null, Validators.required),
    });

    // Edit Country Form
    this.editCountryForm = new FormGroup({
      country: new FormControl(Validators.required),
      capital: new FormControl(Validators.required),
      _id: new FormControl(Validators.required),
    });
  }

  addCountry() {
    const country = {
      country: this.countriesForm.value.country,
      capital: this.countriesForm.value.capital,
    };

    this.store.dispatch(CountriesActions.addCountry(country));
  }

  editCountry(country: Country) {
    this.editClicked = !this.editClicked;

    this.editCountryForm.get('country')?.setValue(country.country);
    this.editCountryForm.get('capital')?.setValue(country.capital);
  }

  onSave() {
    const name = this.editCountryForm.get('country')?.value;
    const capital = this.editCountryForm.get('capital')?.value;
    const _id = this.editCountryForm.get('_id')?.value;

    // this.store.dispatch(CountriesActions.editCountry({ _id, name, capital }));
  }

  deleteCountry(id: number) {
    this.store.dispatch(CountriesActions.deleteCountry({ id }));
  }
}
