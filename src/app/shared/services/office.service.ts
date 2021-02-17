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

  getOffice(id: number): Observable<Office> {
    const url = `${OfficeService.OFFICES_URL}/${id}`;
    return this.http.get<Office>(url);
  }

  addOffice(office: Office, vendorId: number): Observable<Office> {
    office.vendorId = vendorId;
    return this.http.post<Office>(
      OfficeService.OFFICES_URL,
      office,
      this.httpOptions
    );
  }

  updateOffice(office: Office, vendorId: number): Observable<Office> {
    office.vendorId = vendorId;
    return this.http.put<Office>(
      OfficeService.OFFICES_URL,
      office,
      this.httpOptions
    );
  }
}
