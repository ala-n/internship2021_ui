import { Component, OnInit } from '@angular/core';

import { Offer } from '../../../shared/models/offer';
import { OfferService } from '../../../shared/services/offer.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  offers!: Offer[];
  constructor(private offerService: OfferService) {}
  getOffers(): void {
    this.offers = this.offerService.getOffers();
  }
  ngOnInit(): void {
    this.getOffers();
  }
}
