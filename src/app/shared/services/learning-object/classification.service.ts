import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  public classification = {
    purpose: '',
    taxonPath: [],
    description: {
      language: '',
      content: '',
    },
    keyword: []
  };

  constructor() { }

}
