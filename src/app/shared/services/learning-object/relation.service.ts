import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelationService {

  public relation = {
    kind: '',
    resource: {
      identifier: [],
      description: [],
    }
  };

  constructor() { }

}
