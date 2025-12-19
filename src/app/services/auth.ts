import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private api = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  signup(signupForm : any): Observable<any> {
    return this.http.post(`${this.api}/signup`, signupForm);
  }

  login(loginForm: any): Observable<any> {
    return this.http.post(`${this.api}/login`, loginForm);
  }
}
