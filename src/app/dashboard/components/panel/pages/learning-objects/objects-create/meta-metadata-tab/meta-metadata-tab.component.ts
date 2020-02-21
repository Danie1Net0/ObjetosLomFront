import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseForm } from '../../../../../../../shared/form/base-form/base-form';
import { MetaMetadataService } from '../../../../../../../shared/services/learning-object/meta-metadata.service';

@Component({
  selector: 'app-meta-metadata-tab',
  templateUrl: './meta-metadata-tab.component.html',
  styleUrls: ['./meta-metadata-tab.component.scss']
})
export class MetaMetadataTabComponent extends BaseForm implements OnInit {

  private entities = [];
  public maxDateTime: string;

  constructor(
    private formBuilder: FormBuilder,
    private metaMetadataService: MetaMetadataService
  ) {
    super();

    this.maxDateTime = new Date().toISOString().substr(0, 19);
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      identifier: this.formBuilder.group({
        catalog: [null, [Validators.required]],
        entry: [null, [Validators.required]]
      }),
      contribute: this.formBuilder.group({
        role: [null, [Validators.required]],
        date: [null, [Validators.required]],
      }),
      entity: this.formBuilder.group({
        givenName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        organization: [null, [Validators.required]]
      }),
      metadataSchema: [null, [Validators.required]],
      language: [this.metaMetadataService.metaMetadata.language, [Validators.required]]
    });

    this.formGroup.valueChanges.subscribe(values => {
      this.metaMetadataService.metaMetadata.language = values.language;
    });
  }

  public submit(): void {
  }

  public getRole(role: string): string {
    switch (role) {
      case 'author':
        return 'Autor';
      case 'validator':
        return 'Validador';
      case 'unknown':
        return 'Desconhecido';
      case 'initiator':
        return 'Idealizador';
      case 'terminator':
        return 'Finalizador';
      case 'publisher':
        return 'Publicador';
      case 'editor':
        return 'Editor';
    }
  }

  public getDateTime(dateTime: string): string {
    const date = new Date(dateTime);

    return `${ date.toLocaleDateString() } - ${ date.toLocaleTimeString() }`;
  }

  public isFormValid(): boolean {
    const contribute = this.formGroup.get('contribute');

    // @ts-ignore
    return contribute.controls.role.status === 'VALID' || contribute.controls.date.status === 'VALID' || this.entities.length > 0;
  }

  /* Identifiers */
  public addIdentifier(): void {
    const identifier = this.formGroup.get('identifier').value;
    this.metaMetadataService.metaMetadata.identifier.push(identifier);

    this.formGroup.patchValue({
      identifier: {
        catalog: null,
        entry: null
      }
    });
    this.formGroup.markAsPristine();
  }

  public getIdentifiers(): any[] {
    return this.metaMetadataService.metaMetadata.identifier;
  }

  public removeIdentifier(position: number): void {
    this.metaMetadataService.metaMetadata.identifier.splice(position, 1);
  }

  /* Contributers */
  public addContribute(): void {
    const contribute = this.formGroup.get('contribute').value;
    contribute.entity = this.entities;
    this.metaMetadataService.metaMetadata.contribute.push(contribute);

    this.formGroup.patchValue({
      contribute: {
        role: null,
        date: null
      }
    });
    this.formGroup.markAsPristine();

    this.entities = [];
  }

  public getContributers(): any[] {
    return this.metaMetadataService.metaMetadata.contribute;
  }

  public removeContribute(position: number): void {
    this.metaMetadataService.metaMetadata.contribute.splice(position, 1);
  }

  /* Entities */
  public addEntity(): void {
    const entity = this.formGroup.get('entity').value;
    this.entities.push(entity);

    this.formGroup.patchValue({
      entity: {
        givenName: null,
        lastName: null,
        email: null,
        organization: null
      }
    });
    this.formGroup.markAsPristine();
  }

  public getEntities(): any[] {
    return this.entities;
  }

  public removeEntity(position: number): void {
    this.entities.splice(position, 1);
  }

  /* MetadataSchemas */
  public addMetadata(): void {
    const metadataSchema = this.formGroup.get('metadataSchema').value;
    this.metaMetadataService.metaMetadata.metadataSchema.push(metadataSchema);

    this.formGroup.patchValue({
      metadataSchema: null
    });
    this.formGroup.markAsPristine();
  }

  public getMetadatas(): any[] {
    return this.metaMetadataService.metaMetadata.metadataSchema;
  }

  public removeMetadata(position: number): void {
    this.metaMetadataService.metaMetadata.metadataSchema.splice(position, 1);
  }

}
