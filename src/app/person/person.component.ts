import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { personsSelector, PersonState } from './store/person.reducers';
import * as PersonActions from './store/person.actions';
import { Observable } from 'rxjs';
import { PersonInterface } from './models/person.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from './person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  // Forms
  addPersonForm!: FormGroup;
  editPersonForm!: FormGroup;

  // Person Observables
  persons$!: Observable<PersonInterface[]>;

  //
  personToEditID!: string;
  editClicked = true;

  constructor(
    private store: Store<PersonState>,
    private personService: PersonService
  ) {
    this.persons$ = this.store.select(personsSelector);
  }

  ngOnInit(): void {
    // Person Add Form
    this.addPersonForm = new FormGroup({
      firstname: new FormControl(),
      surname: new FormControl(),
      age: new FormControl(),
    });

    // Person Edit Form
    this.editPersonForm = new FormGroup({
      firstname: new FormControl(),
      surname: new FormControl(),
      age: new FormControl(),
    });

    // Load Countries
    this.store.dispatch(PersonActions.loadPersons());
  }

  onAdd() {
    const addedPerson: PersonInterface = {
      name: this.addPersonForm.value.firstname,
      surname: this.addPersonForm.get('surname')?.value,
      age: this.addPersonForm.get('age')?.value,
      _id: '',
    };

    this.store.dispatch(PersonActions.addPerson(addedPerson));
  }

  onDelete(id: string) {
    this.store.dispatch(PersonActions.deletePerson({ id }));
  }

  onEdit(id: string) {
    this.personToEditID = id;
    this.editClicked = !this.editClicked;
  }

  onSave() {
    const editedPerson: PersonInterface = {
      name: this.editPersonForm.value.firstname,
      surname: this.editPersonForm.value.surname,
      age: this.editPersonForm.value.age,
      _id: this.personToEditID,
    };
    this.store.dispatch(PersonActions.editPerson({ person: editedPerson }));
  }
}
