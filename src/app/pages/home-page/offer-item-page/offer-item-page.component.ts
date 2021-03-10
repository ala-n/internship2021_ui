import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';

import { Offer } from '@shared/models/offer';
import { Office } from '@shared/models/office';
import { FavoriteOfferService } from '@shared/services/favorite-offer.service';
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
  offices!: Office[];
  offerId!: string;
  favoriteIs!: boolean;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  isLoading$ = of(true);

  constructor(
    private route: ActivatedRoute,
    private readonly offerService: OfferService,
    private readonly mapService: MapService,
    private favoriteOfferService: FavoriteOfferService,
    public dialog: MatDialog
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

      // for backend
      map(() => false)
    );
  }

  addFavoriteOffer(): void {
    this.favoriteOfferService
      .addFavoriteOffer(this.offerId)
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

  ngOnDestroy(): void {
    this.mapService.clearOffer();
  }
}
