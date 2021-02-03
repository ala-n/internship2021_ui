import { Component } from '@angular/core';
import { Offer } from '@shared/models/offer';
import { ApiService } from '@shared/services/api.service';
import { Observable } from 'rxjs';

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
