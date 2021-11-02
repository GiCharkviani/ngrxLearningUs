import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PersonInterface {
  constructor(private http: HttpClient) {}
}
