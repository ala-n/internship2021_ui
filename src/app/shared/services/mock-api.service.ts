import { OFFERS } from '@shared/mock-offers';
import { Offer } from '@shared/models/offer';
import { Observable, of, throwError } from 'rxjs';
import { ApiService } from './api.service';

export class MockApiService extends ApiService {
  getOffers(): Observable<Offer[]> {
    return of(OFFERS);
  }

  getOfferById(id: number): Observable<Offer> {
    const offer = OFFERS.find((o) => o.id === id);
    if (!offer) return throwError('Item not found');
    return of(offer);
  }
}
