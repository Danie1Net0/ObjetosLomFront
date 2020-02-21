import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseForm } from '../../../../../../../shared/form/base-form/base-form';
import { ClassificationService } from '../../../../../../../shared/services/learning-object/classification.service';

@Component({
  selector: 'app-classification-tab',
  templateUrl: './classification-tab.component.html',
  styleUrls: ['./classification-tab.component.scss']
})
export class ClassificationTabComponent extends BaseForm implements OnInit {

  private taxons = [];

  constructor(
    private formBuilder: FormBuilder,
    private classificationService: ClassificationService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      purpose: [this.classificationService.classification.purpose],
      source: this.formBuilder.group({
        language: [null, [Validators.required]],
        content: [null, [Validators.required]]
      }),
      taxon: this.formBuilder.group({
        id: [null, [Validators.required]],
        entry: this.formBuilder.group({
          language: [null, [Validators.required]],
          content: [null, [Validators.required]]
        })
      }),
      description: this.formBuilder.group({
        language: [this.classificationService.classification.description.language, [Validators.required]],
        content: [this.classificationService.classification.description.content, [Validators.required]]
      }),
      keyword: [null, [Validators.required]]
    });

    this.formGroup.valueChanges.subscribe(values => {
      this.classificationService.classification.purpose = values.purpose;
      this.classificationService.classification.description = values.description;
    });
  }

  public submit(): void {
  }

  /* Taxons Paths */
  public addTaxonPath(): void {
    const taxonPath = {
      source: this.formGroup.get('source').value,
      taxon: this.taxons
    };
    this.classificationService.classification.taxonPath.push(taxonPath);
    this.taxons = [];

    this.formGroup.patchValue({
      source: {
        language: null,
        content: null
      }
    });
    this.formGroup.markAsPristine();
  }

  public getTaxonPaths(): any[] {
    return this.classificationService.classification.taxonPath;
  }

  public removeTaxonPath(position: number): void {
    this.classificationService.classification.taxonPath.splice(position, 1);
  }

  /* Taxons */
  public addTaxon(): void {
    const taxon = this.formGroup.get('taxon').value;
    this.taxons.push(taxon);

    this.formGroup.patchValue({
      taxon: {
        id: null,
        entry: {
          language: null,
          content: null
        }
      }
    });
    this.formGroup.markAsPristine();
  }

  public getTaxons(): any[] {
    return this.taxons;
  }

  public removeTaxon(position: number): void {
    this.taxons.splice(position, 1);
  }

  /* Keywords */
  public addKeyword(): void {
    const keyword = this.formGroup.get('keyword').value;
    this.classificationService.classification.keyword.push(keyword);

    this.formGroup.patchValue({
      keyword: null
    });
    this.formGroup.markAsPristine();
  }

  public getKeyword(): any[] {
    return this.classificationService.classification.keyword;
  }

  public removeKeyword(position: number): void {
    this.classificationService.classification.keyword.splice(position, 1);
  }

}
