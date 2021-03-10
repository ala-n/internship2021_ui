import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationService } from '@shared/services/navigation.service';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss']
})
export class AdminSidenavComponent implements OnInit {
  isOpened = true;
  maxWidth = 767;
  user!: User;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(`(max-width: ${this.maxWidth}px)`)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    public navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      if (user) this.user = user;
    });
  }

  closeSidenav(): void {
    if (window.innerWidth <= this.maxWidth) {
      this.isOpened = false;
    }
  }
}
