import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Offer } from '@shared/models/offer';
import { Office } from '@shared/models/office';
import { MapService } from '@shared/services/map.service';
import { OfferService } from '@shared/services/offer.service';
import { OfficeService } from '@shared/services/office.service';
import { of, Subject } from 'rxjs';
import { map, skip, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-offer-item-page',
  templateUrl: './offer-item-page.component.html',
  styleUrls: ['./offer-item-page.component.scss']
})
export class OfferItemPageComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  offer!: Offer;
  offices!: Office[];

  isLoading$ = of(true);

  constructor(
    private route: ActivatedRoute,
    private readonly offerService: OfferService,
    private readonly officeService: OfficeService,
    private readonly mapService: MapService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.route.params.pipe(
      switchMap((params) =>
        this.offerService.getOfferById(Number(params['id']))
      ),
      tap((offer: Offer) => {
        this.offer = offer;
        this.mapService.setOffer(offer);
      }),
      switchMap((offer) =>
        this.officeService.getVendorOffices(Number(offer.vendorId))
      ),
      tap((offices) => (this.offices = offices)),
      map(() => false)
    );

    this.mapService.city$
      .pipe(skip(1), takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.mapService.clearOffer();
  }
}
