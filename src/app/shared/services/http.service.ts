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
    return sessionStorage.getItem('access_token');
  }

  get(baseURL: string): Observable<any> {
    return this.http
      .get<any>(baseURL, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  post(baseURL: string, data: unknown): Observable<any> {
    return this.http
      .post<any>(baseURL, data, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  put(baseURL: string, data: unknown): Observable<any> {
    return this.http
      .put<any>(baseURL, data, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(baseURL: string): Observable<any> {
    return this.http
      .delete<any>(baseURL, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401 || error.status === 403) {
      this.httpAuth.logout();
    }
    return throwError('Something bad happened; please try again later.');
  }
}
