import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
// import { map } from 'rxjs/operators';

import { Offer } from '../models/offer';
import { CityService } from './city.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  static OFFERS_URL = 'api/offers';

  constructor(private http: HttpService, private cityService: CityService) {}

  getOffers(params?: { city: string }): Observable<Offer[]> {
    //for mock
    // const url = `${OfferService.OFFERS_URL}`;

    //for backend
    const url = `${OfferService.OFFERS_URL}/?includeInactive=true`;
    if (!params) return this.http.get(url);
    else {
      const cityId = this.cityService.getCityId(params.city);

      // for backend
      return this.http.get(`${OfferService.OFFERS_URL}/city/${cityId}`);

      // for mocks
      // return this.http.get(`${OfferService.OFFERS_URL}/?cityId=${cityId}`);
    }
  }

  getOfferById(id: string): Observable<Offer> {
    // for backend and for mocks
    return this.http.get(`${OfferService.OFFERS_URL}/${id}`);
  }

  getVendorOffers(vendorId: string, inactive?: boolean): Observable<Offer[]> {
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
    if (inactive) {
      return this.http.get<Offer[]>(
        `${OfferService.OFFERS_URL}/vendor/${vendorId}/?includeInactive=true`
      );
    } else {
      return this.http.get<Offer[]>(
        `${OfferService.OFFERS_URL}/vendor/${vendorId}`
      );
    }
  }

  getOfficeOffers(officeId: string): Observable<Offer[]> {
    // for backend
    const url = `${OfferService.OFFERS_URL}/vendorEntitiy/${officeId}`;
    return this.http.get<Offer[]>(url);
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
}
