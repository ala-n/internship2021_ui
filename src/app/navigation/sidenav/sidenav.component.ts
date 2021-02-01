import { Component } from '@angular/core';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  adminVisible!: boolean;

  constructor(public sidenavService: SidenavService) {}

  toggleAdminPage(): void {
    this.adminVisible = !this.adminVisible;
  }
}
