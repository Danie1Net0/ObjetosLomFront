import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class CrudService<T> {

  protected httpOptions: any;

  constructor(protected httpClient: HttpClient, protected API_URL, protected token) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${ token.value }`
      })
    };
  }

  public index(): Observable<any> {
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
    return this.httpClient.get<T>(`${ this.API_URL }/${id}`, this.httpOptions)
      .pipe(
        take(1),
        map((response: any) => response.data)
      );
  }

  public update(record: T): Observable<any> {
    // @ts-ignore
    return this.httpClient.put<T>(`${ this.API_URL }/${ record.id }`, record, this.httpOptions)
      .pipe(
        take(1),
        map((response: any) => response.data)
      );
  }

  public save(record: T): Observable<any> {
    // @ts-ignore
    if (record.id) {
      return this.update(record);
    }

    return this.store(record);
  }

  public destroy(record: T): Observable<any> {
    // @ts-ignore
    return this.httpClient.delete(`${ this.API_URL }/${ record.id }`, this.httpOptions).pipe(take(1));
  }

}
