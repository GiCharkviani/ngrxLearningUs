import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { PersonModel } from "src/app/persons/person.model";

@Injectable()

export class PersonsEntityFactory extends EntityCollectionServiceBase<PersonModel> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory){
    super('Person', serviceElementsFactory)
  }
}
