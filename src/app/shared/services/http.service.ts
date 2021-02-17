import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
export class HttpService {

  constructor(private http: HttpClient, private httpAuth: AuthService ){ }

  // Http Options
  get httpOptions (): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token 
    })
    return {headers}
  };

  get token(): any {
    return sessionStorage.getItem('access_token'); 
  }

  get(baseURL: string): any { 
    return this.http.get(baseURL, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  post(baseURL: string, data: unknown): any {
    return this.http.post(baseURL, data, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  
  put(baseURL: string, data: unknown): any { 
    return this.http.put(baseURL, data, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  } 

  delete(baseURL: string): any{
    return this.http.delete(baseURL, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  } 

  errorHandler(error: HttpErrorResponse): any{
    if(error.status === 401 || error.status === 403){
      this.httpAuth.logout();
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  
}