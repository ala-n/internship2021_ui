import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    else
      return this.http.get(`${OfferService.OFFERS_URL}/?city=${params.city}`);
  }

  getOfferById(id: string): Observable<Offer> {
    return this.http.get(`${OfferService.OFFERS_URL}/${id}`);
  }

  getVendorOffers(vendorId: string): Observable<Offer[]> {
    return this.http
      .get<Offer[]>(`${OfferService.OFFERS_URL}`)
      .pipe(
        map((offers) =>
          offers.filter(
            (offer: { vendorId: string }) => offer.vendorId === vendorId
          )
        )
      );
  }

  addOffer(offer: Offer, vendorId: string): Observable<Offer> {
    offer.vendorId = vendorId;
    return this.http.post(OfferService.OFFERS_URL, offer);
  }

  updateOffer(offer: Offer, vendorId: string): Observable<Offer> {
    offer.vendorId = vendorId;
    return this.http.put(OfferService.OFFERS_URL, offer);
  }
}
