import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  isSidenavOpened!: boolean;
  isHomePageOpened!: boolean;

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

  setHomePageVisibility(value: boolean): void {
    this.isHomePageOpened = value;
  }
}
