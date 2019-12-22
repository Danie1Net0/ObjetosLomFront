import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NB_AUTH_OPTIONS, NbAuthResult, NbAuthService, NbLoginComponent } from '@nebular/auth';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent implements OnInit {

  public message$: Subject<object> = new Subject<object>();
  public loading$: Subject<boolean> = new Subject<boolean>();
  public formGroup: FormGroup;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private formBuilder: FormBuilder,
    private authService: NbAuthService
  ) {
    super(service, options, cd, router);
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      rememberMe: [false]
    });
  }

  public login(): void {
    this.loading$.next(true);
    this.onClose();

    if (this.formGroup.valid) {
      this.service.authenticate(this.strategy, this.formGroup.value)
        .subscribe((result: NbAuthResult) => {
          if (result.isSuccess()) {
            this.getUserPayload();
            this.resetForm();

            const redirect = result.getRedirect();
            if (redirect) {
              setTimeout(() => {
                return this.router.navigateByUrl(redirect);
              }, this.redirectDelay);
            }
            this.cd.detectChanges();
          } else {
            const message = {
              success: false,
              type: 'danger',
              content: 'E-mail ou senha inválidos!'
            };

            this.message$.next(message);
            this.loading$.next(false);
          }
        });
    } else {
      this.verifyValidControls(this.formGroup);
    }
  }

  public onClose(): void {
    this.message$ = new Subject<object>();
  }

  private getUserPayload(): void {
    this.authService.onTokenChange()
      .subscribe((token: any) => {
        if (token.isValid()) {
          window.localStorage.setItem('user', JSON.stringify(token.payload.user));
        }
      });
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

  private resetForm(): void {
    this.formGroup.reset();
    this.formGroup.markAsPristine();
  }

}
