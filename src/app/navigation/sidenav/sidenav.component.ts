import { Component } from '@angular/core';
import { NavigationService } from '@shared/services/navigation.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(public navigationService: NavigationService) {}
}
