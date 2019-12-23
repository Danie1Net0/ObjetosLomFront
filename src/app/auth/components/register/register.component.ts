import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { BaseForm } from '../../../shared/form/base-form/base-form';
import { FormValidations } from '../../../shared/form/form-validations';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseForm implements OnInit {

  public message$: Subject<object> = new Subject<object>();
  public loading$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      lastName: [],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      password_confirmation: [null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(20), FormValidations.equalsTo('password')]
      ],
      institution: [null, [Validators.required]]
    });
  }

  public submit(): void {
    this.loading$.next(true);
    this.onClose();

    const user: User = this.formGroup.value;

    this.userService.save(user)
      .subscribe(success => {
        const message = {
          success: true,
          type: 'success',
          content: 'Cadastro realizado com sucesso! Aguarde a resposta de aprovação no seu e-mail.'
        };

        this.resetForm();
        this.message$.next(message);
      }, error => {
        const message = {
          success: false,
          type: 'danger',
          content: 'Ocorreu um erro inesperado, por favor tente novamente.'
        };

        if (error.error.meta.message === 'Esse endereço de e-mail já se encontra em uso.') {
          message.type = 'warning';
          message.content = 'O e-mail informado já está em uso.';
        }

        this.message$.next(message);
        this.loading$.next(false);
      }, () => {
        this.loading$.next(false);
      });
  }

  public onClose(): void {
    this.message$ = new Subject<object>();
  }

}
