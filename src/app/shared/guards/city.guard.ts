import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { CityService } from '@shared/services/city.service';
import { LocationService } from '@shared/services/location.service';
import { NavigationService } from '@shared/services/navigation.service';
import { UserService } from '@shared/services/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

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

  canActivate({ params }: ActivatedRouteSnapshot): Observable<boolean> {
    if (params.city) {
      this.locationService.setCity(params.city);
      return this.cityService.preload().pipe(
        map(() => true),
        catchError(() => of(false))
      );
    }

    return this.cityService.preload().pipe(
      switchMap(() => this.userService.user$),
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
