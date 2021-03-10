import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

import { Offer } from '@shared/models/offer';
import { LocationService } from '@shared/services/location.service';
import { TagsService } from '@shared/services/tags.service';
import { FilterService } from '@shared/services/filter.service';

@Component({
  selector: 'app-offer-list-page',
  templateUrl: './offer-list-page.component.html',
  styleUrls: ['./offer-list-page.component.scss']
})
export class OfferListPageComponent {
  offers$!: Observable<Offer[]>;
  city!: string;

  constructor(
    public locationService: LocationService,
    private tagsService: TagsService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.locationService.city$.subscribe((city) => {
      this.filterService.filter({ city });
      this.city = city;
    });

    this.tagsService.tag$.pipe(skip(1)).subscribe((tag) => {
      this.filterService.filter({ tag });
    });
    this.offers$ = this.filterService.resultList$;
    this.offers$.subscribe(
      () => (this.city = this.filterService.filterCfg.city || '')
    );
    this.filterService.allListOffers();
  }
}
