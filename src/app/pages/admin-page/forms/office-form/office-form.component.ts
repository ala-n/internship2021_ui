import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Vendor } from '@shared/models/vendor';
import { VendorService } from '@shared/services/vendor.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { NavigationService } from '@shared/services/navigation.service';
import { Office } from '@shared/models/office';

@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.scss']
})
export class OfficeFormComponent implements OnInit {
  officeForm = this.fb.group({
    id: null,
    country: [null, Validators.required],
    city: [null, Validators.required],
    street: [null, Validators.required],
    room: null,
    phone: null,
    email: null,
    isActive: null
  });

  vendors: Vendor[] = [];
  offices!: Office[];

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private route: ActivatedRoute,
    public navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.vendorService
          .getVendor(Number(params['id']))
          .pipe(first())
          .subscribe((vendor) => {
            this.offices = vendor.offices;
            this.officeForm.setValue({
              id: vendor.id,
              country: vendor.name,
              city: vendor.title,
              street: vendor.website,
              room: vendor.description,
              phone: vendor.description,
              email: vendor.description,
              isActive: vendor.isActive
            });
          });
      }
    });
  }

  onSubmit(): void {
    // TODO question about this solution to check if it update or add
    if (this.offices) {
      this.vendorService.updateVendor(this.officeForm.value).subscribe();
    } else {
      this.vendorService
        .addVendor(this.officeForm.value)
        .subscribe((vendor) => {
          this.vendors.push(vendor);
        });
    }
  }
}
