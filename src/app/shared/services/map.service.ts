import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _city$: BehaviorSubject<string>;

  constructor() {
    this._city$ = new BehaviorSubject<string>('');
  }

  setCity(city: string): void {
    this._city$.next(city);
  }

  getCity(): string {
    return this._city$.getValue();
  }

  get city$(): Observable<string> {
    return this._city$;
  }
}
