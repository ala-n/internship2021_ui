import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '@shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(): boolean | Observable<boolean> {
    // it will be uncommented later

    // if (!this.authService.isLoggedIn()) {
    //   this.router.navigate(['/login']);
    //   return false;
    // } else {
    //   return this.userService.updateCurrentUser();
    // }

    return this.userService.updateCurrentUser();
  }
}
