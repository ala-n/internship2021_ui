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
    // hotfix of problem: after page refresh "home/manage: navigation buttons return to default state
    // like we are on home-page;
    // TODO find better solution
    router.events.subscribe((event) => {
      // see also
      if (event instanceof NavigationEnd) {
        this.homePageVisibility = !/home/.test(this.router.url);
        this.navigationService.setHomePageVisibility(this.homePageVisibility);
      }
    });
  }
}
