import { Observable } from 'rxjs';

import { Offer } from '@shared/models/offer';

export abstract class ApiService {
  abstract getOffers(): Observable<Offer[]>;
  abstract getOfferById(id: number): Observable<Offer>;
}
