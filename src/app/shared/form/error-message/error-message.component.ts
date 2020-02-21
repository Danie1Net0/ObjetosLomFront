import { Component, Input } from '@angular/core';

import { FormValidations } from '../form-validations';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {

  @Input() control: FormControl;
  @Input() fieldName: string;

  constructor() { }

  get errorMessage() {
    if (this.control) {
      for (const controlName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(controlName) && (this.control.touched || this.control.dirty)) {
          return FormValidations.getErrorMessage(this.fieldName, controlName, this.control.errors[controlName]);
        }
      }
    }

    return null;
  }

}
