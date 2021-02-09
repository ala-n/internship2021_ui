import { Component } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LogInComponent {
  // signInSubmit(event: Event): void {
  //   event.preventDefault();
  // }
  model: any = {};

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.model.action = 'login';
    this.authService.loginForm(this.model).subscribe(response => {
      if (response.Token != null) {
        this.authService.setUser(response);
      }
    }, error => {
      console.error(error);
    });
  }
}
