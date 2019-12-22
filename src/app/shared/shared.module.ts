import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
  NbSpinnerModule,
  NbUserModule
} from '@nebular/theme';

import { ErrorMessageComponent } from './form/error-message/error-message.component';
import { InputFieldComponent } from './form/input-field/input-field.component';
import { CheckboxFieldComponent } from './form/checkbox-field/checkbox-field.component';
import { TextAreaFieldComponent } from './form/text-area-field/text-area-field.component';

@NgModule({
  declarations: [
    ErrorMessageComponent,
    InputFieldComponent,
    TextAreaFieldComponent,
    CheckboxFieldComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbCardModule,
    NbListModule,
    NbSpinnerModule,
    NbUserModule,
    NbIconModule,
    NbSelectModule
  ],
  exports: [
    ErrorMessageComponent,
    InputFieldComponent,
    TextAreaFieldComponent,
    CheckboxFieldComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbCardModule,
    NbListModule,
    NbSpinnerModule,
    NbUserModule,
    NbIconModule,
    NbSelectModule
  ]
})
export class SharedModule { }
