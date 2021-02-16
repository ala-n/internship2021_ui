import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vendor } from '@shared/models/vendor';
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
    private vendorService: VendorService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.vendor$ = this.vendorService.getVendorById(Number(params['id']));
    });
  }
}
