import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { CityService } from '@shared/services/http/city/city.service';
import { NavigationService } from '@shared/services/state/navigation.service';
import { UserService } from '@shared/services/http/user/user.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocationService } from '@shared/services/state/location.service';

@Injectable({
  providedIn: 'root'
})
export class CityGuard implements CanActivate {
  constructor(
    public navigationService: NavigationService,
    public locationService: LocationService,
    private userService: UserService,
    private router: Router,
    private cityService: CityService
  ) {}

  canActivate({
    params
  }: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    if (params.city) {
      this.locationService.setCity(params.city);
      return true;
    }

    return this.userService.user$.pipe(
      tap((user) => {
        if (user) {
          const cityName =
            this.cityService.getCityName(user.cityId) ?? 'Antananarivo';
          this.router.navigate(['home', cityName]);
        }
      }),
      map(() => false)
    );
  }
}
