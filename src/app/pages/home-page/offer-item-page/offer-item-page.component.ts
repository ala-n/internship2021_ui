import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Offer } from '@shared/models/offer';
import { Office } from '@shared/models/office';
import { User } from '@shared/models/user';
import { FavoriteOfferService } from '@shared/services/favorite-offer.service';
import { HistoryOfferService } from '@shared/services/history-offer.service';
import { MapService } from '@shared/services/map.service';
import { OfferService } from '@shared/services/offer.service';
import { PreOrderDialogComponent } from './pre-order-dialog/pre-order-dialog.component';
import { UserService } from '@shared/services/user.service';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-offer-item-page',
  templateUrl: './offer-item-page.component.html',
  styleUrls: ['./offer-item-page.component.scss']
})
export class OfferItemPageComponent implements OnInit, OnDestroy {
  offer!: Offer;
  offices!: Office[];
  user!: User | null;

  offerId!: string;
  favoriteIs!: boolean;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  isLoading$ = of(true);

  constructor(
    private route: ActivatedRoute,
    private readonly offerService: OfferService,
    private readonly mapService: MapService,
    private favoriteOfferService: FavoriteOfferService,
    private historyOfferService: HistoryOfferService,
    public dialog: MatDialog,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.route.params.pipe(
      switchMap((params) => {
        this.offerId = params['id'];
        this.isFavoriteOffer(this.offerId);
        return this.offerService.getOfferById(params['id']);
      }),
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

  addFavoriteOffer(): void {
    this.favoriteOfferService
      .addFavoriteOffer(this.offer.id)
      .subscribe((offer) => {
        if (offer.offerId) this.isFavoriteOffer(offer.offerId);
      });
  }

  deleteFavoriteOffer(): void {
    this.favoriteOfferService
      .deleteFavoriteOffer(this.offerId)
      .subscribe((offer) => {
        if (offer !== {}) this.isFavoriteOffer(this.offerId);
      });
  }
  isFavoriteOffer(id: string): void {
    this.favoriteOfferService.isFavoriteOffer(id).subscribe((offer) => {
      if (offer === null) this.favoriteIs = false;
      else this.favoriteIs = true;
    });
  }

  onRatingChange(e: Event): void {
    this.alertService.showSnackbar('offer_rate');
    if (e.target) {
      this.historyOfferService
        .isHistoryOffer(this.offerId)
        .subscribe((data) => {
          if (data !== null) {
            this.historyOfferService.putHistoryOffer(
              this.offerId,
              +(e.target as HTMLInputElement).value
            );
          } else {
            this.historyOfferService.addHistoryOffer(
              this.offerId,
              this.offer.vendorId,
              +(e.target as HTMLInputElement).value
            );
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.mapService.clearOffer();
  }
}
