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
      .get<Office[]>(OfficeService.OFFICES_URL)
      .pipe(
        map((offices) =>
          offices.filter(
            (office: { vendorId: string }) => office.vendorId === vendorId
          )
        )
      );
  }

  getOfficeById(id: string): Observable<Office> {
    const url = `${OfficeService.OFFICES_URL}/${id}`;
    return this.http.get(url);
  }

  getOfficesById(arr: string[]): Observable<Office[]> {
    const url = `${OfficeService.OFFICES_URL}/${arr}`;
    return this.http.get<Office[]>(url);
  }

  addOffice(office: Office, vendorId: string): Observable<Office> {
    const url = OfficeService.OFFICES_URL;
    office.vendorId = vendorId;
    return this.http.post(url, office);
  }

  updateOffice(office: Office, vendorId: string): Observable<Office> {
    const url = `${OfficeService.OFFICES_URL}/${office.id}`;
    office.vendorId = vendorId;
    return this.http.put(url, office);
  }
}
