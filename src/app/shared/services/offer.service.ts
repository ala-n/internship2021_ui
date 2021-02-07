import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(OfferService.OFFERS_URL);
  }

  getOfferById(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${OfferService.OFFERS_URL}/${id}`);
  }
}
