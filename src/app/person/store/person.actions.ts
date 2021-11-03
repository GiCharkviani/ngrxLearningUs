import { createAction, props } from '@ngrx/store';
import { PersonInterface } from '../models/person.model';

// Load Persons Data
export const loadPersons = createAction('[Person Page] Load Persons');

export const loadPersonsSuccess = createAction(
  '[Person Page] Load Persons Success',
  props<{ persons: PersonInterface[] }>()
);

// Add Person
export const addPerson = createAction(
  '[Person Page] Add Person',
  props<PersonInterface>()
);

export const addPersonSuccess = createAction(
  '[Person Page] Add Person Success',
  props<{ person: PersonInterface }>()
);

// Delete Person
export const deletePerson = createAction(
  '[Person Page] Delete Person',
  props<{ id: string }>()
);

export const deletePersonSuccess = createAction(
  '[Person Page] Delete Person Success',
  props<{ id: string }>()
);

// Edit Person
export const editPerson = createAction(
  '[Person Page] Edit Person',
  props<{ person: PersonInterface }>()
);

export const editPersonSuccess = createAction(
  '[Person Page] Edit Person Success',
  props<{ person: PersonInterface }>()
);
