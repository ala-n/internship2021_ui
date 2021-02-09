import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Vendor } from '@shared/models/vendor';
import { VendorService } from '@shared/services/vendor.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent implements OnInit {
  vendorForm = this.fb.group({
    id: null,
    name: [null, Validators.required],
    title: [null, Validators.required],
    description: null,
    website: [null, Validators.required],
    isActive: null
  });

  vendors: Vendor[] = [];
  vendor!: Vendor;

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.vendorService
          .getVendor(Number(params['id']))
          .pipe(first())
          .subscribe((vendor) => {
            this.vendor = vendor;
            this.vendorForm.setValue({
              id: vendor.id,
              name: vendor.name,
              title: vendor.title,
              website: vendor.website,
              description: vendor.description,
              isActive: vendor.isActive
            });
          });
      }
    });
  }

  onSubmit(): void {
    // TODO question about this solution to check if it update or add
    if (this.vendor) {
      this.vendorService.updateVendor(this.vendorForm.value).subscribe();
    } else {
      this.vendorService
        .addVendor(this.vendorForm.value)
        .subscribe((vendor) => {
          this.vendors.push(vendor);
        });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
