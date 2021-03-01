import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  static LOCATION_URL = 'api/cities';

  constructor(private http: HttpService) {}

  getCities(): Observable<string[]> {
    return this.http.get(LocationService.LOCATION_URL);
  }
}
