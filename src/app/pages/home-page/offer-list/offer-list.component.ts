import { Offer } from '../../../shared/models/offer';
// import { OFFERS } from './mock-offers';
import { OfferService } from '../../../shared/services/offer.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent {
  // offers = OFFERS;
  offers: Offer[];
  // title: string;
  // description: string;
  // photoUrl: string;
  // vendorName: string;
  // numberOfUses: number;
  // numberOfViews: number;
  // discount: string;
  // ngOnInit() {
  //   for (let offer: Offer of offers : Array<Offer>  ) {
  //     this.title = offer.title;
  //     this.description = offer.description;
  //     this.photoUrl = offer.photoUrl;
  //     this.vendorName = offer.vendorName;
  //     this.numberOfUses = offer.numberOfUses;
  //     this.numberOfViews = offer.numberOfViews;
  //     this.discount = offer.discount;
  //   }
  // }
  constructor(private offerService: OfferService) {}
  getOffers(): void {
  this.offers = this.offerService.getOffers();
  }
  ngOnInit() {
  this.getOffers();
  }
  }
