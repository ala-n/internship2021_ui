import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';

import { NavigationService } from '@shared/services/navigation.service';
import { Offer } from '@shared/models/offer';
import { Office } from '@shared/models/office';
import { CityService } from '@shared/services/city.service';
import { TagsService } from '@shared/services/tags.service';
import { OfferService } from '@shared/services/offer.service';
import { OfficeService } from '@shared/services/office.service';
import { VendorService } from '@shared/services/vendor.service';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent implements OnInit {
  offerForm = this.fb.group({
    id: null,
    title: [null, [Validators.required, Validators.maxLength(50)]],
    discount: [null, Validators.required],
    description: null,
    dateStart: null,
    dateEnd: [null, Validators.required],
    promoCode: null,
    photoUrl: null,
    vendorEntitiesId: [null, Validators.required],
    tags: [null],
    isActive: false
  });

  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  allTags: string[] = [];
  tags: string[] = [];
  tagsCtrl = new FormControl();
  filteredTags: Observable<string[]>;

  offers: Offer[] = [];
  offer!: Offer;
  vendorName!: string;
  vendorOffices: Office[] = [];
  offerOfficesId!: string[];

  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  @ViewChild('tagsInput') tagsInput!: ElementRef<HTMLInputElement>;
  constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private vendorService: VendorService,
    private officeService: OfficeService,
    private cityService: CityService,
    private tagsService: TagsService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    public navigationService: NavigationService
  ) {
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allTags.slice()
      )
    );
  }

  get vendorNavId(): string {
    return this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.allTags = this.tagsService.tags.map((tag) => tag.name);
    const offerId = this.route.snapshot.params.offerId;
    if (offerId) {
      this.offerService
        .getOfferById(offerId)
        .pipe(take(1))
        .subscribe((offer: Offer) => {
          this.offer = offer;
          this.vendorName = offer.vendorName;
          this.offerOfficesId = offer.vendorEntities.map((entity) => entity.id);
          this.tags =
            offer.tags
              .map((tag: string) => this.tagsService.getTagName(tag))
              .filter((tag: string) => tag !== '') || [];
          this.getOfficesForSelect(offer.vendorId);
          this.offerForm.setValue({
            id: offer.id,
            title: offer.title,
            discount: offer.discount,
            description: offer.description,
            dateStart: new Date(offer.dateStart).toISOString().substring(0, 10),
            dateEnd: new Date(offer.dateEnd).toISOString().substring(0, 10),
            promoCode: offer.promoCode,
            photoUrl: offer.photoUrl[0] || null,
            vendorEntitiesId: this.offerOfficesId,
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

  getOfficesForSelect(vendorId: string): void {
    this.officeService
      .getVendorOffices(vendorId, true)
      .pipe(take(1))
      .subscribe((offices: Office[]) => {
        offices = offices.filter((office) => office.isActive === true);
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
    this.offerForm.patchValue({
      photoUrl: [this.offerForm.value.photoUrl],
      tags: this.tags.map((tag: string) => this.tagsService.getTagId(tag))
    });
    if (this.offer) {
      this.offerService.updateOffer(this.offerForm.value, this.offer.vendorId);
    } else {
      this.offerService.addOffer(this.offerForm.value, this.vendorNavId);
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    let value = event.value.toLowerCase();

    if (!value) return;

    if (!this.allTags.includes(value)) {
      input.value = '';
      this.removeTag(value);
      this.alertService.showSnackbar('select_existing');
      return;
    }

    value = this.checkTagReplica(value);

    if (value.trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  checkTagReplica(value: string): string {
    if (value && this.tags.includes(value)) {
      value = '';
      this.alertService.showSnackbar('tag_added');
    }
    return value;
  }

  removeTag(tag: string): void {
    const index = this.tags.lastIndexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    const value = this.checkTagReplica(event.option.viewValue);
    value && this.tags.push(value);
    this.tagsInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(
      (tag) => tag.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
