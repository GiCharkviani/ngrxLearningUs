import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { PersonInterface } from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class PersonsService extends EntityCollectionServiceBase<PersonInterface> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Person', serviceElementsFactory);
  }
}
