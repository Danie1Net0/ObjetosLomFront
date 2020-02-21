import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RightsService {

  public rights = {
    cost: '',
    copyAndOtherRestrictions: '',
    description: {
      language: '',
      content: '',
    }
  };

  constructor() { }

}
