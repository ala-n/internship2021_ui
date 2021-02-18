import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { NavigationService } from '@shared/services/navigation.service';
import { Office } from '@shared/models/office';
import { OfficeService } from '@shared/services/office.service';

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
    isActive: false
  });

  office!: Office;
  offices: Office[] = [];
  // vendorId!: number;

  constructor(
    private fb: FormBuilder,
    private officeService: OfficeService,
    private route: ActivatedRoute,
    public navigationService: NavigationService
  ) {}

  get vendorId() {
    debugger;
    return +this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    //TODO try to make without subscribe using snapshot
    this.route.params.subscribe((params) => {
      const officeId = Number(params['officeId']);
      // this.vendorId = Number(params['id']);
      if (officeId) {
        this.officeService
          .getOffice(officeId)
          .pipe(first())
          .subscribe((office) => {
            this.office = office;
            this.officeForm.setValue({
              id: this.office.id,
              country: this.office.country,
              city: this.office.city,
              street: this.office.street,
              house: this.office.house,
              room: this.office.room,
              phone: this.office.phone,
              email: this.office.email,
              isActive: this.office.isActive
            });
          });
      }
    });
  }

  onSubmit(): void {
    // TODO question about this solution to check if it update or add
    if (this.office) {
      // TODO can we change manually setting of vendor Id?
      this.officeService
        .updateOffice(this.officeForm.value, this.vendorId)
        .subscribe();
    } else {
      this.officeService
        .addOffice(this.officeForm.value, this.vendorId)
        .subscribe((office) => {
          this.offices.push(office);
        });
    }
  }
}
