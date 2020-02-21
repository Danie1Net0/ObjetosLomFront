import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseForm } from '../../../../../../../shared/form/base-form/base-form';
import { LifecyleService } from '../../../../../../../shared/services/learning-object/lifecyle.service';

@Component({
  selector: 'app-lifecycle-tab',
  templateUrl: './lifecycle-tab.component.html',
  styleUrls: ['./lifecycle-tab.component.scss']
})
export class LifecycleTabComponent extends BaseForm implements OnInit {

  private entities = [];
  public maxDateTime: string;
  public statusValue: string;

  constructor(
    private formBuilder: FormBuilder,
    private lifecycleService: LifecyleService
  ) {
    super();

    this.maxDateTime = new Date().toISOString().substr(0, 19);
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      version: this.formBuilder.group({
        language: [this.lifecycleService.lifecycle.version.language, [Validators.required]],
        content: [this.lifecycleService.lifecycle.version.content, [Validators.required]]
      }),
      status: [this.lifecycleService.lifecycle.status, [Validators.required]],
      contribute: this.formBuilder.group({
        role: [null, [Validators.required]],
        date: [null, [Validators.required]],
      }),
      entity: this.formBuilder.group({
        givenName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        organization: [null, [Validators.required]]
      })
    });

    this.formGroup.valueChanges.subscribe(values => {
      this.lifecycleService.lifecycle.version = values.version;
      this.lifecycleService.lifecycle.status = values.status;
      this.statusValue = values.status;
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

  /* Contributers */
  public addContribute(): void {
    const contribute = this.formGroup.get('contribute').value;
    contribute.entity = this.entities;
    this.lifecycleService.lifecycle.contribute.push(contribute);

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
    return this.lifecycleService.lifecycle.contribute;
  }

  public removeContribute(position: number): void {
    this.lifecycleService.lifecycle.contribute.splice(position, 1);
  }

  /* Entyties */
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

}
