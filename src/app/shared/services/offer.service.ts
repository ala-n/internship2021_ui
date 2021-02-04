import { Injectable } from '@angular/core';

import { OFFERS } from '../mock-offers';
import { Offer } from '../models/offer';

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
