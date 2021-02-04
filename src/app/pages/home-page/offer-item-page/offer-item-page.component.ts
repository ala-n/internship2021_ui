import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Offer } from '@shared/models/offer';
import { ApiService } from '@shared/services/api.service';

@Component({
  selector: 'app-offer-item-page',
  templateUrl: './offer-item-page.component.html',
  styleUrls: ['./offer-item-page.component.scss']
})
export class OfferItemPageComponent implements OnInit {
  offer$!: Observable<Offer>;

  constructor(
    private route: ActivatedRoute,
    private readonly apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      //TODO(abarmina): implement normal test cases
      if (!params['id']) return;
      this.offer$ = this.apiService.getOfferById(Number(params['id']));
    });
    // it's doesn't work with tests, they "fall"
    // try {
    //   this.offer$ = this.apiService.getOfferById(Number(params['id']));
    // } catch (err) {
    //   console.log(err);
    // }
  }
}
