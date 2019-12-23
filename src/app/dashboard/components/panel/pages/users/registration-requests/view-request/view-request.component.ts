import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { BaseForm } from '../../../../../../../shared/form/base-form/base-form';
import { User } from '../../../../../../../shared/models/user';
import { UserService } from '../../../../../../../shared/services/user.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss']
})
export class ViewRequestComponent extends BaseForm implements OnInit {

  public message$: Subject<object> = new Subject<object>();
  public loading$: Subject<boolean> = new Subject<boolean>();
  private user: User;
  private originalRole: string;
  public disableButtons = false;

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
  }

  public acceptRequest(): void {
    Swal.fire({
      title: 'Aprovar cadastro de usuário',
      text: 'Você tem certeza disso?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.loading$.next(true);
        this.onClose();

        this.user.active = true;

        this.usersService.save(this.user)
          .subscribe(success => {
            const message = {
              success: true,
              type: 'success',
              content: 'Solicitação aprovada com sucesso!'
            };

            this.message$.next(message);
            this.disableButtons = true;
          }, error => {
            const message = {
              success: false,
              type: 'warning',
              content: 'Erro ao aprovar solicitação. Por favor, tente novamente.'
            };

            this.message$.next(message);
            this.loading$.next(false);
          }, () => {
            this.loading$.next(false);
          });
      }
    });
  }

  public rejectRequest(): void {
    Swal.fire({
      title: 'Rejeitar cadastro de usuário',
      text: 'Você tem certeza disso?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.loading$.next(true);
        this.onClose();

        this.usersService.destroy(this.user._id)
          .subscribe(success => {
            const message = {
              success: true,
              type: 'success',
              content: 'Solicitação rejeitada com sucesso!'
            };

            this.message$.next(message);
            this.disableButtons = true;
          }, error => {
            const message = {
              success: false,
              type: 'warning',
              content: 'Erro ao rejeitar solicitação. Por favor, tente novamente.'
            };

            this.message$.next(message);
            this.loading$.next(false);
          }, () => {
            this.loading$.next(false);
          });
      }
    });
  }

  public onClose(): void {
    this.message$ = new Subject<object>();
  }

}
