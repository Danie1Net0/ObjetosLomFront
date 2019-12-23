import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { BaseForm } from '../../../../../../shared/form/base-form/base-form';
import { User } from '../../../../../../shared/models/user';
import { UserService } from '../../../../../../shared/services/user.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent extends BaseForm implements OnInit {

  public message$: Subject<object> = new Subject<object>();
  public loading$: Subject<boolean> = new Subject<boolean>();
  private user: User;
  private originalRole: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usersService: UserService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data.user;
    this.originalRole = this.user.role;

    this.formGroup = this.formBuilder.group({
      id: [this.user._id],
      name: [this.user.name],
      lastName: [this.user.lastName],
      email: [this.user.email],
      institution: [this.user.institution],
      role: [this.user.role, [Validators.required]]
    });
  }

  public submit(): void {
    if (this.originalRole !== this.formGroup.controls.role.value) {
      Swal.fire({
        title: 'Alterar função do usuário',
        text: 'Essa ação poderá afetar a integridade do sistema. Quer mesmo alterar a função desse usuário?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.loading$.next(true);
          this.onClose();

          const user: User = this.formGroup.value;
          this.originalRole = user.role;

          this.usersService.save(user)
            .subscribe(success => {
              const message = {
                success: true,
                type: 'success',
                content: 'Usuário atualizado com succeso!'
              };

              this.message$.next(message);
            }, error => {
              const message = {
                success: false,
                type: 'warning',
                content: 'Erro ao atualizar usuário. Por favor, tente novamente.'
              };

              this.message$.next(message);
              this.loading$.next(false);
            }, () => {
              this.loading$.next(false);
            });
        }
      });
    } else {
      this.loading$.next(true);

      const message = {
        success: true,
        type: 'success',
        content: 'Usuário atualizado com succeso!'
      };

      this.message$.next(message);
      this.loading$.next(false);
    }
  }

  public onClose(): void {
    this.message$ = new Subject<object>();
  }

}
