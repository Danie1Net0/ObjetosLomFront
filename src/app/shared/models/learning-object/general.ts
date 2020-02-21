export class General {
  identifier: [{
    catalog: string;
    entry: string;
  }];
  title: {
    language: string;
    content: string;
  };
  language: string[];
  description: [{
    language: string;
    content: string;
  }];
  keyword: [{
    language: string;
    content: string;
  }];
  coverage: [{
    language: string;
    content: string;
  }];
  structure: string;
  aggregationLevel: string;
}
