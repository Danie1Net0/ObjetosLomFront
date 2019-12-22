import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbResetPasswordComponent } from '@nebular/auth';
import { Subject } from 'rxjs';

import { ResetPasswordService } from '../../services/reset-password.service';
import { FormValidations } from '../../../shared/form/form-validations';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends NbResetPasswordComponent implements OnInit {

  public message$: Subject<object> = new Subject<object>();
  public loading$: Subject<boolean> = new Subject<boolean>();
  public formGroup: FormGroup;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private activatedRoute: ActivatedRoute,
    private resetPasswordService: ResetPasswordService,
    private formBuilder: FormBuilder
  ) {
    super(service, options, cd, router);
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      password_confirmation: [
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(20), FormValidations.equalsTo('password')]
      ],
      email: [null, [Validators.email]],
      token: [null, [Validators.minLength(40), Validators.maxLength(40)]]
    });

    this.activatedRoute.params
      .subscribe(success => {
        this.resetPasswordService.verifyToken(success.token)
          .subscribe(response => {
            this.formGroup.patchValue({
              email: response.data.email,
              token: response.data.token
            });
          }, error => {
            this.router.navigate(['/auth/login']);
          });
      });
  }

  public resetPass(): void {
    this.loading$.next(true);
    this.onClose();

    if (this.formGroup.valid) {
      this.service.resetPassword(this.strategy, this.formGroup.value)
        .subscribe((result: NbAuthResult) => {
          if (result.isSuccess()) {
            const message = {
              success: true,
              type: 'success',
              content: 'Senha recuperada com sucesso! Clique no link abaixo para realizar o login e acessar o sistema.'
            };

            this.message$.next(message);
            this.loading$.next(false);
          } else {
            const message = {
              success: false,
              type: 'danger',
              content: 'Ocorreu um erro. Por favor, tente novamente.'
            };

            this.message$.next(message);
            this.loading$.next(false);
          }

          this.resetForm();

          this.cd.detectChanges();
        });
    } else {
      this.verifyValidControls(this.formGroup);
    }
  }

  public onClose(): void {
    this.message$ = new Subject<object>();
  }

  private resetForm() {
    this.formGroup.reset();
    this.formGroup.markAsPristine();
  }

  private verifyValidControls(fg: FormGroup | FormArray) {
    Object.keys(fg.controls).forEach((field) => {
      const control = fg.get(field);
      control.markAsDirty();
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.verifyValidControls(control);
      }
    });
  }

  private verifyTouchedField(field: any) {
    if (field instanceof FormControl) {
      return !field.valid && (field.touched || field.dirty);
    }
    const formControl = this.formGroup.get(field);

    return !formControl.valid && (formControl.touched || formControl.dirty);
  }

  public verifyValidField(field: string) {
    const formControl = this.formGroup.get(field);

    return {
      'is-invalid': this.verifyTouchedField(formControl)
    };
  }

}
