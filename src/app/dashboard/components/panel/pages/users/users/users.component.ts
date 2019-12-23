import { Component, OnInit } from '@angular/core';
import { empty, Observable, ObservableInput, Subject } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { UserService } from '../../../../../../shared/services/user.service';
import { User } from '../../../../../../shared/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users$: Observable<User[]>;
  public error$: Subject<boolean>;
  private user: User;

  constructor(private usersService: UserService) {
    this.error$ = new Subject<boolean>();
  }

  public ngOnInit(): void {
    this.user = User.getUser();
    this.onRefresh();
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

  private onRefresh(): void {
    this.users$ = this.usersService.index()
      .pipe(
        take(1),
        map(users => users.filter(user => (user._id !== this.user._id))),
        catchError((error: ObservableInput<any>) => {
          this.error$.next(true);
          return empty();
        })
      );
  }

}
