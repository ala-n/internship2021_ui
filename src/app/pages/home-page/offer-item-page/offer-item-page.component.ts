import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '@shared/models/offer';
import { ApiService } from '@shared/services/api.service';
import { Observable } from 'rxjs';

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
  }
}
