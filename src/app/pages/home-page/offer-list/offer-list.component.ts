import { Offer } from '../../../shared/models/offer';
import { OfferService } from '../../../shared/services/offer.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent {
  offers: Offer[];
  constructor(private offerService: OfferService) {}
  getOffers(): void {
  this.offers = this.offerService.getOffers();
  }
  ngOnInit() {
  this.getOffers();
  }
  }
