import { Component } from '@angular/core';

import { Offer } from '@shared/models/offer';
import { OfferService } from '@shared/services/offer.service';

@Component({
  selector: 'app-offer-list-page',
  templateUrl: './offer-list-page.component.html',
  styleUrls: ['./offer-list-page.component.scss']
})
export class OfferListPageComponent {
  offers!: Offer[];
  constructor(private offerService: OfferService) {}
  getOffers(): void {
    this.offers = this.offerService.getOffers();
  }
  ngOnInit(): void {
    this.getOffers();
  }
}
