import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Office } from '@shared/models/office';
import { Vendor } from '@shared/models/vendor';
import { MapService } from '@shared/services/map.service';
import { OfficeService } from '@shared/services/office.service';
import { VendorService } from '@shared/services/vendor.service';

@Component({
  selector: 'app-office-item-page',
  templateUrl: './office-item-page.component.html',
  styleUrls: ['./office-item-page.component.scss']
})
export class OfficeItemPageComponent implements OnInit {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  office$!: Observable<Office>;
  vendor$!: Observable<Vendor>;

  constructor(
    private route: ActivatedRoute,
    private officeService: OfficeService,
    private mapService: MapService,
    private vendorService: VendorService
  ) {}
  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.office$ = this.officeService.getOfficeById(Number(params['id']));
    });

    this.office$.pipe(takeUntil(this.destroy$)).subscribe((office) => {
      this.mapService.setOffice(office);
      this.vendor$ = this.vendorService.getVendorById(Number(office.vendorId));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
