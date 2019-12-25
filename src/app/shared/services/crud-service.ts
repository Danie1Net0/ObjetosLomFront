import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { delay, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { TokenService } from './token.service';
import { User } from '../models/user';

export class CrudService<T> {

  protected httpOptions: any;

  constructor(protected httpClient: HttpClient, protected API_URL, protected tokenService: TokenService) {
    const token = this.tokenService.getToken();

    if (token !== null) {
      const user = User.getUser();

      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: `Bearer ${ token.value }`
        }),
        params: new HttpParams()
      };

      if (user !== null) {
        this.httpOptions.headers = this.httpOptions.headers.set('user_id', user._id);
      }
    }
  }

  public index(params: any): Observable<any> {
    this.httpOptions.params = new HttpParams();

    for (const param of params) {
      this.httpOptions.params = this.httpOptions.params.set(param.key, param.value);
    }

    return this.httpClient.get<T[]>(this.API_URL, this.httpOptions)
      .pipe(
        delay(500),
        map((response: any) => response.data)
      );
  }

  public store(record: T): Observable<any> {
    return this.httpClient.post(this.API_URL, record, this.httpOptions)
      .pipe(
        take(1),
        map((response: any) => response.data)
      );
  }

  public show(id: number): Observable<any> {
    return this.httpClient.get<T>(`${ this.API_URL }/${ id }`, this.httpOptions)
      .pipe(
        take(1),
        map((response: any) => response.data)
      );
  }

  public update(record: T): Observable<any> {
    // @ts-ignore
    return this.httpClient.put<T>(`${ this.API_URL }/${ record._id }`, record, this.httpOptions)
      .pipe(
        take(1),
        map((response: any) => response.data)
      );
  }

  public save(record: T): Observable<any> {
    // @ts-ignore
    if (record._id) {
      return this.update(record);
    }

    return this.store(record);
  }

  public destroy(id: string): Observable<any> {
    return this.httpClient.delete(`${ this.API_URL }/${ id }`, this.httpOptions).pipe(take(1));
  }

}
