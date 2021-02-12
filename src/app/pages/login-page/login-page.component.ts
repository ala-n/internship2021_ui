import { Component } from '@angular/core';
import { User } from '@shared/models/user';
import { AuthService } from '@shared/services/auth.service';
import { LoginData} from '@shared/models/login_data';
import { Token } from '@shared/models/token';


@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LogInComponent {
  // signInSubmit(event: Event): void {
  //   event.preventDefault();
  // }
  model: LoginData = {};
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.model.action = 'login';
    this.authService.loginForm(this.model).subscribe(response => {
      if (response.token != null) {
        this.authService.setUser(response);
      }
    }, error => {
      console.error(error);
    });
  }
}
