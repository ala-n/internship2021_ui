import { Injectable } from '@angular/core';
import { User } from '@shared/models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static USER_URL = 'api/user';

  constructor(private http: HttpService) {}

  // User is always be defined, because we get it in auth.guard.
  private _user$ = new BehaviorSubject<User | null>(null);
  readonly user$ = this._user$.asObservable();

  updateCurrentUser(): Observable<boolean> {
    const user = this.http.get<User>(`${UserService.USER_URL}`);
    // const user = this.http.get<User>(`auth/users/getUser`);
    return user.pipe(
      tap((user) => {
        this._user$.next(user);
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }
}
