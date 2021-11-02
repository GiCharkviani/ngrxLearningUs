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

  addCountry(country: string | null, capital: string | null) {
    return this.http.post<any>('http://localhost:3000/api/countries', {
      country,
      capital,
    });
  }

  editCountry(
    _id: string | undefined,
    country: string | null,
    capital: string | null
  ) {
    return this.http.patch(`http://localhost:3000/api/countries/${_id}`, {
      country,
      capital,
    });
  }
}
