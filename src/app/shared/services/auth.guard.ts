import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router'; // Import Router to use with backend
import { AuthService } from '@shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    // private router: Router, // uncomment this to use with backend
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      // this.router.navigate(['/login']); // uncomment this to use with backend
      return true; // should be false
    } else {
      return true;
    }
  }
}
