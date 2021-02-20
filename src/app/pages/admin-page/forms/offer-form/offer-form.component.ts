import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '@shared/models/offer';
import { NavigationService } from '@shared/services/navigation.service';
import { OfferService } from '@shared/services/offer.service';
import { VendorService } from '@shared/services/vendor.service';
import { take } from 'rxjs/operators';

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
    offices: null,
    tags: null,
    isActive: false
  });

  offers: Offer[] = [];
  offer!: Offer;
  vendorId!: number;
  vendorName!: string;

  constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private vendorService: VendorService,
    private route: ActivatedRoute,
    public navigationService: NavigationService
  ) {}

  get vendorNavId(): number {
    return +this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    const offerId = +this.route.snapshot.params.offerId;
    if (offerId) {
      this.offerService
        .getOfferById(offerId)
        .pipe(take(1))
        .subscribe((offer: Offer) => {
          this.offer = offer;
          this.vendorName = this.offer.vendorName;
          this.vendorId = offer.vendorId;
          this.offerForm.setValue({
            id: offer.id,
            title: offer.title,
            discount: offer.discount,
            description: offer.description,
            dateStart: offer.dateStart,
            dateEnd: offer.dateEnd,
            promocode: offer.promocode,
            images: '',
            offices: '',
            tags: '',
            isActive: offer.isActive
          });
        });
    } else {
      this.vendorService
        .getVendorById(this.vendorNavId)
        .pipe(take(1))
        .subscribe((vendor) => {
          this.vendorName = vendor.name;
        });
    }
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
          this.offers.push(offer);
        });
    }
  }
}
