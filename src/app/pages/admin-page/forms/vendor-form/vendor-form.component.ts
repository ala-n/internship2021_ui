import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Vendor } from '@shared/models/vendor';
import { VendorService } from '@shared/services/vendor.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { NavigationService } from '@shared/services/navigation.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AlertService } from '@shared/services/alert.service';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent implements OnInit {
  vendorForm = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(50)]],
    title: [null, [Validators.required, Validators.maxLength(50)]],
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
    public navigationService: NavigationService,
    private alertService: AlertService
  ) {}

  get vendorId(): string {
    return this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    if (!this.vendorId || this.vendorId === 'undefined') return;
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

  onSubmit(): void {
    if (this.vendor) {
      this.vendorService
        .updateVendor(this.vendorForm.value, this.vendorId)
        .pipe(take(1))
        .subscribe();
    } else {
      this.vendorService
        .addVendor(this.vendorForm.value)
        .pipe(take(1))
        .subscribe();
    }
  }

  showSnackbar(e: MatSlideToggleChange): void {
    if (e.checked || !this.vendorId) return;
    this.alertService.showSnackbar('vendor_deactivate');
  }
}
