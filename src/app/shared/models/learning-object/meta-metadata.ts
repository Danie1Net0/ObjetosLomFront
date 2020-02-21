export interface MetaMetadata {
  identifier: [{
    catalog: string;
    entry: string;
  }];
  contribute: [{
    role: string;
    entity: [{
      givenName: string;
      lastName: string;
      email: string;
      organization: string;
    }];
    date: Date;
  }];
  metadataSchema: string[];
  language: string;
}
