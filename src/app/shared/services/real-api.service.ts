import { Offer } from '@shared/models/offer';
import { Observable, throwError } from 'rxjs';
import { ApiService } from './api.service';

export class RealApiService extends ApiService {
  getOffers(): Observable<Offer[]> {
    return throwError('Method is not implemented yet');
  }

  getOfferById(): Observable<Offer> {
    return throwError('Method is not implemented yet');
  }
}
