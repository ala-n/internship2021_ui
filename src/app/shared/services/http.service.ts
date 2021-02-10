import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../models/user';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class HttpService {

    basePath = 'http://localhost:3000/postuser';

    constructor(private http: HttpClient){ }

    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    postLogin(data: Object): Observable<User>{
        return this.http.post<User>(this.basePath, data, this.httpOptions); 
    }
    errorHandler(error: Response){
        if(error.status === 401 || error.status === 403){
          this.logout();
        }
      }

    // get(){ // + assing + error handler

    // }
    // post(){

    // }
    // put(){

    // }
    // delete(){

    // }
}