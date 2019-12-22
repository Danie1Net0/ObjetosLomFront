import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextAreaFieldComponent),
  multi: true
};

@Component({
  selector: 'app-textarea-field',
  templateUrl: './text-area-field.component.html',
  styleUrls: ['./text-area-field.component.css'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class TextAreaFieldComponent implements ControlValueAccessor {

  @Input() cssClass: any;
  @Input() id: string;
  @Input() label: string;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() control: FormControl;
  @Input() controlName: string;
  @Input() isReadOnly: boolean;
  @Input() cols: number;
  @Input() rows: number;
  @Input() shape: string;
  @Input() status: string;

  private _innerValue: any;

  get innerValue(): any {
    return this._innerValue;
  }

  set innerValue(value: any) {
    if (value !== this._innerValue){
      this._innerValue = value;
      this.onChangeCallback(value);
    }
  }

  constructor() {
    this.type = 'text';
    this.placeholder = '';
    this.isReadOnly = false;
    this.cols = 80;
    this.rows = 3;
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
