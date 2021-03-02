import { Injectable } from '@angular/core';
import { user } from '@shared/mocks/user';
import { User } from '@shared/models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static LOCATION_URL = 'api/users';

  // User is always be defined, because we get it in auth.guard.
  private _user$ = new BehaviorSubject<User | null>(null);
  readonly user$ = this._user$.asObservable();

  updateCurrentUser(): Observable<boolean> {
    // return this.http.get<string[]>(CityService.LOCATION_URL);
    return of(user).pipe(
      tap((user) => {
        this._user$.next(user);
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }
}
