import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries/countries.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CountriesReducer } from './store/country.reducer';



@NgModule({
  declarations: [
    CountriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: CountriesComponent}]),
    StoreModule.forRoot({
      countries: CountriesReducer
    })
  ],
  exports: [RouterModule]
})
export class CountriesModule { }
