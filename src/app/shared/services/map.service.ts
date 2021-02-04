import { Injectable } from '@angular/core';
import { Offer } from '@shared/models/offer';
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
  getOfferData(): Offer[] {
    return this.offerService.getOffers();
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
