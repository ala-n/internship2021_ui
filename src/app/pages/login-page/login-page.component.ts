import { Component } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { LoginData } from '@shared/models/login_data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LogInComponent {
  model: LoginData = {};
  errorMessage!: boolean;
  hide = true;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.model).subscribe(
      () => {
        this.router.navigate(['./home']);
      },
      (error) => {
        console.error(error);
        this.errorMessage = true;
      }
    );
  }
}
