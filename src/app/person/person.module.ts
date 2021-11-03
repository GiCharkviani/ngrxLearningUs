import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';
import { PersonInterface } from './models/person.model';
import { DefaultPersonsService } from './store/default-persons.service';

const entityMetadata: EntityMetadataMap = {
  Person: {
    selectId: (person: PersonInterface) => person._id,
  },
};

@NgModule({
  declarations: [PersonComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PersonRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [DefaultPersonsService],
})
export class PersonModule {
  constructor(
    eds: EntityDefinitionService,
    defaultPersonsService: DefaultPersonsService,
    entityDataService: EntityDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Person', defaultPersonsService);
  }
}
