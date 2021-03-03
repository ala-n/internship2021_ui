import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { skip } from 'rxjs/operators';

import { Offer } from '@shared/models/offer';
import { OfferService } from '@shared/services/offer.service';
import { LocationService } from '@shared/services/location.service';
import { OfferListPageService } from '@shared/services/offer-list-page.service';

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
    public locationService: LocationService,
    private offerListService: OfferListPageService
  ) {}

  ngOnInit(): void {
    this.locationService.city$.subscribe((city) => {
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
