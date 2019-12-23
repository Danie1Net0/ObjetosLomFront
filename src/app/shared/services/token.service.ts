import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getToken(): any {
    return JSON.parse(window.localStorage.getItem('auth_app_token'));
  }

}
