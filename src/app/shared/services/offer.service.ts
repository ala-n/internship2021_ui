import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  static OFFERS_URL = 'api/offers';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getOffers(params?: { city: string }): Observable<Offer[]> {
    if (!params) return this.http.get<Offer[]>(`${OfferService.OFFERS_URL}`);
    else
      return this.http.get<Offer[]>(
        `${OfferService.OFFERS_URL}/?city=${params.city}`
      );
  }

  getOfferById(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${OfferService.OFFERS_URL}/${id}`);
  }

  getVendorOffers(vendorId: number): Observable<Offer[]> {
    return this.http
      .get<Offer[]>(`${OfferService.OFFERS_URL}`)
      .pipe(
        map((offers) => offers.filter((offer) => offer.vendorId === vendorId))
      );
  }

  addOffer(offer: Offer, vendorId: number): Observable<Offer> {
    offer.vendorId = vendorId;
    return this.http.post<Offer>(
      OfferService.OFFERS_URL,
      offer,
      this.httpOptions
    );
  }

  updateOffer(offer: Offer, vendorId: number): Observable<Offer> {
    offer.vendorId = vendorId;
    return this.http.put<Offer>(
      OfferService.OFFERS_URL,
      offer,
      this.httpOptions
    );
  }
}
