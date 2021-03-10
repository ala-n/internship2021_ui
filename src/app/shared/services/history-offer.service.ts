import { Injectable } from '@angular/core';
import { Offer } from '@shared/models/offer';
import { Observable, Subscription } from 'rxjs';
import { HttpService } from './http.service';

interface History {
  id?: 'string';
  offerId?: 'string';
  rate?: 0;
}

@Injectable({
  providedIn: 'root'
})
export class HistoryOfferService {
  static HISTORY_OFFER_URL = '/api/feedback';

  constructor(private http: HttpService) {}
  getAllHistoryOffers(): Observable<Offer[]> {
    return this.http.get(`${HistoryOfferService.HISTORY_OFFER_URL}/all`);
  }

  addHistoryOffer(id: string, vendorId: string, rate: number): Subscription {
    const data = {
      offerId: id,
      vendorId,
      rate
    };
    return this.http
      .post(`${HistoryOfferService.HISTORY_OFFER_URL}/add`, data)
      .subscribe();
  }

  isHistoryOffer(id: string): Observable<History> {
    return this.http.get(`${HistoryOfferService.HISTORY_OFFER_URL}/${id}`);
  }

  putHistoryOffer(id: string, rate: number): Subscription {
    return this.http
      .put(`${HistoryOfferService.HISTORY_OFFER_URL}/${id}/${rate}`, '')
      .subscribe();
  }
}
