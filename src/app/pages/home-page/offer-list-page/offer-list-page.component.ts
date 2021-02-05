import { Component } from '@angular/core';
import { Offer } from '@shared/models/offer';
import { OfferService } from '@shared/services/offer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-offer-list-page',
  templateUrl: './offer-list-page.component.html',
  styleUrls: ['./offer-list-page.component.scss']
})
export class OfferListPageComponent {
  offers$!: Observable<Offer[]>;
  constructor(private offerService: OfferService) {}

  getOffers(): void {
    this.offers$ = this.offerService.getOffers();
  }
  ngOnInit(): void {
    this.getOffers();
  }
}
