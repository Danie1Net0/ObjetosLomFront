import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudService } from './crud-service';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {

  constructor(protected httpClient: HttpClient, protected tokenService: TokenService) {
    super(httpClient, `${ environment.BASE_URL }/users`, tokenService);
  }

}
