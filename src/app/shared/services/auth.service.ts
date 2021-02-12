import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Token } from '../models/token';
import { Router } from '@angular/router';
import { LoginData} from '@shared/models/login_data';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // API path
  URL = 'http://localhost:3000/postuser';

  constructor(
    private router: Router,
    private http: HttpClient,
    private baseHttp: HttpService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  loginForm(data: LoginData): Observable<Token> {
    return this.baseHttp
      .post<Token>(this.URL, data);
  }

  // After login save token and other values(if any) in localStorage
  setUser(resp: Token) {
    sessionStorage.setItem('name', resp.name);
    sessionStorage.setItem('access_token', resp.token);
    this.router.navigate(['/']);
  }

  // Checking if token is set
  isLoggedIn() {
    return sessionStorage.getItem('access_token') != null; // session storage
  }

  // After clearing sessionStorage redirect to login screen
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
