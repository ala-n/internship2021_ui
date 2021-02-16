import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Office } from '@shared/models/office';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  static OFFICES_URL = 'api/offices';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getVendorOffices(vendorId: number): Observable<Office[]> {
    return this.http
      .get<Office[]>(OfficeService.OFFICES_URL)
      .pipe(
        map((offices) =>
          offices.filter((office) => office.vendorId === vendorId)
        )
      );
  }

  addOffice(office: Office): Observable<Office> {
    return this.http.post<Office>(
      OfficeService.OFFICES_URL,
      office,
      this.httpOptions
    );
  }

  updateOffice(office: Office): Observable<Office> {
    return this.http.put<Office>(
      OfficeService.OFFICES_URL,
      office,
      this.httpOptions
    );
  }
}
