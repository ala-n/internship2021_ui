import { Offer } from '../../../../shared/models/offer';
import { OFFERS } from '../../../../shared/mock-offers';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss']
})
export class OfferItemComponent {
  offers = OFFERS;
  @Input() offer: Offer;
}
