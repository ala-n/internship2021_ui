import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-two',
  templateUrl: './rating-two.component.html',
  styleUrls: ['./rating-two.component.scss']
})
export class RatingTwoComponent {
  @Input() rating!: number;
  @Input() offerId!: string;
}
