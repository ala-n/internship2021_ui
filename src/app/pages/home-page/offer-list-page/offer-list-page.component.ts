import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Offer } from '@shared/models/offer';
import { OfferService } from '@shared/services/offer.service';
import { LocationService } from '@shared/services/location.service';

@Component({
  selector: 'app-offer-list-page',
  templateUrl: './offer-list-page.component.html',
  styleUrls: ['./offer-list-page.component.scss']
})
export class OfferListPageComponent {
  offers$!: Observable<Offer[]>;
  city!: string;

  constructor(
    private offerService: OfferService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.locationService.city$.subscribe((city) => {
      this.offers$ = this.offerService.getOffers({ city });
      this.city = city;
    });
  }
}
