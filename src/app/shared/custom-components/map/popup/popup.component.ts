import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Offer } from '@shared/models/types';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent {
  @Input() offer!: Offer;
  @Input() address!: string;
  @Input() phoneNumber!: string;

  onPopup(offer: Offer): void {
    console.log(offer);
  }
}
