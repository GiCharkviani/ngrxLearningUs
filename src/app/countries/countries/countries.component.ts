import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CountryModel } from '../country.model';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries!: Observable<CountryModel[]>;

  constructor(private store: Store<{countries: {countries: CountryModel[]}}>) {}

  ngOnInit(): void {
    this.countries = this.store.select('countries').pipe(map(res => res.countries))


  }

}
