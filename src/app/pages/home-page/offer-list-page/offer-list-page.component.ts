import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Offer } from '@shared/models/offer';
import { MapService } from '@shared/services/map.service';
import { OfferService } from '@shared/services/offer.service';
import { OfferListPageService } from './offer-list-page.service';
import { skip } from 'rxjs/operators';

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
    private offerListService: OfferListPageService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.mapService.city$.subscribe((city) => {
      this.offers$ = this.offerService.getOffers({ city });
      this.offerListService.baseOfferList$ = this.offers$;
      this.city = city;
    });
    this.offerListService.filteredOfferList$
      .pipe(skip(1))
      .subscribe((offers) => {
        if (offers.length !== 0) this.offers$ = of(offers);
      });
  }
}
