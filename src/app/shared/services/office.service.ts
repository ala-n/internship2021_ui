import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Office } from '@shared/models/office';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  static OFFICES_URL = 'api/offices';

  constructor(private http: HttpService) {}

  getVendorOffices(vendorId: string): Observable<Office[]> {
    return this.http
      .get(OfficeService.OFFICES_URL)
      .pipe(
        map((offices) =>
          offices.filter((office: { vendorId: string; }) => office.vendorId === vendorId)
        )
      );
  }

  getOfficeById(id: string): Observable<Office> {
    const url = `${OfficeService.OFFICES_URL}/${id}`;
    return this.http.get(url);
  }

  addOffice(office: Office, vendorId: string): Observable<Office> {
    office.vendorId = vendorId;
    return this.http.post(
      OfficeService.OFFICES_URL,
      office
    );
  }

  updateOffice(office: Office, vendorId: string): Observable<Office> {
    office.vendorId = vendorId;
    return this.http.put(
      OfficeService.OFFICES_URL,
      office
    );
  }
}
