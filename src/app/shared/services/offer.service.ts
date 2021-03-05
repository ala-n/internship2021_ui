import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Offer } from '../models/offer';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  static OFFERS_URL = 'api/offers';

  constructor(private http: HttpService) {}

  getOffers(params?: { city: string }): Observable<Offer[]> {
    if (!params) return this.http.get(`${OfferService.OFFERS_URL}`);
    else {
      // for backend
      // const cityId = this.cityService.getCityId(params.city);
      // return this.http.get(`${OfferService.OFFERS_URL}/city/{cityId}`);

      // for mocks
      return this.http.get(`${OfferService.OFFERS_URL}/?city=${params.city}`);
    }
  }

  getOfferById(id: string): Observable<Offer> {
    // for backend and for mocks
    return this.http.get(`${OfferService.OFFERS_URL}/${id}`);
  }

  getVendorOffers(vendorId: string): Observable<Offer[]> {
    // for mocks
    // return this.http
    //   .get<Offer[]>(`${OfferService.OFFERS_URL}`)
    //   .pipe(
    //     map((offers) =>
    //       offers.filter(
    //         (offer: { vendorId: string }) => offer.vendorId === vendorId
    //       )
    //     )
    //   );

    // for backend
    return this.http.get<Offer[]>(
      `${OfferService.OFFERS_URL}/vendor/${vendorId}`
    );
  }

  getOfficeOffers(officeId: string): Observable<Offer[]> {
    // for backend
    return this.http.get<Offer[]>(
      `${OfferService.OFFERS_URL}/vendorEntitiy/${officeId}`
    );
  }

  addOffer(offer: Offer, vendorId: string): Subscription {
    const url = OfferService.OFFERS_URL;
    offer.vendorId = vendorId;
    return this.http.post(url, offer).subscribe();
  }

  updateOffer(offer: Offer, vendorId: string): Subscription {
    const url = `${OfferService.OFFERS_URL}/${offer.id}`;
    offer.vendorId = vendorId;
    return this.http.put(url, offer).subscribe();
  }

  getOffersbyTag(tag: string): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${OfferService.OFFERS_URL}`).pipe(
      map((offers) => {
        return offers.filter((offer) => offer.tags.includes(tag));
      })
    );
  }
}
