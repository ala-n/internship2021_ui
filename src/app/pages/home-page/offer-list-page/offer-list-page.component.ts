import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Offer } from '@shared/models/offer';
import { OfferService } from '@shared/services/offer.service';
import { LocationService } from '@shared/services/location.service';
import { UserService } from '@shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { withLatestFrom } from 'rxjs/operators';

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
    public locationService: LocationService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.locationService.city$.subscribe((city) => {
      this.offers$ = this.offerService.getOffers({ city });
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
  }
}
