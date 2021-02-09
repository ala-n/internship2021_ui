import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { MapService } from '@shared/services/map.service';
import { LocationService } from '@shared/services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  filteredOptions$!: Observable<string[]>;
  currentCity = 'Minsk';
  myControl = new FormControl(this.currentCity);
  selectedOption!: string;

  constructor(
    private mapService: MapService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.filteredOptions$ = this.myControl.valueChanges.pipe(
      withLatestFrom(this.locationService.getCities()),
      map(([value, cities]) => {
        const filterValue = (value || '').toLowerCase();
        return cities.filter((option) =>
          option.toLowerCase().startsWith(filterValue)
        );
      })
    );
    this.mapService.setCity(this.currentCity);
  }

  onSelectionChanged(option: string): void {
    this.currentCity = option;
    this.mapService.setCity(option);
  }

  focusIn(e: FocusEvent): void {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || relatedTarget.tagName !== 'MAT-OPTION') {
      this.myControl.reset();
    }
  }

  focusOut(e: FocusEvent): void {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || relatedTarget.tagName !== 'MAT-OPTION') {
      this.myControl.setValue(this.currentCity);
    }
  }
}
