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
  city!: string;

  constructor(
    public navigationService: NavigationService,
    private router: Router
  ) {
    // hotfix of problem: after page refresh "home/manage: navigation buttons return to default state
    // like we are on home-page;
    // TODO find better solution
    this.city = this.router.url.split('/home/')[1];

    this.homePageVisibility = this.router.url !== `/home/${this.city}`;
    this.navigationService.setHomePageVisibility(this.homePageVisibility);
  }
}
