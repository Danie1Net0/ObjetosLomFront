import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseForm } from '../../../../../../../shared/form/base-form/base-form';
import { EducationalService } from '../../../../../../../shared/services/learning-object/educational.service';

@Component({
  selector: 'app-educational-tab',
  templateUrl: './educational-tab.component.html',
  styleUrls: ['./educational-tab.component.scss']
})
export class EducationalTabComponent extends BaseForm implements OnInit {

  public interactivityTypeValue: string;
  public interactivityLevelValue: string;
  public semanticDensityValue: string;
  public difficultyValue: string;

  constructor(
    private formBuilder: FormBuilder,
    private educationalService: EducationalService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      interactivityType: [this.educationalService.educational.interactivityType, [Validators.required]],
      learningResourceType: [null, [Validators.required]],
      interactivityLevel: [this.educationalService.educational.interactivityLevel, [Validators.required]],
      semanticDensity: [this.educationalService.educational.semanticDensity, [Validators.required]],
      intendedEndUserRole: [null, [Validators.required]],
      context: [null, [Validators.required]],
      typicalAgeRange: this.formBuilder.group({
        language: [null, [Validators.required]],
        content: [null, [Validators.required]]
      }),
      difficulty: [this.educationalService.educational.difficulty, [Validators.required]],
      typicalLearningTime: this.formBuilder.group({
        years: [this.educationalService.educational.typicalLearningTime.years, [Validators.required]],
        months: [this.educationalService.educational.typicalLearningTime.months, [Validators.required]],
        days: [this.educationalService.educational.typicalLearningTime.days, [Validators.required]]
      }),
      description: this.formBuilder.group({
        language: [null, [Validators.required]],
        content: [null, [Validators.required]]
      }),
      language: [null, [Validators.required]],
    });

    this.formGroup.valueChanges.subscribe(values => {
      this.educationalService.educational.interactivityType = values.interactivityType;
      this.interactivityTypeValue = values.interactivityType;
      this.educationalService.educational.interactivityLevel = values.interactivityLevel;
      this.interactivityLevelValue = values.interactivityLevel;
      this.educationalService.educational.semanticDensity = values.semanticDensity;
      this.semanticDensityValue = values.semanticDensity;
      this.educationalService.educational.difficulty = values.difficulty;
      this.difficultyValue = values.difficulty;
      this.educationalService.educational.typicalLearningTime = values.typicalLearningTime;
    });
  }

  public submit(): void {
  }

  public getLearningResourceType(learningResourceType: string): string {
    switch (learningResourceType) {
      case 'exercice': return 'Exercício';
      case 'simulation': return 'Simulação';
      case 'questionnaire': return 'Questionário';
      case 'diagram': return 'Diagrama';
      case 'figure': return 'Figura';
      case 'graph': return 'Gráfico';
      case 'index': return 'Índice';
      case 'slide': return 'Slide';
      case 'table': return 'Tabela';
      case 'narrative text': return 'Texto Narrativo';
      case 'exam': return 'Exame';
      case 'experiment': return 'Experiência';
      case 'problem statement': return 'Declaração de Problema';
      case 'self assessment': return 'Auto-avaliação';
      case 'lecture': return 'Leitura';
    }
  }

  public getIntendedEndUserRole(intendedEndUserRole: string): string {
    switch (intendedEndUserRole) {
      case 'author': return 'Autor';
      case 'teacher': return 'Professor';
      case 'learner': return 'Aluno';
      case 'manager': return 'Gerente';
    }
  }

  public getContext(context: string): string {
    switch (context) {
      case 'school': return 'Escolar';
      case 'higher education': return 'Ensino Superior';
      case 'training': return 'Treinamento';
      case 'other': return 'Outros';
    }
  }

  /* Learning Resource Types */
  public addLearningResourceType(): void {
    const learningResourceType = this.formGroup.get('learningResourceType').value;
    this.educationalService.educational.learningResourceType.push(learningResourceType);

    this.formGroup.patchValue({
      learningResourceType: null
    });
    this.formGroup.markAsPristine();
  }

  public getLearningResourceTypes(): any[] {
    return this.educationalService.educational.learningResourceType;
  }

  public removeLearningResourceType(position: number): void {
    this.educationalService.educational.learningResourceType.splice(position, 1);
  }

  /* Intended End User Roles */
  public addIntendedEndUserRole(): void {
    const intendedEndUserRole = this.formGroup.get('intendedEndUserRole').value;
    this.educationalService.educational.intendedEndUserRole.push(intendedEndUserRole);

    this.formGroup.patchValue({
      intendedEndUserRole: null
    });
    this.formGroup.markAsPristine();
  }

  public getIntendedEndUserRoles(): any[] {
    return this.educationalService.educational.intendedEndUserRole;
  }

  public removeIntendedEndUserRole(position: number): void {
    this.educationalService.educational.intendedEndUserRole.splice(position, 1);
  }

  /* Contexts */
  public addContext(): void {
    const context = this.formGroup.get('context').value;
    this.educationalService.educational.context.push(context);

    this.formGroup.patchValue({
      context: null
    });
    this.formGroup.markAsPristine();
  }

  public getContexts(): any[] {
    return this.educationalService.educational.context;
  }

  public removeContext(position: number): void {
    this.educationalService.educational.context.splice(position, 1);
  }

  /* TypicalAgeRanges */
  public addTypicalAgeRange(): void {
    const typicalAgeRange = this.formGroup.get('typicalAgeRange').value;
    this.educationalService.educational.typicalAgeRange.push(typicalAgeRange);

    this.formGroup.patchValue({
      typicalAgeRange: {
        language: null,
        content: null,
      }
    });
    this.formGroup.markAsPristine();
  }

  public getTypicalAgeRanges(): any[] {
    return this.educationalService.educational.typicalAgeRange;
  }

  public removeTypicalAgeRange(position: number): void {
    this.educationalService.educational.typicalAgeRange.splice(position, 1);
  }

  /* Descriptions */
  public addDescription(): void {
    const description = this.formGroup.get('description').value;
    this.educationalService.educational.description.push(description);

    this.formGroup.patchValue({
      description: {
        language: null,
        content: null,
      }
    });
    this.formGroup.markAsPristine();
  }

  public getDescriptions(): any[] {
    return this.educationalService.educational.description;
  }

  public removeDescription(position: number): void {
    this.educationalService.educational.description.splice(position, 1);
  }

  /* Languages */
  public addLanguage(): void {
    const language = this.formGroup.get('language').value;
    this.educationalService.educational.language.push(language);

    this.formGroup.patchValue({
      language: null
    });
    this.formGroup.markAsPristine();
  }

  public getLanguages(): any[] {
    return this.educationalService.educational.language;
  }

  public removeLanguage(position: number): void {
    this.educationalService.educational.language.splice(position, 1);
  }

}
