import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@shared/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  homePageVisibility!: boolean;

  constructor(
    public navigationService: NavigationService,
    private router: Router
  ) {
    // hotfix of problem: after page refresh "home/manage: navigation buttons return to default state
    // like we are on home-page;
    // TODO find better solution
    this.homePageVisibility = this.router.url !== '/home';
    this.navigationService.setHomePageVisibility(this.homePageVisibility);
  }
}
