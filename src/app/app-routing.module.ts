import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
  {path: 'persons', loadChildren: () => import('./persons/persons.module').then(m => m.PersonsModule)},
  {path: 'countries', loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)},
  {path: 'datapersons', loadChildren: () => import('./persons-with-ngrx-data/persons.module').then(m => m.PersonsNgrxDataModule)},
  {path: '**', redirectTo: '/'}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule {}
