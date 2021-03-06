import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Offer } from '@shared/models/offer';
import { Office } from '@shared/models/office';
import { MapService } from '@shared/services/map.service';
import { OfferService } from '@shared/services/offer.service';
import { OfficeService } from '@shared/services/office.service';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-offer-item-page',
  templateUrl: './offer-item-page.component.html',
  styleUrls: ['./offer-item-page.component.scss']
})
export class OfferItemPageComponent implements OnInit, OnDestroy {
  offer!: Offer;
  offices!: Office[];

  isLoading$ = of(true);

  constructor(
    private route: ActivatedRoute,
    private readonly offerService: OfferService,
    private readonly officeService: OfficeService,
    private readonly mapService: MapService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.route.params.pipe(
      switchMap((params) => this.offerService.getOfferById(params['id'])),
      tap((offer: Offer) => {
        this.offer = offer;
        this.mapService.setOffer(offer);
      }),
      // for mocks
      // switchMap((offer) => this.officeService.getVendorOffices(offer.vendorId)),

      // for backend
      switchMap((offer) => this.officeService.getOfficesById(offer.id)),
      tap((offices) => (this.offices = offices)),
      map(() => false)
    );
  }

  ngOnDestroy(): void {
    this.mapService.clearOffer();
  }
}
