import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Office } from '@shared/models/office';
import { Vendor } from '@shared/models/vendor';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent {
  @Input() office!: Office;
  @Input() vendorName!: string;
  @Input() address!: string;
  @Input() phoneNumber!: string;
  onPopup(vendor: Vendor): void {
    console.log(vendor);
  }
}
