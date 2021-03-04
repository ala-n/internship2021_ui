import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LocationService } from '@shared/services/location.service';
import { NavigationService } from '@shared/services/navigation.service';
import { UserService } from '@shared/services/user.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityGuard implements CanActivate {
  constructor(
    public navigationService: NavigationService,
    public locationService: LocationService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate({
    params
  }: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    if (params.city) {
      this.locationService.setCity(params.city);
      return true;
    }

    return this.userService.user$.pipe(
      tap((user) => {
        if (user) {
          this.router.navigate(['home', user.city]);
        }
      }),
      map(() => false)
    );
  }
}
