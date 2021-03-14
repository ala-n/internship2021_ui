import { Component } from '@angular/core';
import { NavigationService } from '@shared/services/state/navigation.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  // isOpen = false;

  constructor(public navigationService: NavigationService) {}

  // this.navigationService.openToolbar(open);
}
