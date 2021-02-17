import { Component } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { LoginData} from '@shared/models/login_data';
import { HttpService } from '@shared/services/http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LogInComponent {
  // Old function to login without any authentication
  // signInSubmit(event: Event): void {
  //   event.preventDefault();
  // }

  model: LoginData = {};
  constructor(
    private authService: AuthService,
    private http: HttpService
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
