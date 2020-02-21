import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseForm } from '../../../../../../../shared/form/base-form/base-form';
import { RelationService } from '../../../../../../../shared/services/learning-object/relation.service';

@Component({
  selector: 'app-relation-tab',
  templateUrl: './relation-tab.component.html',
  styleUrls: ['./relation-tab.component.scss']
})
export class RelationTabComponent extends BaseForm implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private relationService: RelationService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      kind: [this.relationService.relation.kind, [Validators.required]],
      identifier: this.formBuilder.group({
        catalog: [null, [Validators.required]],
        entry: [null, [Validators.required]]
      }),
      description: this.formBuilder.group({
        language: [null, [Validators.required]],
        content: [null, [Validators.required]]
      })
    });

    this.formGroup.valueChanges.subscribe(values => {
      this.relationService.relation.kind = values.kind;
    });
  }

  public submit(): void {
  }

  /* Identifiers */
  public addIdentifier(): void {
    const identifier = this.formGroup.get('identifier').value;
    this.relationService.relation.resource.identifier.push(identifier);

    this.formGroup.patchValue({
      identifier: {
        catalog: null,
        entry: null,
      }
    });
    this.formGroup.markAsPristine();
  }

  public getIdentifiers(): any[] {
    return this.relationService.relation.resource.identifier;
  }

  public removeIdentifier(position: number): void {
    this.relationService.relation.resource.identifier.splice(position, 1);
  }

  /* Descriptions */
  public addDescription(): void {
    const description = this.formGroup.get('description').value;
    this.relationService.relation.resource.description.push(description);

    this.formGroup.patchValue({
      description: {
        language: null,
        content: null,
      }
    });
    this.formGroup.markAsPristine();
  }

  public getDescriptions(): any[] {
    return this.relationService.relation.resource.description;
  }

  public removeDescription(position: number): void {
    this.relationService.relation.resource.description.splice(position, 1);
  }

}
