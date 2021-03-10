import { Component, Input } from '@angular/core';
import { Offer } from '@shared/models/offer';
import { LocationService } from '@shared/services/location.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent {
  constructor(public locationService: LocationService) {}

  @Input() offers: Offer[] = [];
}
