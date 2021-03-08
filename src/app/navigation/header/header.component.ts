import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '@shared/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  homePageVisibility!: boolean;
  city!: string;

  constructor(
    public navigationService: NavigationService,
    private router: Router
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.homePageVisibility = !/home/.test(this.router.url);
        this.navigationService.setHomePageVisibility(this.homePageVisibility);
      }
    });
  }
}
