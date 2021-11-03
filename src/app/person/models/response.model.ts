import { PersonInterface } from './person.model';

export interface PostResponseInterface {
  message: string;
  person: PersonInterface;
}

export interface GetResponseInterface {
  message: string;
  persons: PersonInterface[];
}

export interface DeleteResponseInterface {
  message: string;
  deletedUser: PersonInterface;
}
