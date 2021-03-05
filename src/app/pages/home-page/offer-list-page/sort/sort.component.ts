import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SortService } from '@shared/services/sort.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortByComponent {
  readonly SORT_OPTIONS = ['recency', 'distance', 'rating'];
  readonly sortControl = new FormControl(this.SORT_OPTIONS[0]);

  constructor(private sortService: SortService) {}

  ngOnInit(): void {
    this.onSelect();
  }

  onSelect(): void {
    const selected = this.sortControl.value;
    this.sortService.setParameter(selected);
  }
}
