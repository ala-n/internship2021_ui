import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Office } from '@shared/models/office';

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
  onPopup(office: Office): void {
    console.log(office);
  }
}
