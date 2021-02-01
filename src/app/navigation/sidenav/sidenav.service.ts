import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  opened!: boolean;

  toggle(): void {
    this.opened = !this.opened;
  }
}
