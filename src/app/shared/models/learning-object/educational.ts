export interface Educational {
  interactivityType: string;
  learningResourceType: string[];
  interactivityLevel: string;
  semanticDensity: string;
  intendedEndUserRole: string[];
  context: string[];
  typicalAgeRange: [{
    language: string;
    content: string;
  }];
  difficulty: string;
  typicalLearningTime: {
    years: string;
    months: string;
    days: string;
  };
  description: [{
    language: string;
    content: string;
  }];
  language: string[];
}
