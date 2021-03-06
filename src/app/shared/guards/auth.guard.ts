import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '@shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.userService.updateCurrentUser();
  }
}
