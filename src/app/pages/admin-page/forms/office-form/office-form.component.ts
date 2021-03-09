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
import { CityService } from '@shared/services/city.service';

@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.scss']
})
export class OfficeFormComponent implements OnInit {
  officeForm = this.fb.group({
    id: null,
    location: null,
    country: [null, Validators.required],
    cityId: [null, Validators.required],
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
  cityName!: string;

  constructor(
    private fb: FormBuilder,
    private officeService: OfficeService,
    private vendorService: VendorService,
    private cityService: CityService,
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
            id: this.office.id,
            location: this.office.location,
            country: this.office.address.country,
            cityId: this.cityService.getCityName(office.address.cityId) || '',
            street: this.office.address.street,
            house: this.office.address.house,
            room: this.office.address.room,
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
            this.mapService.getNameCity(
              coordinate.lat,
              coordinate.lng,
              'en-US,en'
            )
          )
        )
      )
      .subscribe((data) => {
        const address = data.address;
        this.officeForm.patchValue({
          location: [coordinate.lat, coordinate.lng],
          country: address.country,
          cityId: address.city,
          street: address.road,
          house: address.house_number
        });
        sub.unsubscribe();
      });
  }

  onSubmit(): void {
    this.officeForm.controls['cityId'].setValue(
      this.cityService.getCityId(this.officeForm.value.cityId)
    );
    if (this.office) {
      this.officeService.updateOffice(this.officeForm.value);
    } else {
      this.vendorService.addOffice(this.officeForm.value, this.vendorId);
    }
  }
}
