import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseForm } from '../../../../../../../shared/form/base-form/base-form';
import { GeneralService } from '../../../../../../../shared/services/learning-object/general.service';

@Component({
  selector: 'app-general-tab',
  templateUrl: './general-tab.component.html',
  styleUrls: ['./general-tab.component.scss']
})
export class GeneralTabComponent extends BaseForm implements OnInit {

  public structureValue: string;
  public aggregationLevelValue: string;

  constructor(
    private formBuilder: FormBuilder,
    private generalService: GeneralService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      identifier: this.formBuilder.group({
        catalog: [null, [Validators.required]],
        entry: [null, [Validators.required]]
      }),
      title: this.formBuilder.group({
        language: [this.generalService.general.title.language, [Validators.required]],
        content: [this.generalService.general.title.content, [Validators.required]]
      }),
      language: [null, [Validators.required]],
      description: this.formBuilder.group({
        language: [null, [Validators.required]],
        content: [null, [Validators.required]]
      }),
      keyword: this.formBuilder.group({
        language: [null, [Validators.required]],
        content: [null, [Validators.required]]
      }),
      coverage: this.formBuilder.group({
        language: [null, [Validators.required]],
        content: [null, [Validators.required]]
      }),
      structure: [this.generalService.general.structure, [Validators.required]],
      aggregationLevel: [this.generalService.general.aggregationLevel, [Validators.required]]
    });

    this.formGroup.valueChanges.subscribe(values => {
      this.generalService.general.title = values.title;
      this.generalService.general.structure = values.structure;
      this.generalService.general.aggregationLevel = values.aggregationLevel;
      this.structureValue = values.structure;
      this.aggregationLevelValue = values.aggregationLevel;
    });
  }

  public submit(): void {
  }

  /* Identifiers */
  public addIdentifier(): void {
    const identifier = this.formGroup.get('identifier').value;
    this.generalService.general.identifier.push(identifier);

    this.formGroup.patchValue({
      identifier: {
        catalog: null,
        entry: null
      }
    });
    this.formGroup.markAsPristine();
  }

  public getIdentifiers(): any[] {
    return this.generalService.general.identifier;
  }

  public removeIdentifier(position: number): void {
    this.generalService.general.identifier.splice(position, 1);
  }

  /* Languages */
  public addLanguage(): void {
    const language = this.formGroup.get('language').value;
    this.generalService.general.language.push(language);

    this.formGroup.patchValue({
      language: null
    });
    this.formGroup.markAsPristine();
  }

  public getLanguages(): any[] {
    return this.generalService.general.language;
  }

  public removeLanguage(position: number): void {
    this.generalService.general.language.splice(position, 1);
  }

  /* Keywords */
  public addKeyword(): void {
    const keyword = this.formGroup.get('keyword').value;
    this.generalService.general.keyword.push(keyword);

    this.formGroup.patchValue({
      keyword: {
        language: null,
        content: null
      }
    });
    this.formGroup.markAsPristine();
  }

  public getKeyword(): any[] {
    return this.generalService.general.keyword;
  }

  public removeKeyword(position: number): void {
    this.generalService.general.keyword.splice(position, 1);
  }

  /* Descriptions */
  public addDescription(): void {
    const description = this.formGroup.get('description').value;
    this.generalService.general.description.push(description);

    this.formGroup.patchValue({
      description: {
        language: null,
        content: null
      }
    });
    this.formGroup.markAsPristine();
  }

  public getDescriptions(): any[] {
    return this.generalService.general.description;
  }

  public removeDescription(position: number): void {
    this.generalService.general.description.splice(position, 1);
  }

  /* Coverages */
  public addCoverage(): void {
    const coverage = this.formGroup.get('coverage').value;
    this.generalService.general.coverage.push(coverage);

    this.formGroup.patchValue({
      coverage: {
        language: null,
        content: null
      }
    });
    this.formGroup.markAsPristine();
  }

  public getCoverages(): any[] {
    return this.generalService.general.coverage;
  }

  public removeCoverage(position: number): void {
    this.generalService.general.coverage.splice(position, 1);
  }

}
