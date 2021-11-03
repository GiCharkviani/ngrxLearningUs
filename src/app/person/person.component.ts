import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { PersonInterface } from './models/person.model';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonsService } from './store/persons.service';
import { exhaustMap, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit, AfterViewInit {
  // Forms
  addPersonForm!: FormGroup;
  editPersonForm!: FormGroup;

  selectedPerson$!: Observable<PersonInterface | undefined> | undefined;

  // Person Observables
  persons$!: Observable<PersonInterface[]>;

  //
  personToEditID!: string;

  @ViewChild('addBtn') addBtn!: ElementRef;

  constructor(private personsService: PersonsService) {
    this.persons$ = personsService.entities$;
  }

  ngOnInit(): void {
    this.personsService.loaded$.subscribe((res) => {
      if (!res) {
        this.personsService.getAll();
      }
    });

    // Person Add Form
    this.addPersonForm = new FormGroup({
      firstname: new FormControl(),
      surname: new FormControl(),
      age: new FormControl(),
    });
  }

  ngAfterViewInit() {
    fromEvent(this.addBtn.nativeElement, 'click')
      .pipe(
        exhaustMap(() => {
          const addedPerson: PersonInterface = {
            name: this.addPersonForm.value.firstname,
            surname: this.addPersonForm.get('surname')?.value,
            age: this.addPersonForm.get('age')?.value,
            _id: '',
          };

          this.addPersonForm.reset();
          return this.personsService.add(addedPerson);
        })
      )
      .subscribe();
  }

  onAdd(btnEl: HTMLButtonElement) {}

  onDelete(id: string) {
    this.personsService.delete(id);
  }

  onEdit(id: string) {
    this.selectedPerson$ = this.personsService.collection$.pipe(
      map((person) => person.entities[id])
    );
  }

  onSave() {
    const editedPerson: PersonInterface = {
      name: this.editPersonForm.value.firstname,
      surname: this.editPersonForm.value.surname,
      age: this.editPersonForm.value.age,
      _id: this.personToEditID,
    };

    this.personsService.update(editedPerson);
  }
}
