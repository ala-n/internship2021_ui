import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MapService } from '@shared/services/map.service';
import { SortService } from '@shared/services/sort.service';

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
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.onSelect();
  }

  onSelect(): void {
    const selected = this.sortControl.value;
    if (selected === 'distance' && !this.mapService.userCoord) {
      this.showSnackbar();
      this.sortControl.setValue(this.lastSelected);
      return;
    }
    this.sortService.setParameter(selected);
    this.lastSelected = selected;
  }

  showSnackbar(): void {
    const message =
      this.translate.currentLang === 'en'
        ? 'Your current location is required'
        : 'Необходимо Ваше текущее местоположение';
    const action = this.translate.currentLang === 'en' ? 'Close' : 'Закрыть';
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar']
    });
  }
}
