import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // binding for syncing sidenav toggle from header/sidenav
  @Input() sidenavVisibility!: boolean;
  @Output() sidenavVisibilityChange = new EventEmitter<boolean>();
  // binding for syncing admin page opening from header/sidenav
  @Input() adminPageVisibility!: boolean;
  @Output() adminPageVisibilityChange = new EventEmitter<boolean>();

  openSidenav(): void {
    this.sidenavVisibilityChange.emit(true);
  }

  toggleAdminPage(): void {
    this.adminPageVisibility = !this.adminPageVisibility;
    this.adminPageVisibilityChange.emit(this.adminPageVisibility);
  }

  openHomePage(): void {
    this.adminPageVisibilityChange.emit(false);
  }
}
