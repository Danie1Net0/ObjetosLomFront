import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetaMetadataService {

  public metaMetadata = {
    identifier: [],
    contribute: [],
    metadataSchema: [],
    language: ''
  };

  constructor() { }

}
