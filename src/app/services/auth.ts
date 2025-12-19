import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { api } from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private readonly http: HttpClient) {}

  signup(signupForm : any): Observable<any> {
    return this.http.post(`${api}/auth/signup`, signupForm);
  }

  login(loginForm: any): Observable<any> {
    return this.http.post(`${api}/auth/login`, loginForm);
  }
}
