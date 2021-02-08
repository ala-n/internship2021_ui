import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationService } from '@shared/services/navigation.service';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss']
})
export class AdminSidenavComponent {
  isOpened = true;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 768px)')
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public navigationService: NavigationService
  ) {}

  closeSidenav(): void {
    if (window.innerWidth <= 768) {
      this.isOpened = false;
    }
  }
}
