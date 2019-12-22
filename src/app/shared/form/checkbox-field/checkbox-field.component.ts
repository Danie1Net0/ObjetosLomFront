import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxFieldComponent),
  multi: true
};

@Component({
  selector: 'app-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class CheckboxFieldComponent implements ControlValueAccessor {

  @Input() status: string;
  @Input() cssClass: any;
  @Input() control: FormControl;
  @Input() controlName: string;

  private _innerValue: any;

  get innerValue(): any {
    return this._innerValue;
  }

  set innerValue(value: any) {
    if (value !== this._innerValue) {
      this._innerValue = value;
      this.onChangeCallback(value);
    }
  }

  constructor() { }

  onChangeCallback: (_: any) => void = () => { };
  onTouchedCallback: (_: any) => void = () => { };

  writeValue(obj: any): void {
    this.innerValue = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

}
