import { Injectable } from '@angular/core';
import { Offer } from '@shared/models/offer';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _city$ = new BehaviorSubject<string>('');
  private _offer$ = new BehaviorSubject<Offer | null>(null);
  readonly city$ = this._city$.asObservable();
  readonly offer$ = this._offer$.asObservable();

  setCity(city: string): void {
    this._city$.next(city);
  }

  setOffer(offer: Offer): void {
    this._offer$.next(offer);
  }

  clearOffer(): void {
    this._offer$.next(null);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getCityView(city: string): Promise<any> {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: city });
    return results;
  }
}
