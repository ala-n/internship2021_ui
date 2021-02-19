import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../models/token';
import { Router } from '@angular/router';
import { LoginData } from '@shared/models/login_data';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Http Options without token
  get httpOptionsAuth(): Object {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return { headers };
  }

  // API path
  URL = 'http://localhost:3000/postuser';

  constructor(private router: Router, private http: HttpClient) {}

  // This function send Login Data and try to receive Token
  loginForm(data: LoginData): Observable<Token> {
    return this.http.post<Token>(this.URL, data);
  } // TODO: create error handler

  // After login save token and other values(if any) in sessionStorage
  setUser(resp: Token): void {
    sessionStorage.setItem('firstName', resp.firstName);
    sessionStorage.setItem('lastName', resp.lastName);
    sessionStorage.setItem('access_token', resp.token);
    this.router.navigate(['/']);
  }

  // Checking if token is set
  isLoggedIn(): boolean {
    return sessionStorage.getItem('access_token') != null; // session storage
  }

  // After clearing sessionStorage redirect to login screen
  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
