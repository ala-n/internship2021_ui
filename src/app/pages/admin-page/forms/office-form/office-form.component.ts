import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, startWith, take } from 'rxjs/operators';
import { NavigationService } from '@shared/services/state/navigation.service';
import { Office } from '@shared/models/office';
import { VendorService } from '@shared/services/http/vendor/vendor.service';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../../dialogs/form-dialog/form-dialog.component';
import { from, Observable } from 'rxjs';
import { CityService } from '@shared/services/http/city/city.service';
import { AlertService } from '@shared/services/message/alert.service';
import { OfficeService } from '@shared/services/http/office/office.service';
import { MapService } from '@shared/services/map/map.service';

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

  options: string[] = [];
  filteredOptions!: Observable<string[]>;

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
    private mapService: MapService,
    private alertService: AlertService
  ) {}

  get vendorId(): string {
    return this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    const officeId = this.route.snapshot.params.officeId;
    this.options = this.cityService.cities.map((city) => city.name);
    this.filteredOptions = this.officeForm.controls['cityId'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
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
        if (!this.checkCity(address.city)) {
          return;
        }
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
      this.officeService
        .updateOffice(this.officeForm.value)
        .pipe(take(1))
        .subscribe();
    } else {
      this.vendorService
        .addOffice(this.officeForm.value, this.vendorId)
        .pipe(take(1))
        .subscribe();
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  checkCity(value: string): boolean {
    if (value && !this.options.includes(value)) {
      this.alertService.showSnackbar('inavailible_city');
      return false;
    }
    return true;
  }
}
