export interface Annotation {
  entity: {
    givenName: string;
    lastName: string;
    email: string;
    organization: string;
  };
  date: Date;
  description: {
    language: string;
    content: string;
  };
}
