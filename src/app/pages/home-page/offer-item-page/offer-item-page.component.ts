import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Offer } from '@shared/models/offer';
import { Office } from '@shared/models/office';
import { MapService } from '@shared/services/map.service';
import { OfferService } from '@shared/services/offer.service';
import { PreOrderDialogComponent } from './pre-order-dialog/pre-order-dialog.component';

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
    private readonly mapService: MapService,
    public dialog: MatDialog
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
      map(() => false)
    );
  }

  openDialog(): void {
    this.dialog.open(PreOrderDialogComponent);
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(FormDialogComponent);
  //   dialogRef.afterClosed().subscribe((data) => {
  //     const address = data.address;

  //     this.officeForm.patchValue({
  //       location: [coordinate.lat, coordinate.lng],
  //       country: address.country,
  //       cityId: address.city,
  //       street: address.road,
  //       house: address.house_number,
  //       room: '',
  //       phone: null,
  //       email: this.office.email,
  //       isActive: true
  //     });
  //     sub.unsubscribe();
  //   });
  // }

  ngOnDestroy(): void {
    this.mapService.clearOffer();
  }
}
