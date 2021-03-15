import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient, private httpAuth: AuthService) {}

  // Http Options with token
  get httpOptions(): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token
    });
    return { headers };
  }

  get token(): string | null {
    return localStorage.getItem('access_user');
  }

  get<T>(baseURL: string): Observable<T> {
    return this.http
      .get<T>(baseURL, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  post<T, D>(baseURL: string, data: D): Observable<T> {
    return this.http
      .post<T>(baseURL, data, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  put<T, D>(baseURL: string, data: D): Observable<T> {
    return this.http
      .put<T>(baseURL, data, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete<T>(baseURL: string): Observable<T> {
    return this.http
      .delete<T>(baseURL, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401 || error.status === 403) {
      this.httpAuth.logout();
    }
    return throwError('Something bad happened; please try again later.');
  }
}
