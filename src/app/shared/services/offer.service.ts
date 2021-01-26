import { OFFERS } from '../mock-offers';
import { Offer } from '../models/offer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor() { }

  getOffers(): Offer[] {
  return OFFERS;
}
}
