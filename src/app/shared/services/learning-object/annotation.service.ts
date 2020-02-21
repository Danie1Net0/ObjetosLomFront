import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  public annotation = {
    entity: {
      givenName: '',
      lastName: '',
      email: '',
      organization: '',
    },
    date: '',
    description: {
      language: '',
      content: '',
    }
  };

  constructor() { }

}
