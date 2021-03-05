import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginData } from '@shared/models/login_data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserLogin } from '@shared/models/user';

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
  URL = 'auth/users/login';

  constructor(private router: Router, private http: HttpClient) {}

  // This function send Login Data and try to receive User
  login(data: LoginData): Observable<UserLogin> {
    return this.http
      .post<UserLogin>('https://localhost:5001/auth/users/login', data)
      .pipe(
        tap((data) => {
          console.log(data);
          localStorage.setItem('access_user', data.token);
        })
      );
  } // TODO: create error handler

  // Checking if User is set
  isLoggedIn(): boolean {
    return localStorage.getItem('access_user') != null;
  }

  // After clearing sessionStorage redirect to login screen
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
