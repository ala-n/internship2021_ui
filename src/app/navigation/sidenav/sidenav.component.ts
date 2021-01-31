import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  opened!: boolean;
  adminVisible!: boolean;

  toggleAdminPage(): void {
    this.adminVisible = !this.adminVisible;
  }
}
