import { Observable, throwError } from 'rxjs';

import { Offer } from '@shared/models/offer';

export class ApiService {
  getOffers(): Observable<Offer[]> {
    return throwError('Method is not implemented yet');
  }

  // TODO(abarmina) remove after implementation
  // eslint-disable-next-line
  getOfferById(id: number): Observable<Offer> {
    return throwError('Method is not implemented yet');
  }
}
