import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  isSidenavOpened!: boolean;
  isHomePageOpened!: boolean;
  isToolbarOpened!: boolean;
  isListVisible!: boolean;
  role!: string;

  constructor(private location: Location) {}

  toggleSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  toggleHomePage(): void {
    this.isHomePageOpened = !this.isHomePageOpened;
  }

  goToHomePage(): void {
    if (this.isHomePageOpened) {
      this.isHomePageOpened = false;
    }
  }

  toggleMapView(): void {
    this.isListVisible = !this.isListVisible;
  }

  setHomePageVisibility(value: boolean): void {
    this.isHomePageOpened = value;
  }

  goBack(): void {
    this.location.back();
  }

  toggleToolbar(): void {
    this.isToolbarOpened = !this.isToolbarOpened;
  }
}
