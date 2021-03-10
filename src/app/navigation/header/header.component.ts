import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from '@shared/models/user';
import { NavigationService } from '@shared/services/navigation.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  homePageVisibility!: boolean;
  city!: string;
  user!: User;

  constructor(
    public navigationService: NavigationService,
    private router: Router,
    private userService: UserService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.homePageVisibility = !/home/.test(this.router.url);
        this.navigationService.setHomePageVisibility(this.homePageVisibility);
      }
    });
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      if (user) this.user = user;
    });
  }
}
