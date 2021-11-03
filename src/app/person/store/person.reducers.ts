import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { PersonInterface } from '../models/person.model';
import * as PersonActions from './person.actions';

export interface PersonState extends EntityState<PersonInterface> {}

export const PersonAdapter: EntityAdapter<PersonInterface> =
  createEntityAdapter({
    selectId: (person: PersonInterface) => person._id,
  });

const initialState = PersonAdapter.getInitialState({});

// Selectors
const personSelectors = PersonAdapter.getSelectors();

export const getPersonsFeatureState =
  createFeatureSelector<PersonState>('persons');

export const personsSelector = createSelector(
  getPersonsFeatureState,
  personSelectors.selectAll
);

// Reducer
export const personReducer = createReducer<PersonState>(
  initialState,
  on(PersonActions.loadPersonsSuccess, (state, action) => {
    return PersonAdapter.setAll(action.persons, state);
  }),
  on(PersonActions.addPersonSuccess, (state, action) => {
    return PersonAdapter.addOne(action.person, state);
  }),
  on(PersonActions.deletePersonSuccess, (state, action) => {
    return PersonAdapter.removeOne(action.id, state);
  })
);
