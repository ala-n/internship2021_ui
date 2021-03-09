import { Component, OnDestroy, OnInit } from '@angular/core';
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
  isLoading$ = of(true);

  constructor(
    private route: ActivatedRoute,
    private readonly offerService: OfferService,
    private readonly mapService: MapService,
    private favoriteOfferService: FavoriteOfferService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.route.params.pipe(
      switchMap((params) => {
        this.offerId = params['id'];
        this.isFavorited(this.offerId);
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

  addFavorite(): void {
    this.favoriteOfferService
      .addFavoriteOffer(this.offerId)
      .subscribe((offer) => {
        if (offer.offerId) this.isFavorited(offer.offerId);
      });
  }

  deleteFavorite(): void {
    this.favoriteOfferService
      .deleteFavorite(this.offerId)
      .subscribe((offer) => {
        if (offer !== {}) this.isFavorited(this.offerId);
      });
  }

  isFavorited(id: string): void {
    this.favoriteOfferService.isFavoriteOffer(id).subscribe((offer) => {
      if (offer == null) this.favoriteIs = false;
      else this.favoriteIs = true;
    });
  }

  ngOnDestroy(): void {
    this.mapService.clearOffer();
  }
}
