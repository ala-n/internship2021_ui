import { Component, Input } from '@angular/core';

import { Offer } from '@shared/models/offer';
import { LocationService } from '@shared/services/location.service';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss']
})
export class OfferItemComponent {
  constructor(public locationService: LocationService) {}

  @Input() offer!: Offer;
  city!: string;

  ngOnInit(): void {
    // this.city = this.route.snapshot.params.city;
  }
}
