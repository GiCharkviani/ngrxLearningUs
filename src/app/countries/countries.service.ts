import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Country } from './models/country.model';
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

  addCountry(name: string | null, capital: string | null, id: number | null) {
    return this.http.post<any>('http://localhost:3000/api/countries', {
      name,
      capital,
    });
  }
}
