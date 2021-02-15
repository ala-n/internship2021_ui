import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Offer } from '@shared/models/offer';
import { MapService } from '@shared/services/map.service';
import { OfferService } from '@shared/services/offer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-offer-item-page',
  templateUrl: './offer-item-page.component.html',
  styleUrls: ['./offer-item-page.component.scss']
})
export class OfferItemPageComponent implements OnInit, OnDestroy {
  offer$!: Observable<Offer>;

  constructor(
    private route: ActivatedRoute,
    private readonly offerService: OfferService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.offer$ = this.offerService.getOfferById(Number(params['id']));
      this.offer$.subscribe((offer) => this.mapService.setOffer(offer));
    });
  }

  ngOnDestroy(): void {
    this.mapService.clearOffer();
  }
}
