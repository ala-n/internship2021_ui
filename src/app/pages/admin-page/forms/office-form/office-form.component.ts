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
    house: [null, Validators.required],
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
      const id = params['id'];
      if (id) {
        this.vendorService
          .getVendor(Number(id))
          .pipe(first())
          .subscribe((vendor) => {
            this.offices = vendor.offices;
            this.officeForm.setValue({
              id: this.offices[id].id,
              country: this.offices[id].country,
              city: this.offices[id].city,
              street: this.offices[id].street,
              house: this.offices[id].house,
              room: this.offices[id].room,
              phone: this.offices[id].phoneNumber,
              email: this.offices[id].email,
              isActive: this.offices[id].isActive
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
