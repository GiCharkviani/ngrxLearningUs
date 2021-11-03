import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country } from './models/country.model';
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

  // Edited Information
  changedCountry!: string;
  changedCapital!: string;
  _id!: string;

  constructor() {}

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
  }

  addCountry() {
    const country = {
      country: this.countriesForm.value.country,
      capital: this.countriesForm.value.capital,
      _id: '',
    };
  }

  editCountry(country: Country) {}

  deleteCountry(country: Country) {}

  saveChanges() {}

  discardChanges() {}
}
