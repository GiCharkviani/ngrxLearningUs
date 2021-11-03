import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { interval, Observable } from 'rxjs';
import { shareReplay, map, exhaustMap } from 'rxjs/operators';
import { PersonInterface } from '../models/person.model';

@Injectable()
export class DefaultPersonsService extends DefaultDataService<PersonInterface> {
  constructor(http: HttpClient, httpURLGenerator: HttpUrlGenerator) {
    super('Person', http, httpURLGenerator);
  }

  getAll(): Observable<PersonInterface[]> {
    return this.http
      .get<PersonInterface[]>('http://localhost:3000/api/persons')
      .pipe();
  }

  add(person: PersonInterface): any {
    return this.http
      .post<PersonInterface>('http://localhost:3000/api/persons', person)
      .pipe();
  }

  update(person: Update<PersonInterface>): Observable<PersonInterface> {
    return this.http.patch<PersonInterface>(
      `http://localhost:3000/api/persons/${person.id}`,
      person
    );
  }

  delete(id: string | number): Observable<string | number> {
    return this.http
      .delete<PersonInterface>(`http://localhost:3000/api/persons/${id}`)
      .pipe(map((res) => res._id));
  }
}
