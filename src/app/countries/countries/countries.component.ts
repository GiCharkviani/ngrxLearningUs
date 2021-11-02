import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CountryModel } from '../country.model';
import { CountryService } from '../store/country.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent implements OnInit {
  countries$!: Observable<CountryModel[]>;
  selectedCountry$!:Observable<CountryModel | undefined>;

  editing:boolean = false;

  countryForms!: FormGroup;

  errorMessage$!: Observable<string>;
  selected:boolean = false;

  constructor(private countryService: CountryService, private router: Router) {
    this.countries$ = countryService.entities$
  }

  ngOnInit(): void {
    //form
    this.countryForms = new FormGroup({
      name: new FormControl('', Validators.required),
      capital: new FormControl('', Validators.required),
    });


    //store
    this.countryService.getAll()

  }

  addForm() {
    const country: CountryModel = {
      _id: '',
      name: this.countryForms.value.name,
      capital: this.countryForms.value.capital,
    };
    this.countryService.add(country)
    this.countryForms.reset();
  }

  delete(event:any,id:string){
    this.countryService.delete(id)
  }

  switchEdit(){
    this.editing = !this.editing
  }

  selectCountry(countryGOt:CountryModel){
    this.selectedCountry$ = this.countryService.collection$.pipe(map(country => country.entities[countryGOt._id]))
  }

  editCountry(editForm: NgForm, id:string){
    const country:CountryModel = {
      _id: id,
      name: editForm.value.countryName,
      capital: editForm.value.capital
    }

    this.countryService.update(country)
    editForm.reset()
  }
}
