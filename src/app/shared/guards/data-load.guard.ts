import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CityService } from '@shared/services/http/city/city.service';
import { NavigationService } from '@shared/services/state/navigation.service';
import { UserService } from '@shared/services/http/user/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { TagsService } from '@shared/services/http/tag/tags.service';
import { LocationService } from '@shared/services/state/location.service';

@Injectable({
  providedIn: 'root'
})
export class DataLoadGuard implements CanActivate {
  constructor(
    public navigationService: NavigationService,
    public locationService: LocationService,
    private userService: UserService,
    private cityService: CityService,
    private tagsService: TagsService
  ) {}

  canActivate(): Observable<boolean> {
    return this.cityService.preload().pipe(
      switchMap(() => this.tagsService.getAllTags()),
      switchMap(() => this.userService.user$),
      tap((user) => {
        if (user) {
          const cityName =
            this.cityService.getCityName(user.cityId) ?? 'Antananarivo';
          this.locationService.setCity(cityName);
        } else this.locationService.setCity('Minsk');
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }
}
