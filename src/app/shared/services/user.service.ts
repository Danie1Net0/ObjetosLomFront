import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';

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

  public requestIndex(query: { key: string, value: string }): Observable<any> {
    const url = `${ this.API_URL }?key=${ query.key }&value=${ query.value }`;
    return this.httpClient.get<User[]>(url, this.httpOptions)
      .pipe(
        delay(500),
        map((response: any) => response.data.docs)
      );
  }

}
