import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Vendor } from '@shared/models/vendor';
import { VendorService } from '@shared/services/vendor.service';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent {
  vendorForm = this.fb.group({
    name: [null, Validators.required],
    title: [null, Validators.required],
    description: null,
    website: [null, Validators.required]
  });

  vendors: Vendor[] = [];
  hasUnitNumber = false;

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private location: Location
  ) {}

  onSubmit(): void {
    this.vendorService.addVendor(this.vendorForm.value).subscribe((vendor) => {
      this.vendors.push(vendor);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
