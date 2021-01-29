import { Component, Input } from '@angular/core';
import { Offer } from 'src/app/shared/models/offer';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Input() offer!: Offer;

  onPopup(offer: Offer): void {
    console.log(offer);
  }
}
