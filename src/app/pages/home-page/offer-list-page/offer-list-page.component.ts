import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Offer } from '@shared/models/offer';
import { MapService } from '@shared/services/map.service';
import { OfferService } from '@shared/services/offer.service';
import { TagsService } from '@shared/services/tag.service';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-offer-list-page',
  templateUrl: './offer-list-page.component.html',
  styleUrls: ['./offer-list-page.component.scss']
})
export class OfferListPageComponent {
  offers$!: Observable<Offer[]>;
  city!: string;

  constructor(
    private offerService: OfferService,
    private mapService: MapService,
    private tagsService: TagsService
  ) {}

  ngOnInit(): void {
    this.mapService.city$.subscribe((city) => {
      this.offers$ = this.offerService.getOffers({ city });
      this.city = city;
    });

    this.tagsService.tag$.pipe(skip(1)).subscribe((tag) => {
      this.offers$ = this.offerService.getOffersbyTag(tag);
    });
  }
}
