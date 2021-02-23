import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '@shared/models/offer';
import { Vendor } from '@shared/models/vendor';
import { MapService } from '@shared/services/map.service';
import { OfferService } from '@shared/services/offer.service';
import { VendorService } from '@shared/services/vendor.service';
import { of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-vendor-item-page',
  templateUrl: './vendor-item-page.component.html',
  styleUrls: ['./vendor-item-page.component.scss']
})
export class VendorItemPageComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  vendor!: Vendor;
  offers!: Offer[];

  isLoading$ = of(true);

  constructor(
    private route: ActivatedRoute,
    private vendorService: VendorService,
    private offerService: OfferService,
    private readonly mapService: MapService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.route.params.pipe(
      switchMap((params) =>
        this.vendorService.getVendorById(Number(params['id']))
      ),
      tap((vendor) => {
        this.vendor = vendor;
        this.mapService.setVendor(vendor);
      }),
      switchMap((vendor) =>
        this.offerService.getVendorOffers(Number(vendor.id))
      ),
      tap((offers) => (this.offers = offers)),
      map(() => false)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.mapService.clearVendor();
  }
}
