import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { City } from '@shared/models/city';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  getCityId(cityName: string): string | undefined {
    const city = this.cities.find((city) => city.name === cityName);
    return city ? city.id : undefined;
  }

  getCityName(cityId: string): string | undefined {
    const city = this.cities.find((city) => city.id === cityId);
    return city ? city.name : undefined;
  }

  preload(): Observable<City[]> {
    return this.http.get<City[]>('/api/cities?includeInactive=true').pipe(
      tap((cities) => {
        this._cities = [...cities];
      })
    );
  }
}
