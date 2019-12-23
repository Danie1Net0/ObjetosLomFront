import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudService } from './crud-service';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {

  constructor(protected httpClient: HttpClient) {
    // tslint:disable-next-line:max-line-length
    super(httpClient, `${ environment.BASE_URL }/users`, JSON.parse(window.localStorage.getItem('auth_app_token')) !== null ? JSON.parse(window.localStorage.getItem('auth_app_token')) : '');
  }

}
