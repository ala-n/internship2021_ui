import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Vendor } from '@shared/models/vendor';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent {
  @Input() vendor!: Vendor;
  @Input() address!: string;
  @Input() phoneNumber!: string;

  onPopup(vendor: Vendor): void {
    console.log(vendor);
  }
}
