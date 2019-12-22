import { FormArray, FormControl, FormGroup } from '@angular/forms';

export abstract class BaseForm {

  private _formGroup: FormGroup;

  constructor() { }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  set formGroup(value: FormGroup) {
    this._formGroup = value;
  }

  abstract submit();

  onSubmit(): void {
    if (this._formGroup.valid) {
      this.submit();
    } else {
      this.verifyValidControls(this._formGroup);
    }
  }

  private verifyValidControls(fg: FormGroup | FormArray): void {
    Object.keys(fg.controls).forEach((field) => {
      const control = fg.get(field);
      control.markAsDirty();
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.verifyValidControls(control);
      }
    });
  }

  verifyTouchedField(field: any): boolean {
    if (field instanceof FormControl) {
      return !field.valid && (field.touched || field.dirty);
    }
    const formControl = this._formGroup.get(field);

    return !formControl.valid && (formControl.touched || formControl.dirty);
  }

  verifyValidField(field: string): {'is-invalid': boolean} {
    const formControl = this._formGroup.get(field);

    return {
      'is-invalid': this.verifyTouchedField(formControl)
    };
  }

  resetForm(): void {
    this._formGroup.reset();
    this._formGroup.markAsPristine();
  }

}
