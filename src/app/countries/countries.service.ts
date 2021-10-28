import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Response } from './models/response.model';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get<Response>('http://localhost:3000/api/countries').pipe(
      map((res) => {
        return res.countries;
      })
    );
  }

  addCountry() {
    this.http
      .post('http://localhost:3000/api/countries', {
        name: 'Georgia',
        capital: 'Tbilisi',
      })
      .subscribe();
  }
}
