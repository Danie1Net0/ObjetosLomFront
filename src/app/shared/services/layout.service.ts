import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  protected layoutSize$ = new Subject();

  constructor() { }

  public changeLayoutSize(): void {
    this.layoutSize$.next();
  }

}
