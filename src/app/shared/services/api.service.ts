import { Offer } from '@shared/models/offer';
import { Observable } from 'rxjs';

export abstract class ApiService {
  abstract getOffers(): Observable<Offer[]>;
  abstract getOfferById(id: number): Observable<Offer>;
}
