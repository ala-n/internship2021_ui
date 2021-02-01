import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // binding for syncing admin page opening from header/sidenav
  @Input() adminPageVisibility!: boolean;
  @Output() adminPageVisibilityChange = new EventEmitter<boolean>();

  constructor(public sidenavService: SidenavService) {}

  toggleAdminPage(): void {
    this.adminPageVisibility = !this.adminPageVisibility;
    this.adminPageVisibilityChange.emit(this.adminPageVisibility);
  }

  openHomePage(): void {
    this.adminPageVisibilityChange.emit(false);
  }
}
