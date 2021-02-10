import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  static OFFERS_URL = 'api/offers';

  constructor(private http: HttpClient) {}

  getOffers(params: { city: string }): Observable<Offer[]> {
    if (params) {
      return this.http.get<Offer[]>(
        `${OfferService.OFFERS_URL}/?city=${params.city}`
      );
    }
    return this.http.get<Offer[]>(`${OfferService.OFFERS_URL}`);
  }

  getOfferById(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${OfferService.OFFERS_URL}/${id}`);
  }
}
