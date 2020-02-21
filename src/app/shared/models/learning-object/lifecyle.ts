export interface Lifecyle {
  version: {
    language: string;
    content: string;
  };
  status: string;
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
}
