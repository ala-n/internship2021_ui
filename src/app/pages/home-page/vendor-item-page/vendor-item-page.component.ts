import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '@shared/models/offer';
import { Vendor } from '@shared/models/vendor';
import { MapService } from '@shared/services/map.service';
import { OfferService } from '@shared/services/offer.service';
import { VendorService } from '@shared/services/vendor.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-vendor-item-page',
  templateUrl: './vendor-item-page.component.html',
  styleUrls: ['./vendor-item-page.component.scss']
})
export class VendorItemPageComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  vendor$!: Observable<Vendor>;
  offers$!: Observable<Offer[]>;

  constructor(
    private route: ActivatedRoute,
    private vendorService: VendorService,
    private offerService: OfferService,
    private readonly mapService: MapService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.vendor$ = this.vendorService.getVendorById(Number(params['id']));
    });

    this.vendor$.pipe(takeUntil(this.destroy$)).subscribe((vendor) => {
      this.mapService.setVendor(vendor);
      this.offers$ = this.offerService.getVendorOffers(Number(vendor.id));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.mapService.clearVendor();
  }
}
