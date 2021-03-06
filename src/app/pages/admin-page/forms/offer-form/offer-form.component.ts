import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '@shared/models/offer';
import { Office } from '@shared/models/office';
import { NavigationService } from '@shared/services/navigation.service';
import { OfferService } from '@shared/services/offer.service';
import { OfficeService } from '@shared/services/office.service';
import { VendorService } from '@shared/services/vendor.service';
import { take } from 'rxjs/operators';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CityService } from '@shared/services/city.service';

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
    vendorEntitiesId: [null, Validators.required],
    tags: null,
    isActive: false
  });

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];

  offers: Offer[] = [];
  offer!: Offer;
  vendorId!: string;
  vendorName!: string;
  vendorOffices: Office[] = [];
  offerOffices: string[] = [];

  constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private vendorService: VendorService,
    private officeService: OfficeService,
    private cityService: CityService,
    private route: ActivatedRoute,
    public navigationService: NavigationService
  ) {}

  get vendorNavId(): string {
    return this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    const offerId = this.route.snapshot.params.offerId;
    if (offerId) {
      this.offerService
        .getOfferById(offerId)
        .pipe(take(1))
        .subscribe((offer: Offer) => {
          this.offer = offer;
          this.offerOffices = offer.vendorEntitiesId;
          this.vendorId = offer.vendorId;
          this.tags = offer.tags || [];
          this.getOfficesForSelect(this.vendorId);
          this.getVendorName(this.vendorId);
          this.offerForm.setValue({
            id: offer.id,
            title: offer.title,
            discount: offer.discount,
            description: offer.description,
            dateStart: new Date(offer.dateStart),
            dateEnd: offer.dateEnd,
            promocode: offer.promoCode,
            images: '',
            vendorEntitiesId: this.offerOffices,
            tags: this.tags,
            isActive: offer.isActive
          });
        });
    } else {
      this.getOfficesForSelect(this.vendorNavId);
      this.getVendorName(this.vendorNavId);
    }
  }

  getVendorName(id: string): void {
    this.vendorService
      .getVendorById(id)
      .pipe(take(1))
      .subscribe((vendor) => {
        this.vendorName = vendor.name;
      });
  }

  getOfficesForSelect(id: string): void {
    this.officeService
      .getVendorOffices(id)
      .pipe(take(1))
      .subscribe((offices: Office[]) => {
        offices.map(
          (office) =>
            (office.address.cityId = this.cityService.getCityName(
              office.address.cityId
            ))
        );
        this.vendorOffices = offices;
      });
  }

  onSubmit(): void {
    console.log(this.offerForm.value);
    if (this.offer) {
      this.offerService.updateOffer(this.offerForm.value, this.vendorId);
    } else {
      this.offerService.addOffer(this.offerForm.value, this.vendorNavId);
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }
}
