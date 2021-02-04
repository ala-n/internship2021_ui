import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Offer } from '@shared/models/offer';
import { ApiService } from '@shared/services/api.service';

@Component({
  selector: 'app-offer-list-page',
  templateUrl: './offer-list-page.component.html',
  styleUrls: ['./offer-list-page.component.scss']
})
export class OfferListPageComponent {
  offers$!: Observable<Offer[]>;
  constructor(private apiService: ApiService) {}

  getOffers(): void {
    this.offers$ = this.apiService.getOffers();
  }

  ngOnInit(): void {
    this.getOffers();
  }
}
