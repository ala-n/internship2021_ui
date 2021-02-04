import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { OfferService } from './offer.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _city$: BehaviorSubject<string>;

  constructor(private offerService: OfferService) {
    this._city$ = new BehaviorSubject<string>('');
  }

  // TODO: use directly from component
  getOfferData() {
    return this.offerService.getOffers();
  }

  setCity(city: string) {
    this._city$.next(city);
  }

  getCity() {
    return this._city$.getValue();
  }

  get city$(): Observable<string> {
    return this._city$;
  }
}
