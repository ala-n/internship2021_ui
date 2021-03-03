import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Offer } from '@shared/models/offer';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss']
})
export class OfferItemComponent {
  constructor(private route: ActivatedRoute) {}

  @Input() offer!: Offer;
  city!: string;

  ngOnInit(): void {
    this.city = this.route.snapshot.params.city;
  }
}
