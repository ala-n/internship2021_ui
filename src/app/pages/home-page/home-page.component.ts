import { Component, OnInit } from '@angular/core';
import { LocationService } from '@shared/services/location.service';
import { NavigationService } from '@shared/services/navigation.service';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isLoading$ = of(true);
  isListVisible = true;

  toggleListView(): void {
    this.isListVisible = !this.isListVisible;
  }

  constructor(
    public navigationService: NavigationService,
    public locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.locationService.city$.pipe(
      delay(0), // fix ExpressionChangedAfterItHasBeenCheckedError
      map((city) => city === '')
    );
  }
}
