export interface Relation {
  kind: string;
  resource: {
    identifier: [{
      catalog: string;
      entry: string;
    }];
    description: [{
      language: string;
      content: string;
    }];
  };
}
