import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private _city$ = new BehaviorSubject<string>('');
  readonly city$ = this._city$.asObservable();

  setCity(city: string): void {
    if (this._city$.getValue() !== city) {
      this._city$.next(city);
    }
  }
}
