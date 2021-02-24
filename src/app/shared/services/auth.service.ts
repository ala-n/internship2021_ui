import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { LoginData } from '@shared/models/login_data';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Http Options without User
  get httpOptionsAuth(): unknown {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return { headers };
  }

  // API path
  URL = 'api/users/login';

  constructor(private router: Router, private http: HttpClient) {}

  // This function send Login Data and try to receive User
  loginForm(data: LoginData): Observable<User> {
    return this.http.post<User>(this.URL, data);
  } // TODO: create error handler

  // After login save User and other values(if any) in sessionStorage
  setUser(resp: User): void {
    sessionStorage.setItem('firstName', resp.firstName);
    sessionStorage.setItem('lastName', resp.lastName);
    sessionStorage.setItem('access_user', resp.token);
    this.router.navigate(['/']);
  }

  // Checking if User is set
  isLoggedIn(): boolean {
    return sessionStorage.getItem('access_user') != null;
  }

  // After clearing sessionStorage redirect to login screen
  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
