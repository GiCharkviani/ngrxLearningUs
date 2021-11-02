import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { Country } from './models/country.model';
import { GetResponse, PatchResponse } from './models/response.model';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http
      .get<GetResponse>('http://localhost:3000/api/countries')
      .pipe(
        map((res) => {
          return res.countries;
        })
      );
  }

  addCountry(country: string | undefined, capital: string | undefined) {
    return this.http.post<any>('http://localhost:3000/api/countries', {
      country,
      capital,
    });
  }

  editCountry(
    _id: string | undefined,
    country: string | undefined,
    capital: string | undefined
  ) {
    return this.http.patch<PatchResponse>(
      `http://localhost:3000/api/countries/${_id}`,
      {
        country,
        capital,
      }
    );
  }

  deleteCountry(_id: string): Observable<string> {
    return this.http
      .delete<Country>(`http://localhost:3000/api/countries/${_id}`)
      .pipe(map((delCountry) => delCountry._id));
  }
}
