import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _city$ = new BehaviorSubject<string>('');
  readonly city$ = this._city$.asObservable();

  setCity(city: string): void {
    this._city$.next(city);
  }
}
