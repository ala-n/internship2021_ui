import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '@shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // API path
  basePath = 'https://my-site.com/server/';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  // Http Options
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


  // Verify user credentials on server to get token
  loginForm(data: Object): Observable<User> {
    return this.http
      .post<User>(this.basePath, data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // After login save token and other values(if any) in localStorage
  setUser(resp: User) {
    localStorage.setItem('name', resp.name);
    localStorage.setItem('access_token', resp.Token);
    this.router.navigate(['/']);
  }

  // Checking if token is set
  isLoggedIn() {
    return localStorage.getItem('access_token') != null; // session storage
  }

  // After clearing localStorage redirect to login screen
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  // Get data from server for Dashboard
  getData(data: Object): Observable<User> {
    return this.http
      .post<User>(this.basePath, data, this.httpOptions) 
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  errorHandler(error: Response){
    if(error.status === 401 || error.status === 403){
      this.logout();
    }
  }
}
