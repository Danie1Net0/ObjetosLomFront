import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public general = {
    identifier: [],
    title: {
      language: '',
      content: ''
    },
    language: [],
    description: [],
    keyword: [],
    coverage: [],
    structure: '',
    aggregationLevel: ''
  };

  constructor() { }

}
