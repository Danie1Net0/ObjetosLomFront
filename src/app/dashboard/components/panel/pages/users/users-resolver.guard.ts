import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { UserService } from '../../../../../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverGuard {

  constructor(private usersService: UserService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (route.params && route.params.id) {
      return this.usersService.show(route.params.id);
    }

    return of({
      user: null
    });
  }

}
