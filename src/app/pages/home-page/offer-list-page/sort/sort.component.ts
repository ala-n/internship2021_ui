import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SortService } from '@shared/services/data-handle/sort.service';
import { AlertService } from '@shared/services/message/alert.service';
import { MapService } from '@shared/services/map/map.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortByComponent {
  readonly SORT_OPTIONS = ['recency', 'distance', 'rating'];
  readonly sortControl = new FormControl(this.SORT_OPTIONS[0]);
  lastSelected = '';
  message!: string;
  action!: string;

  constructor(
    private sortService: SortService,
    private mapService: MapService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.onSelect();
  }

  onSelect(): void {
    const selected = this.sortControl.value;
    if (selected === 'distance' && !this.mapService.userCoord) {
      this.alertService.showSnackbar('location_required');
      this.sortControl.setValue(this.lastSelected);
      return;
    }
    this.sortService.setParameter(selected);
    this.lastSelected = selected;
  }
}
