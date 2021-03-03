import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { withLatestFrom, skip } from 'rxjs/operators';

import { Offer } from '@shared/models/offer';
import { LocationService } from '@shared/services/location.service';
import { UserService } from '@shared/services/user.service';
import { TagsService } from '@shared/services/tag.service';
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
    private userService: UserService,
    private route: ActivatedRoute,
    private tagsService: TagsService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.locationService.city$.subscribe((city) => {
      this.filterService.filter({ city });
      this.city = city;
    });

    this.route.queryParams
      .pipe(withLatestFrom(this.userService.user$))
      .subscribe(([{ city }, user]) => {
        if (!city && user) {
          this.locationService.setCity(user.city);
          return;
        }

        if (city) {
          this.locationService.setCity(city);
          return;
        }

        this.locationService.setCity('Minsk');
      });

    this.filterService.filteredOfferList$.pipe(skip(1)).subscribe((offers) => {
      if (offers.length !== 0) this.offers$ = of(offers);
    });
    this.tagsService.tag$.pipe(skip(1)).subscribe((tag) => {
      this.filterService.filter({ tag });
    });
    this.offers$ = this.filterService.list$;
    this.offers$.subscribe(
      () => (this.city = this.filterService.filterCfg.city || '')
    );
    this.offers$.subscribe((data) => console.log(data));
  }
}
