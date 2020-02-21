import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LifecyleService {

  public lifecycle = {
    version: {
      language: '',
      content: '',
    },
    status: '',
    contribute: []
  };

  constructor() { }

}
