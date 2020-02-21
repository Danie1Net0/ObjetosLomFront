import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TechnicalService {

  public technical = {
    format: [],
    size: null,
    location: [],
    requeriment: [],
    installationRemarks: {
      language: '',
      content: '',
    },
    otherPlatformRequeriments: {
      language: '',
      content: '',
    },
    duration: ''
  };

  constructor() { }

}
