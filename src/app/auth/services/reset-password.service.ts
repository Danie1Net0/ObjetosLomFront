import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private httpClient: HttpClient) { }

  public verifyToken(token: string): Observable<any> {
    return this.httpClient.get(`${ environment.BASE_URL }/auth/password-token/${ token }`).pipe(take(1));
  }

}
