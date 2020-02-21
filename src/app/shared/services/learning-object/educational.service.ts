import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EducationalService {

  public educational = {
    interactivityType: '',
    learningResourceType: [],
    interactivityLevel: '',
    semanticDensity: '',
    intendedEndUserRole: [],
    context: [],
    typicalAgeRange: [],
    difficulty: '',
    typicalLearningTime: {
      years: '',
      months: '',
      days: ''
    },
    description: [],
    language: []
  };

  constructor() { }

}
