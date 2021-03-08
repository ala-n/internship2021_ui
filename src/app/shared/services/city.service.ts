import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from './http.service';

import { HttpService } from './http.service';
import { City } from '@shared/models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private _cities: City[] = [];

  static LOCATION_URL = 'api/cities';

  constructor(private http: HttpService) {}

  get cities(): City[] {
    return this._cities;
  }

  getCityId(cityName: string | undefined): string | undefined {
    if (!cityName) return undefined;

    const city = this.cities.find((city) => city.name === cityName);
    return city ? city.id : undefined;
  }

  getCityName(cityId: string | undefined): string | undefined {
    if (!cityId) return undefined;

    const city = this.cities.find((city) => city.id === cityId);
    return city ? city.name : undefined;
  }

  preload(): Observable<City[]> {
    return this.http.get<City[]>('api/cities').pipe(
      tap((cities) => {
        this._cities = [...cities];
      })
    );
  }
}
