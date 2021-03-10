import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Offer } from '@shared/models/offer';
import { Office } from '@shared/models/office';
import { User } from '@shared/models/user';
import { MapService } from '@shared/services/map.service';
import { OfferService } from '@shared/services/offer.service';
import { PreOrderDialogComponent } from './pre-order-dialog/pre-order-dialog.component';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-offer-item-page',
  templateUrl: './offer-item-page.component.html',
  styleUrls: ['./offer-item-page.component.scss']
})
export class OfferItemPageComponent implements OnInit, OnDestroy {
  offer!: Offer;
  offices!: Office[];
  user!: User | null;

  isLoading$ = of(true);

  constructor(
    private route: ActivatedRoute,
    private readonly offerService: OfferService,
    private readonly mapService: MapService,
    public dialog: MatDialog,
    private userService: UserService
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
      switchMap(() => this.userService.user$),
      tap((user) => (this.user = user)),
      map(() => false)
    );
  }

  openDialog(): void {
    this.dialog.open(PreOrderDialogComponent, {
      data: {
        promocode: this.offer.promoCode,
        offices: this.offer.vendorEntities,
        user: this.user,
        offerId: this.offer.id
      }
    });
  }

  ngOnDestroy(): void {
    this.mapService.clearOffer();
  }
}
