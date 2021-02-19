import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    house: [null, Validators.required],
    room: null,
    phone: null,
    email: [null, Validators.email],
    isActive: null
  });

  offices!: Office[];

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private route: ActivatedRoute,
    public navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const vendorId = Number(params['id']);
      const officeId = Number(params['officeId']) - 1;
      if (vendorId) {
        this.vendorService
          .getVendorById(vendorId)
          .pipe(first())
          .subscribe((vendor) => {
            this.offices = vendor.offices;
            this.officeForm.setValue({
              id: this.offices[officeId].id,
              country: this.offices[officeId].country,
              city: this.offices[officeId].city,
              street: this.offices[officeId].street,
              house: this.offices[officeId].house,
              room: this.offices[officeId].room,
              phone: this.offices[officeId].phone,
              email: this.offices[officeId].email,
              isActive: this.offices[officeId].isActive
            });
          });
      }
    });
  }

  onSubmit(): void {
    // TODO question about this solution to check if it update or add
    // if (this.offices) {
    //   this.vendorService.updateVendor(this.officeForm.value).subscribe();
    // } else {
    //   this.vendorService
    //     .addVendor(this.officeForm.value)
    //     .subscribe((vendor) => {
    //       this.vendors.push(vendor);
    //     });
    // }
  }
}
