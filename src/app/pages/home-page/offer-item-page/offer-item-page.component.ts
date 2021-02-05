import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Offer } from '@shared/models/offer';
import { OfferService } from '@shared/services/offer.service';

@Component({
  selector: 'app-offer-item-page',
  templateUrl: './offer-item-page.component.html',
  styleUrls: ['./offer-item-page.component.scss']
})
export class OfferItemPageComponent implements OnInit {
  offer!: Offer;

  constructor(
    private route: ActivatedRoute,
    private readonly offerService: OfferService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      try {
        this.offer = this.offerService.getOfferById(Number(params['id']));
      } catch (err) {
        //TODO(abarmina): move to rxjs
        console.log(err);
      }
    });
  }
}
