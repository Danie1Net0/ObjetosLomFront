import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
};

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputFieldComponent implements ControlValueAccessor {

  @Input() type: string;
  @Input() cssClass: any;
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() control: FormControl;
  @Input() controlName: string;
  @Input() isReadOnly: boolean;
  @Input() shape: string;
  @Input() status: string;
  @Input() fieldSize: string;
  @Input() min: any;
  @Input() max: any;

  private privateInnerValue: any;

  get innerValue(): any {
    return this.privateInnerValue;
    this.min = null;
    this.max = null;
  }

  set innerValue(value: any) {
    if (value !== this.privateInnerValue) {
      this.privateInnerValue = value;
      this.onChangeCallback(value);
    }
  }

  constructor() {
    this.type = 'text';
    this.placeholder = '';
    this.isReadOnly = false;
    this.shape = 'rectangle';
    this.status = '';
    this.fieldSize = 'medium';
  }

  onChangeCallback: (_: any) => void = () => {};
  onTouchedCallback: (_: any) => void = () => {};

  writeValue(obj: any): void {
    this.innerValue = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

}
