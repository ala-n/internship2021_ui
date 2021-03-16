import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Office } from '@shared/models/office';
import { Vendor } from '@shared/models/vendor';
import { VendorService } from '@shared/services/http/vendor/vendor.service';
import { Offer } from '@shared/models/offer';
import { OfficeService } from '@shared/services/http/office/office.service';
import { OfferService } from '@shared/services/http/offer/offer.service';
import { MapService } from '@shared/services/map/map.service';

@Component({
  selector: 'app-office-item-page',
  templateUrl: './office-item-page.component.html',
  styleUrls: ['./office-item-page.component.scss']
})
export class OfficeItemPageComponent implements OnInit, OnDestroy {
  isLoading$ = of(true);

  office!: Office;
  vendor!: Vendor;
  offers!: Offer[];

  constructor(
    private route: ActivatedRoute,
    private officeService: OfficeService,
    private offerService: OfferService,
    private mapService: MapService,
    private vendorService: VendorService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.route.params.pipe(
      switchMap((params) => this.officeService.getOfficeById(params['id'])),
      tap((office) => {
        this.office = office;
        this.mapService.setOffice(office);
      }),
      switchMap((office) =>
        forkJoin([
          this.vendorService.getVendorById(office.vendorId),
          // for mocks
          // this.offerService.getVendorOffers(office.vendorId)
          // for backend
          this.offerService.getOfficeOffers(office.id)
        ])
      ),
      tap(([vendor, offers]) => {
        this.vendor = vendor;
        this.offers = offers;
      }),
      map(() => false)
    );
  }

  ngOnDestroy(): void {
    this.mapService.clearOffice();
  }
}
