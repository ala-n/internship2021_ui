import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginData } from '@shared/models/login_data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

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
  login(data: LoginData): Observable<string> {
    return this.http.post<string>(this.URL, data).pipe(
      tap((token) => {
        sessionStorage.setItem('access_user', token);
      })
    );
  } // TODO: create error handler

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
