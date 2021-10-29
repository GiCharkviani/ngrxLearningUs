import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsComponent } from './persons/persons.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { PersonsEntityFactory } from './store/persons-data.service';
import { PersonsResolver } from './store/persons.resolver';

const entityMetadata: EntityMetadataMap = {
  persons: {}
}

@NgModule({
  declarations: [
    PersonsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: PersonsComponent, resolve: { persons: PersonsResolver }}]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    DragDropModule,
  ],
  exports: [RouterModule],
  providers:[PersonsEntityFactory, PersonsResolver]
})
export class PersonsNgrxDataModule {

  constructor(private eds: EntityDefinitionService){

    eds.registerMetadataMap(entityMetadata)

  }

}
