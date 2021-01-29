import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() sidenavVisibility!: boolean;
  @Output() sidenavVisibilityChange = new EventEmitter<boolean>();
  adminPageVisible = false;

  openSidenav(): void {
    this.sidenavVisibilityChange.emit(true);
  }

  toggleAdminPage(): void {
    this.adminPageVisible = !this.adminPageVisible;
  }
}
