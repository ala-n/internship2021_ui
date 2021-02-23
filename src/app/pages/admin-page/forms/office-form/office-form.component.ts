import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { NavigationService } from '@shared/services/navigation.service';
import { Office } from '@shared/models/office';
import { OfficeService } from '@shared/services/office.service';
import { VendorService } from '@shared/services/vendor.service';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../../form-dialog/form-dialog.component';

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
    phone: [null, Validators.pattern('[- +()0-9]+')],
    email: [null, [Validators.required, Validators.email]],
    isActive: false
  });

  office!: Office;
  offices: Office[] = [];
  vendorName!: string;

  constructor(
    private fb: FormBuilder,
    private officeService: OfficeService,
    private vendorService: VendorService,
    private route: ActivatedRoute,
    public navigationService: NavigationService,
    public dialog: MatDialog
  ) {}

  get vendorId(): number {
    return +this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    const officeId = +this.route.snapshot.params.officeId;
    if (officeId) {
      this.officeService
        .getOfficeById(officeId)
        .pipe(take(1))
        .subscribe((office) => {
          this.office = office;
          this.vendorName = this.office.vendorName;
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
    } else {
      this.vendorService
        .getVendorById(this.vendorId)
        .pipe(take(1))
        .subscribe((vendor) => {
          this.vendorName = vendor.name;
        });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmit(): void {
    // TODO question about this solution to check if it update or add
    if (this.office) {
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
