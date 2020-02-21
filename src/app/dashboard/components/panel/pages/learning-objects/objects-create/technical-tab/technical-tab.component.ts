import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseForm } from '../../../../../../../shared/form/base-form/base-form';
import { TechnicalService } from '../../../../../../../shared/services/learning-object/technical.service';

@Component({
  selector: 'app-technical-tab',
  templateUrl: './technical-tab.component.html',
  styleUrls: ['./technical-tab.component.scss']
})
export class TechnicalTabComponent extends BaseForm implements OnInit {

  public maxDateTime: string;
  private requirements = this.technicalsService.technical.requeriment;
  private compositions = [];

  constructor(
    private formBuilder: FormBuilder,
    private technicalsService: TechnicalService
  ) {
    super();

    this.maxDateTime = new Date().toISOString().substr(0, 19);
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      format: [null, [Validators.required]],
      size: [this.technicalsService.technical.size, [Validators.required]],
      location: [null, [Validators.required]],
      orComposite: this.formBuilder.group({
        type: [null, [Validators.required]],
        name: [null, [Validators.required]],
        minimumVersion: [null, [Validators.required]],
        maximumVersion: [null, [Validators.required]]
      }),
      installationRemarks: this.formBuilder.group({
        language: [this.technicalsService.technical.otherPlatformRequeriments.language, [Validators.required]],
        content: [this.technicalsService.technical.otherPlatformRequeriments.content, [Validators.required]]
      }),
      otherPlatformRequeriments: this.formBuilder.group({
        language: [this.technicalsService.technical.installationRemarks.language, [Validators.required]],
        content: [this.technicalsService.technical.installationRemarks.content, [Validators.required]]
      }),
      duration: [this.technicalsService.technical.duration, [Validators.required]],
    });

    this.formGroup.valueChanges.subscribe(values => {
      this.technicalsService.technical.size = values.size;
      this.technicalsService.technical.duration = values.duration;
      this.technicalsService.technical.installationRemarks = values.installationRemarks;
      this.technicalsService.technical.otherPlatformRequeriments = values.otherPlatformRequeriments;
    });
  }

  public submit(): void {
  }

  public getCompositeType(type: string): string {
    switch (type) {
      case 'operating-system':
        return 'Sistema Operacional';
      case 'browser':
        return 'Navegador Web';
    }
  }

  /* Formats */
  public addFormat(): void {
    const format = this.formGroup.get('format').value;
    this.technicalsService.technical.format.push(format);

    this.formGroup.patchValue({
      format: null
    });
    this.formGroup.markAsPristine();
  }

  public getFormats(): any[] {
    return this.technicalsService.technical.format;
  }

  public removeFormat(position: number): void {
    this.technicalsService.technical.format.splice(position, 1);
  }

  /* Locations */
  public addLocation(): void {
    const location = this.formGroup.get('location').value;
    this.technicalsService.technical.location.push(location);

    this.formGroup.patchValue({
      location: null
    });
    this.formGroup.markAsPristine();
  }

  public getLocations(): any[] {
    return this.technicalsService.technical.location;
  }

  public removeLocation(position: number): void {
    this.technicalsService.technical.location.splice(position, 1);
  }

  /* Requirements */
  public addRequirement(): void {
    this.requirements.push(this.compositions);
    this.compositions = [];
  }

  public getRequirements(): any[] {
    return this.requirements;
  }

  public removeRequirement(position: number): void {
    this.requirements.splice(position, 1);
  }

  /* Compositions */
  public addComposite(): void {
    const composite = this.formGroup.get('orComposite').value;
    this.compositions.push(composite);

    this.formGroup.patchValue({
      orComposite: {
        type: null,
        name: null,
        minimumVersion: null,
        maximumVersion: null
      }
    });
    this.formGroup.markAsPristine();
  }

  public getCompositions(): any[] {
    return this.compositions;
  }

  public removeComposite(position: number): void {
    this.compositions.splice(position, 1);
  }

}
