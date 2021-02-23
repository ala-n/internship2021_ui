import { Component } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { LoginData } from '@shared/models/login_data';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LogInComponent {
  model: LoginData = {};
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.authService.loginForm(this.model).subscribe(
      (response) => {
        if (response.token != null) {
          this.authService.setUser(response);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
