import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '@shared/models/offer';
import { NavigationService } from '@shared/services/navigation.service';
import { OfferService } from '@shared/services/offer.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {
  offerForm = this.fb.group({
    id: null,
    title: [null, Validators.required],
    discount: [null, Validators.required],
    description: null,
    dateStart: null,
    dateEnd: [null, Validators.required],
    promocode: null,
    images: null,
    vendorName: null,
    offices: null,
    tags: null,
    isActive: false
  });

  offers: Offer[] = [];
  offer!: Offer;
  vendorId!: number;

  constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private route: ActivatedRoute,
    public navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const offerId = Number(params['offerId']);
      // this.vendorId = Number(params['id']);
      if (offerId) {
        this.offerService
          .getOfferById(offerId)
          .pipe(first())
          .subscribe((offer: Offer) => {
            this.offer = offer;
            this.vendorId = offer.vendorId;
            this.offerForm.setValue({
              id: offer.id,
              title: offer.title,
              discount: offer.discount,
              description: offer.description,
              dateStart: offer.dateStart,
              dateEnd: offer.dateEnd,
              promocode: offer.promocode,
              vendorName: offer.vendorName,
              images: '',
              offices: '',
              tags: '',
              isActive: offer.isActive
            });
          });
      }
    });
  }

  onSubmit(): void {
    // TODO question about this solution to check if it update or add
    if (this.offer) {
      this.offerService
        .updateOffer(this.offerForm.value, this.vendorId)
        .subscribe();
    } else {
      this.offerService
        .addOffer(this.offerForm.value, this.vendorId)
        .subscribe((offer) => {
          // TODO do we need this when we connect back-end?
          this.offers.push(offer);
        });
    }
  }
}
