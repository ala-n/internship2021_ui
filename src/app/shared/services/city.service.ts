import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { City } from '@shared/models/city';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private _cities: City[] = [];

  static LOCATION_URL = 'api/cities';

  constructor(private http: HttpClient) {}

  get cities(): City[] {
    return this._cities;
  }

  getCityId(cityName: string): string {
    const city = this.cities.find((city) => city.name === cityName);
    return city ? city.id : '';
  }

  getCityName(cityId: string): string {
    const city = this.cities.find((city) => city.id === cityId);
    return city ? city.name : '';
  }

  preload(): Promise<City[]> {
    const req$ = this.http.get<City[]>(CityService.LOCATION_URL).pipe(
      map((cities) => {
        this._cities = cities;
        return cities;
      })
    );
    return req$.toPromise();
  }
}
