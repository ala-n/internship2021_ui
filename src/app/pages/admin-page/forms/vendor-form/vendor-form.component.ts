import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Vendor } from '@shared/models/vendor';
import { VendorService } from '@shared/services/vendor.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { NavigationService } from '@shared/services/navigation.service';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent implements OnInit {
  vendorForm = this.fb.group({
    name: [null, Validators.required],
    title: [null, Validators.required],
    description: null,
    website: [null, Validators.required],
    isActive: false
  });

  vendors: Vendor[] = [];
  vendor!: Vendor;

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private route: ActivatedRoute,
    public navigationService: NavigationService
  ) {}

  get vendorId(): string {
    return this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    if (this.vendorId) {
      this.vendorService
        .getVendorById(this.vendorId)
        .pipe(take(1))
        .subscribe((vendor) => {
          this.vendor = vendor;
          this.vendorForm.setValue({
            name: vendor.name,
            title: vendor.title,
            website: vendor.website,
            description: vendor.description,
            isActive: vendor.isActive
          });
        });
    }
  }

  onSubmit(): void {
    // TODO question about this solution to check if it update or add
    if (this.vendor) {
      this.vendorService.updateVendor(this.vendorForm.value, this.vendorId);
    } else {
      this.vendorService.addVendor(this.vendorForm.value);
    }
  }
}
