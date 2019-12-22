import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbRequestPasswordComponent } from '@nebular/auth';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-request-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends NbRequestPasswordComponent implements OnInit {

  public message$: Subject<object> = new Subject<object>();
  public loading$: Subject<boolean> = new Subject<boolean>();
  public formGroup: FormGroup;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private formBuilder: FormBuilder
  ) {
    super(service, options, cd, router);
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  public requestPass(): void {
    this.loading$.next(true);
    this.onClose();

    if (this.formGroup.valid) {
      this.service.requestPassword(this.strategy, this.formGroup.value).subscribe(
        (result: NbAuthResult) => {
          if (result.isSuccess()) {
            this.resetForm();

            const message = {
              success: true,
              type: 'success',
              content: 'Recuperação de senha enviada com sucesso!'
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

          const redirect = result.getRedirect();
          if (redirect) {
            setTimeout(() => {
              return this.router.navigateByUrl(redirect);
            }, this.redirectDelay);
          }
          this.cd.detectChanges();
        });
    } else {
      this.verifyValidControls(this.formGroup);
    }
  }

  public onClose(): void {
    this.message$ = new Subject<object>();
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

  private resetForm() {
    this.formGroup.reset();
    this.formGroup.markAsPristine();
  }

}
