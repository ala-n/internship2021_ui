import { Component } from '@angular/core';
import { NavigationService } from '@shared/services/navigation.service';

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.scss']
})
export class GoBackButtonComponent {
  constructor(public navigationService: NavigationService) {}
}
