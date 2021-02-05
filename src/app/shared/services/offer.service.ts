import { OFFERS } from '../mocks/mock-offers';
import { Offer } from '../models/offer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  getOffers(): Offer[] {
    return OFFERS;
  }

  getOfferById(id: number): Offer {
    const offer = OFFERS.find((o) => o.id === id);
    if (!offer) throw new Error('item not found');
    return offer;
  }
}
