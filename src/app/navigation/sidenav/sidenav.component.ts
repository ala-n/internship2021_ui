import { Component } from '@angular/core';
import { NavigationService } from '@shared/services/navigation.service';
import { AuthService } from '@shared/services/auth.service';
import { LocationService } from '@shared/services/location.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(
    public navigationService: NavigationService,
    private httpAuth: AuthService,
    public locationService: LocationService
  ) {}

  logout(): void {
    this.httpAuth.logout();
  }
}
