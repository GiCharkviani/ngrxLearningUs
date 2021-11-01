import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
  {path: 'persons', loadChildren: () => import('./persons/persons.module').then(m => m.PersonsModule)},
  {path: 'countries', loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)},
  {path: 'entity', loadChildren: () => import('./persons-with-entity/persons.module').then(m => m.PersonsEntityModule)},
  {path: '**', redirectTo: '/'}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule {}
