import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonInterface } from './models/person.model';
import {
  DeleteResponseInterface,
  PostResponseInterface,
} from './models/response.model';

@Injectable({ providedIn: 'root' })
export class PersonService {
  constructor(private http: HttpClient) {}

  loadPersons() {
    return this.http.get<any>('http://localhost:3000/api/persons');
  }

  addPerson(name: string, surname: string, age: number) {
    return this.http.post<PostResponseInterface>(
      'http://localhost:3000/api/persons',
      {
        name,
        surname,
        age,
      }
    );
  }

  deletePerson(id: string) {
    return this.http.delete<DeleteResponseInterface>(
      `http://localhost:3000/api/persons/${id}`
    );
  }

  editPerson(id: string, name: string, surname: string, age: number) {
    return this.http.patch<PersonInterface>(
      `http://localhost:3000/api/persons/${id}`,
      {}
    );
  }
}
