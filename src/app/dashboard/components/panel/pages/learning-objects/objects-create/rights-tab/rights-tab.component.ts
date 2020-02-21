import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseForm } from '../../../../../../../shared/form/base-form/base-form';
import { RightsService } from '../../../../../../../shared/services/learning-object/rights.service';

@Component({
  selector: 'app-rights-tab',
  templateUrl: './rights-tab.component.html',
  styleUrls: ['./rights-tab.component.scss']
})
export class RightsTabComponent extends BaseForm implements OnInit {

  public costValue: string;
  public copyAndOtherRestrictionsValue: string;

  constructor(
    private formBuilder: FormBuilder,
    private rightsService: RightsService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      cost: [this.rightsService.rights.cost, [Validators.required]],
      copyAndOtherRestrictions: [this.rightsService.rights.copyAndOtherRestrictions, [Validators.required]],
      description: this.formBuilder.group({
        language: [this.rightsService.rights.description.language, [Validators.required]],
        content: [this.rightsService.rights.description.content, [Validators.required]]
      })
    });

    this.formGroup.valueChanges.subscribe(values => {
      this.rightsService.rights.cost = values.cost;
      this.costValue = values.cost;
      this.rightsService.rights.copyAndOtherRestrictions = values.copyAndOtherRestrictions;
      this.copyAndOtherRestrictionsValue = values.copyAndOtherRestrictions;
      this.rightsService.rights.description = values.description;
    });
  }

  public submit(): void {
  }

}
