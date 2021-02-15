import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Vendor } from '@shared/models/vendor';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() office!: any;
  @Input() vendorName!: string;
  @Input() address!: string;
  @Input() phoneNumber!: string;
  onPopup(vendor: Vendor): void {
    console.log(vendor);
  }
}
