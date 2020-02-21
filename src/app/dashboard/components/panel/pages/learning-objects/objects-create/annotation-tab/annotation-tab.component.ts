import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { BaseForm } from '../../../../../../../shared/form/base-form/base-form';
import { AnnotationService } from '../../../../../../../shared/services/learning-object/annotation.service';


@Component({
  selector: 'app-annotation-tab',
  templateUrl: './annotation-tab.component.html',
  styleUrls: ['./annotation-tab.component.scss']
})
export class AnnotationTabComponent extends BaseForm implements OnInit {

  public maxDateTime: string;

  constructor(
    private formBuilder: FormBuilder,
    private annotationService: AnnotationService
  ) {
    super();

    this.maxDateTime = new Date().toISOString().substr(0, 19);
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      entity: this.formBuilder.group({
        givenName: [this.annotationService.annotation.entity.givenName],
        lastName: [this.annotationService.annotation.entity.lastName],
        email: [this.annotationService.annotation.entity.email],
        organization: [this.annotationService.annotation.entity.organization]
      }),
      date: [this.annotationService.annotation.date],
      description: this.formBuilder.group({
        language: [this.annotationService.annotation.description.language],
        content: [this.annotationService.annotation.description.content]
      })
    });

    this.formGroup.valueChanges.subscribe(values => {
      this.annotationService.annotation.entity = values.entity;
      this.annotationService.annotation.date = values.date;
      this.annotationService.annotation.description = values.description;
    })
  }

  public submit(): void {
  }

}
