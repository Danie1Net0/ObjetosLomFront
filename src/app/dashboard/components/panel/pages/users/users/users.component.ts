import { Component, OnInit } from '@angular/core';
import { empty, Observable, ObservableInput, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../../../../../shared/services/user.service';
import { User } from '../../../../../../shared/models/user';
import { BaseForm } from '../../../../../../shared/form/base-form/base-form';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseForm implements OnInit {

  public users$: Observable<User[]>;
  public error$: Subject<boolean>;
  private user: User;

  constructor(
    private usersService: UserService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.error$ = new Subject<boolean>();
  }

  public ngOnInit(): void {
    this.user = User.getUser();

    this.formGroup = this.formBuilder.group({
      searchFor: ['name'],
      value: [''],
      role: ['super-admin']
    });

    this.onRefresh([{ key: 'active', value: true }]);
  }

  public submit(): void {
    const params = [
      {
        key: 'active',
        value: true
      }
    ];

    if (this.formGroup.get('value').value.trim().length) {
      params.push({
        key: this.formGroup.controls.searchFor.value,
        value: this.formGroup.controls.value.value
      });
    } else {
      params.push({
        key: this.formGroup.controls.searchFor.value,
        value: this.formGroup.controls.role.value
      });
    }

    this.onRefresh(params);
  }

  public clearSearch(): void {
    this.onRefresh([{ key: 'active', value: true }]);
    this.formGroup.patchValue({
      searchFor: 'name',
      value: '',
      role: 'super-admin'
    });
  }

  public isFormValid(): boolean {
    if (this.formGroup.get('searchFor').value !== 'role') {
      return this.formGroup.get('value').value.trim().length;
    }

    return true;
  }

  public formatRole(role: string): string {
    switch (role) {
      case 'super-admin':
        return 'Super Administrador';
      case 'admin':
        return 'Administrador';
      default:
        return 'Usuário Comum';
    }
  }

  private onRefresh(params: any): void {
    this.users$ = this.usersService.index(params)
      .pipe(
        map((users: User[]) => users.filter((user: User) => (user._id !== this.user._id))),
        catchError((error: ObservableInput<any>) => {
          this.error$.next(true);
          return empty();
        })
      );
  }

}
