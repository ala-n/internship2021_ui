import { Component } from '@angular/core';
import { NavigationService } from '@shared/services/state/navigation.service';
import { AuthService } from '@shared/services/http/auth.service';
import { UserService } from '@shared/services/http/user/user.service';
import { User } from '@shared/models/user';
import { LocationService } from '@shared/services/state/location.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  user!: User;

  constructor(
    public navigationService: NavigationService,
    private httpAuth: AuthService,
    private userService: UserService,
    public locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      if (user) this.user = user;
    });
  }

  logout(): void {
    this.httpAuth.logout();
  }
}
