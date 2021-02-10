import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Token } from '../models/token';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { HttpService} from './http.service';
import { LoginData} from '@shared/models/login_data'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // API path
  basePath = 'https://my-site.com/server/';
  HttpService: any;

  constructor(
    private router: Router,
    private httpService: HttpService
  ) {}

  

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


  // Verify user credentials on server to get token
  loginForm(data: LoginData): Observable<Token> {
    return this.httpService.postLogin(data)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // After login save token and other values(if any) in localStorage
  setUser(resp: Token) {
    sessionStorage.setItem('name', resp.name);
    sessionStorage.setItem('access_token', resp.token);
    this.router.navigate(['/']);
  }

  // Checking if token is set
  isLoggedIn() {
    return localStorage.getItem('access_token') != null; // session storage
  }

  // After clearing sessionStorage redirect to login screen
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }


  // Get data from server for Dashboard
  // getData(data: Object): Observable<User> {
  //   return this.http
  //     .post<User>(this.basePath, data, this.httpOptions) 
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     );
  // }
 
}
