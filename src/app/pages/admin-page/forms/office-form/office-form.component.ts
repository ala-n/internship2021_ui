import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';
import { NavigationService } from '@shared/services/navigation.service';
import { Office } from '@shared/models/office';
import { OfficeService } from '@shared/services/office.service';
import { VendorService } from '@shared/services/vendor.service';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../../form-dialog/form-dialog.component';
import { from } from 'rxjs';
import { MapService } from '@shared/services/map.service';

@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.scss']
})
export class OfficeFormComponent implements OnInit {
  officeForm = this.fb.group({
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
    public dialog: MatDialog,
    private mapService: MapService
  ) {}

  get vendorId(): string {
    return this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    const officeId = this.route.snapshot.params.officeId;
    if (officeId) {
      this.officeService
        .getOfficeById(officeId)
        .pipe(take(1))
        .subscribe((office) => {
          this.office = office;
          this.officeForm.setValue({
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
    this.vendorService
      .getVendorById(this.vendorId)
      .pipe(take(1))
      .subscribe((vendor) => {
        this.vendorName = vendor.name;
      });
  }

  openDialog(): void {
    let coordinate: L.LatLng;
    const dialogRef = this.dialog.open(FormDialogComponent);
    const sub = dialogRef.componentInstance.addressCordinates.subscribe(
      (result: L.LatLng) => {
        coordinate = result;
      }
    );
    dialogRef
      .afterClosed()
      .pipe(
        mergeMap(() =>
          from(
            this.mapService.getNameCity(coordinate.lat, coordinate.lng, 'ru')
          )
        )
      )
      .subscribe((data) => {
        const address = data.address;
        this.officeForm.setValue({
          country: address.country,
          city: address.city,
          street: address.road,
          house: address.house_number,
          room: '',
          phone: 123,
          email: 'lol@gmail.com',
          isActive: true
        });
        sub.unsubscribe();
      });
  }

  onSubmit(): void {
    console.log(this.officeForm.value);
    if (this.office) {
      this.officeService.updateOffice(this.officeForm.value, this.vendorId);
    } else {
      this.officeService.addOffice(this.officeForm.value, this.vendorId);
    }
  }
}
