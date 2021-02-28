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

  ngOnInit(): void {
    this.authService.logout();
  }

  login(): void {
    this.authService.login(this.model).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
