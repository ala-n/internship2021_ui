import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Offer } from '@shared/models/offer';
import { MapService } from '@shared/services/map.service';
import { OfferService } from '@shared/services/offer.service';

@Component({
  selector: 'app-offer-list-page',
  templateUrl: './offer-list-page.component.html',
  styleUrls: ['./offer-list-page.component.scss']
})
export class OfferListPageComponent {
  offers$!: Observable<Offer[]>;
  constructor(
    private offerService: OfferService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.mapService.city$.subscribe((city) => {
      this.offers$ = this.offerService.getOffers({ city });
    });
  }
}
