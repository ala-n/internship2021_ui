import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

interface Favorite {
  id?: string;
  offerId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistoryOfferService {
  static HISTORY_OFFER_URL = '/api/feedback';

  constructor(private http: HttpService) {}
  getAllHistoryOffers(): Observable<Favorite[]> {
    return this.http.get(`${HistoryOfferService.HISTORY_OFFER_URL}/all`);
  }

  addHistoryOffer(id: string): Observable<Favorite> {
    return this.http.post(
      `${HistoryOfferService.HISTORY_OFFER_URL}/add/${id}`,
      ''
    );
  }

  isHistoryOffer(id: string): Observable<Favorite> {
    return this.http.get(`${HistoryOfferService.HISTORY_OFFER_URL}/${id}`);
  }

  putHistoryOffer(id: string, rate: number): Observable<Favorite> {
    return this.http.put(
      `${HistoryOfferService.HISTORY_OFFER_URL}/${id}/${rate}`,
      ''
    );
  }
}
