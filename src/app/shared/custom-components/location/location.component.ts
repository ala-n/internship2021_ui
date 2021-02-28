import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { CityService } from '@shared/services/city.service';
import { LocationService } from '@shared/services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LocationComponent implements OnInit, OnDestroy {
  filteredOptions$!: Observable<string[]>;
  currentCity!: string;

  myControl = new FormControl(this.currentCity);
  selectedOption!: string;
  subscription: Subscription[] = [];

  constructor(
    private locationService: LocationService,
    private citiesService: CityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filteredOptions$ = this.myControl.valueChanges.pipe(
      withLatestFrom(this.citiesService.getCities()),
      map(([value, city]) => {
        const filterValue = (value || '').toLowerCase();
        return city.filter((option) =>
          option.toLowerCase().startsWith(filterValue)
        );
      })
    );

    const subscription$ = this.locationService.city$.subscribe((city) => {
      this.currentCity = city;
      this.myControl.setValue(city);
    });

    this.subscription.push(subscription$);
  }

  onSelectionChanged(city: string): void {
    this.router.navigate(['/home'], { queryParams: { city } });
    this.locationService.setCity(city);
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

  ngOnDestroy(): void {
    this.subscription.forEach((s: Subscription) => s.unsubscribe());
  }
}
