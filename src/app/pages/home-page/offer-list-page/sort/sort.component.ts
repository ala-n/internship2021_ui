import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortByComponent {
  readonly SORT_OPTIONS = ['DISTANCE', 'RELEVANCE', 'RATING'];
  readonly sortControl = new FormControl(this.SORT_OPTIONS[0]);
}
