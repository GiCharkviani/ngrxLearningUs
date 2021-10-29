import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { PersonsEntityFactory } from './persons-data.service';

@Injectable()
export class PersonsResolver implements Resolve<boolean> {
  constructor(private personsService: PersonsEntityFactory) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.personsService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.personsService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
