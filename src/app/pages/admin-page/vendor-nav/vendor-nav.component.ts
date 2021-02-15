import { Component, OnInit } from '@angular/core';
import { VendorService } from '@shared/services/vendor.service';

@Component({
  selector: 'app-vendor-nav',
  templateUrl: './vendor-nav.component.html',
  styleUrls: ['./vendor-nav.component.scss']
})
export class VendorNavComponent implements OnInit {
  vendorId!: number;

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.vendorId = this.vendorService.get();
  }
}
