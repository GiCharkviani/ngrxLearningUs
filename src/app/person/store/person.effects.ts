import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { PersonInterface } from '../models/person.model';
import { PersonService } from '../person.service';

import * as PersonActions from './person.actions';

@Injectable()
export class PersonEffects {
  constructor(
    private actions$: Actions,
    private personService: PersonService
  ) {}

  loadPersons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PersonActions.loadPersons),
      mergeMap((action) => {
        return this.personService.loadPersons().pipe(
          map((res) => {
            return PersonActions.loadPersonsSuccess({ persons: res.persons });
          })
        );
      })
    );
  });

  addPerson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PersonActions.addPerson),
      exhaustMap((action) => {
        return this.personService
          .addPerson(action.name, action.surname, action.age)
          .pipe(
            map((res) => {
              return PersonActions.addPersonSuccess({ person: res.person });
            })
          );
      })
    );
  });

  deletePerson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PersonActions.deletePerson),
      mergeMap((action) => {
        return this.personService.deletePerson(action.id).pipe(
          map((res) => {
            return PersonActions.deletePersonSuccess({
              id: res.deletedUser._id,
            });
          })
        );
      })
    );
  });

  // editPerson$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(PersonActions.editPerson),
  //     exhaustMap((action) => {
  //       return this.personService
  //         .editPerson(
  //           action.person._id,
  //           action.person.name,
  //           action.person.surname,
  //           action.person.age
  //         )
  //         .pipe(
  //           map((res) => {
  //             const updatedUser: Update<PersonInterface> = {
  //               id: res._id,
  //               changes: {
  //                 ...res,
  //               },
  //             };

  //             return PersonActions.editPersonSuccess({ person: updatedUser });
  //           })
  //         );
  //     })
  //   );
  // });
}
