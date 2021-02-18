import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Office } from '@shared/models/office';
import { Vendor } from '@shared/models/vendor';
import { MapService } from '@shared/services/map.service';
import { VendorService } from '@shared/services/vendor.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-vendor-item-page',
  templateUrl: './vendor-item-page.component.html',
  styleUrls: ['./vendor-item-page.component.scss']
})
export class VendorItemPageComponent implements OnInit {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  vendor$!: Observable<Vendor>;

  constructor(
    private route: ActivatedRoute,
    private vendorService: VendorService,
    private readonly mapService: MapService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.vendor$ = this.vendorService.getVendorById(Number(params['id']));
    });
  }

  onClickOffice(office: Office): void {
    this.mapService.setOffice(office);
  }
}
