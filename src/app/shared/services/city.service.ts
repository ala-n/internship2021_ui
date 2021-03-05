import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { City } from '@shared/models/city';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  cities$!: Observable<City[]>;
  cityName!: string;

  static LOCATION_URL = 'api/cities';

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    this.cities$ = this.http.get<City[]>(CityService.LOCATION_URL);
    return (this.cities$ = this.http.get<City[]>(CityService.LOCATION_URL));
  }

  getCityId(cityName: string): Observable<string> {
    return this.cities$.pipe(
      map((cities) => {
        const city = cities.filter((city) => city.name === cityName);
        return city[0].id;
      })
    );
  }

  getCityName(cityId: string): Observable<string> {
    return this.cities$.pipe(
      map((cities) => {
        const city = cities.filter((city) => city.id === cityId);
        return city[0].name;
      })
    );
  }

  getCityById(cityId: string): Observable<string> {
    return this.http
      .get<City>(`${CityService.LOCATION_URL}/${cityId}`)
      .pipe(map((city) => city.name));
  }
}
