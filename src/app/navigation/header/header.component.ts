import { Component } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isSidebarVisible!: boolean;

  constructor(private sidebarService: SidebarService) {}

  toggleSidebarVisibility(): void {
    this.sidebarService
      .getSidebarVisibility()
      .subscribe((value) => (this.isSidebarVisible = value));
    this.sidebarService.setSidebarVisibility(!this.isSidebarVisible);
  }
}
