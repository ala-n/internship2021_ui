import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Offer } from '@shared/models/offer';
import { LocationService } from '@shared/services/location.service';
import { MapService } from '@shared/services/map.service';
import { OfferService } from '@shared/services/offer.service';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-offer-item-page',
  templateUrl: './offer-item-page.component.html',
  styleUrls: ['./offer-item-page.component.scss']
})
export class OfferItemPageComponent implements OnInit, OnDestroy {
  offer!: Offer;

  isLoading$ = of(true);

  constructor(
    private route: ActivatedRoute,
    private readonly offerService: OfferService,
    private readonly mapService: MapService,
    private readonly locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.route.params.pipe(
      switchMap((params) => this.offerService.getOfferById(params['id'])),
      tap((offer: Offer) => {
        this.locationService.setCity(offer.city);

        this.offer = offer;
        this.mapService.setOffer(offer);
      }),
      map(() => false)
    );
  }

  ngOnDestroy(): void {
    this.mapService.clearOffer();
  }
}
