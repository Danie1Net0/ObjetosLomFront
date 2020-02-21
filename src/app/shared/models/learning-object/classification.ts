export interface Classification {
  purpose: string;
  taxonPath: [{
    source: {
      language: string;
      content: string;
    };
    taxon: [{
      id: number;
      entry: {
        language: string;
        content: string;
      }
    }];
  }];
  description: {
    language: string;
    content: string;
  };
  keyword: [{
    language: string;
    content: string;
  }];
}
