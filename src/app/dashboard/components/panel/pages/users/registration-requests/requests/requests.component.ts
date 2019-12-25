import { Component, OnInit } from '@angular/core';
import { empty, Observable, ObservableInput, Subject } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { UserService } from '../../../../../../../shared/services/user.service';
import { User } from '../../../../../../../shared/models/user';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  public users$: Observable<User[]>;
  public error$: Subject<boolean>;

  constructor(private usersService: UserService) {
    this.error$ = new Subject<boolean>();
  }

  public ngOnInit() {
    this.onRefresh();
  }

  private onRefresh(): void {
    this.users$ = this.usersService.index([{ key: 'active', value: false }])
      .pipe(
        catchError((error: ObservableInput<any>) => {
          this.error$.next(true);
          return empty();
        })
      );
  }

}
