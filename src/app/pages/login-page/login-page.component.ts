import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LogInComponent {
  signInSubmit(event: Event): void {
    event.preventDefault();
  }
}
