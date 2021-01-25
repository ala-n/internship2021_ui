import { Offer } from './offer';
import { OFFERS } from './mock-offers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  offers = OFFERS;
  constructor() { }

  ngOnInit(): void {
  }

}
