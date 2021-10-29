import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PersonModel } from '../person.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonsEntityFactory } from '../store/persons-data.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonsComponent implements OnInit {
  persons$!: Observable<PersonModel[]>;
  addPersonForm!: FormGroup;
  selectedPerson$!: Observable<PersonModel | undefined>;
  editMode:boolean = false;
  errorMessage$!: Observable<string>;

  constructor(private store: PersonsEntityFactory) { }

  ngOnInit(): void {
    this.addPersonForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      age: new FormControl(null, Validators.required)
    })

    this.store.entities$.subscribe(console.log)

  }

  addPerson(){
    const person = {
      _id: '',
      name: this.addPersonForm.value.name,
      surname: this.addPersonForm.value.surname,
      age: this.addPersonForm.value.age
    }

    this.addPersonForm.reset()
  }


  editing(person: PersonModel){
    this.editMode = false;

  }


  updatePerson(_id:string, name: string, surname: string, age: number, form:HTMLFormElement){
    const updatedPerson = {
      _id,
      name,
      surname,
      age
    }
    form.reset()
    this.editMode = true;

  }

  deletePerson(id:string){

  }
}
