import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { PersonModel } from "../person.model";
import * as PersonsActions from './persons.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";


export interface PersonEntityState extends EntityState<PersonModel> {}

export function selectPersonId(a: PersonModel): string {
  return a._id;
}

export const personsAdapter: EntityAdapter<PersonModel> = createEntityAdapter<PersonModel>({
  selectId: selectPersonId,
})

export const initialState: PersonEntityState = personsAdapter.getInitialState()

//selectors
export const personsSelector = personsAdapter.getSelectors()

const personsState = createFeatureSelector<PersonEntityState>('persons');


export const getPersons = createSelector(
  personsState,
  personsSelector.selectAll
)

export const getCount = createSelector(
  personsState,
  personsSelector.selectTotal
)


//reducer
export const PersonsReducerEntity = createReducer(
  initialState,
  on(PersonsActions.successLoadingPersons, (state, action) => {
    return personsAdapter.setAll(action.persons, state)
  }),
  on(PersonsActions.successAddingPerson, (state, action) => {
    return personsAdapter.addOne(action.person, state)
  }),
  on(PersonsActions.successUpdatingPerson, (state, action) => {
    return personsAdapter.updateOne(action.person, state)
  }),
  on(PersonsActions.successDeletingPerson, (state, action) => {
    return personsAdapter.removeOne(action.id, state)
  }),
)
